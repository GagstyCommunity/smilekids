import { Link, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScoreRing } from "@/components/ui/score-ring";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SEOHead } from "@/components/SEOHead";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import {
  Camera,
  Apple,
  MessageCircle,
  Baby,
  Bell,
  ShieldCheck,
  CheckCircle2,
  Circle,
  ArrowRight,
  Sparkles,
  Flame,
  TrendingUp,
  BookOpen,
  Stethoscope,
  Trophy,
  Lock,
} from "lucide-react";

interface Step {
  id: string;
  title: string;
  description: string;
  icon: any;
  href: string;
  cta: string;
  done: boolean;
}

function readJSON<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}

type Mode = "kid" | "standard" | "senior";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const nav = useNavigate();
  const [displayName, setDisplayName] = useState<string>("");
  const [childCount, setChildCount] = useState<number>(0);
  const [scanDone, setScanDone] = useState(readJSON("dh.scanDone", false));
  const [foodDone, setFoodDone] = useState(readJSON("dh.foodDone", false));
  const [chatDone, setChatDone] = useState(readJSON("dh.chatDone", false));
  const [reminderDone, setReminderDone] = useState(readJSON("dh.reminderDone", false));
  const [streak, setStreak] = useState<number>(readJSON("dh.streak", 0));
  const [mode, setMode] = useState<Mode>(readJSON<Mode>("dh.mode", "standard"));

  useEffect(() => { localStorage.setItem("dh.mode", JSON.stringify(mode)); }, [mode]);

  useEffect(() => {
    if (!loading && !user) nav("/login");
  }, [loading, user, nav]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data: prof } = await supabase
        .from("profiles")
        .select("display_name")
        .eq("id", user.id)
        .maybeSingle();
      setDisplayName(prof?.display_name || user.email?.split("@")[0] || "");

      const { count } = await supabase
        .from("child_profiles")
        .select("id", { count: "exact", head: true })
        .eq("parent_id", user.id);
      setChildCount(count ?? 0);
    })();
  }, [user]);

  const steps: Step[] = useMemo(
    () => [
      {
        id: "scan",
        title: "Take your first AI Teeth Scan",
        description: "Snap a quick photo. Get a wellness score and highlighted zones in seconds.",
        icon: Camera,
        href: "/scan",
        cta: "Start scan",
        done: !!scanDone,
      },
      {
        id: "kids",
        title: childCount ? `Manage your ${childCount} kid${childCount > 1 ? "s" : ""}` : "Add your kids",
        description: "Create profiles for each child and track brushing streaks together.",
        icon: Baby,
        href: "/kids/profiles",
        cta: childCount ? "View kids" : "Add child",
        done: childCount > 0,
      },
      {
        id: "food",
        title: "Log your first food",
        description: "See sugar, acid, and erosion impact instantly with the Eating Advisor.",
        icon: Apple,
        href: "/advisor",
        cta: "Open advisor",
        done: !!foodDone,
      },
      {
        id: "reminder",
        title: "Turn on brushing reminders",
        description: "Build a daily ritual with gentle nudges and a streak tracker.",
        icon: Bell,
        href: "/habits",
        cta: "Set reminders",
        done: !!reminderDone,
      },
      {
        id: "chat",
        title: "Ask the AI Wellness Coach",
        description: "Get friendly, probability-based guidance. Always wellness, never diagnosis.",
        icon: MessageCircle,
        href: "/chat",
        cta: "Start chat",
        done: !!chatDone,
      },
    ],
    [scanDone, foodDone, chatDone, reminderDone, childCount],
  );

  const completed = steps.filter((s) => s.done).length;
  const total = steps.length;
  const isNew = completed === 0;
  const setupPct = Math.round((completed / total) * 100);

  // Wellness score only available after first scan
  const hasScore = scanDone;
  const score = hasScore ? 78 : 0; // TODO: replace with real last scan score

  if (loading || !user) return null;

  const firstName = displayName.split(" ")[0] || "there";

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Your Wellness Dashboard | Denta.Health"
        description="Personalized oral wellness dashboard with AI scans, habit tracking, kids profiles, and daily coaching. Wellness guidance, not medical diagnosis."
        keywords={["oral wellness dashboard", "dental habits", "AI teeth scan", "brushing streak", "kids dental"]}
      />
      <Header />

      <main className="container py-6 lg:py-10 max-w-6xl">
        {/* Greeting */}
        <div className="mb-6 lg:mb-8 flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">
              {isNew ? `Welcome, ${firstName} 👋` : `Hi ${firstName}, glad you're back`}
            </h1>
            <p className="text-muted-foreground mt-1">
              {isNew
                ? "Let's set up your oral wellness in under 3 minutes."
                : "Here's your wellness snapshot for today."}
            </p>
          </div>
          {streak > 0 && (
            <Badge variant="secondary" className="gap-1.5 px-3 py-1.5 text-sm">
              <Flame className="w-4 h-4 text-accent" /> {streak}-day streak
            </Badge>
          )}
        </div>

        {/* Wellness disclaimer chip */}
        <div className="mb-6 inline-flex items-center gap-2 text-xs text-muted-foreground bg-muted/40 border border-border/50 rounded-full px-3 py-1.5">
          <ShieldCheck className="w-3.5 h-3.5" />
          Wellness guidance only — not a medical diagnosis service.
        </div>

        {/* New user: hero onboarding ; Existing user: score */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            {isNew ? (
              <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-primary/10 via-card to-accent/10 p-6 lg:p-8 shadow-card">
                <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-primary/10 blur-3xl" />
                <div className="relative">
                  <Badge className="bg-primary text-primary-foreground mb-3">Get started</Badge>
                  <h2 className="text-xl lg:text-2xl font-semibold mb-2">
                    Your dashboard unlocks as you go
                  </h2>
                  <p className="text-muted-foreground mb-6 max-w-xl">
                    Complete a few quick steps to get your personalized Protection Score, AI insights,
                    and daily streak tracking. Most people finish in under 3 minutes.
                  </p>

                  {/* setup progress */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="font-medium">Setup progress</span>
                      <span className="text-muted-foreground">{completed} of {total}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-primary transition-all duration-500"
                        style={{ width: `${setupPct}%` }}
                      />
                    </div>
                  </div>

                  <Button asChild size="lg" className="bg-gradient-primary shadow-glow">
                    <Link to={steps.find((s) => !s.done)?.href ?? "/scan"}>
                      <Camera className="mr-2 w-4 h-4" />
                      {steps.find((s) => !s.done)?.cta ?? "Continue"}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="bg-card rounded-2xl p-6 lg:p-8 shadow-card border border-border/50">
                <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
                  <div>
                    <h2 className="text-lg font-semibold mb-1">Daily Protection Score</h2>
                    <p className="text-sm text-muted-foreground">From your latest scan and habits</p>
                  </div>
                  <Badge className="bg-success/15 text-success border border-success/30">
                    {score >= 70 ? "Healthy zone" : score >= 40 ? "Needs attention" : "Improve soon"}
                  </Badge>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <ScoreRing score={score} size="xl" label={score >= 70 ? "Good" : "Improving"} />
                  <div className="flex-1 w-full space-y-3">
                    <div className="rounded-xl bg-primary/5 border border-primary/10 p-4">
                      <div className="flex items-start gap-3">
                        <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-sm mb-1">Today's insight</p>
                          <p className="text-sm text-muted-foreground">
                            Try a 30-second tongue scrape after brushing — small habit, big freshness boost.
                          </p>
                        </div>
                      </div>
                    </div>
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/scan"><Camera className="mr-2 w-4 h-4" /> Run a new scan</Link>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right column: streak / quick stats */}
          <div className="space-y-4">
            <div className="bg-gradient-primary rounded-2xl p-6 text-primary-foreground shadow-glow">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
                  <Flame className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-3xl font-bold">{streak}</div>
                  <div className="text-sm opacity-80">day streak</div>
                </div>
              </div>
              <p className="text-sm opacity-90">
                {streak === 0
                  ? "Log your first habit today to start your streak."
                  : "Keep going — consistency beats intensity."}
              </p>
            </div>

            <div className="bg-card rounded-2xl p-5 border border-border/50 shadow-card">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm">Family</h3>
                <Baby className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="text-2xl font-bold mb-1">{childCount}</div>
              <p className="text-xs text-muted-foreground mb-3">
                {childCount === 0 ? "No kids added yet" : `${childCount} profile${childCount > 1 ? "s" : ""}`}
              </p>
              <Button asChild size="sm" variant="outline" className="w-full">
                <Link to="/kids/profiles"><Baby className="mr-2 w-3.5 h-3.5" /> Manage kids</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Step-by-step setup */}
        <section className="mb-10">
          <div className="flex items-end justify-between mb-4">
            <div>
              <h2 className="text-lg lg:text-xl font-semibold">Your wellness setup</h2>
              <p className="text-sm text-muted-foreground">
                {completed === total
                  ? "All set! Use the modules below anytime."
                  : `${total - completed} step${total - completed > 1 ? "s" : ""} left to unlock the full experience.`}
              </p>
            </div>
            <span className="text-sm text-muted-foreground">{setupPct}%</span>
          </div>

          <ol className="grid md:grid-cols-2 gap-3">
            {steps.map((s, i) => (
              <li key={s.id}>
                <Link
                  to={s.href}
                  className={`group block rounded-2xl border p-5 transition-all hover:-translate-y-0.5 hover:shadow-card-hover ${
                    s.done
                      ? "bg-success/5 border-success/30"
                      : "bg-card border-border/50 hover:border-primary/40"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                        s.done
                          ? "bg-success/15 text-success"
                          : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      }`}
                    >
                      <s.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-mono text-muted-foreground">
                          Step {i + 1}
                        </span>
                        {s.done ? (
                          <CheckCircle2 className="w-4 h-4 text-success" />
                        ) : (
                          <Circle className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                      <h3 className="font-semibold leading-tight">{s.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{s.description}</p>
                      <span className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-primary">
                        {s.cta} <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </section>

        {/* Modules */}
        <section className="mb-10">
          <h2 className="text-lg lg:text-xl font-semibold mb-4">Explore your modules</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Camera, title: "AI Teeth Scan", desc: "Wellness photo analysis", href: "/scan", color: "from-primary/15 to-primary/5" },
              { icon: Apple, title: "Eating Advisor", desc: "Sugar & acid impact", href: "/advisor", color: "from-accent/15 to-accent/5" },
              { icon: MessageCircle, title: "AI Coach", desc: "Friendly Safe-Mode chat", href: "/chat", color: "from-info/15 to-info/5" },
              { icon: TrendingUp, title: "Risk Forecast", desc: "30 / 60 / 90-day outlook", href: "/forecast", color: "from-secondary/30 to-secondary/10" },
              { icon: Baby, title: "Kids Mode", desc: "Streaks & badges", href: "/kids", color: "from-primary/15 to-accent/10" },
              { icon: Trophy, title: "Progress", desc: "Achievements", href: "/progress", color: "from-accent/15 to-primary/10" },
              { icon: BookOpen, title: "Learning", desc: "Guides & lessons", href: "/learning", color: "from-secondary/20 to-primary/10" },
              { icon: Stethoscope, title: "Find a Dentist", desc: "Verified pros nearby", href: "/community", color: "from-info/15 to-primary/10" },
            ].map((m) => (
              <Link
                key={m.title}
                to={m.href}
                className={`group rounded-2xl p-5 border border-border/50 bg-gradient-to-br ${m.color} hover:shadow-card-hover hover:-translate-y-0.5 transition-all`}
              >
                <div className="w-10 h-10 rounded-xl bg-card flex items-center justify-center mb-3 shadow-sm">
                  <m.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold">{m.title}</h3>
                <p className="text-sm text-muted-foreground mt-0.5">{m.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Pro upsell */}
        {!isNew && (
          <section className="rounded-2xl border border-border/50 bg-gradient-to-r from-primary/10 to-accent/10 p-6 lg:p-8 flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Unlock Denta.Health Pro</h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  Unlimited scans, kids dashboard, family insights, and priority AI coaching.
                </p>
              </div>
            </div>
            <Button asChild className="bg-gradient-primary shadow-glow">
              <Link to="/pricing">See plans <ArrowRight className="ml-1 w-4 h-4" /></Link>
            </Button>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
