import { Link } from "react-router-dom";
import { Phone, MessageCircle } from "lucide-react";
import { business } from "@/data/business";
import { buildWhatsAppUrl, buildCallUrl } from "@/lib/whatsapp";
import logoImg from "@/assets/logo-lsb.png";

export function Header() {
  return (
    <>
      {/* Mobile header */}
      <header className="md:hidden sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border/50 shadow-soft safe-top">
        <div className="flex items-center justify-between px-4 h-14">
          <Link to="/" className="flex items-center gap-1.5">
            <img src={logoImg} alt="Leni Sculpting Body" className="h-8 w-auto" />
            <span className="font-accent text-xl text-primary">Leni</span>
            <span className="font-display font-semibold text-sm text-foreground">Sculpting Body</span>
          </Link>
          <div className="flex items-center gap-2">
            <a href={buildWhatsAppUrl("Hola, quiero información sobre sus servicios.")} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-success/10 text-success active:scale-[0.98] transition-transform">
              <MessageCircle className="w-5 h-5" />
            </a>
            <a href={buildCallUrl()} className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary active:scale-[0.98] transition-transform">
              <Phone className="w-5 h-5" />
            </a>
          </div>
        </div>
      </header>

      {/* Desktop nav */}
      <header className="hidden md:block sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border/50 shadow-soft">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoImg} alt="Leni Sculpting Body" className="h-9 w-auto" />
            <span className="font-accent text-2xl text-primary">Leni</span>
            <span className="font-display font-semibold text-foreground">Sculpting Body</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium">
            {[
              { to: "/servicios", label: "Servicios" },
              { to: "/promos", label: "Promos" },
              { to: "/paquetes", label: "Paquetes" },
              { to: "/resultados", label: "Resultados" },
              { to: "/resenas", label: "Reseñas" },
              { to: "/contacto", label: "Contacto" },
            ].map(link => (
              <Link key={link.to} to={link.to} className="relative text-muted-foreground hover:text-foreground transition-colors group">
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            <Link to="/reservar" className="inline-flex items-center justify-center h-9 px-5 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors shadow-glow active:scale-[0.98]">
              Solicitar cita
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <a href={buildWhatsAppUrl("Hola, quiero información.")} target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center rounded-full bg-success/10 text-success hover:bg-success/20 transition-colors">
              <MessageCircle className="w-4 h-4" />
            </a>
            <a href={buildCallUrl()} className="w-9 h-9 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
