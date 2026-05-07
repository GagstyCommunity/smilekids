import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { Shield, Users, AlertTriangle, Flag } from "lucide-react";

export default function CommunityGuidelines() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Users className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold">Community Guidelines</h1>
                <p className="text-muted-foreground">Rules for a safe and supportive community</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Last Updated: January 2024</p>
          </div>

          <div className="bg-warning/10 border border-warning/20 rounded-2xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-warning flex-shrink-0" />
              <div>
                <h2 className="font-bold text-warning mb-2">Important Reminder</h2>
                <p className="text-sm text-foreground/80">
                  Denta.Health is a <strong>wellness guidance community</strong>. All discussions are for 
                  educational and support purposes only. Never share or seek medical diagnoses, 
                  treatment plans, or professional dental advice in the community.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <section className="bg-card rounded-2xl p-6 border border-border/50 shadow-card">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Core Principles
              </h2>
              <div className="prose prose-sm text-muted-foreground max-w-none space-y-4">
                <h3 className="text-foreground font-semibold">1. Wellness Focus Only</h3>
                <p>
                  All content must focus on wellness, prevention, and education. Never provide or request:
                </p>
                <ul>
                  <li>Medical diagnoses or second opinions</li>
                  <li>Treatment recommendations or prescriptions</li>
                  <li>Professional dental advice</li>
                  <li>Claims about curing or treating conditions</li>
                </ul>

                <h3 className="text-foreground font-semibold">2. Be Respectful & Supportive</h3>
                <p>
                  Our community is built on mutual respect. We do not tolerate:
                </p>
                <ul>
                  <li>Harassment, bullying, or personal attacks</li>
                  <li>Discrimination of any kind</li>
                  <li>Shaming or judgmental comments</li>
                  <li>Aggressive or hostile behavior</li>
                </ul>

                <h3 className="text-foreground font-semibold">3. Share Experiences, Not Advice</h3>
                <p>
                  When participating in discussions, share your personal experiences rather than 
                  giving advice. Use phrases like "In my experience..." or "What worked for us was..." 
                  rather than "You should..." or "You need to..."
                </p>

                <h3 className="text-foreground font-semibold">4. Protect Privacy</h3>
                <p>
                  Do not share personal information about yourself or others, including:
                </p>
                <ul>
                  <li>Full names, addresses, or contact details</li>
                  <li>Photos of identifiable individuals without consent</li>
                  <li>Medical records or detailed health histories</li>
                  <li>Financial information</li>
                </ul>

                <h3 className="text-foreground font-semibold">5. No Commercial Activity</h3>
                <p>
                  The community is not a marketplace. Do not:
                </p>
                <ul>
                  <li>Promote products or services</li>
                  <li>Share affiliate links</li>
                  <li>Solicit business or clients</li>
                  <li>Spam or post repetitive content</li>
                </ul>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-6 border border-border/50 shadow-card">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Flag className="w-5 h-5 text-destructive" />
                Reporting & Moderation
              </h2>
              <div className="prose prose-sm text-muted-foreground max-w-none space-y-4">
                <p>
                  If you see content that violates these guidelines, please report it immediately 
                  using the report button on any post or comment. Our moderation team reviews all 
                  reports within 24 hours.
                </p>

                <h3 className="text-foreground font-semibold">Consequences of Violations</h3>
                <ul>
                  <li><strong>First offense:</strong> Warning and content removal</li>
                  <li><strong>Second offense:</strong> Temporary suspension (7 days)</li>
                  <li><strong>Third offense:</strong> Permanent ban from community</li>
                  <li><strong>Severe violations:</strong> Immediate permanent ban</li>
                </ul>

                <p>
                  For questions about these guidelines, contact us at{" "}
                  <a href="mailto:community@denta.health" className="text-primary">
                    community@denta.health
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
