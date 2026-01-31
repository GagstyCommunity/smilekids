import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Upload, 
  Brain, 
  BarChart3, 
  Lightbulb, 
  TrendingUp, 
  Shield,
  ArrowRight,
  Play
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Upload or Log Habits",
    description: "Start by uploading a photo of your teeth or logging your daily habits like brushing, eating, and drinking.",
    details: "Our secure upload system ensures your data is private and encrypted. You can also manually log habits through our simple interface."
  },
  {
    number: "02",
    icon: Brain,
    title: "AI Analyzes Patterns",
    description: "Our AI processes your inputs to identify patterns, potential risk areas, and wellness opportunities.",
    details: "Using advanced machine learning, SmileOS analyzes visual data and habit patterns to understand your oral health landscape."
  },
  {
    number: "03",
    icon: BarChart3,
    title: "Risk & Score Generation",
    description: "Receive a comprehensive wellness score and risk assessment based on multiple factors.",
    details: "Your Daily Protection Score combines brushing habits, diet, hydration, and other factors into an easy-to-understand number."
  },
  {
    number: "04",
    icon: Lightbulb,
    title: "Personalized Guidance",
    description: "Get actionable recommendations tailored specifically to your oral health needs.",
    details: "From brushing technique tips to dietary suggestions, every recommendation is personalized to help you improve."
  },
  {
    number: "05",
    icon: TrendingUp,
    title: "Progress Tracking",
    description: "Monitor your improvement over time with detailed analytics and trend visualization.",
    details: "Watch your scores improve as you build better habits. Celebrate milestones and stay motivated with streak tracking."
  },
  {
    number: "06",
    icon: Shield,
    title: "Wellness Disclaimer",
    description: "Always remember: SmileOS provides wellness guidance, not medical diagnosis.",
    details: "We recommend regular visits to dental professionals for comprehensive care. Our AI supports your journey but doesn't replace expert care."
  }
];

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-success/5 to-background">
          <div className="container text-center">
            <h1 className="text-3xl lg:text-5xl font-bold mb-6">
              How{" "}
              <span className="text-gradient">SmileOS</span>{" "}
              Works
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              A simple, six-step process to better oral health. No complexity, 
              just results.
            </p>
            <Button size="lg" className="bg-gradient-primary shadow-glow gap-2">
              <Play className="w-4 h-4" />
              Watch Demo Video
            </Button>
          </div>
        </section>

        {/* Steps Timeline */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-4xl">
            <div className="space-y-12">
              {steps.map((step, index) => (
                <div key={step.number} className="relative">
                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-6 top-16 w-0.5 h-full bg-border hidden md:block" />
                  )}
                  
                  <div className="flex gap-6">
                    {/* Step Number */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
                        <step.icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 pb-8">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-mono text-primary">{step.number}</span>
                        <h3 className="text-xl font-bold">{step.title}</h3>
                      </div>
                      <p className="text-muted-foreground mb-3">{step.description}</p>
                      <p className="text-sm text-muted-foreground/80">{step.details}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Start Section */}
        <section className="py-16 bg-muted/50">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl lg:text-3xl font-bold mb-4">
                Get Started in Under 2 Minutes
              </h2>
              <p className="text-muted-foreground mb-8">
                No credit card required. No complicated setup. Just sign up and start 
                improving your oral health today.
              </p>
              <div className="grid sm:grid-cols-3 gap-6 mb-8">
                <div className="bg-card p-6 rounded-xl border border-border/50">
                  <div className="text-3xl font-bold text-primary mb-2">1</div>
                  <p className="text-sm">Create your free account</p>
                </div>
                <div className="bg-card p-6 rounded-xl border border-border/50">
                  <div className="text-3xl font-bold text-primary mb-2">2</div>
                  <p className="text-sm">Take your first AI scan</p>
                </div>
                <div className="bg-card p-6 rounded-xl border border-border/50">
                  <div className="text-3xl font-bold text-primary mb-2">3</div>
                  <p className="text-sm">Get personalized insights</p>
                </div>
              </div>
              <Button asChild size="lg" className="bg-gradient-primary shadow-glow">
                <Link to="/signup">
                  Start Your Free Trial
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ Preview */}
        <section className="py-16 lg:py-24">
          <div className="container text-center">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">
              Still Have Questions?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Our support team is here to help you get the most out of SmileOS.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="outline" size="lg" asChild>
                <Link to="/contact">Contact Support</Link>
              </Button>
              <Button variant="ghost" size="lg" asChild>
                <Link to="/features">Explore Features</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
