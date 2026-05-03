import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { MessageSquare, ShieldCheck, Plus } from "lucide-react";

export default function CommunityHub() {
  const { user } = useAuth();
  const [categories, setCategories] = useState<any[]>([]);
  const [activeCat, setActiveCat] = useState<string | null>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [creating, setCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [dentistMap, setDentistMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    supabase.from("forum_categories").select("*").order("name").then(({ data }) => {
      setCategories(data ?? []);
      if (data?.length) setActiveCat(data[0].id);
    });
  }, []);

  useEffect(() => {
    if (!activeCat) return;
    supabase.from("forum_posts").select("*").eq("category_id", activeCat).order("created_at", { ascending: false })
      .then(async ({ data }) => {
        setPosts(data ?? []);
        const ids = [...new Set((data ?? []).map((p) => p.author_id))];
        if (ids.length) {
          const { data: roles } = await supabase.from("user_roles").select("user_id, role").in("user_id", ids).eq("role", "dentist");
          const map: Record<string, boolean> = {};
          (roles ?? []).forEach((r) => (map[r.user_id] = true));
          setDentistMap(map);
        }
      });
  }, [activeCat]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return toast.error("Please sign in");
    if (!activeCat) return;
    const { error } = await supabase.from("forum_posts").insert({ category_id: activeCat, author_id: user.id, title, body });
    if (error) return toast.error(error.message);
    toast.success("Question posted!");
    setTitle(""); setBody(""); setCreating(false);
    supabase.from("forum_posts").select("*").eq("category_id", activeCat).order("created_at", { ascending: false }).then(({ data }) => setPosts(data ?? []));
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12">
        <header className="mb-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-3">Community Hub</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">Ask questions, share experiences, get answers from verified dentists.</p>
        </header>

        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map((c) => (
            <button key={c.id} onClick={() => setActiveCat(c.id)} className={`px-4 py-2 rounded-full text-sm font-medium border ${activeCat === c.id ? "bg-primary text-primary-foreground border-primary" : "bg-card hover:bg-muted border-border"}`}>
              {c.name}
            </button>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold">Recent Questions</h2>
            {user ? (
              <Button size="sm" onClick={() => setCreating((v) => !v)}><Plus className="w-4 h-4 mr-1" /> New Post</Button>
            ) : (
              <Button size="sm" asChild><Link to="/login">Sign in to post</Link></Button>
            )}
          </div>

          {creating && (
            <form onSubmit={handleCreate} className="bg-card rounded-2xl p-6 shadow-card border mb-6 space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input required maxLength={200} value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Question</Label>
                <Textarea required rows={4} maxLength={3000} value={body} onChange={(e) => setBody(e.target.value)} />
              </div>
              <div className="flex gap-2">
                <Button type="submit">Post</Button>
                <Button type="button" variant="ghost" onClick={() => setCreating(false)}>Cancel</Button>
              </div>
            </form>
          )}

          <div className="space-y-3">
            {posts.length === 0 && <p className="text-center text-muted-foreground py-12">No posts yet. Be the first!</p>}
            {posts.map((p) => (
              <Link key={p.id} to={`/community/post/${p.id}`} className="block bg-card rounded-2xl p-5 shadow-card border border-border/50 hover:border-primary/40 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{p.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{p.body}</p>
                  </div>
                  {dentistMap[p.author_id] && (
                    <span className="inline-flex items-center gap-1 text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
                      <ShieldCheck className="w-3 h-3" /> Verified Doctor
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-3">
                  <span className="inline-flex items-center gap-1"><MessageSquare className="w-3 h-3" /> Discuss</span>
                  <span>{new Date(p.created_at).toLocaleDateString()}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
