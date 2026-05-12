import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FeatureCard } from "@/components/ui/feature-card";
import { ScoreRing } from "@/components/ui/score-ring";
import heroScan from "@/assets/hero-scan.jpg";
import familyBrushing from "@/assets/family-brushing.jpg";
import eatingAdvisorImg from "@/assets/eating-advisor.jpg";
import dentistConsult from "@/assets/dentist-consult.jpg";
import {
  Scan,
  ShieldCheck,
  Baby,
  Apple,
  MessageCircle,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Star,
  Users,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Scan,
    title: "AI Teeth Scan",
    description: "Upload a photo and get instant wellness insights on cavity risk, gum health, and more.",
    badge: "Core",
  },
  {
    icon: ShieldCheck,
    title: "Daily Protection Score",
    description: "Track your oral health habits and get a personalized score with improvement tips.",
  },
  {
    icon: Baby,
    title: "Kids Mode",
    description: "Fun, engaging dashboard for parents to track children's dental habits and cavity risk.",
  },
  {
    icon: Apple,
    title: "Eating Advisor",
    description: "Analyze foods for sugar and acid impact on your teeth with smart recommendations.",
  },
  {
    icon: MessageCircle,
    title: "AI Dentist Chat",
    description: "Get friendly guidance on dental concerns in safe, probability-based language.",
  },
  {
    icon: Sparkles,
    title: "Whitening Simulator",
    description: "Preview potential whitening results with AI-powered before/after visualization.",
    badge: "Pro",
  },
];

const stats = [
  { value: "50K+", label: "Active Users" },
  { value: "2M+", label: "Scans Completed" },
  { value: "4.9", label: "App Rating" },
  { value: "98%", label: "Satisfaction" },
];

const testimonials = [
  {
    name: "Sarah M.",
    role: "Parent of 2",
    content: "Denta.Health has made dental care fun for my kids. The daily score gamification actually works!",
    avatar: "SM",
  },
  {
    name: "Dr. James K.",
    role: "Dental Professional",
    content: "I recommend Denta.Health to patients for habit tracking. It's responsible and wellness-focused.",
    avatar: "JK",
  },
  {
    name: "Michael R.",
    role: "Coffee Enthusiast",
    content: "The eating advisor helped me understand how my coffee habit affects my teeth. Game changer!",
    avatar: "MR",
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="container relative py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className="space-y-8 stagger-children">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                AI-Powered Oral Wellness
              </div>

              <h1 className="text-display-lg font-bold text-foreground">
                Your Personal{" "}
                <span className="text-gradient">AI Oral Health</span>{" "}
                Coach
              </h1>

              <p className="text-xl text-muted-foreground max-w-lg">
                Build better dental habits with AI-powered insights, personalized tracking, 
                and friendly guidance. Wellness-focused, not medical diagnosis.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-gradient-primary shadow-glow hover:opacity-90 text-lg px-8" asChild>
                  <Link to="/signup">
                    Start Free <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8" asChild>
                  <Link to="/scan">Try AI Scan</Link>
                </Button>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-3">
                  {["S", "M", "J", "A"].map((letter, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-sm font-medium border-2 border-background"
                    >
                      {letter}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 text-warning">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">50,000+ happy users</p>
                </div>
              </div>
            </div>

            {/* Right: Hero photo + score overlay */}
            <div className="relative flex items-center justify-center">
              <div className="relative w-full max-w-md">
                <div className="rounded-3xl overflow-hidden shadow-elevated ring-1 ring-border/50">
                  <img
                    src={heroScan}
                    alt="Smiling user holding Denta.Health AI scan on phone"
                    width={1024}
                    height={1024}
                    className="w-full h-auto object-cover aspect-square"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 glass-strong rounded-2xl p-4 shadow-lg w-56 animate-fade-in">
                  <div className="flex items-center gap-3">
                    <ScoreRing score={85} size="sm" label="Great" />
                    <div>
                      <div className="text-xs text-muted-foreground">Protection Score</div>
                      <div className="text-sm font-semibold">Healthy zone</div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 glass rounded-xl px-4 py-2 shadow-lg animate-fade-in">
                  <div className="flex items-center gap-2 text-success">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="text-sm font-medium">Low Risk</span>
                  </div>
                </div>
                <div className="absolute top-1/2 -right-6 glass rounded-xl px-4 py-2 shadow-lg animate-fade-in">
                  <div className="flex items-center gap-2 text-primary">
                    <Zap className="w-5 h-5" />
                    <span className="text-sm font-medium">7 Day Streak</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border bg-card/50">
        <div className="container py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-gradient mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-display font-bold mb-4">
              Everything You Need for <span className="text-gradient">Healthier Smiles</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Comprehensive oral wellness tools powered by AI, designed for everyone 
              from kids to adults.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {features.map((feature) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                badge={feature.badge}
                locked={feature.badge === "Pro"}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Lifestyle showcase */}
      <section className="py-16 lg:py-24 bg-card/30">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-3">Built for the whole family</h2>
            <p className="text-muted-foreground">From morning routines to dentist visits — wellness guidance that fits real life.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { src: familyBrushing, title: "Family routines", desc: "Make brushing a shared moment kids look forward to." },
              { src: eatingAdvisorImg, title: "Tooth-friendly eating", desc: "Understand which foods protect or weaken enamel." },
              { src: dentistConsult, title: "Real dentist support", desc: "Connect with verified dentists in your city." },
            ].map((c) => (
              <div key={c.title} className="rounded-2xl overflow-hidden bg-card border border-border/50 shadow-card group">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={c.src} alt={c.title} loading="lazy" width={1024} height={768}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold mb-1">{c.title}</h3>
                  <p className="text-sm text-muted-foreground">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-muted/30">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-display font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground">
              Start improving your oral health in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Scan or Log",
                description: "Upload a photo of your teeth or log your daily habits and diet.",
              },
              {
                step: "02",
                title: "Get Insights",
                description: "Receive AI-powered wellness insights and personalized recommendations.",
              },
              {
                step: "03",
                title: "Improve Daily",
                description: "Track your progress, build better habits, and maintain a healthier smile.",
              },
            ].map((item, index) => (
              <div key={item.step} className="relative">
                <div className="text-6xl font-bold text-primary/10 mb-4">{item.step}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
                {index < 2 && (
                  <div className="hidden md:block absolute top-8 right-0 w-1/2 border-t-2 border-dashed border-primary/20" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-32">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-display font-bold mb-4">Loved by Thousands</h2>
            <p className="text-lg text-muted-foreground">
              See what our community says about Denta.Health
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-card rounded-2xl p-6 shadow-card border border-border/50"
              >
                <div className="flex items-center gap-1 text-warning mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-foreground mb-6">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-medium">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMiIvPjwvZz48L3N2Zz4=')] opacity-30" />
        <div className="container relative text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-display font-bold text-primary-foreground mb-6">
              Ready to Transform Your Smile?
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8">
              Join 50,000+ users building healthier dental habits with Denta.Health.
              Start your free trial today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 bg-background text-foreground hover:bg-background/90"
                asChild
              >
                <Link to="/signup">
                  Get Started Free <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                asChild
              >
                <Link to="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
