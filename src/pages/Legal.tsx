import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle } from "lucide-react";

export default function Legal() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold mb-2">Legal Information</h1>
            <p className="text-muted-foreground">Terms, privacy, and important disclaimers</p>
          </div>

          {/* Important Disclaimer */}
          <div className="bg-warning/10 border border-warning/20 rounded-2xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-warning flex-shrink-0" />
              <div>
                <h2 className="font-bold text-warning mb-2">Important Medical Disclaimer</h2>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  Denta.Health is a <strong>wellness guidance platform</strong> and does <strong>NOT</strong> provide 
                  medical diagnoses, treatment recommendations, or professional dental advice. All AI-generated 
                  insights are for informational and educational purposes only. Always consult with a qualified 
                  dental professional for any oral health concerns or before making any decisions related to 
                  your dental health.
                </p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="disclaimer" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="disclaimer">Medical Disclaimer</TabsTrigger>
              <TabsTrigger value="terms">Terms of Service</TabsTrigger>
              <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
            </TabsList>

            <TabsContent value="disclaimer" className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
              <h2 className="text-xl font-bold mb-4">Medical Disclaimer</h2>
              <div className="prose prose-sm text-muted-foreground max-w-none space-y-4">
                <p>
                  <strong>Last Updated:</strong> January 2024
                </p>
                
                <h3 className="text-foreground font-semibold mt-6">No Medical Advice</h3>
                <p>
                  The information provided by Denta.Health ("we", "us", or "our") on our website and mobile 
                  application is for general informational and wellness guidance purposes only. All 
                  information on the Site and App is provided in good faith, however, we make no 
                  representation or warranty of any kind, express or implied, regarding the accuracy, 
                  adequacy, validity, reliability, availability, or completeness of any information.
                </p>

                <h3 className="text-foreground font-semibold mt-6">Not a Substitute for Professional Care</h3>
                <p>
                  Denta.Health is NOT a substitute for professional dental examination, diagnosis, or treatment. 
                  Never disregard professional dental advice or delay in seeking it because of something 
                  you have read or received through our Service.
                </p>

                <h3 className="text-foreground font-semibold mt-6">AI Limitations</h3>
                <p>
                  Our AI-powered features use machine learning algorithms to provide wellness indicators 
                  and suggestions. These algorithms are not infallible and cannot account for individual 
                  variations, medical history, or conditions not visible in photographs. The AI should be 
                  used as a supplementary tool, not a primary diagnostic method.
                </p>

                <h3 className="text-foreground font-semibold mt-6">Probability-Based Language</h3>
                <p>
                  All assessments provided by Denta.Health use probability-based language (e.g., "may indicate", 
                  "might suggest", "could be related to"). These statements reflect the uncertain nature 
                  of wellness indicators and should not be interpreted as definitive diagnoses.
                </p>

                <h3 className="text-foreground font-semibold mt-6">Emergency Situations</h3>
                <p>
                  If you are experiencing a dental emergency, severe pain, trauma to the mouth, or any 
                  condition that requires immediate attention, please contact emergency services or visit 
                  your nearest emergency dental clinic immediately.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="terms" className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
              <h2 className="text-xl font-bold mb-4">Terms of Service</h2>
              <div className="prose prose-sm text-muted-foreground max-w-none space-y-4">
                <p>
                  <strong>Last Updated:</strong> January 2024
                </p>
                
                <h3 className="text-foreground font-semibold mt-6">1. Acceptance of Terms</h3>
                <p>
                  By accessing and using Denta.Health, you accept and agree to be bound by the terms and 
                  provision of this agreement. If you do not agree to abide by the above, please do not 
                  use this service.
                </p>

                <h3 className="text-foreground font-semibold mt-6">2. Use License</h3>
                <p>
                  Permission is granted to temporarily use Denta.Health for personal, non-commercial wellness 
                  tracking purposes only. This is the grant of a license, not a transfer of title.
                </p>

                <h3 className="text-foreground font-semibold mt-6">3. User Accounts</h3>
                <p>
                  You are responsible for safeguarding the password that you use to access the Service 
                  and for any activities or actions under your password. You agree not to disclose your 
                  password to any third party.
                </p>

                <h3 className="text-foreground font-semibold mt-6">4. Subscription and Billing</h3>
                <p>
                  Some parts of the Service are billed on a subscription basis. You will be billed in 
                  advance on a recurring and periodic basis. Billing cycles are set on a monthly or 
                  annual basis depending on the type of subscription plan you select.
                </p>

                <h3 className="text-foreground font-semibold mt-6">5. Limitation of Liability</h3>
                <p>
                  In no event shall Denta.Health or its suppliers be liable for any damages arising out of 
                  the use or inability to use the materials on Denta.Health's website or application.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="privacy" className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
              <h2 className="text-xl font-bold mb-4">Privacy Policy</h2>
              <div className="prose prose-sm text-muted-foreground max-w-none space-y-4">
                <p>
                  <strong>Last Updated:</strong> January 2024
                </p>
                
                <h3 className="text-foreground font-semibold mt-6">Information We Collect</h3>
                <p>
                  We collect information you provide directly to us, such as when you create an account, 
                  upload photos for analysis, log habits, or contact us for support. This may include 
                  your name, email address, and dental photos.
                </p>

                <h3 className="text-foreground font-semibold mt-6">How We Use Your Information</h3>
                <p>
                  We use the information we collect to provide, maintain, and improve our services, 
                  process your uploads for AI analysis, send you technical notices and support messages, 
                  and respond to your comments and questions.
                </p>

                <h3 className="text-foreground font-semibold mt-6">Data Security</h3>
                <p>
                  We use industry-standard encryption to protect your data. Your dental photos are 
                  processed securely and are not shared with third parties. You can request deletion 
                  of your photos at any time.
                </p>

                <h3 className="text-foreground font-semibold mt-6">Your Rights</h3>
                <p>
                  You have the right to access, correct, or delete your personal data. You can also 
                  request a copy of all data we have about you or opt out of marketing communications 
                  at any time.
                </p>

                <h3 className="text-foreground font-semibold mt-6">Contact Us</h3>
                <p>
                  If you have any questions about this Privacy Policy, please contact us at 
                  privacy@denta.health
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
