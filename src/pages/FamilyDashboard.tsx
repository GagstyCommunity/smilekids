import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScoreRing } from "@/components/ui/score-ring";
import { RiskBadge } from "@/components/ui/risk-badge";
import { DisclaimerBanner } from "@/components/ui/disclaimer-banner";
import {
  Users,
  Plus,
  Bell,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Cookie,
  Droplets,
  ChevronRight,
  Crown,
  Flame,
  Star,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const familyMembers = [
  {
    id: 1,
    name: "Emma",
    role: "Daughter",
    age: 7,
    avatar: "👧",
    score: 88,
    lastScore: 82,
    streak: 12,
    cavityRisk: "low" as const,
    sugarRisk: "medium" as const,
    todayHabits: { completed: 3, total: 4 },
    alerts: [],
  },
  {
    id: 2,
    name: "Jack",
    role: "Son",
    age: 5,
    avatar: "👦",
    score: 72,
    lastScore: 78,
    streak: 5,
    cavityRisk: "medium" as const,
    sugarRisk: "high" as const,
    todayHabits: { completed: 1, total: 4 },
    alerts: ["Missed evening brush", "High sugar intake"],
  },
  {
    id: 3,
    name: "Sarah",
    role: "Mom",
    avatar: "👩",
    score: 94,
    lastScore: 92,
    streak: 24,
    cavityRisk: "low" as const,
    sugarRisk: "low" as const,
    todayHabits: { completed: 4, total: 4 },
    alerts: [],
  },
  {
    id: 4,
    name: "Mike",
    role: "Dad",
    avatar: "👨",
    score: 81,
    lastScore: 85,
    streak: 8,
    cavityRisk: "low" as const,
    sugarRisk: "medium" as const,
    todayHabits: { completed: 2, total: 4 },
    alerts: ["Coffee stain risk"],
  },
];

const familyAlerts = [
  { member: "Jack", avatar: "👦", message: "Missed evening brush yesterday", severity: "warning" as const },
  { member: "Jack", avatar: "👦", message: "High sugar intake (3 snacks)", severity: "warning" as const },
  { member: "Mike", avatar: "👨", message: "Coffee stain risk increasing", severity: "info" as const },
];

const weeklyComparison = [
  { name: "Emma", avatar: "👧", brushing: 95, flossing: 70, sugar: 65 },
  { name: "Jack", avatar: "👦", brushing: 60, flossing: 30, sugar: 40 },
];

export default function FamilyDashboard() {
  const familyScore = Math.round(
    familyMembers.reduce((acc, m) => acc + m.score, 0) / familyMembers.length
  );

  const topPerformer = familyMembers.reduce((prev, curr) =>
    curr.streak > prev.streak ? curr : prev
  );

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />

      <main className="container py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-2 flex items-center gap-3">
              <Users className="w-8 h-8 text-primary" />
              Family Dashboard
            </h1>
            <p className="text-muted-foreground">
              Track and compare your family's oral health habits
            </p>
          </div>
          <Button className="bg-gradient-primary shadow-glow">
            <Plus className="mr-2 w-4 h-4" />
            Add Member
          </Button>
        </div>

        {/* Family Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-primary text-primary-foreground">
            <CardContent className="pt-6 text-center">
              <div className="text-4xl font-bold">{familyScore}</div>
              <div className="text-sm opacity-80">Family Score</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-4xl">👨‍👩‍👧‍👦</div>
              <div className="text-2xl font-bold">{familyMembers.length}</div>
              <div className="text-sm text-muted-foreground">Members</div>
            </CardContent>
          </Card>
          <Card className="bg-warning/10 border-warning/20">
            <CardContent className="pt-6 text-center">
              <div className="text-4xl font-bold text-warning">{familyAlerts.length}</div>
              <div className="text-sm text-muted-foreground">Active Alerts</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl mb-1">{topPerformer.avatar}</div>
              <div className="flex items-center justify-center gap-1">
                <Crown className="w-4 h-4 text-warning" />
                <span className="font-bold">{topPerformer.streak} days</span>
              </div>
              <div className="text-sm text-muted-foreground">Top Streak</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Family Members */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Family Members</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {familyMembers.map((member) => (
                    <div
                      key={member.id}
                      className="p-4 rounded-xl border border-border/50 bg-card hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start gap-4">
                        {/* Avatar & Info */}
                        <div className="text-center">
                          <div className="text-4xl mb-1">{member.avatar}</div>
                          <div className="font-semibold">{member.name}</div>
                          <div className="text-xs text-muted-foreground">{member.role}</div>
                        </div>

                        {/* Score */}
                        <div className="flex-shrink-0">
                          <ScoreRing score={member.score} size="md" />
                          <div className="flex items-center justify-center gap-1 mt-1 text-xs">
                            {member.score > member.lastScore ? (
                              <>
                                <TrendingUp className="w-3 h-3 text-success" />
                                <span className="text-success">+{member.score - member.lastScore}</span>
                              </>
                            ) : member.score < member.lastScore ? (
                              <>
                                <TrendingDown className="w-3 h-3 text-destructive" />
                                <span className="text-destructive">{member.score - member.lastScore}</span>
                              </>
                            ) : (
                              <span className="text-muted-foreground">No change</span>
                            )}
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="flex-1 grid grid-cols-2 gap-3">
                          <div className="p-2 rounded-lg bg-muted/30">
                            <div className="text-xs text-muted-foreground mb-1">Cavity Risk</div>
                            <RiskBadge level={member.cavityRisk} size="sm" />
                          </div>
                          <div className="p-2 rounded-lg bg-muted/30">
                            <div className="text-xs text-muted-foreground mb-1">Sugar Risk</div>
                            <RiskBadge level={member.sugarRisk} size="sm" />
                          </div>
                          <div className="p-2 rounded-lg bg-muted/30">
                            <div className="text-xs text-muted-foreground mb-1">Today</div>
                            <div className="flex items-center gap-2">
                              <Progress
                                value={(member.todayHabits.completed / member.todayHabits.total) * 100}
                                className="h-2 flex-1"
                              />
                              <span className="text-xs font-medium">
                                {member.todayHabits.completed}/{member.todayHabits.total}
                              </span>
                            </div>
                          </div>
                          <div className="p-2 rounded-lg bg-muted/30">
                            <div className="text-xs text-muted-foreground mb-1">Streak</div>
                            <div className="flex items-center gap-1">
                              <Flame className="w-4 h-4 text-warning" />
                              <span className="font-medium">{member.streak} days</span>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-2">
                          {member.alerts.length > 0 && (
                            <div className="flex items-center gap-1 text-warning text-xs">
                              <AlertTriangle className="w-4 h-4" />
                              {member.alerts.length}
                            </div>
                          )}
                          <Button size="sm" variant="ghost">
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Alerts */}
                      {member.alerts.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-border/50">
                          <div className="flex flex-wrap gap-2">
                            {member.alerts.map((alert, i) => (
                              <span
                                key={i}
                                className="text-xs px-2 py-1 rounded-full bg-warning/10 text-warning"
                              >
                                {alert}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Kids Comparison */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-warning" />
                  Kids Weekly Comparison
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {weeklyComparison.map((kid) => (
                    <div key={kid.name}>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xl">{kid.avatar}</span>
                        <span className="font-medium">{kid.name}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-muted-foreground">Brushing</span>
                            <span className="text-xs font-medium">{kid.brushing}%</span>
                          </div>
                          <Progress value={kid.brushing} className="h-2" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-muted-foreground">Flossing</span>
                            <span className="text-xs font-medium">{kid.flossing}%</span>
                          </div>
                          <Progress value={kid.flossing} className="h-2" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-muted-foreground">Low Sugar</span>
                            <span className="text-xs font-medium">{kid.sugar}%</span>
                          </div>
                          <Progress value={kid.sugar} className="h-2" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Family Alerts */}
            <Card className="border-warning/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-warning">
                  <Bell className="w-5 h-5" />
                  Family Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {familyAlerts.map((alert, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-3 p-3 rounded-lg ${
                        alert.severity === "warning" ? "bg-warning/10" : "bg-info/10"
                      }`}
                    >
                      <span className="text-xl">{alert.avatar}</span>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{alert.member}</div>
                        <div className="text-xs text-muted-foreground">{alert.message}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  <Bell className="mr-2 w-4 h-4" />
                  Manage Notifications
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Cookie className="mr-2 w-4 h-4 text-warning" />
                  Log Family Snack
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Droplets className="mr-2 w-4 h-4 text-info" />
                  Family Brush Check
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Star className="mr-2 w-4 h-4 text-warning" />
                  Award Stars
                </Button>
              </CardContent>
            </Card>

            {/* Today's Status */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {familyMembers.map((member) => (
                    <div key={member.id} className="flex items-center gap-3">
                      <span className="text-xl">{member.avatar}</span>
                      <span className="flex-1 text-sm">{member.name}</span>
                      {member.todayHabits.completed === member.todayHabits.total ? (
                        <CheckCircle2 className="w-5 h-5 text-success" />
                      ) : member.todayHabits.completed > 0 ? (
                        <div className="w-5 h-5 rounded-full border-2 border-warning flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-warning" />
                        </div>
                      ) : (
                        <XCircle className="w-5 h-5 text-destructive" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <DisclaimerBanner variant="info" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
