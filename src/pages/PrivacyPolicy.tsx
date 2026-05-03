import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12 max-w-3xl prose dark:prose-invert">
        <h1>Data Privacy Policy</h1>
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <p>SmileOS is a wellness guidance platform. We collect only what is needed to deliver a useful, safe experience.</p>
        <h2>What we collect</h2>
        <ul>
          <li>Account data — email, name, profile audience.</li>
          <li>Usage data — habits, scans, scores you create.</li>
          <li>Optional images — when you opt-in to AI scans.</li>
        </ul>
        <h2>How we use it</h2>
        <ul>
          <li>To provide your personalized recommendations.</li>
          <li>To improve product quality and reliability.</li>
          <li>To communicate updates you opted in to.</li>
        </ul>
        <h2>Your rights</h2>
        <p>You can request export or deletion of your data at any time from Settings, or by contacting us.</p>
        <h2>Disclaimer</h2>
        <p>SmileOS is not a medical service. Information shown is for wellness guidance only.</p>
      </main>
      <Footer />
    </div>
  );
}
