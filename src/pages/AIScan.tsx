import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { DisclaimerBanner } from "@/components/ui/disclaimer-banner";
import { ScoreRing } from "@/components/ui/score-ring";
import { RiskBadge } from "@/components/ui/risk-badge";
import { Camera, Upload, RefreshCw, ChevronRight, AlertTriangle } from "lucide-react";

interface ScanResult {
  overallRisk: "low" | "medium" | "high";
  score: number;
  areas: {
    name: string;
    risk: "low" | "medium" | "high";
    description: string;
  }[];
  recommendations: string[];
}

const mockResult: ScanResult = {
  overallRisk: "medium",
  score: 72,
  areas: [
    {
      name: "Cavity Risk Zones",
      risk: "medium",
      description: "AI detected potential cavity-risk areas in back molars. Consider extra brushing attention.",
    },
    {
      name: "Gum Health",
      risk: "low",
      description: "Gum line appears healthy with minimal inflammation indicators.",
    },
    {
      name: "Plaque & Stains",
      risk: "medium",
      description: "Moderate staining detected. Regular cleaning can help improve appearance.",
    },
    {
      name: "Alignment",
      risk: "low",
      description: "Teeth alignment appears within normal range.",
    },
  ],
  recommendations: [
    "Focus brushing on back molar areas for at least 30 seconds extra",
    "Consider using a whitening toothpaste to address staining",
    "Schedule a dental checkup within the next 3 months",
    "Continue your current flossing routine",
  ],
};

export default function AIScan() {
  const [uploadState, setUploadState] = useState<"idle" | "uploading" | "analyzing" | "complete">("idle");
  const [result, setResult] = useState<ScanResult | null>(null);

  const handleUpload = () => {
    setUploadState("uploading");
    setTimeout(() => {
      setUploadState("analyzing");
      setTimeout(() => {
        setResult(mockResult);
        setUploadState("complete");
      }, 2000);
    }, 1500);
  };

  const handleReset = () => {
    setUploadState("idle");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold mb-2">AI Teeth Scan</h1>
            <p className="text-muted-foreground">
              Upload a photo of your teeth for instant wellness insights.
            </p>
          </div>

          {/* Disclaimer */}
          <DisclaimerBanner className="mb-8" />

          {uploadState === "idle" && (
            /* Upload Area */
            <div className="bg-card rounded-2xl p-8 shadow-card border border-border/50 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                  <Camera className="w-10 h-10" />
                </div>

                <h2 className="text-xl font-semibold mb-2">Upload Your Photo</h2>
                <p className="text-muted-foreground mb-6">
                  Take a clear photo of your teeth with good lighting. Include both upper and lower teeth if possible.
                </p>

                <div className="border-2 border-dashed border-border rounded-xl p-8 mb-6 hover:border-primary/50 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Drag and drop your image here, or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Supports: JPG, PNG, HEIC (Max 10MB)
                  </p>
                </div>

                <div className="flex gap-4 justify-center">
                  <Button onClick={handleUpload} className="bg-gradient-primary shadow-glow">
                    <Camera className="mr-2 w-4 h-4" />
                    Take Photo
                  </Button>
                  <Button variant="outline" onClick={handleUpload}>
                    <Upload className="mr-2 w-4 h-4" />
                    Upload Image
                  </Button>
                </div>

                {/* Tips */}
                <div className="mt-8 text-left p-4 rounded-xl bg-muted/50">
                  <h3 className="font-medium mb-2">Tips for Best Results:</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Use natural or bright lighting</li>
                    <li>• Open mouth wide to show teeth clearly</li>
                    <li>• Include both front and side views if possible</li>
                    <li>• Ensure the image is in focus</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {(uploadState === "uploading" || uploadState === "analyzing") && (
            /* Loading State */
            <div className="bg-card rounded-2xl p-12 shadow-card border border-border/50 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-primary/10 text-primary flex items-center justify-center animate-pulse-glow">
                <RefreshCw className="w-10 h-10 animate-spin" />
              </div>
              <h2 className="text-xl font-semibold mb-2">
                {uploadState === "uploading" ? "Uploading Image..." : "Analyzing with AI..."}
              </h2>
              <p className="text-muted-foreground">
                {uploadState === "uploading"
                  ? "Please wait while we upload your image"
                  : "Our AI is examining your teeth for wellness insights"}
              </p>
              <div className="mt-6 h-2 bg-muted rounded-full overflow-hidden max-w-xs mx-auto">
                <div className="h-full bg-gradient-primary rounded-full animate-shimmer" style={{ width: "60%" }} />
              </div>
            </div>
          )}

          {uploadState === "complete" && result && (
            /* Results */
            <div className="space-y-6">
              {/* Overall Score */}
              <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="text-center">
                    <ScoreRing score={result.score} size="xl" riskLevel={result.overallRisk} />
                    <RiskBadge level={result.overallRisk} className="mt-4" />
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-2xl font-bold mb-2">Wellness Assessment Complete</h2>
                    <p className="text-muted-foreground mb-4">
                      Based on AI analysis of your uploaded photo. This is for wellness guidance only.
                    </p>
                    <Button variant="outline" onClick={handleReset}>
                      <RefreshCw className="mr-2 w-4 h-4" />
                      Scan Again
                    </Button>
                  </div>
                </div>
              </div>

              {/* Area Breakdown */}
              <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
                <h3 className="text-lg font-semibold mb-4">Area Analysis</h3>
                <div className="space-y-4">
                  {result.areas.map((area) => (
                    <div
                      key={area.name}
                      className="flex items-start gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{area.name}</h4>
                          <RiskBadge level={area.risk} size="sm" />
                        </div>
                        <p className="text-sm text-muted-foreground">{area.description}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
                <h3 className="text-lg font-semibold mb-4">Recommended Actions</h3>
                <ul className="space-y-3">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 text-sm font-medium">
                        {index + 1}
                      </div>
                      <span className="text-muted-foreground">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Disclaimer */}
              <div className="flex items-start gap-3 p-4 rounded-xl bg-warning/10 text-warning border border-warning/20">
                <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-sm">
                  <strong>Reminder:</strong> This AI assessment is for wellness guidance only and does not constitute 
                  a medical diagnosis. If you have concerns about your dental health, please consult a qualified 
                  dental professional.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
