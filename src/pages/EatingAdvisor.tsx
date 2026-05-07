import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DisclaimerBanner } from "@/components/ui/disclaimer-banner";
import { Apple, Search, Clock, Droplets, AlertTriangle, CheckCircle2, ChevronRight, Sparkles } from "lucide-react";
import { FOOD_DB, findFood, FoodEntry } from "@/data/foods";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const impactColors = {
  safe: "bg-success/10 text-success border-success/20",
  moderate: "bg-warning/10 text-warning border-warning/20",
  caution: "bg-destructive/10 text-destructive border-destructive/20",
};
const levelColors = { low: "text-success", medium: "text-warning", high: "text-destructive" };

export default function EatingAdvisor() {
  const [searchQuery, setSearchQuery] = useState("");
  const [analysis, setAnalysis] = useState<FoodEntry | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [source, setSource] = useState<"local" | "ai" | null>(null);

  const handleSearch = async () => {
    const q = searchQuery.trim();
    if (!q) return;
    setIsAnalyzing(true);
    setAnalysis(null);
    const local = findFood(q);
    if (local) {
      setAnalysis(local);
      setSource("local");
      setIsAnalyzing(false);
      return;
    }
    try {
      const { data, error } = await supabase.functions.invoke("analyze-food", { body: { food: q } });
      if (error) throw error;
      if (data?.analysis) {
        setAnalysis(data.analysis);
        setSource("ai");
      } else {
        toast.error("Could not analyze that food. Try another.");
      }
    } catch (e: any) {
      toast.error(e.message ?? "AI analysis failed");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold mb-2 flex items-center gap-3">
              <Apple className="w-8 h-8 text-primary" /> Eating Advisor
            </h1>
            <p className="text-muted-foreground">Search 40+ foods or let AI analyze anything you eat or drink.</p>
          </div>

          <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50 mb-6">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Try: orange juice, coffee, pizza, sushi…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="pl-10 h-12"
                  maxLength={120}
                />
              </div>
              <Button onClick={handleSearch} disabled={isAnalyzing} className="bg-gradient-primary shadow-glow h-12 px-6">
                {isAnalyzing ? "Analyzing…" : "Analyze"}
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {["Coffee", "Pizza", "Energy Drink", "Apple", "Wine (Red)", "Smoothie"].map((s) => (
                <button key={s} onClick={() => { setSearchQuery(s); setTimeout(handleSearch, 0); }}
                  className="text-xs px-3 py-1.5 rounded-full bg-muted hover:bg-muted/70 transition-colors">{s}</button>
              ))}
            </div>
          </div>

          {analysis && (
            <div className="space-y-6 mb-8 animate-fade-in-up">
              <div className={`rounded-2xl p-6 border ${impactColors[analysis.overallImpact]}`}>
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {analysis.overallImpact === "safe" ? <CheckCircle2 className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
                      <h2 className="text-xl font-bold">{analysis.name}</h2>
                      {source === "ai" && (
                        <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary inline-flex items-center gap-1">
                          <Sparkles className="w-3 h-3" /> AI
                        </span>
                      )}
                    </div>
                    <p className="text-sm opacity-80 capitalize">Overall impact: {analysis.overallImpact}</p>
                  </div>
                  <div className="flex gap-6">
                    <div className="text-center"><div className="text-3xl font-bold">{analysis.sugarGrams}g</div><div className="text-sm opacity-80">Sugar</div></div>
                    <div className="text-center"><div className="text-3xl font-bold">{analysis.waitTime}min</div><div className="text-sm opacity-80">Wait Time</div></div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-card rounded-xl p-4 shadow-card border border-border/50">
                  <div className="text-sm text-muted-foreground mb-1">Sugar Level</div>
                  <div className={`text-lg font-semibold capitalize ${levelColors[analysis.sugarLevel]}`}>{analysis.sugarLevel}</div>
                </div>
                <div className="bg-card rounded-xl p-4 shadow-card border border-border/50">
                  <div className="text-sm text-muted-foreground mb-1">Acid Level</div>
                  <div className={`text-lg font-semibold capitalize ${levelColors[analysis.acidLevel]}`}>{analysis.acidLevel}</div>
                </div>
                <div className="bg-card rounded-xl p-4 shadow-card border border-border/50">
                  <div className="text-sm text-muted-foreground mb-1">Wait before brushing</div>
                  <div className="text-lg font-semibold flex items-center gap-2"><Clock className="w-5 h-5 text-muted-foreground" />{analysis.waitTime} min</div>
                </div>
              </div>

              <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
                <h3 className="font-semibold mb-4 flex items-center gap-2"><Droplets className="w-5 h-5 text-primary" />Recommended Actions</h3>
                <ul className="space-y-3">
                  {analysis.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 text-sm font-medium">{i + 1}</div>
                      <span className="text-muted-foreground">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50 mb-6">
            <h3 className="font-semibold mb-4">Browse Food Library</h3>
            <div className="grid sm:grid-cols-2 gap-2 max-h-96 overflow-y-auto">
              {FOOD_DB.map((f) => (
                <button key={f.name} onClick={() => { setSearchQuery(f.name); setAnalysis(f); setSource("local"); }}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors text-left">
                  <div className={`w-3 h-3 rounded-full flex-shrink-0 ${f.overallImpact === "safe" ? "bg-success" : f.overallImpact === "moderate" ? "bg-warning" : "bg-destructive"}`} />
                  <span className="flex-1 font-medium text-sm">{f.name}</span>
                  <span className="text-xs text-muted-foreground">{f.sugarGrams}g</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>

          <DisclaimerBanner variant="info" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
