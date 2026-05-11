import { useEffect } from "react";
import { toast } from "sonner";

/** Listens for service-worker updates and shows a toast prompting reload. */
export function UpdateToast() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    let refreshing = false;

    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (refreshing) return;
      refreshing = true;
      window.location.reload();
    });

    navigator.serviceWorker.ready.then((reg) => {
      reg.addEventListener("updatefound", () => {
        const sw = reg.installing;
        if (!sw) return;
        sw.addEventListener("statechange", () => {
          if (sw.state === "installed" && navigator.serviceWorker.controller) {
            toast("New version available", {
              description: "Tap to refresh and get the latest wellness updates.",
              action: {
                label: "Reload",
                onClick: () => sw.postMessage("SKIP_WAITING"),
              },
              duration: Infinity,
            });
          }
        });
      });
    });
  }, []);

  return null;
}
