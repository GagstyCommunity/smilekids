import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12 max-w-3xl prose dark:prose-invert">
        <h1>Terms of Service</h1>
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <p>By using Denta.Health you agree to these terms. Denta.Health provides oral wellness guidance and educational content. It is not a substitute for professional dental care.</p>
        <h2>Accounts</h2>
        <p>You are responsible for activity on your account. Keep your password secure.</p>
        <h2>Professional accounts</h2>
        <p>Dentists registered on Denta.Health are independent professionals. They are not employees, agents or representatives of Denta.Health.</p>
        <h2>Acceptable use</h2>
        <p>No medical diagnosis, no harassment, no spam, no illegal content.</p>
        <h2>Liability</h2>
        <p>Denta.Health is provided "as is". Always consult a licensed dentist for medical advice.</p>
      </main>
      <Footer />
    </div>
  );
}
