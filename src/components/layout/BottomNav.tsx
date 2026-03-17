import { Link, useLocation } from "react-router-dom";
import { Home, Sparkles, Tag, CalendarPlus, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { to: "/", icon: Home, label: "Inicio" },
  { to: "/servicios", icon: Sparkles, label: "Servicios" },
  { to: "/promos", icon: Tag, label: "Promos" },
  { to: "/reservar", icon: CalendarPlus, label: "Reservar" },
  { to: "/mas", icon: MoreHorizontal, label: "Más" },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-lg border-t border-border safe-bottom">
      <div className="flex items-center justify-around h-16">
        {items.map(({ to, icon: Icon, label }) => {
          const active = to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 min-w-[3rem] py-1 text-xs transition-colors",
                active ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
