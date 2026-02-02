import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Map, CheckCircle2, Clock, Sparkles, Users, Zap, Shield, Globe } from "lucide-react";

const roadmapItems = [
  {
    quarter: "Q1 2025",
    status: "in-progress",
    items: [
      { name: "Whitening Journey Tracker", status: "in-progress", category: "Feature" },
      { name: "Stain Predictor (Coffee/Smoking)", status: "planned", category: "Feature" },
      { name: "Morning Breath Score", status: "planned", category: "Feature" },
      { name: "Retainer/Braces Tracker", status: "planned", category: "Feature" },
    ],
  },
  {
    quarter: "Q2 2025",
    status: "planned",
    items: [
      { name: "Topic-Based Parent Groups", status: "planned", category: "Community" },
      { name: "Doctor Content Hub", status: "planned", category: "B2B" },
      { name: "Referral Program", status: "planned", category: "Growth" },
      { name: "Multi-language Support", status: "planned", category: "Platform" },
    ],
  },
  {
    quarter: "Q3 2025",
    status: "planned",
    items: [
      { name: "Affiliate Marketplace", status: "planned", category: "Monetization" },
      { name: "Insurance Education Hub", status: "planned", category: "Feature" },
      { name: "Doctor CRM & Analytics", status: "planned", category: "B2B" },
      { name: "Mobile App (iOS/Android)", status: "planned", category: "Platform" },
    ],
  },
  {
    quarter: "Q4 2025",
    status: "planned",
    items: [
      { name: "AI Voice Assistant", status: "exploring", category: "AI" },
      { name: "Smart Toothbrush Integration", status: "exploring", category: "Integration" },
      { name: "Dental Clinic Partnerships", status: "planned", category: "B2B" },
      { name: "Advanced Family Analytics", status: "planned", category: "Feature" },
    ],
  },
];

const completedItems = [
  { name: "AI Teeth Scan", quarter: "Q4 2024" },
  { name: "Daily Protection Score", quarter: "Q4 2024" },
  { name: "Kids Mode Dashboard", quarter: "Q4 2024" },
  { name: "Eating Advisor", quarter: "Q4 2024" },
  { name: "AI Dentist Chat", quarter: "Q4 2024" },
  { name: "Family Dashboard", quarter: "Q1 2025" },
  { name: "Risk Forecast", quarter: "Q1 2025" },
  { name: "Habits & Reminders", quarter: "Q1 2025" },
  { name: "Community Platform", quarter: "Q1 2025" },
  { name: "Doctor Platform", quarter: "Q1 2025" },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "in-progress":
      return <Badge className="bg-primary/10 text-primary border-primary/20">In Progress</Badge>;
    case "planned":
      return <Badge className="bg-info/10 text-info border-info/20">Planned</Badge>;
    case "exploring":
      return <Badge className="bg-warning/10 text-warning border-warning/20">Exploring</Badge>;
    case "completed":
      return <Badge className="bg-success/10 text-success border-success/20">Completed</Badge>;
    default:
      return null;
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Feature":
      return <Sparkles className="w-4 h-4" />;
    case "Community":
      return <Users className="w-4 h-4" />;
    case "B2B":
      return <Zap className="w-4 h-4" />;
    case "Growth":
      return <Globe className="w-4 h-4" />;
    case "Platform":
      return <Shield className="w-4 h-4" />;
    default:
      return <Sparkles className="w-4 h-4" />;
  }
};

export default function Roadmap() {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />

      <main className="container py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Map className="w-4 h-4" />
            Product Roadmap
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">What We're Building</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our public roadmap shows what's coming next. Have a feature request?
            Let us know in the community!
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Completed Section */}
          <Card className="mb-8 bg-success/5 border-success/20">
            <CardContent className="pt-6">
              <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-success" />
                Recently Completed
              </h2>
              <div className="flex flex-wrap gap-2">
                {completedItems.map((item) => (
                  <div
                    key={item.name}
                    className="px-3 py-2 rounded-lg bg-success/10 border border-success/20 text-sm"
                  >
                    <span className="font-medium">{item.name}</span>
                    <span className="text-success ml-2 text-xs">{item.quarter}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Roadmap Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {roadmapItems.map((quarter) => (
              <Card
                key={quarter.quarter}
                className={
                  quarter.status === "in-progress" ? "border-primary/30 bg-primary/5" : ""
                }
              >
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold text-lg flex items-center gap-2">
                      {quarter.status === "in-progress" ? (
                        <Clock className="w-5 h-5 text-primary" />
                      ) : (
                        <Clock className="w-5 h-5 text-muted-foreground" />
                      )}
                      {quarter.quarter}
                    </h2>
                    {getStatusBadge(quarter.status)}
                  </div>

                  <div className="space-y-3">
                    {quarter.items.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                            {getCategoryIcon(item.category)}
                          </div>
                          <div>
                            <div className="font-medium text-sm">{item.name}</div>
                            <div className="text-xs text-muted-foreground">{item.category}</div>
                          </div>
                        </div>
                        {getStatusBadge(item.status)}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Suggestion CTA */}
          <Card className="mt-8 bg-gradient-primary text-primary-foreground">
            <CardContent className="pt-6 text-center">
              <h3 className="text-xl font-bold mb-2">Have a Feature Idea?</h3>
              <p className="opacity-90 mb-4">
                We love hearing from our community. Share your ideas and vote on features!
              </p>
              <button className="px-6 py-2 bg-primary-foreground/20 hover:bg-primary-foreground/30 rounded-lg transition-colors">
                Submit Feature Request
              </button>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
