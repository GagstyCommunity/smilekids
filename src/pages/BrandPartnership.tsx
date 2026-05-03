import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";
import { Megaphone, TrendingUp, Users } from "lucide-react";

const schema = z.object({
  company: z.string().trim().min(1).max(120),
  contact_name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(50).optional().or(z.literal("")),
  budget: z.string().trim().max(50).optional().or(z.literal("")),
  message: z.string().trim().min(10).max(2000),
});

export default function BrandPartnership() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ company: "", contact_name: "", email: "", phone: "", budget: "", message: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) return toast.error(parsed.error.errors[0]?.message ?? "Invalid input");
    setLoading(true);
    const { error } = await supabase.from("brand_inquiries").insert({
      company: parsed.data.company,
      contact_name: parsed.data.contact_name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      budget: parsed.data.budget || null,
      message: parsed.data.message,
    });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Thanks! Our partnerships team will reach out soon.");
    setForm({ company: "", contact_name: "", email: "", phone: "", budget: "", message: "" });
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12 max-w-4xl">
        <header className="text-center mb-10">
          <Megaphone className="w-12 h-12 text-primary mx-auto mb-3" />
          <h1 className="text-4xl font-bold mb-3">Brand Partnerships</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Reach engaged families, parents and oral-care enthusiasts. Let's build something together.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {[
            { icon: Users, title: "Engaged audience", desc: "Active daily users across kids, adults, pregnancy" },
            { icon: TrendingUp, title: "Measurable ROI", desc: "Performance dashboards & full attribution" },
            { icon: Megaphone, title: "Native placements", desc: "Sponsored modules, blog, live sessions" },
          ].map((b) => (
            <div key={b.title} className="bg-card rounded-2xl p-5 border text-center">
              <b.icon className="w-6 h-6 text-primary mx-auto mb-2" />
              <h3 className="font-semibold mb-1">{b.title}</h3>
              <p className="text-sm text-muted-foreground">{b.desc}</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-6 border space-y-4">
          <h2 className="font-semibold text-lg">Tell us about your brand</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Company *</Label><Input required value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} /></div>
            <div className="space-y-2"><Label>Contact name *</Label><Input required value={form.contact_name} onChange={(e) => setForm({ ...form, contact_name: e.target.value })} /></div>
            <div className="space-y-2"><Label>Email *</Label><Input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
            <div className="space-y-2"><Label>Phone</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
            <div className="space-y-2 md:col-span-2"><Label>Estimated budget</Label><Input placeholder="e.g. $5k–$25k / month" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} /></div>
            <div className="space-y-2 md:col-span-2"><Label>What are you looking to do? *</Label><Textarea rows={5} required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} /></div>
          </div>
          <Button disabled={loading} className="w-full bg-gradient-primary">
            {loading ? "Sending..." : "Submit inquiry"}
          </Button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
