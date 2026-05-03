import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ExternalLink, Calendar, Star } from "lucide-react";
import { toast } from "sonner";

export default function SessionDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [session, setSession] = useState<any>(null);
  const [dentist, setDentist] = useState<any>(null);
  const [hasRSVP, setHasRSVP] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  async function load() {
    if (!id) return;
    const { data: s } = await supabase.from("live_sessions").select("*").eq("id", id).maybeSingle();
    setSession(s);
    if (s?.dentist_id) {
      const { data: d } = await supabase.from("dentist_profiles").select("*").eq("user_id", s.dentist_id).maybeSingle();
      setDentist(d);
    }
    if (user && id) {
      const { data: r } = await supabase.from("session_rsvps").select("*").eq("session_id", id).eq("user_id", user.id).maybeSingle();
      setHasRSVP(!!r);
    }
    const { data: rev } = await supabase.from("session_reviews").select("*").eq("session_id", id).order("created_at", { ascending: false });
    setReviews(rev ?? []);
  }
  useEffect(() => { load(); }, [id, user?.id]);

  async function handleRSVP() {
    if (!user) return toast.error("Sign in to RSVP");
    await supabase.from("session_rsvps").upsert({ session_id: id!, user_id: user.id }, { onConflict: "session_id,user_id" });
    setHasRSVP(true);
    toast.success("You're registered!");
  }

  async function handleReview(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return toast.error("Sign in to review");
    if (rating < 1) return toast.error("Pick a star rating");
    const { error } = await supabase.from("session_reviews").upsert({ session_id: id!, user_id: user.id, rating, review: reviewText }, { onConflict: "session_id,user_id" });
    if (error) return toast.error(error.message);
    toast.success("Thanks for your feedback!");
    setRating(0); setReviewText("");
    load();
  }

  if (!session) return <div className="min-h-screen bg-background"><Header /><main className="container py-12 text-center text-muted-foreground">Loading...</main><Footer /></div>;

  const isPast = new Date(session.scheduled_at).getTime() + (session.duration_minutes ?? 60) * 60000 < Date.now();
  const userReview = reviews.find((r) => r.user_id === user?.id);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12 max-w-3xl">
        <Link to="/sessions" className="text-sm text-primary hover:underline">&larr; All sessions</Link>
        <div className="bg-card rounded-2xl p-6 border mt-4">
          <h1 className="text-2xl font-bold">{session.title}</h1>
          {dentist && (
            <Link to={`/dentists/${dentist.user_id}`} className="text-sm text-primary mt-1 inline-block">
              Hosted by Dr. {dentist.full_name}
            </Link>
          )}
          <p className="text-sm text-muted-foreground inline-flex items-center gap-1 mt-2">
            <Calendar className="w-4 h-4" /> {new Date(session.scheduled_at).toLocaleString()} · {session.duration_minutes}m
          </p>
          {session.description && <p className="mt-4 whitespace-pre-wrap">{session.description}</p>}

          <div className="mt-6 flex gap-3 flex-wrap">
            {!isPast && !hasRSVP && <Button onClick={handleRSVP}>RSVP</Button>}
            {hasRSVP && <span className="text-sm text-emerald-600 font-medium">✓ Registered</span>}
            <a href={session.external_link} target="_blank" rel="noreferrer">
              <Button variant="outline"><ExternalLink className="w-4 h-4 mr-1" /> Join link</Button>
            </a>
          </div>
        </div>

        {isPast && hasRSVP && !userReview && (
          <form onSubmit={handleReview} className="bg-card rounded-2xl p-6 border mt-6 space-y-3">
            <h2 className="font-semibold">How was the session?</h2>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} type="button" onClick={() => setRating(n)} className={n <= rating ? "text-amber-500" : "text-muted-foreground"}>
                  <Star className={`w-7 h-7 ${n <= rating ? "fill-current" : ""}`} />
                </button>
              ))}
            </div>
            <Textarea rows={3} maxLength={1000} placeholder="Share your thoughts (optional)" value={reviewText} onChange={(e) => setReviewText(e.target.value)} />
            <Button type="submit">Submit review</Button>
          </form>
        )}

        <section className="mt-10">
          <h2 className="font-semibold mb-3">{reviews.length} Reviews</h2>
          <div className="space-y-3">
            {reviews.map((r) => (
              <div key={r.id} className="bg-card rounded-xl p-4 border">
                <div className="flex items-center gap-1 text-amber-500 mb-1">
                  {Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                {r.review && <p className="text-sm">{r.review}</p>}
                <p className="text-xs text-muted-foreground mt-1">{new Date(r.created_at).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
