import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

// PWA service worker registration — guarded against iframes & Lovable preview hosts.
if ("serviceWorker" in navigator) {
  const inIframe = (() => {
    try { return window.self !== window.top; } catch { return true; }
  })();
  const isPreview =
    location.hostname.includes("id-preview--") ||
    location.hostname.includes("lovableproject.com") ||
    location.hostname.includes("lovable.app");

  if (inIframe || isPreview) {
    // Clean up any previously registered SWs in preview/iframe contexts
    navigator.serviceWorker.getRegistrations().then((rs) => rs.forEach((r) => r.unregister()));
  } else {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    });
  }
}
