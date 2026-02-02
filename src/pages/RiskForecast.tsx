import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScoreRing } from "@/components/ui/score-ring";
import { RiskBadge } from "@/components/ui/risk-badge";
import { DisclaimerBanner } from "@/components/ui/disclaimer-banner";
import {
  TrendingUp,
  TrendingDown,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Target,
  Sparkles,
  Clock,
  ChevronRight,
} from "lucide-react";

const timelineData = [
  { month: "Today", score: 76, risk: "medium" as const },
  { month: "30 Days", score: 72, risk: "medium" as const, projected: true },
  { month: "60 Days", score: 68, risk: "high" as const, projected: true },
  { month: "90 Days", score: 62, risk: "high" as const, projected: true },
];

const improvedTimelineData = [
  { month: "Today", score: 76, risk: "medium" as const },
  { month: "30 Days", score: 82, risk: "low" as const, projected: true },
  { month: "60 Days", score: 87, risk: "low" as const, projected: true },
  { month: "90 Days", score: 92, risk: "low" as const, projected: true },
];

const riskFactors = [
  { name: "Brushing Consistency", current: 70, impact: "high", improving: false },
  { name: "Sugar Intake", current: 55, impact: "high", improving: true },
  { name: "Flossing Habit", current: 30, impact: "medium", improving: false },
  { name: "Hydration", current: 80, impact: "low", improving: true },
];

const recommendations = [
  {
    title: "Add evening flossing",
    impact: "+8 points in 30 days",
    effort: "Easy",
    icon: "🦷",
  },
  {
    title: "Reduce sugary snacks",
    impact: "+12 points in 30 days",
    effort: "Medium",
    icon: "🍬",
  },
  {
    title: "Morning brush before breakfast",
    impact: "+5 points in 30 days",
    effort: "Easy",
    icon: "🌅",
  },
  {
    title: "Use fluoride mouthwash",
    impact: "+6 points in 30 days",
    effort: "Easy",
    icon: "💧",
  },
];

export default function RiskForecast() {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />

      <main className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold mb-2 flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-primary" />
            AI Risk Forecast
          </h1>
          <p className="text-muted-foreground">
            See how your habits today affect your oral health tomorrow
          </p>
        </div>

        {/* Current Score */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <ScoreRing score={76} size="xl" riskLevel="medium" />
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold mb-2">Current Oral Health Score</h2>
                <p className="text-muted-foreground mb-4">
                  Based on your habits, scans, and daily tracking
                </p>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <RiskBadge level="medium" size="md" />
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    Last updated: Today
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* If Habits Stay Same */}
          <Card className="border-destructive/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <TrendingDown className="w-5 h-5" />
                If Habits Stay the Same
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-6">
                {timelineData.map((point, index) => (
                  <div key={point.month} className="flex items-center">
                    <div className="text-center">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold mb-2 ${
                          point.projected
                            ? "border-2 border-dashed border-destructive/50 text-destructive"
                            : "bg-warning/10 text-warning"
                        }`}
                      >
                        {point.score}
                      </div>
                      <div className="text-xs text-muted-foreground">{point.month}</div>
                      {point.projected && (
                        <RiskBadge level={point.risk} size="sm" className="mt-1" />
                      )}
                    </div>
                    {index < timelineData.length - 1 && (
                      <ArrowRight className="w-4 h-4 text-destructive/50 mx-2" />
                    )}
                  </div>
                ))}
              </div>
              <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-destructive">Risk Increasing</div>
                    <p className="text-sm text-muted-foreground">
                      Without changes, your cavity risk may increase to HIGH within 60 days.
                      Consider improving your flossing and reducing sugar intake.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* If Habits Improve */}
          <Card className="border-success/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-success">
                <TrendingUp className="w-5 h-5" />
                If Habits Improve
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-6">
                {improvedTimelineData.map((point, index) => (
                  <div key={point.month} className="flex items-center">
                    <div className="text-center">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold mb-2 ${
                          point.projected
                            ? "border-2 border-dashed border-success/50 text-success"
                            : "bg-warning/10 text-warning"
                        }`}
                      >
                        {point.score}
                      </div>
                      <div className="text-xs text-muted-foreground">{point.month}</div>
                      {point.projected && (
                        <RiskBadge level={point.risk} size="sm" className="mt-1" />
                      )}
                    </div>
                    {index < improvedTimelineData.length - 1 && (
                      <ArrowRight className="w-4 h-4 text-success/50 mx-2" />
                    )}
                  </div>
                ))}
              </div>
              <div className="p-4 rounded-xl bg-success/10 border border-success/20">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-success">Great Potential!</div>
                    <p className="text-sm text-muted-foreground">
                      With improved habits, you could reach a LOW risk score within 30 days
                      and an excellent score of 92 in 90 days.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Risk Factors */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Your Risk Factors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {riskFactors.map((factor) => (
                    <div key={factor.name} className="p-4 rounded-xl bg-muted/30">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{factor.name}</span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              factor.impact === "high"
                                ? "bg-destructive/10 text-destructive"
                                : factor.impact === "medium"
                                ? "bg-warning/10 text-warning"
                                : "bg-info/10 text-info"
                            }`}
                          >
                            {factor.impact} impact
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold">{factor.current}%</span>
                          {factor.improving ? (
                            <TrendingUp className="w-4 h-4 text-success" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-destructive" />
                          )}
                        </div>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all ${
                            factor.current >= 70
                              ? "bg-success"
                              : factor.current >= 50
                              ? "bg-warning"
                              : "bg-destructive"
                          }`}
                          style={{ width: `${factor.current}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Personalized Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-warning" />
                  AI Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  {recommendations.map((rec) => (
                    <div
                      key={rec.title}
                      className="p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">{rec.icon}</div>
                        <div className="flex-1">
                          <div className="font-medium mb-1">{rec.title}</div>
                          <div className="text-sm text-success mb-2">{rec.impact}</div>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                            {rec.effort}
                          </span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* 90-Day Goal */}
            <Card className="bg-gradient-primary text-primary-foreground">
              <CardContent className="pt-6 text-center">
                <Calendar className="w-10 h-10 mx-auto mb-3 opacity-80" />
                <h3 className="text-lg font-bold mb-2">90-Day Goal</h3>
                <div className="text-4xl font-bold mb-2">92</div>
                <p className="text-sm opacity-80">Target Score</p>
                <Button
                  variant="secondary"
                  size="sm"
                  className="mt-4 bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground"
                >
                  Set Custom Goal
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Key Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-success/10">
                  <CheckCircle2 className="w-5 h-5 text-success" />
                  <div className="text-sm">Sugar intake improving</div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-warning/10">
                  <AlertTriangle className="w-5 h-5 text-warning" />
                  <div className="text-sm">Flossing needs attention</div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-info/10">
                  <Sparkles className="w-5 h-5 text-info" />
                  <div className="text-sm">Morning routine is strong</div>
                </div>
              </CardContent>
            </Card>

            <DisclaimerBanner variant="warning" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
