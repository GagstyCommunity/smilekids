import { useRef, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { DisclaimerBanner } from "@/components/ui/disclaimer-banner";
import { ScoreRing } from "@/components/ui/score-ring";
import { RiskBadge } from "@/components/ui/risk-badge";
import SEOHead from "@/components/SEOHead";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Camera, Upload, RefreshCw, ChevronRight, AlertTriangle, ShieldCheck } from "lucide-react";

interface Zone { label: string; risk: "low" | "medium" | "high"; x: number; y: number; width: number; height: number; }
interface Area { name: string; risk: "low" | "medium" | "high"; description: string; }
interface ScanResult {
  score: number;
  overallRisk: "low" | "medium" | "high";
  summary: string;
  areas: Area[];
  zones: Zone[];
  recommendations: string[];
  disclaimer: string;
}

const riskBg: Record<Zone["risk"], string> = {
  low: "border-risk-low/80 bg-risk-low/20",
  medium: "border-risk-medium/80 bg-risk-medium/20",
  high: "border-risk-high/80 bg-risk-high/20",
};

export default function AIScan() {
  const [state, setState] = useState<"idle" | "analyzing" | "complete">("idle");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [result, setResult] = useState<ScanResult | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);

  const reset = () => { setState("idle"); setResult(null); setImageUrl(null); };

  const onPick = () => fileRef.current?.click();
  const onCamera = () => cameraRef.current?.click();

  const onFile = async (file?: File) => {
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) { toast.error("Image must be under 10MB"); return; }
    const previewUrl = URL.createObjectURL(file);
    setImageUrl(previewUrl);
    setState("analyzing");

    try {
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result).split(",")[1] || "");
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const { data, error } = await supabase.functions.invoke("scan-teeth", {
        body: { imageBase64: base64, mimeType: file.type },
      });
      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);
      setResult(data as ScanResult);
      setState("complete");
    } catch (e: any) {
      console.error(e);
      toast.error(e?.message || "Scan failed. Please try again.");
      setState("idle");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="AI Teeth Scan — Wellness Photo Analysis | Denta.Health"
        description="Upload a teeth photo and get a wellness-only AI assessment with highlighted zones and friendly recommendations. Not a medical diagnosis."
        canonical="https://denta.health/scan"
        keywords={["AI teeth scan", "oral wellness", "cavity risk", "teeth photo analysis"]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Denta.Health AI Teeth Scan",
          applicationCategory: "HealthApplication",
          description: "Wellness-only AI photo analyzer for at-home oral hygiene awareness.",
        }}
      />
      <Header />

      <main className="container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl lg:text-3xl font-bold mb-2">AI Teeth Scan</h1>
            <p className="text-muted-foreground">Upload a clear photo for instant wellness insights — never a medical diagnosis.</p>
          </div>

          {/* Always-visible disclaimer */}
          <DisclaimerBanner variant="warning" className="mb-6" />

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => onFile(e.target.files?.[0])}
          />
          <input
            ref={cameraRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(e) => onFile(e.target.files?.[0])}
          />

          {state === "idle" && (
            <div className="bg-card rounded-2xl p-8 shadow-card border border-border/50 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                  <Camera className="w-10 h-10" />
                </div>
                <h2 className="text-xl font-semibold mb-2">Upload Your Photo</h2>
                <p className="text-muted-foreground mb-6">Take a clear photo of your teeth in good lighting.</p>

                <button
                  onClick={onPick}
                  className="w-full border-2 border-dashed border-border rounded-xl p-8 mb-6 hover:border-primary/50 transition-colors"
                >
                  <Upload className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Tap to upload or take a photo</p>
                  <p className="text-xs text-muted-foreground mt-2">JPG, PNG, HEIC · Max 10MB</p>
                </button>

                <div className="flex gap-4 justify-center flex-wrap">
                  <Button onClick={onCamera} className="bg-gradient-primary shadow-glow">
                    <Camera className="mr-2 w-4 h-4" /> Take Photo
                  </Button>
                  <Button variant="outline" onClick={onPick}>
                    <Upload className="mr-2 w-4 h-4" /> Upload Image
                  </Button>
                </div>

                <div className="mt-8 text-left p-4 rounded-xl bg-muted/50">
                  <h3 className="font-medium mb-2 flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-primary" /> Tips for best results</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Use natural or bright lighting</li>
                    <li>• Open mouth wide to show teeth clearly</li>
                    <li>• Keep the photo in focus</li>
                    <li>• Photos are analyzed in-session and not stored</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {state === "analyzing" && (
            <div className="bg-card rounded-2xl p-12 shadow-card border border-border/50 text-center">
              {imageUrl && <img src={imageUrl} alt="Your upload" className="w-48 h-48 object-cover rounded-xl mx-auto mb-6" />}
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 text-primary flex items-center justify-center animate-pulse-glow">
                <RefreshCw className="w-8 h-8 animate-spin" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Analyzing with AI…</h2>
              <p className="text-muted-foreground">Examining hygiene cues and highlighting attention zones.</p>
            </div>
          )}

          {state === "complete" && result && (
            <div className="space-y-6">
              {/* Image with overlays */}
              <div className="bg-card rounded-2xl p-4 shadow-card border border-border/50">
                <div className="relative w-full max-w-2xl mx-auto rounded-xl overflow-hidden bg-muted">
                  {imageUrl && <img src={imageUrl} alt="Scanned teeth" className="block w-full h-auto" />}
                  {result.zones?.map((z, i) => (
                    <div
                      key={i}
                      className={`absolute border-2 rounded-md ${riskBg[z.risk]} animate-pulse-glow`}
                      style={{ left: `${z.x}%`, top: `${z.y}%`, width: `${z.width}%`, height: `${z.height}%` }}
                      title={z.label}
                    >
                      <span className="absolute -top-6 left-0 text-[10px] uppercase tracking-wide bg-background/90 backdrop-blur px-1.5 py-0.5 rounded shadow-sm">
                        {z.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Score */}
              <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="text-center">
                    <ScoreRing score={result.score} size="xl" riskLevel={result.overallRisk} />
                    <RiskBadge level={result.overallRisk} className="mt-4" />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-2xl font-bold mb-2">Wellness Assessment</h2>
                    <p className="text-muted-foreground mb-4">{result.summary}</p>
                    <Button variant="outline" onClick={reset}>
                      <RefreshCw className="mr-2 w-4 h-4" /> Scan Again
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
                <h3 className="text-lg font-semibold mb-4">Area Analysis</h3>
                <div className="space-y-3">
                  {result.areas.map((a) => (
                    <div key={a.name} className="flex items-start gap-4 p-4 rounded-xl bg-muted/30">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{a.name}</h4>
                          <RiskBadge level={a.risk} size="sm" />
                        </div>
                        <p className="text-sm text-muted-foreground">{a.description}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
                <h3 className="text-lg font-semibold mb-4">Recommended Actions</h3>
                <ul className="space-y-3">
                  {result.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 text-sm font-medium">{i + 1}</div>
                      <span className="text-muted-foreground">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-warning/10 text-warning border border-warning/20">
                <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-sm"><strong>Reminder:</strong> {result.disclaimer}</p>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
