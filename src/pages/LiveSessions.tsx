import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar, ExternalLink, Plus } from "lucide-react";
import { toast } from "sonner";

export default function LiveSessions() {
  const { user, isDentist } = useAuth();
  const [sessions, setSessions] = useState<any[]>([]);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", scheduled_at: "", external_link: "", duration_minutes: 60 });

  async function load() {
    const { data } = await supabase.from("live_sessions").select("*").gte("scheduled_at", new Date(Date.now() - 86400000 * 7).toISOString()).order("scheduled_at");
    setSessions(data ?? []);
  }
  useEffect(() => { load(); }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    const { error } = await supabase.from("live_sessions").insert({ ...form, dentist_id: user.id });
    if (error) return toast.error(error.message);
    toast.success("Session scheduled!");
    setCreating(false);
    setForm({ title: "", description: "", scheduled_at: "", external_link: "", duration_minutes: 60 });
    load();
  }

  async function handleRSVP(sessionId: string) {
    if (!user) return toast.error("Sign in to RSVP");
    const { error } = await supabase.from("session_rsvps").upsert({ session_id: sessionId, user_id: user.id }, { onConflict: "session_id,user_id" });
    if (error) return toast.error(error.message);
    toast.success("You're registered!");
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12 max-w-4xl">
        <header className="flex items-start justify-between flex-wrap gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Live Sessions</h1>
            <p className="text-muted-foreground">Free webinars hosted by verified dentists.</p>
          </div>
          {isDentist && (
            <Button onClick={() => setCreating((v) => !v)}><Plus className="w-4 h-4 mr-1" /> Host session</Button>
          )}
        </header>

        {creating && (
          <form onSubmit={handleCreate} className="bg-card rounded-2xl p-6 border space-y-3 mb-6">
            <div className="space-y-2"><Label>Title *</Label><Input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
            <div className="space-y-2"><Label>Description</Label><Textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="space-y-2"><Label>Date & time *</Label><Input type="datetime-local" required value={form.scheduled_at} onChange={(e) => setForm({ ...form, scheduled_at: e.target.value })} /></div>
              <div className="space-y-2"><Label>Duration (min)</Label><Input type="number" min={15} value={form.duration_minutes} onChange={(e) => setForm({ ...form, duration_minutes: +e.target.value })} /></div>
            </div>
            <div className="space-y-2"><Label>External link (Zoom / Meet) *</Label><Input type="url" required value={form.external_link} onChange={(e) => setForm({ ...form, external_link: e.target.value })} /></div>
            <Button type="submit">Schedule</Button>
          </form>
        )}

        <div className="space-y-3">
          {sessions.length === 0 && <p className="text-muted-foreground text-center py-12">No upcoming sessions yet.</p>}
          {sessions.map((s) => {
            const date = new Date(s.scheduled_at);
            const isPast = date.getTime() < Date.now();
            return (
              <div key={s.id} className="bg-card rounded-2xl p-5 border">
                <div className="flex justify-between items-start gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <Link to={`/sessions/${s.id}`} className="text-lg font-semibold hover:text-primary">{s.title}</Link>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{s.description}</p>
                    <p className="text-xs text-muted-foreground inline-flex items-center gap-1 mt-2"><Calendar className="w-3 h-3" /> {date.toLocaleString()} · {s.duration_minutes}m</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    {!isPast && <Button size="sm" onClick={() => handleRSVP(s.id)}>RSVP</Button>}
                    <a href={s.external_link} target="_blank" rel="noreferrer" className="text-xs text-primary inline-flex items-center gap-1 hover:underline"><ExternalLink className="w-3 h-3" /> Join link</a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}
