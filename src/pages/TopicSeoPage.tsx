import { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { SEO_TOPICS } from "@/data/seo";

export default function TopicSeoPage() {
  const { topic } = useParams();
  const found = SEO_TOPICS.find(t => t.slug === topic);

  useEffect(() => {
    if (!found) return;
    document.title = `${found.title} | Denta.Health`;
    let m = document.querySelector('meta[name="description"]');
    if (!m) { m = document.createElement('meta'); m.setAttribute('name', 'description'); document.head.appendChild(m); }
    m.setAttribute('content', found.description);
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement('link'); canonical.setAttribute('rel', 'canonical'); document.head.appendChild(canonical); }
    canonical.setAttribute('href', `https://denta.health/guides/${found.slug}`);
    const ld = document.createElement('script');
    ld.type = 'application/ld+json';
    ld.text = JSON.stringify({
      "@context": "https://schema.org", "@type": "Article",
      headline: found.title, description: found.description,
      author: { "@type": "Organization", name: "Denta.Health" },
      publisher: { "@type": "Organization", name: "Denta.Health" },
    });
    document.head.appendChild(ld);
    return () => { document.head.removeChild(ld); };
  }, [found]);

  if (!found) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12 max-w-3xl">
        <nav className="text-sm text-muted-foreground mb-4"><Link to="/">Home</Link> / <Link to="/guides">Guides</Link> / {found.title}</nav>
        <h1 className="text-4xl font-bold mb-4">{found.title}</h1>
        <p className="text-lg text-muted-foreground mb-8">{found.description}</p>
        <p className="mb-8">{found.intro}</p>

        <h2 className="text-2xl font-bold mb-4">Daily wellness checklist</h2>
        <ul className="space-y-3 mb-12">
          {found.tips.map((t, i) => (
            <li key={i} className="flex items-start gap-3 p-4 bg-card border rounded-xl">
              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>{t}</span>
            </li>
          ))}
        </ul>

        <div className="text-center bg-gradient-primary rounded-2xl p-10 text-primary-foreground">
          <h3 className="text-2xl font-bold mb-3">Track your habits with Denta.Health</h3>
          <p className="mb-6 opacity-90">Free AI oral health coach for kids, adults, and families.</p>
          <Button asChild size="lg" variant="secondary"><Link to="/signup">Get Started Free</Link></Button>
        </div>

        <section className="mt-16">
          <h3 className="font-semibold mb-4">More guides</h3>
          <div className="flex flex-wrap gap-2">
            {SEO_TOPICS.filter(t => t.slug !== found.slug).map(t => (
              <Link key={t.slug} to={`/guides/${t.slug}`} className="text-sm px-3 py-1.5 rounded-full bg-muted hover:bg-muted/70">{t.title}</Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
