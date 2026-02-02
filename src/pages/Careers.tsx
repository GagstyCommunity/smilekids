import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MapPin, Clock, Heart, Zap, Users, Globe, ChevronRight } from "lucide-react";

const openPositions = [
  {
    title: "Senior Full-Stack Engineer",
    department: "Engineering",
    location: "Remote (US)",
    type: "Full-time",
    description: "Build and scale our AI-powered oral health platform.",
  },
  {
    title: "AI/ML Engineer",
    department: "Engineering",
    location: "Remote (Global)",
    type: "Full-time",
    description: "Develop and improve our dental analysis AI models.",
  },
  {
    title: "Product Designer",
    department: "Design",
    location: "San Francisco, CA",
    type: "Full-time",
    description: "Design delightful experiences for families and health professionals.",
  },
  {
    title: "Growth Marketing Manager",
    department: "Marketing",
    location: "Remote (US)",
    type: "Full-time",
    description: "Drive user acquisition and community growth strategies.",
  },
  {
    title: "Customer Success Lead",
    department: "Operations",
    location: "Remote (US)",
    type: "Full-time",
    description: "Help our users get the most out of SmileOS.",
  },
];

const benefits = [
  { icon: Heart, title: "Health & Wellness", description: "Comprehensive health, dental, and vision coverage" },
  { icon: Clock, title: "Flexible Hours", description: "Work when you're most productive" },
  { icon: Globe, title: "Remote-First", description: "Work from anywhere in the world" },
  { icon: Zap, title: "Learning Budget", description: "$2,000 annual learning and development stipend" },
  { icon: Users, title: "Team Retreats", description: "Annual company gatherings in amazing locations" },
  { icon: Briefcase, title: "Equity", description: "Ownership in what we're building together" },
];

const values = [
  { emoji: "🎯", title: "Mission-Driven", description: "We're here to improve oral health for millions" },
  { emoji: "🤝", title: "Trust & Transparency", description: "Open communication and honest feedback" },
  { emoji: "🚀", title: "Move Fast", description: "Ship, learn, iterate, and improve continuously" },
  { emoji: "💜", title: "User Obsessed", description: "Every decision starts with the user" },
];

export default function Careers() {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />

      <main className="container py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-3xl lg:text-5xl font-bold mb-4">Join the SmileOS Team</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Help us revolutionize oral health wellness for families worldwide
          </p>
        </div>

        {/* Values */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Our Values</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {values.map((value) => (
              <Card key={value.title} className="text-center">
                <CardContent className="pt-6">
                  <div className="text-4xl mb-3">{value.emoji}</div>
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Benefits & Perks</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border/50"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Open Positions */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Open Positions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {openPositions.map((position) => (
              <Card
                key={position.title}
                className="hover:shadow-md transition-shadow cursor-pointer group"
              >
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{position.title}</h3>
                        <Badge variant="outline">{position.department}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{position.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {position.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {position.type}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section>
          <Card className="bg-gradient-primary text-primary-foreground">
            <CardContent className="pt-8 pb-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Don't See Your Role?</h2>
              <p className="opacity-90 mb-6 max-w-xl mx-auto">
                We're always looking for talented people who share our mission.
                Send us your resume and tell us how you'd contribute!
              </p>
              <Button
                variant="secondary"
                size="lg"
                className="bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground"
              >
                Send General Application
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
}
