import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEO_CITIES, SEO_TOPICS } from "@/data/seo";
import { useEffect } from "react";

export default function SeoIndex() {
  useEffect(() => { document.title = "Cities & Guides | Denta.Health"; }, []);
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12 max-w-5xl">
        <h1 className="text-4xl font-bold mb-2">Find Denta.Health near you</h1>
        <p className="text-muted-foreground mb-10">Local dentists, city tips, and oral wellness guides.</p>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Cities</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {SEO_CITIES.map(c => (
              <Link key={c.slug} to={`/in/${c.slug}`} className="p-4 bg-card border rounded-xl hover:shadow-md transition">
                <div className="font-semibold">{c.name}</div>
                <div className="text-xs text-muted-foreground">{c.country}</div>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Wellness Guides</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {SEO_TOPICS.map(t => (
              <Link key={t.slug} to={`/guides/${t.slug}`} className="p-4 bg-card border rounded-xl hover:shadow-md transition">
                <div className="font-semibold">{t.title}</div>
                <div className="text-xs text-muted-foreground line-clamp-2">{t.description}</div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
