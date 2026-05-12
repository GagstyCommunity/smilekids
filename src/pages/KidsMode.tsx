import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScoreRing } from "@/components/ui/score-ring";
import { RiskBadge } from "@/components/ui/risk-badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import SEOHead from "@/components/SEOHead";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Star, Trophy, Cookie, Sparkles, Bell, Plus, ChevronRight, Check,
} from "lucide-react";

interface Child { id: string; name: string; age: number | null; avatar_url: string | null; }
interface KidState {
  streak: number;
  lastBrushDate: string | null; // YYYY-MM-DD
  brushedToday: { am: boolean; pm: boolean };
  reminders: { am: boolean; pm: boolean };
}

const todayKey = () => new Date().toISOString().slice(0, 10);
const STORAGE = "denta:kids:state:v1";

const loadState = (): Record<string, KidState> => {
  try { return JSON.parse(localStorage.getItem(STORAGE) || "{}"); } catch { return {}; }
};
const saveState = (s: Record<string, KidState>) => localStorage.setItem(STORAGE, JSON.stringify(s));

const ensureChildState = (existing: KidState | undefined): KidState => {
  const t = todayKey();
  if (!existing) {
    return { streak: 0, lastBrushDate: null, brushedToday: { am: false, pm: false }, reminders: { am: true, pm: true } };
  }
  if (existing.lastBrushDate !== t) {
    // reset today's checks if a new day rolled in
    return { ...existing, brushedToday: { am: false, pm: false } };
  }
  return existing;
};

const snackLog = [
  { name: "Apple Slices", sugarLevel: "Low", time: "10:30 AM", icon: "🍎" },
  { name: "Cheese Crackers", sugarLevel: "Medium", time: "2:00 PM", icon: "🧀" },
  { name: "Juice Box", sugarLevel: "High", time: "4:30 PM", icon: "🧃" },
];

const achievements = [
  { icon: "🏆", label: "7-Day Champion", min: 7 },
  { icon: "⭐", label: "Perfect Week", min: 7 },
  { icon: "🎯", label: "30-Day Streak", min: 30 },
  { icon: "🦷", label: "90-Day Hero", min: 90 },
];

const requestNotif = async () => {
  if (!("Notification" in window)) return false;
  if (Notification.permission === "granted") return true;
  const r = await Notification.requestPermission();
  return r === "granted";
};

export default function KidsMode() {
  const { user } = useAuth();
  const [children, setChildren] = useState<Child[]>([]);
  const [states, setStates] = useState<Record<string, KidState>>(() => loadState());

  // Load children from Supabase, fall back to demo
  useEffect(() => {
    (async () => {
      if (!user) {
        setChildren([
          { id: "demo-emma", name: "Emma", age: 7, avatar_url: null },
          { id: "demo-jack", name: "Jack", age: 5, avatar_url: null },
        ]);
        return;
      }
      const { data } = await supabase.from("child_profiles").select("id,name,age,avatar_url").eq("parent_id", user.id);
      setChildren((data as Child[]) || []);
    })();
  }, [user]);

  // Roll-over state at load
  useEffect(() => {
    setStates((prev) => {
      const next: Record<string, KidState> = { ...prev };
      children.forEach((c) => { next[c.id] = ensureChildState(prev[c.id]); });
      saveState(next);
      return next;
    });
  }, [children]);

  // Per-child reminder timers (browser notifications)
  useEffect(() => {
    const timers: number[] = [];
    children.forEach((c) => {
      const s = states[c.id];
      if (!s) return;
      const now = new Date();
      const schedule = (h: number, label: "am" | "pm") => {
        if (!s.reminders[label]) return;
        const t = new Date(); t.setHours(h, 0, 0, 0);
        if (t.getTime() <= now.getTime()) t.setDate(t.getDate() + 1);
        const ms = t.getTime() - now.getTime();
        const id = window.setTimeout(() => {
          if ("Notification" in window && Notification.permission === "granted") {
            new Notification(`Time to brush, ${c.name}! 🦷`, {
              body: label === "am" ? "Morning brushing time" : "Evening brushing time",
            });
          }
        }, ms);
        timers.push(id);
      };
      schedule(7, "am");
      schedule(20, "pm");
    });
    return () => timers.forEach(clearTimeout);
  }, [children, states]);

  const markBrushed = (childId: string, slot: "am" | "pm") => {
    setStates((prev) => {
      const cur = ensureChildState(prev[childId]);
      const brushedToday = { ...cur.brushedToday, [slot]: true };
      const completedBoth = brushedToday.am && brushedToday.pm;
      const t = todayKey();
      let streak = cur.streak;
      let lastBrushDate = cur.lastBrushDate;
      if (completedBoth && cur.lastBrushDate !== t) {
        const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
        const yKey = yesterday.toISOString().slice(0, 10);
        streak = cur.lastBrushDate === yKey ? cur.streak + 1 : 1;
        lastBrushDate = t;
        toast.success(`🎉 ${streak}-day streak! Great brushing.`);
      }
      const next = { ...prev, [childId]: { ...cur, brushedToday, streak, lastBrushDate } };
      saveState(next);
      return next;
    });
  };

  const toggleReminder = (childId: string, slot: "am" | "pm", value: boolean) => {
    if (value) requestNotif();
    setStates((prev) => {
      const cur = ensureChildState(prev[childId]);
      const next = { ...prev, [childId]: { ...cur, reminders: { ...cur.reminders, [slot]: value } } };
      saveState(next);
      return next;
    });
  };

  const familyStreak = useMemo(
    () => children.reduce((m, c) => Math.max(m, states[c.id]?.streak ?? 0), 0),
    [children, states]
  );

  return (
    <div className="min-h-screen bg-gradient-hero">
      <SEOHead
        title="Kids Mode — Brushing Reminders & Streaks | Denta.Health"
        description="Track each child's daily brushing with playful streaks, badges, and gentle AM/PM reminders. Built for families."
        canonical="https://denta.health/kids"
        keywords={["kids dental", "brushing reminder", "streak", "family oral health"]}
      />
      <Header />

      <main className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-2 flex items-center gap-3">
              <span className="text-3xl">👨‍👩‍👧‍👦</span> Kids Dashboard
            </h1>
            <p className="text-muted-foreground">Daily brushing, streaks, and reminders for every child.</p>
          </div>
          <Button asChild className="bg-gradient-primary shadow-glow">
            <Link to="/kids/profiles"><Plus className="mr-2 w-4 h-4" /> Add Child</Link>
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {children.map((child) => {
              const s = ensureChildState(states[child.id]);
              const score = Math.min(100, 50 + s.streak * 5);
              const cavityRisk: "low" | "medium" | "high" = s.streak >= 7 ? "low" : s.streak >= 3 ? "medium" : "high";
              const both = s.brushedToday.am && s.brushedToday.pm;
              return (
                <div key={child.id} className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="text-center">
                      <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-4xl mb-2">
                        {child.avatar_url ? <img src={child.avatar_url} alt={child.name} className="w-full h-full rounded-2xl object-cover" /> : "🧒"}
                      </div>
                      <h3 className="font-semibold">{child.name}</h3>
                      {child.age != null && <p className="text-sm text-muted-foreground">Age {child.age}</p>}
                    </div>

                    <div className="flex-shrink-0"><ScoreRing score={score} size="lg" riskLevel={cavityRisk} /></div>

                    <div className="flex-1 space-y-4 w-full">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 rounded-xl bg-muted/50">
                          <div className="text-sm text-muted-foreground mb-1">Cavity Risk</div>
                          <RiskBadge level={cavityRisk} size="sm" />
                        </div>
                        <div className="p-3 rounded-xl bg-muted/50">
                          <div className="text-sm text-muted-foreground mb-1">Streak</div>
                          <div className="flex items-center gap-1.5 font-semibold"><Star className="w-4 h-4 text-warning fill-warning" /> {s.streak} days</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <Button
                          variant={s.brushedToday.am ? "default" : "outline"}
                          onClick={() => markBrushed(child.id, "am")}
                          disabled={s.brushedToday.am}
                          className={s.brushedToday.am ? "bg-success hover:bg-success/90 text-success-foreground" : ""}
                        >
                          {s.brushedToday.am ? <Check className="mr-2 w-4 h-4" /> : <Bell className="mr-2 w-4 h-4" />}
                          Morning brush
                        </Button>
                        <Button
                          variant={s.brushedToday.pm ? "default" : "outline"}
                          onClick={() => markBrushed(child.id, "pm")}
                          disabled={s.brushedToday.pm}
                          className={s.brushedToday.pm ? "bg-success hover:bg-success/90 text-success-foreground" : ""}
                        >
                          {s.brushedToday.pm ? <Check className="mr-2 w-4 h-4" /> : <Bell className="mr-2 w-4 h-4" />}
                          Evening brush
                        </Button>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">AM reminder (7:00)</span>
                          <Switch checked={s.reminders.am} onCheckedChange={(v) => toggleReminder(child.id, "am", v)} />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">PM reminder (20:00)</span>
                          <Switch checked={s.reminders.pm} onCheckedChange={(v) => toggleReminder(child.id, "pm", v)} />
                        </div>
                      </div>

                      {both && <p className="text-xs text-success">✓ Both brushings logged today — streak counted!</p>}
                    </div>
                  </div>
                </div>
              );
            })}

            {children.length === 0 && (
              <div className="bg-card rounded-2xl p-12 text-center border border-dashed">
                <p className="text-muted-foreground mb-4">No children yet. Add your first profile to start tracking.</p>
                <Button asChild className="bg-gradient-primary"><Link to="/kids/profiles">Add Child Profile</Link></Button>
              </div>
            )}

            {/* Snack log (illustrative) */}
            <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2"><Cookie className="w-5 h-5 text-warning" /> Today's Snack Log</h3>
                <Button asChild variant="ghost" size="sm"><a href="/advisor">Log Snack <Plus className="ml-1 w-4 h-4" /></a></Button>
              </div>
              <div className="space-y-3">
                {snackLog.map((s, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-muted/30">
                    <div className="w-10 h-10 rounded-lg bg-card flex items-center justify-center text-xl">{s.icon}</div>
                    <div className="flex-1">
                      <div className="font-medium">{s.name}</div>
                      <div className="text-sm text-muted-foreground">{s.time}</div>
                    </div>
                    <span className={`text-sm font-medium px-2 py-0.5 rounded-full ${
                      s.sugarLevel === "Low" ? "bg-success/10 text-success" :
                      s.sugarLevel === "Medium" ? "bg-warning/10 text-warning" : "bg-destructive/10 text-destructive"
                    }`}>{s.sugarLevel} Sugar</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-primary rounded-2xl p-6 text-primary-foreground">
              <div className="flex items-center gap-3 mb-4"><Sparkles className="w-6 h-6" /><h3 className="font-semibold">Fun Tip of the Day</h3></div>
              <p className="text-sm opacity-90">🦷 Brushing for 2 minutes is like giving your teeth a mini spa day! Try a fun song to time it.</p>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
              <div className="flex items-center gap-2 mb-4"><Trophy className="w-5 h-5 text-warning" /><h3 className="font-semibold">Family Achievements</h3></div>
              <p className="text-xs text-muted-foreground mb-3">Best streak in the family: <strong>{familyStreak}</strong> days</p>
              <div className="grid grid-cols-2 gap-3">
                {achievements.map((a) => {
                  const unlocked = familyStreak >= a.min;
                  return (
                    <div key={a.label} className={`p-3 rounded-xl text-center ${unlocked ? "bg-warning/10" : "bg-muted/50 opacity-50"}`}>
                      <div className="text-2xl mb-1">{a.icon}</div>
                      <div className="text-xs font-medium">{a.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
              <div className="flex items-center gap-2 mb-2"><Bell className="w-5 h-5 text-primary" /><h3 className="font-semibold">How reminders work</h3></div>
              <p className="text-sm text-muted-foreground">When the page is open, Denta sends gentle browser notifications at 7:00 AM and 8:00 PM for each child with reminders enabled. Tap "Allow" when prompted.</p>
              <Button variant="outline" size="sm" className="mt-3 w-full" onClick={requestNotif}>Enable browser notifications</Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
