import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ShieldCheck, MapPin, Globe, Star, Calendar } from "lucide-react";

export default function PublicDentistProfile() {
  const { id } = useParams();
  const [profile, setProfile] = useState<any>(null);
  const [sessions, setSessions] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    if (!id) return;
    supabase.from("dentist_profiles").select("*").eq("user_id", id).maybeSingle().then(({ data }) => setProfile(data));
    supabase.from("live_sessions").select("*").eq("dentist_id", id).order("scheduled_at", { ascending: false }).then(({ data }) => {
      setSessions(data ?? []);
      const sids = (data ?? []).map((s) => s.id);
      if (sids.length) {
        supabase.from("session_reviews").select("*").in("session_id", sids).order("created_at", { ascending: false }).limit(10).then(({ data }) => setReviews(data ?? []));
      }
    });
  }, [id]);

  if (!profile) return <div className="min-h-screen bg-background"><Header /><main className="container py-12 text-center text-muted-foreground">Loading...</main><Footer /></div>;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12 max-w-4xl">
        <div className="bg-card rounded-2xl p-8 shadow-card border">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                Dr. {profile.full_name}
                {profile.verified && <span className="inline-flex items-center gap-1 text-sm text-primary bg-primary/10 px-2 py-1 rounded-full"><ShieldCheck className="w-4 h-4" /> Verified</span>}
              </h1>
              <p className="text-muted-foreground mt-1">{profile.specialty}</p>
              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mt-3">
                {(profile.city || profile.country) && <span className="inline-flex items-center gap-1"><MapPin className="w-4 h-4" /> {[profile.city, profile.country].filter(Boolean).join(", ")}</span>}
                {profile.website && <a href={profile.website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline"><Globe className="w-4 h-4" /> Website</a>}
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-amber-500 font-semibold">
                <Star className="w-5 h-5 fill-current" /> {Number(profile.avg_rating ?? 0).toFixed(1)}
              </div>
              <p className="text-xs text-muted-foreground">{profile.reviews_count} reviews</p>
            </div>
          </div>
          {profile.bio && <p className="mt-6 whitespace-pre-wrap text-sm">{profile.bio}</p>}
          <p className="mt-6 text-xs text-muted-foreground border-t pt-4">
            Independent professional — not an employee or representative of SmileOS.
          </p>
        </div>

        <section className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Upcoming & past sessions</h2>
          {sessions.length === 0 && <p className="text-muted-foreground text-sm">No sessions yet.</p>}
          <div className="space-y-3">
            {sessions.map((s) => (
              <Link key={s.id} to={`/sessions/${s.id}`} className="block bg-card rounded-xl p-4 border hover:border-primary/40">
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <h3 className="font-semibold">{s.title}</h3>
                    <p className="text-xs text-muted-foreground inline-flex items-center gap-1 mt-1"><Calendar className="w-3 h-3" /> {new Date(s.scheduled_at).toLocaleString()}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Recent session reviews</h2>
          {reviews.length === 0 && <p className="text-muted-foreground text-sm">No reviews yet.</p>}
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
