import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScoreRing } from "@/components/ui/score-ring";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Camera, Upload, RefreshCw, Lock, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";

interface ScanResult {
  score: number;
  overallRisk: "low" | "medium" | "high";
  summary: string;
  areas: { name: string; risk: string; description: string }[];
  recommendations: string[];
  disclaimer: string;
}

export default function ScanDemo() {
  const { user } = useAuth();
  const [state, setState] = useState<"idle" | "analyzing" | "preview" | "complete">("idle");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [result, setResult] = useState<ScanResult | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);

  const reset = () => { setState("idle"); setResult(null); setImageUrl(null); };

  async function onFile(file?: File) {
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) { toast.error("Image must be under 10MB"); return; }
    setImageUrl(URL.createObjectURL(file));
    setState("analyzing");
    try {
      const base64 = await new Promise<string>((resolve, reject) => {
        const r = new FileReader();
        r.onload = () => resolve(String(r.result).split(",")[1] || "");
        r.onerror = reject;
        r.readAsDataURL(file);
      });
      const { data, error } = await supabase.functions.invoke("scan-teeth", {
        body: { imageBase64: base64, mimeType: file.type },
      });
      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);
      setResult(data as ScanResult);
      // Gate full result behind auth
      setState(user ? "complete" : "preview");
    } catch (e: any) {
      toast.error(e?.message || "Scan failed. Please try again.");
      setState("idle");
    }
  }

  return (
    <section className="py-16 lg:py-24">
      <div className="container max-w-5xl">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
            <Sparkles className="w-4 h-4" /> Try it free — no signup needed
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold mb-3">Scan your smile in seconds</h2>
          <p className="text-muted-foreground">
            Snap a teeth photo. Our AI returns a wellness score instantly. Wellness guidance only — not a medical diagnosis.
          </p>
        </div>

        <div className="bg-card rounded-3xl border border-border/50 shadow-elevated p-6 lg:p-10">
          <input ref={fileRef} type="file" accept="image/*" className="hidden"
            onChange={(e) => onFile(e.target.files?.[0])} />
          <input ref={cameraRef} type="file" accept="image/*" capture="environment" className="hidden"
            onChange={(e) => onFile(e.target.files?.[0])} />

          {state === "idle" && (
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <Camera className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Upload or take a photo</h3>
                <p className="text-muted-foreground mb-5">Best results with good lighting and an open-mouth shot.</p>
                <div className="flex flex-wrap gap-3">
                  <Button onClick={() => cameraRef.current?.click()} className="bg-gradient-primary shadow-glow">
                    <Camera className="mr-2 w-4 h-4" /> Take Photo
                  </Button>
                  <Button variant="outline" onClick={() => fileRef.current?.click()}>
                    <Upload className="mr-2 w-4 h-4" /> Upload Image
                  </Button>
                </div>
                <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
                  <ShieldCheck className="w-3.5 h-3.5" /> Photos are analyzed in-session and not stored.
                </div>
              </div>
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/10 via-card to-accent/10 border border-border/50 flex items-center justify-center">
                <ScoreRing score={85} size="xl" label="Demo" />
              </div>
            </div>
          )}

          {state === "analyzing" && (
            <div className="text-center py-10">
              {imageUrl && <img src={imageUrl} alt="Your upload" className="w-40 h-40 object-cover rounded-xl mx-auto mb-6" />}
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <RefreshCw className="w-8 h-8 animate-spin" />
              </div>
              <h3 className="text-xl font-semibold mb-1">Analyzing with AI…</h3>
              <p className="text-muted-foreground">Examining hygiene cues and highlighting attention zones.</p>
            </div>
          )}

          {state === "preview" && result && (
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="filter blur-md">
                    <ScoreRing score={result.score} size="xl" riskLevel={result.overallRisk} />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-background/90 backdrop-blur rounded-full p-4 shadow-lg">
                      <Lock className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4">Your wellness score is ready</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Sign up to see your full results</h3>
                <p className="text-muted-foreground mb-5">
                  Free account unlocks your wellness score, highlighted zones, area-by-area breakdown,
                  and personalized daily recommendations.
                </p>
                <ul className="space-y-2 mb-6 text-sm">
                  {["Wellness score with risk badge", "Highlighted attention zones", "Personalized recommendations", "Save scans & track over time"].map((b) => (
                    <li key={b} className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-success" /> {b}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-3">
                  <Button asChild size="lg" className="bg-gradient-primary shadow-glow">
                    <Link to="/signup">Create free account <ArrowRight className="ml-2 w-4 h-4" /></Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link to="/login">I already have one</Link>
                  </Button>
                </div>
              </div>
            </div>
          )}

          {state === "complete" && result && (
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-center">
                <ScoreRing score={result.score} size="xl" riskLevel={result.overallRisk} />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Wellness assessment</h3>
                <p className="text-muted-foreground mb-4">{result.summary}</p>
                <div className="flex flex-wrap gap-3">
                  <Button asChild className="bg-gradient-primary shadow-glow">
                    <Link to="/scan">Open full scan tool <ArrowRight className="ml-2 w-4 h-4" /></Link>
                  </Button>
                  <Button variant="outline" onClick={reset}><RefreshCw className="mr-2 w-4 h-4" /> Scan again</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
