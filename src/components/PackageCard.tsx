import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Package } from "@/types";
import { Chip } from "./Chip";

interface PackageCardProps {
  pkg: Package;
}

export function PackageCard({ pkg }: PackageCardProps) {
  return (
    <div className="bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-card transition-all p-6 flex flex-col">
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
          className="flex items-center justify-center gap-2 w-full h-11 rounded-full bg-primary text-primary-foreground font-display font-semibold text-sm hover:bg-primary/90 transition-colors"
        >
          Solicitar cita <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
