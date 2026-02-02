import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Eye, 
  Ear, 
  Hand, 
  Monitor, 
  Keyboard, 
  MessageSquare,
  CheckCircle2,
  ExternalLink 
} from "lucide-react";

const accessibilityFeatures = [
  {
    icon: Eye,
    title: "Visual Accessibility",
    features: [
      "High contrast mode support",
      "Scalable text up to 200%",
      "Screen reader compatible",
      "Alt text for all images",
      "Color-blind friendly design",
    ],
  },
  {
    icon: Keyboard,
    title: "Keyboard Navigation",
    features: [
      "Full keyboard navigation",
      "Visible focus indicators",
      "Skip navigation links",
      "Logical tab order",
      "Keyboard shortcuts",
    ],
  },
  {
    icon: Ear,
    title: "Hearing Accessibility",
    features: [
      "Captions for video content",
      "Transcripts for audio",
      "Visual notifications",
      "No audio-only content",
    ],
  },
  {
    icon: Hand,
    title: "Motor Accessibility",
    features: [
      "Large clickable areas",
      "No time-limited actions",
      "Drag alternatives available",
      "Touch-friendly interface",
    ],
  },
  {
    icon: Monitor,
    title: "Display Options",
    features: [
      "Light and dark mode",
      "Reduced motion option",
      "Responsive design",
      "Zoom-friendly layouts",
    ],
  },
  {
    icon: MessageSquare,
    title: "Communication",
    features: [
      "Simple language used",
      "Clear error messages",
      "Consistent navigation",
      "Help documentation",
    ],
  },
];

const standards = [
  { name: "WCAG 2.1 Level AA", status: "Compliant" },
  { name: "Section 508", status: "Compliant" },
  { name: "ADA Compliance", status: "Compliant" },
  { name: "WCAG 2.1 Level AAA", status: "In Progress" },
];

export default function Accessibility() {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />

      <main className="container py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">Accessibility Statement</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            SmileOS is committed to ensuring digital accessibility for people of all abilities.
            We continually improve the user experience for everyone.
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-12">
          {/* Commitment Statement */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <h2 className="text-xl font-bold mb-4">Our Commitment</h2>
              <p className="text-muted-foreground mb-4">
                We believe that everyone deserves access to oral health guidance. SmileOS is designed 
                and developed with accessibility in mind from the ground up. We follow web accessibility 
                guidelines and continually work to improve the experience for all users.
              </p>
              <p className="text-muted-foreground">
                Our goal is to meet or exceed WCAG 2.1 Level AA standards across our entire platform.
              </p>
            </CardContent>
          </Card>

          {/* Compliance Standards */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Compliance Standards</h2>
            <div className="grid md:grid-cols-4 gap-4">
              {standards.map((standard) => (
                <Card key={standard.name}>
                  <CardContent className="pt-6 text-center">
                    <CheckCircle2 className={`w-8 h-8 mx-auto mb-3 ${
                      standard.status === "Compliant" ? "text-success" : "text-warning"
                    }`} />
                    <h3 className="font-semibold mb-1">{standard.name}</h3>
                    <span className={`text-sm ${
                      standard.status === "Compliant" ? "text-success" : "text-warning"
                    }`}>
                      {standard.status}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Accessibility Features */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Accessibility Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {accessibilityFeatures.map((category) => (
                <Card key={category.title}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <category.icon className="w-5 h-5 text-primary" />
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {category.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Known Issues */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Known Limitations</h2>
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-4">
                  While we strive for full accessibility, some areas may have limitations:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Some third-party embedded content may not be fully accessible</li>
                  <li>• Older PDF documents may not be fully screen-reader compatible</li>
                  <li>• Some interactive charts use visual representation primarily</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-4">
                  We are actively working to address these limitations.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Feedback */}
          <section>
            <Card className="bg-gradient-primary text-primary-foreground">
              <CardContent className="pt-6 text-center">
                <h2 className="text-2xl font-bold mb-4">Accessibility Feedback</h2>
                <p className="opacity-90 mb-4 max-w-xl mx-auto">
                  If you encounter accessibility barriers or have suggestions for improvement,
                  please let us know. We take all feedback seriously and work to address issues promptly.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="px-6 py-2 bg-primary-foreground/20 hover:bg-primary-foreground/30 rounded-lg transition-colors">
                    accessibility@smileos.com
                  </button>
                  <button className="px-6 py-2 bg-primary-foreground/20 hover:bg-primary-foreground/30 rounded-lg transition-colors flex items-center justify-center gap-2">
                    Report an Issue
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
