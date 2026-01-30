import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg">SmileOS</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your AI Oral Health Coach. Building better dental habits, one smile at a time.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/scan" className="hover:text-foreground transition-colors">AI Teeth Scan</Link></li>
              <li><Link to="/kids" className="hover:text-foreground transition-colors">Kids Mode</Link></li>
              <li><Link to="/advisor" className="hover:text-foreground transition-colors">Food Advisor</Link></li>
              <li><Link to="/chat" className="hover:text-foreground transition-colors">AI Chat</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
              <li><Link to="/about" className="hover:text-foreground transition-colors">About</Link></li>
              <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/legal" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link to="/legal" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
              <li><Link to="/legal" className="hover:text-foreground transition-colors">Medical Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2024 SmileOS. All rights reserved.</p>
          <p>This app provides wellness guidance only. Not a substitute for professional dental care.</p>
        </div>
      </div>
    </footer>
  );
}
