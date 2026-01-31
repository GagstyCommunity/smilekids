import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Users, 
  Baby, 
  User, 
  GraduationCap, 
  Coffee, 
  Shield,
  ArrowRight,
  Check
} from "lucide-react";

const solutions = [
  {
    icon: Users,
    title: "For Parents",
    description: "Keep your entire family's oral health on track with easy-to-use tools designed for busy parents.",
    features: [
      "Multi-child profile management",
      "Cavity risk monitoring for kids",
      "Sugar intake tracking",
      "Brushing reminders & rewards",
      "Parent community access"
    ],
    cta: "Explore Kids Mode",
    link: "/kids"
  },
  {
    icon: Baby,
    title: "For Kids",
    description: "Make dental hygiene fun with gamified experiences that kids actually enjoy.",
    features: [
      "Interactive brushing timer",
      "Achievement badges & rewards",
      "Fun dental education",
      "Character-based guidance",
      "Progress celebration"
    ],
    cta: "Try Kids Mode",
    link: "/kids"
  },
  {
    icon: User,
    title: "For Adults",
    description: "Take control of your oral health with AI-powered insights and personalized recommendations.",
    features: [
      "AI teeth scan analysis",
      "Daily protection scoring",
      "Gum health monitoring",
      "Whitening progress tracking",
      "Habit optimization tips"
    ],
    cta: "Start Your Scan",
    link: "/scan"
  },
  {
    icon: GraduationCap,
    title: "For Teens",
    description: "Navigate braces, alignment, and teenage dental challenges with confidence.",
    features: [
      "Braces care guidance",
      "Alignment progress tracking",
      "Teen-friendly interface",
      "Orthodontic reminders",
      "Peer community access"
    ],
    cta: "Get Started",
    link: "/signup"
  },
  {
    icon: Coffee,
    title: "For Coffee & Smoking Users",
    description: "Understand and manage the impact of lifestyle choices on your dental health.",
    features: [
      "Stain risk assessment",
      "Damage tracking over time",
      "Mitigation strategies",
      "Personalized care plans",
      "Progress monitoring"
    ],
    cta: "Assess Your Risk",
    link: "/scan"
  },
  {
    icon: Shield,
    title: "For Preventive Care",
    description: "Stay ahead of dental issues with proactive wellness monitoring and early detection.",
    features: [
      "Early warning indicators",
      "Regular check reminders",
      "Wellness trend analysis",
      "Personalized prevention tips",
      "Dentist visit scheduling"
    ],
    cta: "Start Prevention",
    link: "/dashboard"
  }
];

export default function Solutions() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-accent/5 to-background">
          <div className="container text-center">
            <h1 className="text-3xl lg:text-5xl font-bold mb-6">
              Solutions for{" "}
              <span className="text-gradient">Every Smile</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Whether you're a parent managing your family's dental health or an individual 
              looking to improve your habits, SmileOS has the right solution for you.
            </p>
          </div>
        </section>

        {/* Solutions Grid */}
        <section className="py-16">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {solutions.map((solution) => (
                <div 
                  key={solution.title}
                  className="bg-card rounded-2xl p-6 border border-border/50 shadow-card hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4">
                    <solution.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{solution.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{solution.description}</p>
                  <ul className="space-y-2 mb-6">
                    {solution.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="w-full group" asChild>
                    <Link to={solution.link}>
                      {solution.cta}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-muted/50">
          <div className="container text-center">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">
              Not Sure Which Solution Is Right for You?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Take our quick assessment to get personalized recommendations based on your needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-gradient-primary shadow-glow">
                <Link to="/signup">Start Free Assessment</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/contact">Talk to Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
