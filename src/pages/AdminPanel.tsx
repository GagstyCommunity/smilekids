import { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Shield, CheckCircle2, XCircle, Trash2, Plus } from "lucide-react";

export default function AdminPanel() {
  const { user, isAdmin, loading } = useAuth();

  if (loading) return null;
  if (!user || !isAdmin) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold flex items-center gap-3">
            <Shield className="w-8 h-8 text-primary" /> Admin Panel
          </h1>
          <p className="text-muted-foreground">Manage users, dentists, content, and inquiries.</p>
        </div>
        <Tabs defaultValue="users">
          <TabsList className="flex-wrap">
            <TabsTrigger value="users">Users & Roles</TabsTrigger>
            <TabsTrigger value="dentists">Dentists</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
            <TabsTrigger value="learning">Learning</TabsTrigger>
            <TabsTrigger value="forum">Forum</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="inquiries">Brand Inquiries</TabsTrigger>
          </TabsList>
          <TabsContent value="users"><UsersTab /></TabsContent>
          <TabsContent value="dentists"><DentistsTab /></TabsContent>
          <TabsContent value="blog"><BlogTab /></TabsContent>
          <TabsContent value="learning"><LearningTab /></TabsContent>
          <TabsContent value="forum"><ForumTab /></TabsContent>
          <TabsContent value="sessions"><SessionsTab /></TabsContent>
          <TabsContent value="inquiries"><InquiriesTab /></TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}

function UsersTab() {
  const [rows, setRows] = useState<any[]>([]);
  const [email, setEmail] = useState(""); // user_id
  const [role, setRole] = useState<"user" | "dentist" | "admin">("dentist");
  async function load() {
    const { data: profiles } = await supabase.from("profiles").select("*").order("created_at", { ascending: false }).limit(200);
    const { data: roles } = await supabase.from("user_roles").select("*");
    const merged = (profiles ?? []).map((p: any) => ({ ...p, roles: (roles ?? []).filter((r: any) => r.user_id === p.id).map((r: any) => r.role) }));
    setRows(merged);
  }
  useEffect(() => { load(); }, []);
  async function grant(uid: string, r: string) {
    const { error } = await supabase.from("user_roles").insert({ user_id: uid, role: r as any });
    if (error) toast.error(error.message); else { toast.success("Granted"); load(); }
  }
  async function revoke(uid: string, r: string) {
    const { error } = await supabase.from("user_roles").delete().eq("user_id", uid).eq("role", r);
    if (error) toast.error(error.message); else { toast.success("Revoked"); load(); }
  }
  return (
    <Card className="mt-4"><CardHeader><CardTitle>Users ({rows.length})</CardTitle></CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4 items-end">
          <div className="flex-1"><Label>User ID</Label><Input value={email} onChange={e => setEmail(e.target.value)} placeholder="uuid" /></div>
          <div><Label>Role</Label>
            <select className="h-10 border rounded-md px-2 bg-background" value={role} onChange={e => setRole(e.target.value as any)}>
              <option value="user">user</option><option value="dentist">dentist</option><option value="admin">admin</option>
            </select>
          </div>
          <Button onClick={() => email && grant(email, role)}><Plus className="w-4 h-4 mr-1" />Grant</Button>
        </div>
        <Table><TableHeader><TableRow><TableHead>Name</TableHead><TableHead>ID</TableHead><TableHead>Roles</TableHead><TableHead></TableHead></TableRow></TableHeader>
          <TableBody>{rows.map(r => (
            <TableRow key={r.id}><TableCell>{r.display_name ?? "—"}</TableCell><TableCell className="font-mono text-xs">{r.id}</TableCell>
              <TableCell><div className="flex gap-1 flex-wrap">{r.roles.map((rr: string) => (
                <Badge key={rr} variant="secondary" className="cursor-pointer" onClick={() => revoke(r.id, rr)}>{rr} ✕</Badge>
              ))}</div></TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}</TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function DentistsTab() {
  const [rows, setRows] = useState<any[]>([]);
  async function load() {
    const { data } = await supabase.from("dentist_profiles").select("*").order("created_at", { ascending: false });
    setRows(data ?? []);
  }
  useEffect(() => { load(); }, []);
  async function setVerified(id: string, v: boolean) {
    const { error } = await supabase.from("dentist_profiles").update({ verified: v }).eq("id", id);
    if (error) toast.error(error.message); else { toast.success(v ? "Verified" : "Unverified"); load(); }
  }
  async function del(id: string) {
    if (!confirm("Delete dentist profile?")) return;
    const { error } = await supabase.from("dentist_profiles").delete().eq("id", id);
    if (error) toast.error(error.message); else load();
  }
  return (
    <Card className="mt-4"><CardHeader><CardTitle>Dentists ({rows.length})</CardTitle></CardHeader>
      <CardContent><Table><TableHeader><TableRow><TableHead>Name</TableHead><TableHead>City</TableHead><TableHead>Specialty</TableHead><TableHead>Verified</TableHead><TableHead></TableHead></TableRow></TableHeader>
        <TableBody>{rows.map(r => (
          <TableRow key={r.id}><TableCell>{r.full_name}</TableCell><TableCell>{r.city ?? "—"}</TableCell><TableCell>{r.specialty ?? "—"}</TableCell>
            <TableCell>{r.verified ? <CheckCircle2 className="w-4 h-4 text-success" /> : <XCircle className="w-4 h-4 text-muted-foreground" />}</TableCell>
            <TableCell className="space-x-1">
              <Button size="sm" variant="outline" onClick={() => setVerified(r.id, !r.verified)}>{r.verified ? "Unverify" : "Verify"}</Button>
              <Button size="sm" variant="ghost" onClick={() => del(r.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
            </TableCell>
          </TableRow>
        ))}</TableBody>
      </Table></CardContent>
    </Card>
  );
}

function BlogTab() {
  return <ContentEditor table="blog_posts" title="Blog Posts" fields={["title","slug","excerpt","content","cover_image"]} />;
}
function LearningTab() {
  return <ContentEditor table="learning_modules" title="Learning Modules" fields={["title","slug","summary","content","cover_image","level","audience"]} />;
}

function ContentEditor({ table, title, fields }: { table: "blog_posts" | "learning_modules"; title: string; fields: string[] }) {
  const [rows, setRows] = useState<any[]>([]);
  const [form, setForm] = useState<any>({});
  async function load() { const { data } = await supabase.from(table).select("*").order("created_at", { ascending: false }); setRows(data ?? []); }
  useEffect(() => { load(); }, []);
  async function save() {
    if (!form.title || !form.slug) return toast.error("Title and slug required");
    const { error } = form.id
      ? await supabase.from(table).update(form).eq("id", form.id)
      : await supabase.from(table).insert(form);
    if (error) toast.error(error.message); else { toast.success("Saved"); setForm({}); load(); }
  }
  async function del(id: string) {
    if (!confirm("Delete?")) return;
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) toast.error(error.message); else load();
  }
  return (
    <div className="grid lg:grid-cols-2 gap-4 mt-4">
      <Card><CardHeader><CardTitle>{form.id ? "Edit" : "New"} {title}</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {fields.map(f => (
            <div key={f}>
              <Label className="capitalize">{f.replace("_", " ")}</Label>
              {f === "content" || f === "summary" || f === "excerpt"
                ? <Textarea value={form[f] ?? ""} onChange={e => setForm({ ...form, [f]: e.target.value })} rows={f === "content" ? 6 : 2} />
                : <Input value={form[f] ?? ""} onChange={e => setForm({ ...form, [f]: e.target.value })} />}
            </div>
          ))}
          <div className="flex gap-2">
            <Button onClick={save} className="bg-gradient-primary">Save</Button>
            {form.id && <Button variant="outline" onClick={() => setForm({})}>Cancel</Button>}
          </div>
        </CardContent>
      </Card>
      <Card><CardHeader><CardTitle>{title} ({rows.length})</CardTitle></CardHeader>
        <CardContent className="space-y-2 max-h-[600px] overflow-y-auto">
          {rows.map(r => (
            <div key={r.id} className="flex items-center justify-between p-2 rounded border">
              <div><div className="font-medium">{r.title}</div><div className="text-xs text-muted-foreground">/{r.slug}</div></div>
              <div className="flex gap-1">
                <Button size="sm" variant="ghost" onClick={() => setForm(r)}>Edit</Button>
                <Button size="sm" variant="ghost" onClick={() => del(r.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function ForumTab() {
  const [posts, setPosts] = useState<any[]>([]);
  async function load() { const { data } = await supabase.from("forum_posts").select("*").order("created_at", { ascending: false }).limit(100); setPosts(data ?? []); }
  useEffect(() => { load(); }, []);
  async function del(id: string) {
    if (!confirm("Delete post?")) return;
    const { error } = await supabase.from("forum_posts").delete().eq("id", id);
    if (error) toast.error(error.message); else load();
  }
  return (<Card className="mt-4"><CardHeader><CardTitle>Forum Posts ({posts.length})</CardTitle></CardHeader>
    <CardContent className="space-y-2">{posts.map(p => (
      <div key={p.id} className="flex items-center justify-between p-2 border rounded">
        <div><div className="font-medium">{p.title}</div><div className="text-xs text-muted-foreground line-clamp-1">{p.body}</div></div>
        <Button size="sm" variant="ghost" onClick={() => del(p.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
      </div>
    ))}</CardContent></Card>);
}

function SessionsTab() {
  const [rows, setRows] = useState<any[]>([]);
  async function load() { const { data } = await supabase.from("live_sessions").select("*").order("scheduled_at", { ascending: false }); setRows(data ?? []); }
  useEffect(() => { load(); }, []);
  async function del(id: string) {
    if (!confirm("Delete session?")) return;
    const { error } = await supabase.from("live_sessions").delete().eq("id", id);
    if (error) toast.error(error.message); else load();
  }
  return (<Card className="mt-4"><CardHeader><CardTitle>Live Sessions ({rows.length})</CardTitle></CardHeader>
    <CardContent className="space-y-2">{rows.map(r => (
      <div key={r.id} className="flex items-center justify-between p-2 border rounded">
        <div><div className="font-medium">{r.title}</div><div className="text-xs text-muted-foreground">{new Date(r.scheduled_at).toLocaleString()}</div></div>
        <Button size="sm" variant="ghost" onClick={() => del(r.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
      </div>
    ))}</CardContent></Card>);
}

function InquiriesTab() {
  const [rows, setRows] = useState<any[]>([]);
  useEffect(() => { supabase.from("brand_inquiries").select("*").order("created_at", { ascending: false }).then(({ data }) => setRows(data ?? [])); }, []);
  return (<Card className="mt-4"><CardHeader><CardTitle>Brand Inquiries ({rows.length})</CardTitle></CardHeader>
    <CardContent className="space-y-2">{rows.map(r => (
      <div key={r.id} className="p-3 border rounded">
        <div className="flex justify-between"><div className="font-medium">{r.company} — {r.contact_name}</div><div className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleDateString()}</div></div>
        <div className="text-sm text-muted-foreground">{r.email} {r.phone ? `• ${r.phone}` : ""} {r.budget ? `• ${r.budget}` : ""}</div>
        <p className="text-sm mt-1">{r.message}</p>
      </div>
    ))}</CardContent></Card>);
}
