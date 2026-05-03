import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function CookiesPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12 max-w-3xl prose dark:prose-invert">
        <h1>Cookies Policy</h1>
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <p>SmileOS uses cookies and similar technologies to operate the service, remember your preferences, and improve our product.</p>
        <h2>What we use cookies for</h2>
        <ul>
          <li><strong>Essential cookies</strong> — authentication, security, session continuity.</li>
          <li><strong>Analytics</strong> — anonymous usage to improve features.</li>
          <li><strong>Preferences</strong> — language, theme, audience selection.</li>
        </ul>
        <h2>Managing cookies</h2>
        <p>You can disable cookies in your browser settings. Some features will not function without essential cookies.</p>
      </main>
      <Footer />
    </div>
  );
}
