import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { ShieldCheck, Stethoscope, Users, Calendar } from "lucide-react";

export default function ForProfessionals() {
  const { user, isDentist } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({
    full_name: "", license_number: "", specialty: "", clinic_name: "",
    city: "", country: "", website: "", bio: "",
  });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) {
      toast.error("Please create an account first");
      return nav("/signup");
    }
    setLoading(true);
    const { error } = await supabase.from("dentist_profiles").upsert({ user_id: user.id, ...form });
    if (!error) {
      await supabase.from("user_roles").insert({ user_id: user.id, role: "dentist" });
    }
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Application submitted! Verification pending.");
    nav("/dentist-dashboard");
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12 max-w-4xl">
        <header className="text-center mb-10">
          <Stethoscope className="w-12 h-12 text-primary mx-auto mb-3" />
          <h1 className="text-4xl font-bold mb-3">Register as a Dentist</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join Denta.Health as a verified professional. Reach thousands of families, host live sessions, answer community questions, and grow your patient base.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {[
            { icon: ShieldCheck, title: "Verified Badge", desc: "Stand out with a trusted Verified Doctor mark" },
            { icon: Users, title: "Community Visibility", desc: "Answer real patient questions and build authority" },
            { icon: Calendar, title: "Live Sessions", desc: "Host webinars with external links (Zoom, Meet)" },
          ].map((b) => (
            <div key={b.title} className="bg-card rounded-2xl p-5 border text-center">
              <b.icon className="w-6 h-6 text-primary mx-auto mb-2" />
              <h3 className="font-semibold mb-1">{b.title}</h3>
              <p className="text-sm text-muted-foreground">{b.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-8 text-sm">
          <strong>Independence disclaimer:</strong> Registered dentists are independent professionals.
          They are not employees, agents or official representatives of Denta.Health. Their advice does not
          constitute Denta.Health medical guidance.
        </div>

        <div className="bg-primary/10 border border-primary/30 rounded-xl p-5 mb-8">
          <h3 className="font-semibold mb-1">Professional Subscription — $99/month</h3>
          <p className="text-sm text-muted-foreground">
            Maintain your Verified Doctor profile, community commenting privileges, and live session hosting.
            Billing will be activated after verification. (Stripe integration coming next.)
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-6 border space-y-4">
          <h2 className="font-semibold text-lg">Your professional details</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Full Name *</Label><Input required value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} /></div>
            <div className="space-y-2"><Label>License Number</Label><Input value={form.license_number} onChange={(e) => setForm({ ...form, license_number: e.target.value })} /></div>
            <div className="space-y-2"><Label>Specialty</Label><Input placeholder="e.g. Pediatric Dentistry" value={form.specialty} onChange={(e) => setForm({ ...form, specialty: e.target.value })} /></div>
            <div className="space-y-2"><Label>Clinic Name</Label><Input value={form.clinic_name} onChange={(e) => setForm({ ...form, clinic_name: e.target.value })} /></div>
            <div className="space-y-2"><Label>City</Label><Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} /></div>
            <div className="space-y-2"><Label>Country</Label><Input value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} /></div>
            <div className="space-y-2 md:col-span-2"><Label>Website</Label><Input type="url" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} /></div>
            <div className="space-y-2 md:col-span-2"><Label>Professional Bio</Label><Textarea rows={4} maxLength={1000} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} /></div>
          </div>
          <Button disabled={loading} className="w-full bg-gradient-primary">
            {loading ? "Submitting..." : isDentist ? "Update profile" : "Submit application"}
          </Button>
          {!user && <p className="text-xs text-muted-foreground text-center">You'll be asked to <Link to="/signup" className="text-primary">create an account</Link> first.</p>}
        </form>
      </main>
      <Footer />
    </div>
  );
}
