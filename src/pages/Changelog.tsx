import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Zap, Bug, Wrench, Star, Rocket } from "lucide-react";

const releases = [
  {
    version: "2.4.0",
    date: "February 1, 2025",
    type: "major",
    title: "Family Dashboard & Risk Forecast",
    changes: [
      { type: "feature", text: "Family Dashboard with multi-member tracking" },
      { type: "feature", text: "AI Risk Forecast with 90-day predictions" },
      { type: "feature", text: "Habits & Reminders engine with sugar cooldown timer" },
      { type: "feature", text: "Progress & Achievements with badges and leaderboards" },
      { type: "improvement", text: "Enhanced gamification for kids mode" },
      { type: "fix", text: "Fixed score calculation in edge cases" },
    ],
  },
  {
    version: "2.3.0",
    date: "January 25, 2025",
    type: "major",
    title: "Community & Doctor Platform",
    changes: [
      { type: "feature", text: "City-based parent community feeds" },
      { type: "feature", text: "Doctor profile and discovery pages" },
      { type: "feature", text: "Online seminar booking system" },
      { type: "feature", text: "Doctor dashboard for B2B management" },
      { type: "improvement", text: "Improved mobile navigation" },
    ],
  },
  {
    version: "2.2.0",
    date: "January 15, 2025",
    type: "minor",
    title: "AI Scan Improvements",
    changes: [
      { type: "feature", text: "Enhanced AI scan accuracy" },
      { type: "feature", text: "New stain detection algorithm" },
      { type: "improvement", text: "Faster scan processing times" },
      { type: "fix", text: "Fixed image upload issues on Safari" },
      { type: "fix", text: "Resolved dark mode contrast issues" },
    ],
  },
  {
    version: "2.1.0",
    date: "January 5, 2025",
    type: "minor",
    title: "Eating Advisor Update",
    changes: [
      { type: "feature", text: "Photo-based food analysis" },
      { type: "feature", text: "Expanded food database with 500+ items" },
      { type: "improvement", text: "Better acid impact calculations" },
      { type: "improvement", text: "Added wait time recommendations" },
    ],
  },
  {
    version: "2.0.0",
    date: "December 20, 2024",
    type: "major",
    title: "SmileOS 2.0 Launch",
    changes: [
      { type: "feature", text: "Complete UI redesign" },
      { type: "feature", text: "AI Dentist Chat with safe mode" },
      { type: "feature", text: "Kids Mode dashboard" },
      { type: "feature", text: "Daily Protection Score" },
      { type: "improvement", text: "Performance optimizations" },
    ],
  },
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case "feature":
      return <Sparkles className="w-4 h-4 text-primary" />;
    case "improvement":
      return <Zap className="w-4 h-4 text-info" />;
    case "fix":
      return <Bug className="w-4 h-4 text-warning" />;
    default:
      return <Wrench className="w-4 h-4 text-muted-foreground" />;
  }
};

const getVersionBadge = (type: string) => {
  switch (type) {
    case "major":
      return <Badge className="bg-primary/10 text-primary border-primary/20">Major</Badge>;
    case "minor":
      return <Badge className="bg-info/10 text-info border-info/20">Minor</Badge>;
    case "patch":
      return <Badge className="bg-muted text-muted-foreground">Patch</Badge>;
    default:
      return null;
  }
};

export default function Changelog() {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />

      <main className="container py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Rocket className="w-4 h-4" />
            Product Updates
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">Changelog</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stay up to date with the latest features, improvements, and fixes in SmileOS
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-border hidden md:block" />

            <div className="space-y-8">
              {releases.map((release, index) => (
                <div key={release.version} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute left-6 w-4 h-4 rounded-full bg-primary border-4 border-background hidden md:block" />

                  <Card className="md:ml-16">
                    <CardContent className="pt-6">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <h2 className="text-xl font-bold">v{release.version}</h2>
                        {getVersionBadge(release.type)}
                        <span className="text-sm text-muted-foreground">{release.date}</span>
                      </div>

                      <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                        {index === 0 && <Star className="w-5 h-5 text-warning fill-warning" />}
                        {release.title}
                      </h3>

                      <div className="space-y-2">
                        {release.changes.map((change, i) => (
                          <div key={i} className="flex items-start gap-3">
                            {getTypeIcon(change.type)}
                            <span className="text-sm">{change.text}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
