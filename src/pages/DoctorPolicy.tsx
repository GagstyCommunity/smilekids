import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { Stethoscope, AlertTriangle, Check, X } from "lucide-react";

export default function DoctorPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold">Doctor Advertising Policy</h1>
                <p className="text-muted-foreground">Guidelines for dental professionals on SmileOS</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Last Updated: January 2024</p>
          </div>

          <div className="bg-warning/10 border border-warning/20 rounded-2xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-warning flex-shrink-0" />
              <div>
                <h2 className="font-bold text-warning mb-2">Important Notice</h2>
                <p className="text-sm text-foreground/80">
                  SmileOS is a <strong>wellness education platform</strong>, not a medical service directory. 
                  All doctor profiles and content must focus on educational content and wellness guidance, 
                  not clinical services or medical treatment advertising.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <section className="bg-card rounded-2xl p-6 border border-border/50 shadow-card">
              <h2 className="text-xl font-bold mb-4">Permitted Activities</h2>
              <div className="space-y-3">
                {[
                  "Host educational webinars on oral wellness topics",
                  "Share preventive care tips and wellness guidance",
                  "Discuss general oral health habits and routines",
                  "Provide answers to wellness-related questions in community",
                  "Share your educational background and wellness philosophy",
                  "Recommend when users should consult a dental professional",
                  "Offer free or paid educational sessions"
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-success" />
                    </div>
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-card rounded-2xl p-6 border border-border/50 shadow-card">
              <h2 className="text-xl font-bold mb-4">Prohibited Activities</h2>
              <div className="space-y-3">
                {[
                  "Providing medical diagnoses or second opinions",
                  "Recommending specific treatments or procedures",
                  "Advertising clinical services or treatment pricing",
                  "Making claims about curing dental conditions",
                  "Soliciting patients for your practice",
                  "Sharing before/after treatment photos",
                  "Guaranteeing treatment outcomes",
                  "Providing prescriptions or medication advice",
                  "Disparaging other dental professionals",
                  "Collecting patient health information through the platform"
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X className="w-3 h-3 text-destructive" />
                    </div>
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-card rounded-2xl p-6 border border-border/50 shadow-card">
              <h2 className="text-xl font-bold mb-4">Content Requirements</h2>
              <div className="prose prose-sm text-muted-foreground max-w-none space-y-4">
                <h3 className="text-foreground font-semibold">Profile Requirements</h3>
                <ul>
                  <li>Accurate representation of qualifications and experience</li>
                  <li>Focus on educational expertise, not clinical services</li>
                  <li>Professional, non-promotional language</li>
                  <li>Valid contact information for support purposes only</li>
                </ul>

                <h3 className="text-foreground font-semibold">Webinar Requirements</h3>
                <ul>
                  <li>Clear wellness/educational focus in title and description</li>
                  <li>No promotion of specific clinical treatments</li>
                  <li>Include wellness disclaimer at start and end</li>
                  <li>Q&A must remain within wellness scope</li>
                </ul>

                <h3 className="text-foreground font-semibold">Required Disclaimers</h3>
                <p>All content must include appropriate disclaimers such as:</p>
                <div className="bg-muted/50 p-4 rounded-lg italic">
                  "This session is for educational and wellness purposes only. It does not constitute 
                  medical advice, diagnosis, or treatment. Always consult with a qualified dental 
                  professional for personalized care."
                </div>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-6 border border-border/50 shadow-card">
              <h2 className="text-xl font-bold mb-4">Compliance & Enforcement</h2>
              <div className="prose prose-sm text-muted-foreground max-w-none space-y-4">
                <p>
                  SmileOS reviews all doctor profiles and content for compliance. Violations may result in:
                </p>
                <ul>
                  <li><strong>First violation:</strong> Warning and content modification request</li>
                  <li><strong>Second violation:</strong> Temporary profile suspension</li>
                  <li><strong>Third violation:</strong> Permanent removal from platform</li>
                  <li><strong>Severe violations:</strong> Immediate removal and potential legal action</li>
                </ul>

                <p>
                  For questions about this policy, contact{" "}
                  <a href="mailto:partners@smileos.com" className="text-primary">
                    partners@smileos.com
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
