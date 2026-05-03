import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    supabase.from("blog_posts").select("*").eq("published", true).order("published_at", { ascending: false })
      .then(({ data }) => setPosts(data ?? []));
  }, []);

  const placeholders = [
    { id: "b1", slug: "ai-and-oral-health", title: "How AI is reshaping daily oral care", excerpt: "From scans to coaching — AI is becoming your second toothbrush.", cover_image: null, published_at: new Date().toISOString() },
    { id: "b2", slug: "kids-brushing-tips", title: "5 ways to make kids actually love brushing", excerpt: "Simple psychology tricks that turn brushing into a game.", cover_image: null, published_at: new Date().toISOString() },
    { id: "b3", slug: "pregnancy-and-gums", title: "Pregnancy gingivitis: what to watch for", excerpt: "Hormonal changes can quietly damage your gums.", cover_image: null, published_at: new Date().toISOString() },
  ];
  const display = posts.length ? posts : placeholders;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">SmileOS Blog</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Articles, news and research on modern oral wellness.
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {display.map((p) => (
            <Link
              key={p.id}
              to={`/blog/${p.slug}`}
              className="group bg-card rounded-2xl overflow-hidden shadow-card border border-border/50 hover:border-primary/40 hover:shadow-glow transition-all"
            >
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20" />
              <div className="p-6">
                <p className="text-xs text-muted-foreground mb-2">{new Date(p.published_at).toLocaleDateString()}</p>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{p.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3">{p.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
