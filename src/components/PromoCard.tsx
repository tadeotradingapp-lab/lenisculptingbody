import { Link } from "react-router-dom";
import { Tag, ArrowRight } from "lucide-react";
import { Promo } from "@/types";
import { Chip } from "./Chip";
import { ShareButton } from "./ShareButton";

interface PromoCardProps {
  promo: Promo;
}

export function PromoCard({ promo }: PromoCardProps) {
  const endDate = new Date(promo.endDate);
  const now = new Date();
  const daysLeft = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-card hover:-translate-y-1 transition-all duration-300 overflow-hidden group active:scale-[0.98]">
      <div className="aspect-[16/9] bg-gradient-to-br from-primary/10 to-secondary overflow-hidden relative">
        <img src={promo.imageUrl} alt={promo.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
        {/* Price banner */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-foreground/60 to-transparent p-3 pt-8">
          <span className="text-background font-display font-bold text-lg drop-shadow-md">{promo.priceDisplay}</span>
        </div>
        <div className="absolute top-3 right-3">
          <ShareButton title={promo.title} text={`${promo.title} - ${promo.priceDisplay}`} url={`/promos/${promo.slug}`} />
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          {promo.tags.map(tag => (
            <Chip key={tag} variant="primary">{tag}</Chip>
          ))}
          {daysLeft > 0 && daysLeft <= 30 && (
            <Chip variant="success">
              <span className="relative flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                {daysLeft} días restantes
              </span>
            </Chip>
          )}
        </div>
        <h3 className="font-display font-semibold text-lg text-foreground">{promo.title}</h3>
        <p className="text-sm text-muted-foreground mt-0.5">{promo.subtitle}</p>
        <ul className="mt-3 space-y-1">
          {promo.includes.slice(0, 3).map(item => (
            <li key={item} className="text-sm text-muted-foreground flex items-center gap-2">
              <Tag className="w-3 h-3 text-primary flex-shrink-0" /> {item}
            </li>
          ))}
        </ul>
        <Link
          to={`/reservar?type=promo&id=${promo.id}`}
          className="mt-4 flex items-center justify-center gap-2 w-full h-11 rounded-full bg-primary text-primary-foreground font-display font-semibold text-sm hover:bg-primary/90 transition-colors active:scale-[0.98]"
        >
          Solicitar cita <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
