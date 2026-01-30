import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScoreRing } from "@/components/ui/score-ring";
import { RiskBadge } from "@/components/ui/risk-badge";
import { Button } from "@/components/ui/button";
import {
  Baby,
  Star,
  Trophy,
  Cookie,
  Sparkles,
  Bell,
  Plus,
  ChevronRight,
} from "lucide-react";

const children = [
  {
    name: "Emma",
    age: 7,
    avatar: "🧒",
    score: 88,
    streak: 5,
    cavityRisk: "low" as const,
    brushedToday: true,
    snackRisk: "medium" as const,
  },
  {
    name: "Jack",
    age: 5,
    avatar: "👦",
    score: 72,
    streak: 3,
    cavityRisk: "medium" as const,
    brushedToday: false,
    snackRisk: "high" as const,
  },
];

const snackLog = [
  { name: "Apple Slices", sugarLevel: "Low", time: "10:30 AM", icon: "🍎" },
  { name: "Cheese Crackers", sugarLevel: "Medium", time: "2:00 PM", icon: "🧀" },
  { name: "Juice Box", sugarLevel: "High", time: "4:30 PM", icon: "🧃" },
];

const achievements = [
  { icon: "🏆", label: "7-Day Champion", unlocked: true },
  { icon: "⭐", label: "Perfect Week", unlocked: true },
  { icon: "🎯", label: "Sugar Saver", unlocked: false },
  { icon: "🦷", label: "Floss Boss", unlocked: false },
];

export default function KidsMode() {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />

      <main className="container py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-2 flex items-center gap-3">
              <span className="text-3xl">👨‍👩‍👧‍👦</span> Kids Dashboard
            </h1>
            <p className="text-muted-foreground">Track your children's dental health and habits</p>
          </div>
          <Button className="bg-gradient-primary shadow-glow">
            <Plus className="mr-2 w-4 h-4" />
            Add Child
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Children Cards */}
          <div className="lg:col-span-2 space-y-6">
            {children.map((child) => (
              <div
                key={child.name}
                className="bg-card rounded-2xl p-6 shadow-card border border-border/50"
              >
                <div className="flex items-start gap-6">
                  {/* Avatar & Basic Info */}
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-4xl mb-2">
                      {child.avatar}
                    </div>
                    <h3 className="font-semibold">{child.name}</h3>
                    <p className="text-sm text-muted-foreground">Age {child.age}</p>
                  </div>

                  {/* Score */}
                  <div className="flex-shrink-0">
                    <ScoreRing score={child.score} size="lg" riskLevel={child.cavityRisk} />
                  </div>

                  {/* Stats */}
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 rounded-xl bg-muted/50">
                        <div className="text-sm text-muted-foreground mb-1">Cavity Risk</div>
                        <RiskBadge level={child.cavityRisk} size="sm" />
                      </div>
                      <div className="p-3 rounded-xl bg-muted/50">
                        <div className="text-sm text-muted-foreground mb-1">Snack Risk</div>
                        <RiskBadge level={child.snackRisk} size="sm" />
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-warning fill-warning" />
                        <span className="font-medium">{child.streak} day streak</span>
                      </div>
                      <div className={`flex items-center gap-2 ${child.brushedToday ? "text-success" : "text-warning"}`}>
                        {child.brushedToday ? "✓ Brushed today" : "⏰ Not brushed yet"}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Bell className="mr-1 w-4 h-4" />
                        Send Reminder
                      </Button>
                      <Button size="sm" variant="ghost">
                        View Details
                        <ChevronRight className="ml-1 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Today's Snack Log */}
            <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Cookie className="w-5 h-5 text-warning" />
                  Today's Snack Log
                </h3>
                <Button variant="ghost" size="sm">
                  Log Snack <Plus className="ml-1 w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-3">
                {snackLog.map((snack, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-3 rounded-xl bg-muted/30"
                  >
                    <div className="w-10 h-10 rounded-lg bg-card flex items-center justify-center text-xl">
                      {snack.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{snack.name}</div>
                      <div className="text-sm text-muted-foreground">{snack.time}</div>
                    </div>
                    <span
                      className={`text-sm font-medium px-2 py-0.5 rounded-full ${
                        snack.sugarLevel === "Low"
                          ? "bg-success/10 text-success"
                          : snack.sugarLevel === "Medium"
                          ? "bg-warning/10 text-warning"
                          : "bg-destructive/10 text-destructive"
                      }`}
                    >
                      {snack.sugarLevel} Sugar
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Fun Tips Card */}
            <div className="bg-gradient-primary rounded-2xl p-6 text-primary-foreground">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-6 h-6" />
                <h3 className="font-semibold">Fun Tip of the Day</h3>
              </div>
              <p className="text-sm opacity-90 mb-4">
                🦷 Did you know? Brushing for 2 minutes is like giving your teeth a mini spa day! 
                Try a fun song to time it.
              </p>
              <Button variant="secondary" size="sm" className="w-full bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground">
                More Tips
              </Button>
            </div>

            {/* Achievements */}
            <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="w-5 h-5 text-warning" />
                <h3 className="font-semibold">Family Achievements</h3>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.label}
                    className={`p-3 rounded-xl text-center ${
                      achievement.unlocked ? "bg-warning/10" : "bg-muted/50 opacity-50"
                    }`}
                  >
                    <div className="text-2xl mb-1">{achievement.icon}</div>
                    <div className="text-xs font-medium">{achievement.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reminder Settings */}
            <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
              <div className="flex items-center gap-2 mb-4">
                <Bell className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Brush Reminders</h3>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <span>Morning (7:00 AM)</span>
                  <div className="w-10 h-6 bg-primary rounded-full relative">
                    <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-primary-foreground rounded-full" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <span>Evening (8:00 PM)</span>
                  <div className="w-10 h-6 bg-primary rounded-full relative">
                    <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-primary-foreground rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
