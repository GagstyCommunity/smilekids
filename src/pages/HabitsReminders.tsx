import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { DisclaimerBanner } from "@/components/ui/disclaimer-banner";
import {
  Bell,
  Sun,
  Moon,
  Droplets,
  Coffee,
  Cookie,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Calendar,
} from "lucide-react";
import { useState } from "react";

const todayHabits = [
  { id: 1, name: "Morning Brush", time: "7:00 AM", completed: true, icon: Sun },
  { id: 2, name: "Evening Brush", time: "9:00 PM", completed: false, icon: Moon },
  { id: 3, name: "Floss", time: "9:05 PM", completed: false, icon: Droplets },
  { id: 4, name: "Tongue Cleaning", time: "7:05 AM", completed: true, icon: CheckCircle2 },
];

const weeklyStats = [
  { day: "Mon", completed: 4, total: 4 },
  { day: "Tue", completed: 4, total: 4 },
  { day: "Wed", completed: 3, total: 4 },
  { day: "Thu", completed: 4, total: 4 },
  { day: "Fri", completed: 2, total: 4 },
  { day: "Sat", completed: 4, total: 4 },
  { day: "Sun", completed: 2, total: 4 },
];

const reminders = [
  { id: 1, name: "Morning Brush", time: "7:00 AM", enabled: true, icon: Sun },
  { id: 2, name: "Evening Brush", time: "9:00 PM", enabled: true, icon: Moon },
  { id: 3, name: "Sugar Cooldown", time: "After meals", enabled: true, icon: Cookie },
  { id: 4, name: "Water After Acidic Food", time: "Smart alert", enabled: false, icon: Coffee },
  { id: 5, name: "Floss Reminder", time: "9:05 PM", enabled: true, icon: Droplets },
];

export default function HabitsReminders() {
  const [reminderStates, setReminderStates] = useState(
    reminders.reduce((acc, r) => ({ ...acc, [r.id]: r.enabled }), {} as Record<number, boolean>)
  );
  const [cooldownActive, setCooldownActive] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(0);

  const startCooldown = () => {
    setCooldownActive(true);
    setCooldownTime(30);
    const interval = setInterval(() => {
      setCooldownTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCooldownActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const weeklyCompletion = Math.round(
    (weeklyStats.reduce((acc, d) => acc + d.completed, 0) /
      weeklyStats.reduce((acc, d) => acc + d.total, 0)) *
      100
  );

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />

      <main className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold mb-2 flex items-center gap-3">
            <Bell className="w-8 h-8 text-primary" />
            Habits & Reminders
          </h1>
          <p className="text-muted-foreground">
            Build consistent oral care habits with smart reminders
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Habits */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Today's Habits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {todayHabits.map((habit) => (
                    <div
                      key={habit.id}
                      className={`flex items-center gap-4 p-4 rounded-xl border ${
                        habit.completed
                          ? "bg-success/5 border-success/20"
                          : "bg-muted/30 border-border/50"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          habit.completed ? "bg-success/10" : "bg-muted"
                        }`}
                      >
                        <habit.icon
                          className={`w-5 h-5 ${
                            habit.completed ? "text-success" : "text-muted-foreground"
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{habit.name}</div>
                        <div className="text-sm text-muted-foreground">{habit.time}</div>
                      </div>
                      {habit.completed ? (
                        <CheckCircle2 className="w-6 h-6 text-success" />
                      ) : (
                        <Button size="sm" variant="outline">
                          Mark Done
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Today's Progress</span>
                    <span className="text-primary font-bold">
                      {todayHabits.filter((h) => h.completed).length}/{todayHabits.length}
                    </span>
                  </div>
                  <Progress
                    value={(todayHabits.filter((h) => h.completed).length / todayHabits.length) * 100}
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Sugar Cooldown Timer */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-warning" />
                  Sugar Cooldown Timer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  After eating sugary or acidic foods, wait before brushing to protect your enamel.
                </p>

                {cooldownActive ? (
                  <div className="text-center p-6 rounded-xl bg-warning/10 border border-warning/20">
                    <div className="text-5xl font-bold text-warning mb-2">
                      {Math.floor(cooldownTime / 60)}:{String(cooldownTime % 60).padStart(2, "0")}
                    </div>
                    <p className="text-warning">Wait before brushing...</p>
                    <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Droplets className="w-4 h-4" />
                      Rinse with water to neutralize acids
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button onClick={startCooldown} className="flex-1 bg-gradient-primary">
                      <Cookie className="mr-2 w-4 h-4" />
                      Just Had Sugar
                    </Button>
                    <Button onClick={startCooldown} variant="outline" className="flex-1">
                      <Coffee className="mr-2 w-4 h-4" />
                      Just Had Coffee
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Weekly Report */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-success" />
                  Weekly Habit Report
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2 mb-6">
                  {weeklyStats.map((day) => (
                    <div key={day.day} className="text-center">
                      <div className="text-xs text-muted-foreground mb-2">{day.day}</div>
                      <div
                        className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center text-sm font-medium ${
                          day.completed === day.total
                            ? "bg-success/10 text-success"
                            : day.completed >= day.total / 2
                            ? "bg-warning/10 text-warning"
                            : "bg-destructive/10 text-destructive"
                        }`}
                      >
                        {day.completed}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-muted/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Weekly Completion</div>
                      <div className="text-sm text-muted-foreground">
                        {weeklyStats.reduce((acc, d) => acc + d.completed, 0)} of{" "}
                        {weeklyStats.reduce((acc, d) => acc + d.total, 0)} habits completed
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-primary">{weeklyCompletion}%</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Reminder Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-primary" />
                  Reminder Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reminders.map((reminder) => (
                    <div
                      key={reminder.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
                    >
                      <div className="flex items-center gap-3">
                        <reminder.icon className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <div className="text-sm font-medium">{reminder.name}</div>
                          <div className="text-xs text-muted-foreground">{reminder.time}</div>
                        </div>
                      </div>
                      <Switch
                        checked={reminderStates[reminder.id]}
                        onCheckedChange={(checked) =>
                          setReminderStates((prev) => ({ ...prev, [reminder.id]: checked }))
                        }
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Missed Habit Alerts */}
            <Card className="border-warning/30 bg-warning/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-warning">
                  <AlertCircle className="w-5 h-5" />
                  Missed Habits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  You missed flossing 3 times this week.
                </p>
                <div className="text-sm">
                  <span className="font-medium">Tip:</span> Try setting an earlier reminder or pairing
                  flossing with another habit.
                </div>
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card>
              <CardHeader>
                <CardTitle>💡 Habit Tips</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-3">
                <p>• Brush for 2 minutes, twice daily</p>
                <p>• Wait 30 mins after acidic foods</p>
                <p>• Floss once daily before bed</p>
                <p>• Drink water after snacks</p>
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
