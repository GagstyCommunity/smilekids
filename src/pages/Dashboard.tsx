import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScoreRing } from "@/components/ui/score-ring";
import { RiskBadge } from "@/components/ui/risk-badge";
import { Button } from "@/components/ui/button";
import {
  Scan,
  ShieldCheck,
  Baby,
  Apple,
  MessageCircle,
  Sparkles,
  TrendingUp,
  Calendar,
  Flame,
  ArrowRight,
  Camera,
  Plus,
} from "lucide-react";

const quickActions = [
  { icon: Camera, label: "Quick Scan", href: "/scan", color: "bg-primary" },
  { icon: Apple, label: "Log Food", href: "/advisor", color: "bg-accent" },
  { icon: MessageCircle, label: "Ask AI", href: "/chat", color: "bg-info" },
  { icon: Plus, label: "Add Habit", href: "#", color: "bg-secondary" },
];

const modules = [
  {
    icon: Scan,
    title: "AI Teeth Scan",
    description: "Get instant wellness insights",
    href: "/scan",
    lastUsed: "2 days ago",
  },
  {
    icon: Baby,
    title: "Kids Dashboard",
    description: "Track your child's dental health",
    href: "/kids",
    lastUsed: "1 day ago",
  },
  {
    icon: Apple,
    title: "Eating Advisor",
    description: "Analyze food impact",
    href: "/advisor",
    lastUsed: "Today",
  },
  {
    icon: MessageCircle,
    title: "AI Chat",
    description: "Get friendly guidance",
    href: "/chat",
    lastUsed: "Today",
  },
];

const todayHabits = [
  { label: "Morning Brush", completed: true, time: "7:30 AM" },
  { label: "Flossing", completed: true, time: "7:35 AM" },
  { label: "Mouthwash", completed: false, time: "" },
  { label: "Evening Brush", completed: false, time: "" },
];

const weeklyProgress = [85, 78, 92, 88, 75, 90, 82];

export default function Dashboard() {
  const currentScore = 82;
  const streak = 7;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold mb-2">Welcome back! 👋</h1>
          <p className="text-muted-foreground">Here's your oral health overview for today.</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-3 mb-8">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              to={action.href}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-card border border-border/50 hover:shadow-card-hover hover:-translate-y-0.5 transition-all group"
            >
              <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center text-primary-foreground group-hover:scale-110 transition-transform`}>
                <action.icon className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-center">{action.label}</span>
            </Link>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Score Card */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold mb-1">Daily Protection Score</h2>
                  <p className="text-sm text-muted-foreground">Based on your habits and behaviors</p>
                </div>
                <RiskBadge level={currentScore >= 70 ? "low" : currentScore >= 40 ? "medium" : "high"} />
              </div>

              <div className="flex flex-col md:flex-row items-center gap-8">
                <ScoreRing score={currentScore} size="xl" label="Good" />

                <div className="flex-1 space-y-4">
                  {[
                    { label: "Brushing Frequency", value: 95, icon: ShieldCheck },
                    { label: "Sugar Intake", value: 72, icon: Apple },
                    { label: "Hydration", value: 85, icon: TrendingUp },
                    { label: "Sleep Quality", value: 78, icon: Calendar },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-4">
                      <item.icon className="w-5 h-5 text-muted-foreground" />
                      <div className="flex-1">
                        <div className="flex justify-between text-sm mb-1">
                          <span>{item.label}</span>
                          <span className="font-medium">{item.value}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-primary rounded-full transition-all duration-500"
                            style={{ width: `${item.value}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Improvement Tips */}
              <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/10">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm mb-1">Today's Tip</p>
                    <p className="text-sm text-muted-foreground">
                      Try to reduce sugary snacks between meals. Your sugar intake is slightly high today.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Streak Card */}
            <div className="bg-gradient-primary rounded-2xl p-6 text-primary-foreground">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
                  <Flame className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-3xl font-bold">{streak}</div>
                  <div className="text-sm opacity-80">Day Streak</div>
                </div>
              </div>
              <p className="text-sm opacity-80">
                You've been consistent for a week! Keep it up for bonus rewards.
              </p>
            </div>

            {/* Today's Habits */}
            <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
              <h3 className="font-semibold mb-4">Today's Habits</h3>
              <div className="space-y-3">
                {todayHabits.map((habit) => (
                  <div
                    key={habit.label}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                      habit.completed ? "bg-success/10" : "bg-muted/50"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        habit.completed
                          ? "border-success bg-success text-success-foreground"
                          : "border-muted-foreground"
                      }`}
                    >
                      {habit.completed && (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <span className={habit.completed ? "line-through text-muted-foreground" : ""}>
                        {habit.label}
                      </span>
                    </div>
                    {habit.time && (
                      <span className="text-xs text-muted-foreground">{habit.time}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Progress */}
            <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
              <h3 className="font-semibold mb-4">Weekly Progress</h3>
              <div className="flex items-end justify-between gap-2 h-20">
                {weeklyProgress.map((score, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full bg-gradient-primary rounded-t-sm transition-all"
                      style={{ height: `${score * 0.8}%` }}
                    />
                    <span className="text-xs text-muted-foreground">
                      {["S", "M", "T", "W", "T", "F", "S"][index]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Your Modules</h2>
            <Button variant="ghost" size="sm">
              View All <ArrowRight className="ml-1 w-4 h-4" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {modules.map((module) => (
              <Link
                key={module.title}
                to={module.href}
                className="group bg-card rounded-xl p-5 shadow-card border border-border/50 hover:shadow-card-hover hover:-translate-y-0.5 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <module.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs text-muted-foreground">{module.lastUsed}</span>
                </div>
                <h3 className="font-medium mb-1">{module.title}</h3>
                <p className="text-sm text-muted-foreground">{module.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
