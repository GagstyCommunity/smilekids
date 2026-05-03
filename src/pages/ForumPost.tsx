import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export default function ForumPost() {
  const { id } = useParams();
  const { user } = useAuth();
  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [body, setBody] = useState("");
  const [dentistMap, setDentistMap] = useState<Record<string, boolean>>({});

  async function load() {
    if (!id) return;
    const { data: p } = await supabase.from("forum_posts").select("*").eq("id", id).maybeSingle();
    setPost(p);
    const { data: c } = await supabase.from("forum_comments").select("*").eq("post_id", id).order("created_at");
    setComments(c ?? []);
    const ids = [...new Set([p?.author_id, ...(c ?? []).map((x) => x.author_id)].filter(Boolean))];
    if (ids.length) {
      const { data: roles } = await supabase.from("user_roles").select("user_id, role").in("user_id", ids).eq("role", "dentist");
      const map: Record<string, boolean> = {};
      (roles ?? []).forEach((r) => (map[r.user_id] = true));
      setDentistMap(map);
    }
  }

  useEffect(() => { load(); }, [id]);

  async function handleComment(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return toast.error("Sign in to comment");
    const { error } = await supabase.from("forum_comments").insert({ post_id: id!, author_id: user.id, body });
    if (error) return toast.error(error.message);
    setBody("");
    load();
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background"><Header /><main className="container py-12 text-center text-muted-foreground">Loading...</main><Footer /></div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12 max-w-3xl">
        <Link to="/community" className="text-sm text-primary hover:underline">&larr; Back to Community</Link>
        <article className="bg-card rounded-2xl p-6 shadow-card border mt-4">
          <div className="flex items-center gap-2 mb-3">
            {dentistMap[post.author_id] && (
              <span className="inline-flex items-center gap-1 text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
                <ShieldCheck className="w-3 h-3" /> Verified Doctor
              </span>
            )}
            <span className="text-xs text-muted-foreground">{new Date(post.created_at).toLocaleString()}</span>
          </div>
          <h1 className="text-2xl font-bold mb-3">{post.title}</h1>
          <p className="text-muted-foreground whitespace-pre-wrap">{post.body}</p>
        </article>

        <h2 className="font-semibold mt-8 mb-4">{comments.length} Replies</h2>
        <div className="space-y-3 mb-6">
          {comments.map((c) => (
            <div key={c.id} className="bg-card rounded-xl p-4 border">
              <div className="flex items-center gap-2 mb-2">
                {dentistMap[c.author_id] && (
                  <span className="inline-flex items-center gap-1 text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    <ShieldCheck className="w-3 h-3" /> Verified Doctor
                  </span>
                )}
                <span className="text-xs text-muted-foreground">{new Date(c.created_at).toLocaleString()}</span>
              </div>
              <p className="text-sm whitespace-pre-wrap">{c.body}</p>
            </div>
          ))}
        </div>

        {user ? (
          <form onSubmit={handleComment} className="bg-card rounded-2xl p-4 border space-y-3">
            <Textarea required maxLength={3000} rows={3} placeholder="Share your reply..." value={body} onChange={(e) => setBody(e.target.value)} />
            <Button type="submit">Reply</Button>
          </form>
        ) : (
          <Button asChild><Link to="/login">Sign in to reply</Link></Button>
        )}
      </main>
      <Footer />
    </div>
  );
}
