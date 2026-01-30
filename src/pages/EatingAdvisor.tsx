import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DisclaimerBanner } from "@/components/ui/disclaimer-banner";
import {
  Apple,
  Search,
  Camera,
  Clock,
  Droplets,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

interface FoodAnalysis {
  name: string;
  sugarLevel: "low" | "medium" | "high";
  acidLevel: "low" | "medium" | "high";
  overallImpact: "safe" | "moderate" | "caution";
  sugarGrams: number;
  waitTime: number;
  tips: string[];
}

const mockAnalysis: FoodAnalysis = {
  name: "Orange Juice",
  sugarLevel: "high",
  acidLevel: "high",
  overallImpact: "caution",
  sugarGrams: 24,
  waitTime: 30,
  tips: [
    "Rinse your mouth with water immediately after drinking",
    "Wait at least 30 minutes before brushing to protect enamel",
    "Use a straw to minimize contact with teeth",
    "Consider diluting with water next time",
  ],
};

const recentFoods = [
  { name: "Apple", impact: "safe", sugarGrams: 10 },
  { name: "Coffee with Sugar", impact: "moderate", sugarGrams: 8 },
  { name: "Chocolate Bar", impact: "caution", sugarGrams: 25 },
  { name: "Greek Yogurt", impact: "safe", sugarGrams: 6 },
  { name: "Soda", impact: "caution", sugarGrams: 39 },
];

const impactColors = {
  safe: "bg-success/10 text-success border-success/20",
  moderate: "bg-warning/10 text-warning border-warning/20",
  caution: "bg-destructive/10 text-destructive border-destructive/20",
};

const levelColors = {
  low: "text-success",
  medium: "text-warning",
  high: "text-destructive",
};

export default function EatingAdvisor() {
  const [searchQuery, setSearchQuery] = useState("");
  const [analysis, setAnalysis] = useState<FoodAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setAnalysis(mockAnalysis);
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold mb-2 flex items-center gap-3">
              <Apple className="w-8 h-8 text-primary" />
              Eating Advisor
            </h1>
            <p className="text-muted-foreground">
              Analyze foods and drinks for their impact on your dental health.
            </p>
          </div>

          {/* Search Area */}
          <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50 mb-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Enter a food or drink (e.g., orange juice, candy, cheese)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="pl-10 h-12"
                />
              </div>
              <Button onClick={handleSearch} className="bg-gradient-primary shadow-glow h-12 px-6" disabled={isAnalyzing}>
                {isAnalyzing ? "Analyzing..." : "Analyze"}
              </Button>
              <Button variant="outline" className="h-12">
                <Camera className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Analysis Result */}
          {analysis && (
            <div className="space-y-6 mb-8 animate-fade-in-up">
              {/* Main Result Card */}
              <div className={`rounded-2xl p-6 border ${impactColors[analysis.overallImpact]}`}>
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {analysis.overallImpact === "safe" && <CheckCircle2 className="w-6 h-6" />}
                      {analysis.overallImpact === "moderate" && <AlertTriangle className="w-6 h-6" />}
                      {analysis.overallImpact === "caution" && <AlertTriangle className="w-6 h-6" />}
                      <h2 className="text-xl font-bold">{analysis.name}</h2>
                    </div>
                    <p className="text-sm opacity-80">
                      {analysis.overallImpact === "safe" && "This food has minimal impact on your teeth."}
                      {analysis.overallImpact === "moderate" && "This food has some impact. Follow the tips below."}
                      {analysis.overallImpact === "caution" && "This food may affect your teeth. Take precautions."}
                    </p>
                  </div>

                  <div className="flex gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold">{analysis.sugarGrams}g</div>
                      <div className="text-sm opacity-80">Sugar</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold">{analysis.waitTime}min</div>
                      <div className="text-sm opacity-80">Wait Time</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Analysis */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-card rounded-xl p-4 shadow-card border border-border/50">
                  <div className="text-sm text-muted-foreground mb-1">Sugar Level</div>
                  <div className={`text-lg font-semibold capitalize ${levelColors[analysis.sugarLevel]}`}>
                    {analysis.sugarLevel}
                  </div>
                </div>
                <div className="bg-card rounded-xl p-4 shadow-card border border-border/50">
                  <div className="text-sm text-muted-foreground mb-1">Acid Level</div>
                  <div className={`text-lg font-semibold capitalize ${levelColors[analysis.acidLevel]}`}>
                    {analysis.acidLevel}
                  </div>
                </div>
                <div className="bg-card rounded-xl p-4 shadow-card border border-border/50">
                  <div className="text-sm text-muted-foreground mb-1">Recommended Wait</div>
                  <div className="text-lg font-semibold flex items-center gap-2">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                    {analysis.waitTime} minutes
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-primary" />
                  Recommended Actions
                </h3>
                <ul className="space-y-3">
                  {analysis.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 text-sm font-medium">
                        {index + 1}
                      </div>
                      <span className="text-muted-foreground">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Recent Foods */}
          <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50 mb-6">
            <h3 className="font-semibold mb-4">Recently Analyzed Foods</h3>
            <div className="space-y-2">
              {recentFoods.map((food, index) => (
                <button
                  key={index}
                  onClick={() => setSearchQuery(food.name)}
                  className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors text-left"
                >
                  <div
                    className={`w-3 h-3 rounded-full ${
                      food.impact === "safe"
                        ? "bg-success"
                        : food.impact === "moderate"
                        ? "bg-warning"
                        : "bg-destructive"
                    }`}
                  />
                  <span className="flex-1 font-medium">{food.name}</span>
                  <span className="text-sm text-muted-foreground">{food.sugarGrams}g sugar</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <DisclaimerBanner variant="info" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
