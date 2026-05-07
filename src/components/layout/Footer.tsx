import { Link } from "react-router-dom";
import { Sparkles, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg">Denta.Health</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm">
              Your AI Oral Health Coach. Wellness guidance, education, and a community for better daily habits.
            </p>
            <a href="mailto:smile@denta.health" className="text-sm text-primary inline-flex items-center gap-1 mt-3"><Mail className="w-3 h-3" /> smile@denta.health</a>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/features" className="hover:text-foreground">Features</Link></li>
              <li><Link to="/scan" className="hover:text-foreground">AI Scan</Link></li>
              <li><Link to="/learning" className="hover:text-foreground">Learning Center</Link></li>
              <li><Link to="/blog" className="hover:text-foreground">Blog</Link></li>
              <li><Link to="/pricing" className="hover:text-foreground">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/in" className="hover:text-foreground">Cities</Link></li>
              <li><Link to="/guides" className="hover:text-foreground">Guides</Link></li>
              <li><Link to="/community" className="hover:text-foreground">Community</Link></li>
              <li><Link to="/sessions" className="hover:text-foreground">Live Sessions</Link></li>
              <li><Link to="/for-professionals" className="hover:text-foreground">For Professionals</Link></li>
              <li><Link to="/brands" className="hover:text-foreground">Brand Partnerships</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/terms" className="hover:text-foreground">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-foreground">Privacy Policy</Link></li>
              <li><Link to="/cookies" className="hover:text-foreground">Cookies Policy</Link></li>
              <li><Link to="/community-guidelines" className="hover:text-foreground">Community Guidelines</Link></li>
              <li><Link to="/accessibility" className="hover:text-foreground">Accessibility</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Denta.Health. All rights reserved.</p>
          <p>Wellness guidance only. Not a substitute for professional dental care.</p>
        </div>
      </div>
    </footer>
  );
}
