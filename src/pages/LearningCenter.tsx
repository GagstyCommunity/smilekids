import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Baby, User, HeartPulse, BookOpen } from "lucide-react";

const audienceMeta = {
  kids: { icon: Baby, label: "Kids", color: "bg-pink-500/10 text-pink-600" },
  adults: { icon: User, label: "Adults", color: "bg-blue-500/10 text-blue-600" },
  pregnant: { icon: HeartPulse, label: "Pregnant", color: "bg-purple-500/10 text-purple-600" },
  general: { icon: BookOpen, label: "General", color: "bg-emerald-500/10 text-emerald-600" },
} as const;

export default function LearningCenter() {
  const [filter, setFilter] = useState<keyof typeof audienceMeta | "all">("all");
  const [modules, setModules] = useState<any[]>([]);

  useEffect(() => {
    supabase.from("learning_modules").select("*").eq("published", true).order("created_at", { ascending: false })
      .then(({ data }) => setModules(data ?? []));
  }, []);

  const filtered = filter === "all" ? modules : modules.filter((m) => m.audience === filter);

  // Provide placeholder cards if DB is empty so the page is never blank
  const placeholders = [
    { id: "p1", title: "Brushing Basics for Kids", summary: "Make brushing fun with songs, timers, and rewards.", audience: "kids", level: "beginner", slug: "kids-brushing" },
    { id: "p2", title: "Pregnancy Gum Care", summary: "Why your gums need extra love during pregnancy.", audience: "pregnant", level: "beginner", slug: "pregnancy-gums" },
    { id: "p3", title: "Mastering Flossing as an Adult", summary: "Daily flossing technique that actually works.", audience: "adults", level: "intermediate", slug: "adult-flossing" },
    { id: "p4", title: "Sugar & Acid: The Hidden Danger", summary: "How everyday foods affect your enamel.", audience: "general", level: "beginner", slug: "sugar-acid" },
  ];
  const display = filtered.length ? filtered : (filter === "all" ? placeholders : placeholders.filter((p) => p.audience === filter));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Learning Center</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Bite-sized oral health education tailored for kids, adults and pregnant moms.
          </p>
        </header>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {(["all", "kids", "adults", "pregnant", "general"] as const).map((k) => (
            <button
              key={k}
              onClick={() => setFilter(k)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                filter === k ? "bg-primary text-primary-foreground border-primary" : "bg-card hover:bg-muted border-border"
              }`}
            >
              {k === "all" ? "All audiences" : audienceMeta[k].label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {display.map((m) => {
            const meta = audienceMeta[m.audience as keyof typeof audienceMeta] ?? audienceMeta.general;
            const Icon = meta.icon;
            return (
              <Link
                key={m.id}
                to={`/learning/${m.slug}`}
                className="group bg-card rounded-2xl p-6 shadow-card border border-border/50 hover:border-primary/40 hover:shadow-glow transition-all"
              >
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4 ${meta.color}`}>
                  <Icon className="w-3.5 h-3.5" /> {meta.label}
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{m.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3">{m.summary}</p>
                <p className="text-xs text-muted-foreground mt-4 uppercase tracking-wide">{m.level}</p>
              </Link>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}
