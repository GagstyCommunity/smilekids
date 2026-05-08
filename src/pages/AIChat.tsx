import { useRef, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DisclaimerBanner } from "@/components/ui/disclaimer-banner";
import SEOHead from "@/components/SEOHead";
import { Send, Bot, User, Sparkles, ShieldCheck, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface Message { role: "user" | "assistant"; content: string; }

const suggested = [
  "Why might my gums bleed when I brush?",
  "How often should I floss?",
  "What could cause tooth sensitivity?",
  "Is at-home teeth whitening safe?",
];

const initial: Message[] = [{
  role: "assistant",
  content:
    "Hi! I'm **Denta**, your AI Oral Wellness Coach in **Safe Mode**. I use probability language and only suggest seeing a dentist when it really matters. How can I help today?",
}];

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/dentist-chat`;

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>(initial);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const send = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    const userMsg: Message = { role: "user", content };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);

    let acc = "";
    const upsert = (chunk: string) => {
      acc += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && last.content.startsWith("§stream§")) {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: "§stream§" + acc } : m));
        }
        return [...prev, { role: "assistant", content: "§stream§" + acc }];
      });
    };
    const finalize = () => {
      setMessages((prev) => prev.map((m, i) => (i === prev.length - 1 && m.role === "assistant" && m.content.startsWith("§stream§")
        ? { ...m, content: m.content.slice("§stream§".length) }
        : m)));
    };

    try {
      const ctrl = new AbortController();
      abortRef.current = ctrl;
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: next.map(({ role, content }) => ({ role, content })) }),
        signal: ctrl.signal,
      });

      if (resp.status === 429) { toast.error("Too many requests. Please wait a moment."); setLoading(false); return; }
      if (resp.status === 402) { toast.error("AI credits exhausted. Add credits to continue."); setLoading(false); return; }
      if (!resp.ok || !resp.body) throw new Error("Stream failed");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let done = false;
      while (!done) {
        const { value, done: d } = await reader.read();
        if (d) break;
        buffer += decoder.decode(value, { stream: true });
        let idx: number;
        while ((idx = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, idx);
          buffer = buffer.slice(idx + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line || line.startsWith(":") || !line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") { done = true; break; }
          try {
            const parsed = JSON.parse(json);
            const c = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (c) upsert(c);
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }
      finalize();
    } catch (e: any) {
      console.error(e);
      if (e?.name !== "AbortError") toast.error("Chat failed. Please try again.");
      finalize();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead
        title="AI Dentist Chat (Safe Mode) | Denta.Health"
        description="Talk to Denta, the wellness AI oral health coach. Probability language only — never a medical diagnosis."
        canonical="https://denta.health/chat"
        keywords={["AI dentist", "oral health chat", "wellness coach"]}
      />
      <Header />

      <main className="flex-1 container py-6 flex flex-col max-w-3xl">
        <DisclaimerBanner variant="warning" className="mb-4" />

        <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
          <ShieldCheck className="w-4 h-4 text-primary" />
          Safe Mode active — AI uses probability language and only suggests a dentist when warranted.
        </div>

        <div className="flex-1 bg-card rounded-2xl shadow-card border border-border/50 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${m.role === "assistant" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
                  {m.role === "assistant" ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${m.role === "assistant" ? "bg-muted text-foreground" : "bg-primary text-primary-foreground"}`}>
                  <div
                    className="text-sm leading-relaxed whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{
                      __html: (m.content.startsWith("§stream§") ? m.content.slice(8) : m.content)
                        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                        .replace(/\*(.*?)\*/g, "<em>$1</em>")
                        .replace(/\n/g, "<br />"),
                    }}
                  />
                </div>
              </div>
            ))}
            {loading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center"><Bot className="w-4 h-4" /></div>
                <div className="bg-muted rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {messages.length === 1 && (
            <div className="px-4 pb-4">
              <div className="flex items-center gap-2 mb-3"><Sparkles className="w-4 h-4 text-primary" /><span className="text-sm font-medium">Try asking</span></div>
              <div className="flex flex-wrap gap-2">
                {suggested.map((q) => (
                  <button key={q} onClick={() => send(q)} className="px-3 py-1.5 text-sm rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors">{q}</button>
                ))}
              </div>
            </div>
          )}

          <div className="p-4 border-t border-border">
            <div className="flex gap-3">
              <Input
                placeholder="Ask about dental wellness…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                disabled={loading}
                className="flex-1"
              />
              <Button onClick={() => send()} disabled={!input.trim() || loading} className="bg-gradient-primary shadow-glow">
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" /> AI provides wellness guidance only. Consult a dentist for medical advice.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
