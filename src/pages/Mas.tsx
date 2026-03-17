import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { CalendarDays, Star, MapPin, HelpCircle, Shield, Sparkles, Image, MessageCircle, FileText } from "lucide-react";

const links = [
  { to: "/resultados", icon: Image, label: "Resultados" },
  { to: "/resenas", icon: Star, label: "Reseñas" },
  { to: "/recomendador", icon: Sparkles, label: "Recomendador" },
  { to: "/mi-solicitud", icon: CalendarDays, label: "Mi solicitud" },
  { to: "/contacto", icon: MapPin, label: "Contacto" },
  { to: "/faq", icon: HelpCircle, label: "FAQ" },
  { to: "/politicas", icon: Shield, label: "Políticas" },
];

export default function Mas() {
  return (
    <Layout showStickyCTA={false}>
      <div className="container py-6">
        <h1 className="font-display font-bold text-2xl text-foreground">Más</h1>
        <div className="grid grid-cols-2 gap-3 mt-6">
          {links.map(({ to, icon: Icon, label }) => (
            <Link key={to} to={to} className="flex flex-col items-center justify-center gap-2 p-6 bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-card transition-all">
              <Icon className="w-6 h-6 text-primary" />
              <span className="font-display font-medium text-sm text-foreground">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
