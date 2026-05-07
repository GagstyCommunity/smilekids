import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Baby, Plus, Trash2, Pencil } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const AVATARS = ["👧", "👦", "🧒", "👶", "🧑", "👨", "👩"];

interface Child {
  id: string;
  name: string;
  age: number | null;
  avatar_url: string | null;
  notes: string | null;
}

export default function ChildProfiles() {
  const { user, loading } = useAuth();
  const [children, setChildren] = useState<Child[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Child | null>(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [avatar, setAvatar] = useState("👧");
  const [notes, setNotes] = useState("");

  async function load() {
    if (!user) return;
    const { data, error } = await supabase.from("child_profiles").select("*").order("created_at");
    if (error) toast.error(error.message);
    else setChildren((data ?? []) as Child[]);
  }

  useEffect(() => { load(); }, [user]);

  function reset() {
    setEditing(null); setName(""); setAge(""); setAvatar("👧"); setNotes("");
  }

  function openAdd() { reset(); setOpen(true); }
  function openEdit(c: Child) {
    setEditing(c); setName(c.name); setAge(c.age?.toString() ?? "");
    setAvatar(c.avatar_url ?? "👧"); setNotes(c.notes ?? ""); setOpen(true);
  }

  async function save() {
    if (!user) return toast.error("Sign in required");
    if (!name.trim()) return toast.error("Name required");
    const payload = {
      parent_id: user.id,
      name: name.trim().slice(0, 60),
      age: age ? Math.max(0, Math.min(25, parseInt(age))) : null,
      avatar_url: avatar,
      notes: notes.trim().slice(0, 500) || null,
    };
    const res = editing
      ? await supabase.from("child_profiles").update(payload).eq("id", editing.id)
      : await supabase.from("child_profiles").insert(payload);
    if (res.error) return toast.error(res.error.message);
    toast.success(editing ? "Updated" : "Child added");
    setOpen(false); reset(); load();
  }

  async function remove(id: string) {
    if (!confirm("Remove this child profile?")) return;
    const { error } = await supabase.from("child_profiles").delete().eq("id", id);
    if (error) toast.error(error.message); else { toast.success("Removed"); load(); }
  }

  if (loading) return null;
  if (!user) {
    return (
      <div className="min-h-screen bg-background"><Header />
        <main className="container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Sign in to manage your kids</h1>
          <Button asChild className="bg-gradient-primary"><Link to="/login">Log in</Link></Button>
        </main><Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-2 flex items-center gap-3">
              <Baby className="w-8 h-8 text-primary" /> Kids Profiles
            </h1>
            <p className="text-muted-foreground">Add your kids in seconds and track their oral health.</p>
          </div>
          <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) reset(); }}>
            <DialogTrigger asChild>
              <Button onClick={openAdd} className="bg-gradient-primary shadow-glow"><Plus className="mr-2 w-4 h-4" />Add Child</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>{editing ? "Edit child" : "Add a child"}</DialogTitle></DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Avatar</Label>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {AVATARS.map(a => (
                      <button key={a} type="button" onClick={() => setAvatar(a)}
                        className={`w-12 h-12 text-2xl rounded-xl border-2 ${avatar === a ? "border-primary bg-primary/10" : "border-border"}`}>{a}</button>
                    ))}
                  </div>
                </div>
                <div><Label htmlFor="n">Name *</Label><Input id="n" value={name} onChange={e => setName(e.target.value)} maxLength={60} /></div>
                <div><Label htmlFor="a">Age</Label><Input id="a" type="number" min={0} max={25} value={age} onChange={e => setAge(e.target.value)} /></div>
                <div><Label htmlFor="no">Notes (allergies, braces, etc.)</Label><Textarea id="no" value={notes} onChange={e => setNotes(e.target.value)} maxLength={500} /></div>
              </div>
              <DialogFooter><Button onClick={save} className="bg-gradient-primary">{editing ? "Save" : "Add"}</Button></DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {children.length === 0 ? (
          <Card><CardContent className="py-16 text-center text-muted-foreground">
            No kids added yet. Click <strong>Add Child</strong> to get started.
          </CardContent></Card>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {children.map(c => (
              <Card key={c.id}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-3"><span className="text-3xl">{c.avatar_url}</span>{c.name}</span>
                    <span className="flex gap-1">
                      <Button size="icon" variant="ghost" onClick={() => openEdit(c)}><Pencil className="w-4 h-4" /></Button>
                      <Button size="icon" variant="ghost" onClick={() => remove(c.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  {c.age != null && <div>Age: {c.age}</div>}
                  {c.notes && <div className="mt-1">{c.notes}</div>}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
