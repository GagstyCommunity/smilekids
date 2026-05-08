import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SEO_TOPICS } from "@/data/seo";
import { BookOpen, GraduationCap, Stethoscope, ShieldCheck, Users, Video } from "lucide-react";

const guides = [
  { icon: Stethoscope, title: "Clinical Wellness Protocols", body: "Evidence-aligned daily wellness routines you can recommend to patients between visits.", to: "/learning" },
  { icon: GraduationCap, title: "Continuing Education Webinars", body: "Live and recorded sessions hosted by verified peers. Earn community recognition.", to: "/sessions" },
  { icon: Users, title: "Patient Communication Playbook", body: "Scripts and templates for explaining wellness vs. diagnostic boundaries clearly.", to: "/community-guidelines" },
  { icon: ShieldCheck, title: "Compliance & Safe-Mode AI", body: "How Denta.Health enforces non-diagnostic language, audit logs, and consent.", to: "/doctor-policy" },
  { icon: Video, title: "Hosting a Live Session", body: "Step-by-step on scheduling external Zoom/Meet sessions and reaching local families.", to: "/sessions" },
  { icon: BookOpen, title: "Building Your Verified Profile", body: "Earn the verified badge, collect reviews, and grow city visibility.", to: "/for-professionals" },
];

export default function ProfessionalGuides() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Professional Guides for Dentists | Denta.Health"
        description="Briefly: clinical protocols, CE webinars, patient communication, compliance, and growth playbooks for verified dentists on Denta.Health."
        canonical="https://denta.health/professional-guides"
        keywords={["dentist guides", "CE for dentists", "patient communication", "verified dentist"]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Professional Guides for Dentists",
          description: "Resources for verified dentists on the Denta.Health platform.",
        }}
      />
      <Header />
      <main className="container py-12 max-w-6xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3">Full Professional Guides</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Briefly: everything a verified dentist needs on Denta.Health — protocols, communication, compliance, webinars, and visibility growth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {guides.map((g) => (
            <Card key={g.title} className="hover:shadow-md transition">
              <CardHeader>
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-2"><g.icon className="w-5 h-5" /></div>
                <CardTitle className="text-lg">{g.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p className="mb-4">{g.body}</p>
                <Button asChild variant="outline" size="sm"><Link to={g.to}>Open guide</Link></Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Quick wellness reference (shareable with patients)</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {SEO_TOPICS.map((t) => (
              <Link key={t.slug} to={`/guides/${t.slug}`} className="p-4 bg-card border rounded-xl hover:shadow-md transition">
                <div className="font-semibold">{t.title}</div>
                <div className="text-xs text-muted-foreground line-clamp-2">{t.description}</div>
              </Link>
            ))}
          </div>
        </section>

        <div className="text-center bg-gradient-primary rounded-2xl p-10 text-primary-foreground">
          <h3 className="text-2xl font-bold mb-3">Ready to join as a verified dentist?</h3>
          <p className="mb-6 opacity-90">Reach families in your city with Safe-Mode AI guardrails on your side.</p>
          <Button asChild size="lg" variant="secondary"><Link to="/for-professionals">Apply for verification</Link></Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
