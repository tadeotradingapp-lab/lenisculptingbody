import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

interface StickyCTAProps {
  label?: string;
  to?: string;
}

export function StickyCTA({ label = "Solicitar cita", to = "/reservar" }: StickyCTAProps) {
  return (
    <div className="md:hidden fixed bottom-16 left-0 right-0 z-30 px-4 pb-2 safe-bottom">
      <div className="flex gap-2">
        <Link
          to={to}
          className="flex-1 flex items-center justify-center h-12 rounded-full bg-primary text-primary-foreground font-display font-semibold text-sm shadow-glow active:scale-[0.98] transition-transform"
        >
          {label}
        </Link>
        <a
          href={buildWhatsAppUrl("Hola, quiero información sobre sus servicios.")}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 flex items-center justify-center rounded-full bg-success text-success-foreground shadow-soft active:scale-[0.98] transition-transform"
        >
          <MessageCircle className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}
