import { NavLink, useLocation } from "react-router-dom";
import { Home, Camera, Apple, Smile, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

const items = [
  { to: "/dashboard", label: "Home", icon: Home },
  { to: "/scan", label: "Scan", icon: Camera },
  { to: "/advisor", label: "Eat", icon: Apple },
  { to: "/kids", label: "Kids", icon: Smile },
  { to: "/settings", label: "Me", icon: User },
];

const HIDE_ON = ["/login", "/signup", "/"];

export function MobileBottomNav() {
  const { user } = useAuth();
  const { pathname } = useLocation();

  if (!user) return null;
  if (HIDE_ON.includes(pathname)) return null;

  return (
    <nav
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-card/95 backdrop-blur border-t border-border shadow-lg"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="Primary mobile navigation"
    >
      <ul className="grid grid-cols-5">
        {items.map(({ to, label, icon: Icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center justify-center gap-0.5 py-2.5 text-[11px] font-medium transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={cn(
                      "w-9 h-9 rounded-xl flex items-center justify-center transition-all",
                      isActive ? "bg-gradient-primary text-primary-foreground shadow-glow" : ""
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </span>
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
