import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, X, Sparkles } from "lucide-react";

interface BIPEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const DISMISS_KEY = "denta:pwa-install-dismissed";

export function InstallPrompt() {
  const [evt, setEvt] = useState<BIPEvent | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(DISMISS_KEY)) return;
    const onBIP = (e: Event) => {
      e.preventDefault();
      setEvt(e as BIPEvent);
      setShow(true);
    };
    window.addEventListener("beforeinstallprompt", onBIP);
    return () => window.removeEventListener("beforeinstallprompt", onBIP);
  }, []);

  if (!show || !evt) return null;

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, "1");
    setShow(false);
  };

  const install = async () => {
    await evt.prompt();
    const { outcome } = await evt.userChoice;
    if (outcome === "accepted") setShow(false);
    else dismiss();
  };

  return (
    <div
      className="fixed bottom-20 lg:bottom-6 inset-x-3 lg:inset-x-auto lg:right-6 lg:max-w-sm z-50 bg-card border border-border rounded-2xl shadow-glow p-4 animate-slide-in-right"
      style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
      role="dialog"
      aria-label="Install Denta.Health"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shrink-0">
          <Sparkles className="w-5 h-5 text-primary-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm">Install Denta.Health</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            One-tap access to your daily oral wellness coach.
          </p>
        </div>
        <button onClick={dismiss} aria-label="Dismiss" className="p-1 rounded-md hover:bg-muted">
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
      <div className="flex gap-2 mt-3">
        <Button onClick={install} size="sm" className="flex-1 bg-gradient-primary">
          <Download className="w-4 h-4 mr-1.5" /> Install
        </Button>
        <Button onClick={dismiss} size="sm" variant="ghost">Not now</Button>
      </div>
    </div>
  );
}
