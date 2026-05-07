import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { 
  Handshake, 
  DollarSign, 
  Users, 
  TrendingUp,
  Check,
  ArrowRight,
  Building,
  Stethoscope,
  ShoppingBag
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const partnerTypes = [
  {
    icon: Stethoscope,
    title: "Dental Professionals",
    description: "Grow your practice with Denta.Health's city-wise visibility and webinar platform.",
    benefits: [
      "Featured city listing",
      "Host paid webinars",
      "Lead generation",
      "Parent community access"
    ]
  },
  {
    icon: Building,
    title: "Dental Clinics",
    description: "Integrate Denta.Health into your patient engagement strategy.",
    benefits: [
      "White-label options",
      "Patient engagement tools",
      "Analytics dashboard",
      "Priority support"
    ]
  },
  {
    icon: ShoppingBag,
    title: "Oral Care Brands",
    description: "Reach engaged, health-conscious families through Denta.Health.",
    benefits: [
      "Product recommendations",
      "Sponsored content",
      "User surveys",
      "Brand awareness"
    ]
  }
];

const stats = [
  { value: "50K+", label: "Active Users" },
  { value: "100+", label: "Cities" },
  { value: "35%", label: "Avg Engagement Rate" },
  { value: "92%", label: "User Satisfaction" }
];

export default function Partners() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: "Application Received!",
      description: "Our partnerships team will contact you within 2 business days.",
    });
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-primary/5 to-background">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Handshake className="w-4 h-4" />
                Partner Program
              </div>
              <h1 className="text-3xl lg:text-5xl font-bold mb-6">
                Grow with{" "}
                <span className="text-gradient">Denta.Health</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Join our partner network and reach thousands of health-conscious 
                families across India. Whether you're a dental professional, clinic, 
                or oral care brand, we have a program for you.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-8 border-b border-border/50">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-bold text-primary">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partner Types */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold mb-4">
                Partnership Options
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Choose the partnership type that fits your business goals.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {partnerTypes.map((type) => (
                <div 
                  key={type.title}
                  className="bg-card rounded-2xl p-6 border border-border/50 shadow-card"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4">
                    <type.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{type.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{type.description}</p>
                  <ul className="space-y-2">
                    {type.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-success" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section className="py-16 bg-muted/50">
          <div className="container">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Apply to Partner</h2>
                <p className="text-muted-foreground">
                  Fill out the form below and our partnerships team will reach out.
                </p>
              </div>
              <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-card">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="Your name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company / Clinic Name</Label>
                      <Input id="company" placeholder="Company name" required />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="you@company.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" placeholder="+91 9876543210" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Partnership Interest</Label>
                    <select 
                      id="type"
                      className="w-full h-10 px-3 rounded-md border border-input bg-background"
                      required
                    >
                      <option value="">Select partnership type</option>
                      <option value="professional">Dental Professional</option>
                      <option value="clinic">Dental Clinic</option>
                      <option value="brand">Oral Care Brand</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Tell us about your goals</Label>
                    <Textarea 
                      id="message"
                      placeholder="How would you like to partner with Denta.Health?"
                      rows={4}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
