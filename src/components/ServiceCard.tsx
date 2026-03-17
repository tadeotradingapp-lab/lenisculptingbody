import { Link } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";
import { Service } from "@/types";

interface ServiceCardProps {
  service: Service;
  compact?: boolean;
}

export function ServiceCard({ service, compact }: ServiceCardProps) {
  return (
    <Link
      to={`/servicios/${service.slug}`}
      className="group block bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-card hover:-translate-y-1 transition-all duration-300 overflow-hidden active:scale-[0.98]"
    >
      {!compact && (
        <div className="aspect-[4/3] bg-muted overflow-hidden relative">
          <img src={service.imageUrl} alt={service.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-foreground/40 to-transparent" />
        </div>
      )}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" /> {service.durationMin} min
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground capitalize">{service.category}</span>
        </div>
        <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">{service.name}</h3>
        {!compact && <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{service.shortDescription}</p>}
        <div className="flex items-center gap-1 mt-3 text-primary text-sm font-medium">
          Solicitar cita <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
