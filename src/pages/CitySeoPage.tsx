import { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Star, ShieldCheck } from "lucide-react";
import { SEO_CITIES } from "@/data/seo";

export default function CitySeoPage() {
  const { city } = useParams();
  const found = SEO_CITIES.find(c => c.slug === city);

  useEffect(() => {
    if (!found) return;
    document.title = `Top Dentists in ${found.name} | Denta.Health`;
    const desc = `Find verified dentists in ${found.name}, ${found.country}. AI oral health coach, kids' habits, eating advisor — all on Denta.Health.`;
    let m = document.querySelector('meta[name="description"]');
    if (!m) { m = document.createElement('meta'); m.setAttribute('name', 'description'); document.head.appendChild(m); }
    m.setAttribute('content', desc);
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement('link'); canonical.setAttribute('rel', 'canonical'); document.head.appendChild(canonical); }
    canonical.setAttribute('href', `https://denta.health/in/${found.slug}`);

    const ld = document.createElement('script');
    ld.type = 'application/ld+json';
    ld.text = JSON.stringify({
      "@context": "https://schema.org", "@type": "LocalBusiness",
      name: `Denta.Health — ${found.name}`,
      areaServed: { "@type": "City", name: found.name, containedInPlace: found.country },
      description: desc,
    });
    document.head.appendChild(ld);
    return () => { document.head.removeChild(ld); };
  }, [found]);

  if (!found) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12 max-w-5xl">
        <nav className="text-sm text-muted-foreground mb-4"><Link to="/">Home</Link> / <Link to="/in">Cities</Link> / {found.name}</nav>
        <h1 className="text-4xl font-bold mb-2 flex items-center gap-3"><MapPin className="w-8 h-8 text-primary" />Dentists & Oral Health in {found.name}</h1>
        <p className="text-muted-foreground text-lg mb-8">Browse verified dentists in {found.name}, {found.country} and start your daily oral wellness routine with Denta.Health's AI coach.</p>

        <div className="grid md:grid-cols-3 gap-4 mb-12">
          <Card><CardHeader><CardTitle className="text-base flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-primary" />Verified Dentists</CardTitle></CardHeader>
            <CardContent className="text-sm text-muted-foreground">Hand-checked profiles in {found.name} with patient reviews.</CardContent></Card>
          <Card><CardHeader><CardTitle className="text-base flex items-center gap-2"><Star className="w-4 h-4 text-primary" />Live Webinars</CardTitle></CardHeader>
            <CardContent className="text-sm text-muted-foreground">Join free sessions hosted by local dentists.</CardContent></Card>
          <Card><CardHeader><CardTitle className="text-base flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" />Local Tips</CardTitle></CardHeader>
            <CardContent className="text-sm text-muted-foreground">Habits and food advice tailored to {found.country}.</CardContent></Card>
        </div>

        <section className="prose max-w-none mb-12">
          <h2 className="text-2xl font-bold mb-3">Why Denta.Health in {found.name}?</h2>
          <p className="text-muted-foreground">Whether you're a parent in {found.name} looking for cavity prevention for your kids, or an adult tracking gum health, Denta.Health combines AI-powered scans, daily habit tracking, and a verified community of local dentists. Sign up free, add your family, and start your protection score today.</p>
        </section>

        <div className="text-center bg-gradient-primary rounded-2xl p-12 text-primary-foreground">
          <h3 className="text-2xl font-bold mb-3">Start your oral wellness journey</h3>
          <p className="mb-6 opacity-90">Free for users in {found.name}. No credit card required.</p>
          <Button asChild size="lg" variant="secondary"><Link to="/signup">Get Started Free</Link></Button>
        </div>

        <section className="mt-16">
          <h3 className="font-semibold mb-4">Other cities</h3>
          <div className="flex flex-wrap gap-2">
            {SEO_CITIES.filter(c => c.slug !== found.slug).map(c => (
              <Link key={c.slug} to={`/in/${c.slug}`} className="text-sm px-3 py-1.5 rounded-full bg-muted hover:bg-muted/70">{c.name}</Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
