import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DisclaimerBanner } from "@/components/ui/disclaimer-banner";
import { Send, Bot, User, Sparkles, AlertTriangle } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const suggestedQuestions = [
  "Why do my gums bleed when I brush?",
  "How often should I floss?",
  "What causes tooth sensitivity?",
  "Is teeth whitening safe?",
];

const initialMessages: Message[] = [
  {
    role: "assistant",
    content:
      "Hi there! 👋 I'm your AI Oral Health Coach. I'm here to help you understand dental wellness topics and provide general guidance. Remember, I use probability-based language and always recommend consulting a dental professional for medical concerns. How can I help you today?",
  },
];

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (text: string = input) => {
    if (!text.trim()) return;

    const userMessage: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        role: "assistant",
        content: generateMockResponse(text),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateMockResponse = (question: string): string => {
    const lowerQ = question.toLowerCase();

    if (lowerQ.includes("bleed") || lowerQ.includes("gums")) {
      return `Based on what you've described, bleeding gums **may indicate** early signs of gum inflammation, which is quite common. This *might be* related to:\n\n• Brushing too hard\n• Not flossing regularly\n• Early-stage gum concerns\n\n**AI suggests** gentle brushing with a soft-bristled brush and regular flossing. If bleeding persists for more than two weeks, you might consider scheduling a dental checkup.\n\n⚠️ *This is wellness guidance only, not a diagnosis.*`;
    }

    if (lowerQ.includes("floss")) {
      return `Great question! Most dental wellness guidelines suggest flossing **at least once daily**, ideally before bedtime. This helps remove plaque and food particles that brushing alone might miss.\n\n**Tips for effective flossing:**\n• Use about 18 inches of floss\n• Curve it around each tooth in a C-shape\n• Be gentle on your gums\n\n*This guidance is for general wellness purposes.*`;
    }

    if (lowerQ.includes("sensitive") || lowerQ.includes("sensitivity")) {
      return `Tooth sensitivity is a common concern that **may be caused by** several factors:\n\n• Enamel wear from acidic foods/drinks\n• Gum recession exposing tooth roots\n• Recent dental work\n• Teeth grinding\n\n**You might consider:**\n• Using a sensitivity toothpaste\n• Avoiding very hot/cold foods temporarily\n• Using a soft-bristled brush\n\nIf sensitivity persists or is severe, consulting a dental professional would be advisable.\n\n⚠️ *For wellness guidance only.*`;
    }

    if (lowerQ.includes("whiten") || lowerQ.includes("white")) {
      return `Teeth whitening is generally considered safe when done properly. **There are a few options you might consider:**\n\n• **Whitening toothpastes** - Gentle, gradual results\n• **At-home strips/gels** - More noticeable results\n• **Professional treatments** - Most effective, supervised by dentists\n\n**AI suggests** starting with gentler options if you have sensitive teeth. Some people may experience temporary sensitivity after whitening.\n\n*Always follow product instructions and consult a dental professional for personalized advice.*`;
    }

    return `Thanks for your question! While I can provide general wellness guidance, for your specific concern, **I would recommend**:\n\n1. Maintaining regular brushing (2x daily) and flossing\n2. Staying hydrated throughout the day\n3. Limiting sugary snacks between meals\n\nIf you have persistent concerns, consulting with a dental professional would give you the most accurate, personalized guidance.\n\n⚠️ *Remember, this is AI wellness guidance, not a medical diagnosis.*`;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 container py-6 flex flex-col max-w-3xl">
        {/* Disclaimer */}
        <DisclaimerBanner variant="warning" className="mb-4" />

        {/* Chat Container */}
        <div className="flex-1 bg-card rounded-2xl shadow-card border border-border/50 flex flex-col overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === "assistant"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {message.role === "assistant" ? (
                    <Bot className="w-4 h-4" />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                </div>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === "assistant"
                      ? "bg-muted text-foreground"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  <div
                    className="text-sm leading-relaxed whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{
                      __html: message.content
                        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                        .replace(/\*(.*?)\*/g, "<em>$1</em>")
                        .replace(/\n/g, "<br />"),
                    }}
                  />
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-muted rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Suggested Questions */}
          {messages.length === 1 && (
            <div className="px-4 pb-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Suggested Questions</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((question) => (
                  <button
                    key={question}
                    onClick={() => handleSend(question)}
                    className="px-3 py-1.5 text-sm rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-3">
              <Input
                placeholder="Ask about dental wellness..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1"
                disabled={isTyping}
              />
              <Button
                onClick={() => handleSend()}
                disabled={!input.trim() || isTyping}
                className="bg-gradient-primary shadow-glow"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              AI provides wellness guidance only. Consult a dentist for medical advice.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
