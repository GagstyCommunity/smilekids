import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, FileText, Image, Video, Mail, ExternalLink } from "lucide-react";

const brandAssets = [
  {
    name: "Logo Pack",
    description: "Primary logo in various formats and colors",
    formats: "SVG, PNG, PDF",
    icon: Image,
  },
  {
    name: "Brand Guidelines",
    description: "Complete brand identity guide",
    formats: "PDF",
    icon: FileText,
  },
  {
    name: "Product Screenshots",
    description: "High-res screenshots of key features",
    formats: "PNG",
    icon: Image,
  },
  {
    name: "Demo Videos",
    description: "Product walkthrough videos",
    formats: "MP4",
    icon: Video,
  },
];

const pressReleases = [
  {
    date: "February 1, 2025",
    title: "SmileOS Launches Family Dashboard Feature",
    excerpt: "New feature enables families to track and compare oral health habits across all members.",
  },
  {
    date: "January 15, 2025",
    title: "SmileOS Partners with Dental Professionals for City-Based Community",
    excerpt: "Platform expands to connect parents with local oral health experts through webinars.",
  },
  {
    date: "December 20, 2024",
    title: "SmileOS 2.0: AI-Powered Oral Health Guidance Goes Live",
    excerpt: "Major platform update introduces AI scan technology and personalized wellness scoring.",
  },
];

const keyFacts = [
  { label: "Founded", value: "2024" },
  { label: "Headquarters", value: "San Francisco, CA" },
  { label: "Mission", value: "Democratize oral health wellness" },
  { label: "Users", value: "Growing community" },
];

export default function PressKit() {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />

      <main className="container py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">Press & Media Kit</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Resources for journalists, bloggers, and media professionals covering SmileOS
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-12">
          {/* About Section */}
          <section>
            <h2 className="text-2xl font-bold mb-6">About SmileOS</h2>
            <Card>
              <CardContent className="pt-6">
                <p className="text-lg mb-6">
                  SmileOS is an AI-powered oral health wellness platform that helps families
                  build better dental care habits. Our mission is to make oral health guidance
                  accessible, engaging, and personalized for everyone.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {keyFacts.map((fact) => (
                    <div key={fact.label} className="p-4 rounded-xl bg-muted/30 text-center">
                      <div className="text-lg font-bold">{fact.value}</div>
                      <div className="text-sm text-muted-foreground">{fact.label}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Brand Assets */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Brand Assets</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {brandAssets.map((asset) => (
                <Card key={asset.name} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <asset.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{asset.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{asset.description}</p>
                        <div className="text-xs text-muted-foreground">{asset.formats}</div>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button className="bg-gradient-primary">
                <Download className="mr-2 w-4 h-4" />
                Download All Assets
              </Button>
            </div>
          </section>

          {/* Press Releases */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Press Releases</h2>
            <div className="space-y-4">
              {pressReleases.map((release, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">{release.date}</div>
                        <h3 className="font-semibold mb-2">{release.title}</h3>
                        <p className="text-sm text-muted-foreground">{release.excerpt}</p>
                      </div>
                      <ExternalLink className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Media Contact */}
          <section>
            <Card className="bg-gradient-primary text-primary-foreground">
              <CardContent className="pt-6 text-center">
                <Mail className="w-10 h-10 mx-auto mb-4 opacity-80" />
                <h2 className="text-2xl font-bold mb-2">Media Inquiries</h2>
                <p className="opacity-90 mb-4">
                  For press inquiries, interviews, or additional information, please contact our media team.
                </p>
                <Button
                  variant="secondary"
                  className="bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground"
                >
                  press@smileos.com
                </Button>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
