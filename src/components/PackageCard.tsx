import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Crown } from "lucide-react";
import { Package } from "@/types";
import { Chip } from "./Chip";

interface PackageCardProps {
  pkg: Package;
  featured?: boolean;
}

export function PackageCard({ pkg, featured }: PackageCardProps) {
  return (
    <div className={`relative bg-card rounded-2xl border hover:shadow-card hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col active:scale-[0.98] ${featured ? "border-primary shadow-glow" : "border-border hover:border-primary/30"}`}>
      {featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 bg-primary text-primary-foreground text-xs font-display font-semibold px-3 py-1 rounded-full shadow-glow">
          <Crown className="w-3 h-3" /> Más popular
        </div>
      )}
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        {pkg.tags.map(tag => (
          <Chip key={tag} variant="primary">{tag}</Chip>
        ))}
      </div>
      <h3 className="font-display font-bold text-xl text-foreground">{pkg.title}</h3>
      <p className="text-primary font-display font-bold text-2xl mt-1">{pkg.sessionsCount} sesiones</p>
      <p className="text-sm text-success font-medium mt-1">{pkg.savingsDisplay}</p>
      <ul className="mt-4 space-y-2 flex-1">
        {pkg.includes.map(item => (
          <li key={item} className="text-sm text-muted-foreground flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0 mt-0.5" /> {item}
          </li>
        ))}
      </ul>
      <div className="mt-4 space-y-2">
        <p className="text-xs text-muted-foreground">Ideal para: {pkg.idealFor.join(", ")}</p>
        <Link
          to={`/reservar?type=package&id=${pkg.id}`}
          className="flex items-center justify-center gap-2 w-full h-11 rounded-full bg-primary text-primary-foreground font-display font-semibold text-sm hover:bg-primary/90 transition-colors active:scale-[0.98]"
        >
          Solicitar cita <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
