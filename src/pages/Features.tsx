import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Camera, 
  Shield, 
  Baby, 
  Apple, 
  MessageCircle, 
  Heart,
  Sparkles,
  ArrowRight,
  Check
} from "lucide-react";

const features = [
  {
    icon: Camera,
    title: "AI Teeth Scan",
    description: "Upload a photo and get instant wellness insights about your oral health.",
    benefits: [
      "Cavity-risk zone detection",
      "Gum inflammation indicators",
      "Plaque & stain analysis",
      "Alignment signals"
    ],
    color: "primary"
  },
  {
    icon: Shield,
    title: "Daily Protection Score",
    description: "Track your daily habits and get a personalized protection score.",
    benefits: [
      "Brushing frequency tracking",
      "Sugar intake monitoring",
      "Hydration reminders",
      "Habit improvement tips"
    ],
    color: "success"
  },
  {
    icon: Baby,
    title: "Kids Mode",
    description: "Gamified oral health tracking designed specifically for children.",
    benefits: [
      "Child profile management",
      "Cavity probability score",
      "Sugar/snack risk analysis",
      "Fun brushing reminders"
    ],
    color: "accent"
  },
  {
    icon: Apple,
    title: "Eating Advisor",
    description: "Understand how your food choices impact your dental health.",
    benefits: [
      "Sugar load calculator",
      "Acid impact analysis",
      "Wait time suggestions",
      "Neutralizing food tips"
    ],
    color: "warning"
  },
  {
    icon: MessageCircle,
    title: "AI Dentist Chat",
    description: "Get instant guidance from our AI wellness assistant.",
    benefits: [
      "24/7 availability",
      "Probability-based insights",
      "Safe wellness guidance",
      "Dentist visit recommendations"
    ],
    color: "primary"
  }
];

export default function Features() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-primary/5 to-background">
          <div className="container text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Powered by AI
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold mb-6">
              Everything You Need for{" "}
              <span className="text-gradient">Better Oral Health</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Denta.Health combines AI technology with dental wellness best practices to help you 
              and your family maintain healthier smiles every day.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-gradient-primary shadow-glow">
                <Link to="/signup">Start Free Trial</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/how-it-works">See How It Works</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="space-y-16">
              {features.map((feature, index) => (
                <div 
                  key={feature.title}
                  className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-16 items-center`}
                >
                  {/* Image/Icon Side */}
                  <div className="flex-1 w-full">
                    <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl flex items-center justify-center">
                      <div className="w-24 h-24 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow">
                        <feature.icon className="w-12 h-12 text-primary-foreground" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Content Side */}
                  <div className="flex-1 space-y-6">
                    <h2 className="text-2xl lg:text-3xl font-bold">{feature.title}</h2>
                    <p className="text-muted-foreground text-lg">{feature.description}</p>
                    <ul className="space-y-3">
                      {feature.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
                            <Check className="w-3 h-3 text-success" />
                          </div>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    <Button variant="ghost" className="group">
                      Learn More 
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Safety Section */}
        <section className="py-16 bg-muted/50">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-16 h-16 rounded-2xl bg-warning/20 flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-warning" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold mb-4">
                Wellness-First Philosophy
              </h2>
              <p className="text-muted-foreground mb-6">
                Denta.Health is designed as a wellness guidance platform, not a medical diagnostic tool. 
                Our AI provides educational insights and habit tracking to support your oral health journey, 
                but always recommends consulting with dental professionals for any concerns.
              </p>
              <Button variant="outline" asChild>
                <Link to="/legal">Read Our Disclaimer</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24">
          <div className="container text-center">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">
              Ready to Transform Your Oral Health?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Join thousands of families using Denta.Health to build better dental habits.
            </p>
            <Button asChild size="lg" className="bg-gradient-primary shadow-glow">
              <Link to="/signup">
                Get Started Free
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
