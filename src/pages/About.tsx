import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Heart, 
  Target, 
  Shield, 
  Brain, 
  Rocket, 
  MessageCircle,
  Users,
  Award
} from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Wellness First",
    description: "We believe prevention is better than cure. Our focus is on building healthy habits, not replacing dental professionals."
  },
  {
    icon: Shield,
    title: "Safety & Trust",
    description: "Every feature is designed with safety in mind. We never claim to diagnose—we educate and guide."
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Parents, families, and individuals come together to learn from each other and share their wellness journeys."
  },
  {
    icon: Brain,
    title: "AI Responsibility",
    description: "We use AI ethically and transparently, always making clear what AI can and cannot do."
  }
];

const stats = [
  { value: "50K+", label: "Active Users" },
  { value: "500K+", label: "AI Scans Completed" },
  { value: "100+", label: "Cities Covered" },
  { value: "4.8★", label: "User Rating" }
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-primary/5 to-background">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl lg:text-5xl font-bold mb-6">
                Our Mission: A{" "}
                <span className="text-gradient">Healthier Smile</span>{" "}
                for Everyone
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Denta.Health was founded on a simple belief: everyone deserves access to 
                oral health guidance, regardless of where they live or their access to 
                dental care.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 border-y border-border/50 bg-muted/30">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Denta.Health Exists */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-accent-foreground text-sm mb-4">
                  <Target className="w-4 h-4" />
                  Our Purpose
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold mb-6">
                  Why Denta.Health Exists
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Dental health problems affect billions worldwide, yet many people only 
                    visit a dentist when something goes wrong. We wanted to change that.
                  </p>
                  <p>
                    Denta.Health bridges the gap between daily habits and professional dental care. 
                    We help you understand your oral health better, build preventive habits, 
                    and know when it's time to see a professional.
                  </p>
                  <p>
                    Our platform is especially focused on families and children, because we 
                    believe the best dental habits start early.
                  </p>
                </div>
              </div>
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl flex items-center justify-center">
                <div className="text-center p-8">
                  <Award className="w-16 h-16 text-primary mx-auto mb-4" />
                  <p className="text-lg font-medium">Building healthier communities,<br />one smile at a time</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Grid */}
        <section className="py-16 bg-muted/50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold mb-4">
                Our Core Values
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                These principles guide everything we build at Denta.Health.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => (
                <div 
                  key={value.title}
                  className="bg-card p-6 rounded-2xl border border-border/50 shadow-card"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-bold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Responsibility */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-3xl">
            <div className="text-center mb-8">
              <Brain className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl lg:text-3xl font-bold mb-4">
                Our Approach to AI
              </h2>
            </div>
            <div className="prose prose-sm text-muted-foreground max-w-none">
              <p className="text-center text-lg mb-6">
                We believe in responsible AI that augments human expertise, not replaces it.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-xl border border-border/50">
                  <h4 className="font-bold text-foreground mb-2">What Our AI Does</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Analyzes patterns in oral health data</li>
                    <li>• Provides wellness guidance and tips</li>
                    <li>• Tracks habits and progress over time</li>
                    <li>• Suggests when to consult professionals</li>
                  </ul>
                </div>
                <div className="bg-card p-6 rounded-xl border border-border/50">
                  <h4 className="font-bold text-foreground mb-2">What Our AI Doesn't Do</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Diagnose medical conditions</li>
                    <li>• Replace professional dental advice</li>
                    <li>• Prescribe treatments</li>
                    <li>• Make guarantees about outcomes</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Future Roadmap */}
        <section className="py-16 bg-muted/50">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <Rocket className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl lg:text-3xl font-bold mb-4">
                What's Next for Denta.Health
              </h2>
              <p className="text-muted-foreground mb-8">
                We're constantly working on new features to make oral wellness more accessible:
              </p>
              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <div className="bg-card p-4 rounded-xl border border-border/50">
                  Whitening Simulator
                </div>
                <div className="bg-card p-4 rounded-xl border border-border/50">
                  Teeth Age Score
                </div>
                <div className="bg-card p-4 rounded-xl border border-border/50">
                  Night Grinding Detection
                </div>
                <div className="bg-card p-4 rounded-xl border border-border/50">
                  Morning Breath Score
                </div>
                <div className="bg-card p-4 rounded-xl border border-border/50">
                  Orthodontic Predictor
                </div>
                <div className="bg-card p-4 rounded-xl border border-border/50">
                  Emergency Mode
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 lg:py-24">
          <div className="container text-center">
            <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">
              Let's Connect
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Have questions about Denta.Health? Want to partner with us? We'd love to hear from you.
            </p>
            <Button asChild size="lg" className="bg-gradient-primary shadow-glow">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
