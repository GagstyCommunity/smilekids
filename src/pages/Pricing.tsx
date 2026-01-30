import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Star, Zap } from "lucide-react";

const plans = [
  {
    name: "Free",
    description: "Get started with basic oral wellness tracking",
    price: "$0",
    period: "forever",
    features: [
      "1 AI teeth scan per month",
      "Daily protection score",
      "Basic habit tracking",
      "Educational content",
      "Email support",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    description: "Advanced features for serious oral wellness",
    price: "$9.99",
    period: "/month",
    features: [
      "Unlimited AI teeth scans",
      "Advanced risk analysis",
      "Kids Mode dashboard",
      "Whitening simulator",
      "Eating advisor with photo analysis",
      "AI Chat with full history",
      "Priority support",
      "Custom reminders",
    ],
    cta: "Start Pro Trial",
    popular: true,
  },
  {
    name: "Family",
    description: "Complete solution for the whole family",
    price: "$19.99",
    period: "/month",
    features: [
      "Everything in Pro",
      "Up to 6 family members",
      "Family dashboard & analytics",
      "Shared achievements",
      "Family challenges",
      "Orthodontic tracking",
      "Dedicated support",
    ],
    cta: "Start Family Trial",
    popular: false,
  },
];

const faqs = [
  {
    question: "Is SmileOS a replacement for dental visits?",
    answer:
      "No. SmileOS is a wellness guidance tool designed to help you build better dental habits. It does not provide medical diagnoses and should not replace regular dental checkups.",
  },
  {
    question: "How accurate is the AI scan?",
    answer:
      "Our AI provides wellness indicators based on visible patterns. It's designed to highlight potential areas of attention, not to diagnose conditions. Always consult a dental professional for accurate diagnosis.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. We use industry-standard encryption and never share your personal health data with third parties. Your photos are processed securely and can be deleted at any time.",
  },
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero */}
        <section className="py-16 lg:py-24 bg-gradient-hero">
          <div className="container text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Star className="w-4 h-4" />
              Simple, Transparent Pricing
            </div>
            <h1 className="text-display font-bold mb-4">
              Choose Your <span className="text-gradient">Wellness Plan</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start free and upgrade as your oral wellness journey grows. All plans include our core features.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16 -mt-8">
          <div className="container">
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative rounded-2xl p-6 ${
                    plan.popular
                      ? "bg-gradient-primary text-primary-foreground shadow-glow scale-105 z-10"
                      : "bg-card shadow-card border border-border/50"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-warning text-warning-foreground text-xs font-bold">
                      Most Popular
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                    <p className={plan.popular ? "text-primary-foreground/80" : "text-muted-foreground"}>
                      {plan.description}
                    </p>
                  </div>

                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className={plan.popular ? "text-primary-foreground/80" : "text-muted-foreground"}>
                      {plan.period}
                    </span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className={`w-5 h-5 flex-shrink-0 ${plan.popular ? "" : "text-primary"}`} />
                        <span className={`text-sm ${plan.popular ? "text-primary-foreground/90" : ""}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-background text-foreground hover:bg-background/90"
                        : "bg-gradient-primary shadow-glow"
                    }`}
                    asChild
                  >
                    <Link to="/signup">{plan.cta}</Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enterprise */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto bg-card rounded-2xl p-8 shadow-card border border-border/50">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-bold mb-2">Enterprise Solutions</h3>
                  <p className="text-muted-foreground">
                    Looking for a custom solution for your dental practice, clinic, or organization? 
                    We offer white-label options and API access.
                  </p>
                </div>
                <Button variant="outline" size="lg">
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16">
          <div className="container max-w-3xl">
            <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.question} className="bg-card rounded-xl p-6 shadow-card border border-border/50">
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-primary">
          <div className="container text-center">
            <div className="max-w-2xl mx-auto">
              <Sparkles className="w-12 h-12 text-primary-foreground mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-primary-foreground mb-4">
                Start Your Wellness Journey Today
              </h2>
              <p className="text-primary-foreground/80 mb-8">
                Join thousands of users building healthier dental habits with SmileOS.
                No credit card required to start.
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="bg-background text-foreground hover:bg-background/90"
                asChild
              >
                <Link to="/signup">Get Started Free</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
