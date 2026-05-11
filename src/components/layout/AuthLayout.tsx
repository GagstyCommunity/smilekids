import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ShieldCheck, Sparkles, Heart } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

/**
 * Shared layout for /login and /signup so auth pages feel like part of the platform,
 * not isolated screens. Includes Header, Footer, trust signals, and wellness disclaimer.
 */
export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 bg-gradient-hero">
        <div className="container py-10 lg:py-16 grid lg:grid-cols-2 gap-10 items-center">
          {/* Left: trust panel (desktop only) */}
          <div className="hidden lg:block space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5" /> AI Oral Wellness Coach
            </div>
            <h2 className="text-4xl font-bold leading-tight">
              Build healthier habits for <span className="text-gradient">brighter smiles</span>.
            </h2>
            <p className="text-muted-foreground text-lg">
              Daily wellness guidance for kids, adults, pregnant women, and families — powered by AI insights, not medical claims.
            </p>
            <div className="grid grid-cols-1 gap-3 pt-2">
              {[
                { icon: ShieldCheck, label: "Wellness guidance only — not a medical diagnosis service." },
                { icon: Heart, label: "Family-friendly: add multiple child profiles in one tap." },
                { icon: Sparkles, label: "Streaks, badges & gentle reminders to keep you on track." },
              ].map((f, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-card/60 backdrop-blur border border-border/50">
                  <f.icon className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <p className="text-sm text-foreground/80">{f.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form card */}
          <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
            <div className="text-center lg:text-left mb-6">
              <h1 className="text-2xl lg:text-3xl font-bold">{title}</h1>
              {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
            </div>
            <div className="bg-card rounded-2xl p-6 lg:p-8 shadow-card border border-border/50">
              {children}
            </div>
            <p className="text-[11px] text-muted-foreground text-center mt-4 px-4">
              This platform provides wellness guidance only and is not a medical diagnosis service.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
