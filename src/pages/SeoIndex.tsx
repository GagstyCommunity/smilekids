import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEO_CITIES, SEO_TOPICS } from "@/data/seo";
import SEOHead from "@/components/SEOHead";

const groupBy = <T, K extends string>(arr: T[], k: (t: T) => K) =>
  arr.reduce((m, item) => { const key = k(item); (m[key] ||= []).push(item); return m; }, {} as Record<K, T[]>);

export default function SeoIndex() {
  const byRegion = groupBy(SEO_CITIES, (c) => c.region as any);
  const byCountry = groupBy(SEO_CITIES, (c) => c.country as any);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Cities & Wellness Guides | Denta.Health"
        description="Find Denta.Health near you across the USA, UK, Canada, Germany, Italy, Australia, New Zealand, and Europe. Browse oral wellness guides."
        canonical="https://denta.health/in"
        keywords={["dentists near me", "oral wellness", "AI dentist", "cities"]}
      />
      <Header />
      <main className="container py-12 max-w-5xl">
        <h1 className="text-4xl font-bold mb-2">Find Denta.Health near you</h1>
        <p className="text-muted-foreground mb-10">Local dentists, city tips, and oral wellness guides across the USA, UK, Canada, Germany, Italy, Australia, New Zealand, and Europe.</p>

        {Object.entries(byRegion).map(([region, cities]) => (
          <section key={region} className="mb-10">
            <h2 className="text-2xl font-bold mb-4">{region}</h2>
            {Object.entries(groupBy(cities, (c) => c.country)).map(([country, list]) => (
              <div key={country} className="mb-6">
                <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-2">{country}</h3>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {list.map((c) => (
                    <Link key={c.slug} to={`/in/${c.slug}`} className="p-4 bg-card border rounded-xl hover:shadow-md transition">
                      <div className="font-semibold">{c.name}</div>
                      <div className="text-xs text-muted-foreground">{c.country}</div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </section>
        ))}

        <section>
          <h2 className="text-2xl font-bold mb-4">Wellness Guides</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {SEO_TOPICS.map((t) => (
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
