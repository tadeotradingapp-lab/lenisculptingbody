import { Link } from "react-router-dom";
import { Tag, ArrowRight, Share2 } from "lucide-react";
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
    <div className="bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-card transition-all overflow-hidden group">
      <div className="aspect-[16/9] bg-gradient-to-br from-primary/10 to-secondary overflow-hidden relative">
        <img src={promo.imageUrl} alt={promo.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
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
            <Chip variant="success">{daysLeft} días restantes</Chip>
          )}
        </div>
        <h3 className="font-display font-semibold text-lg text-foreground">{promo.title}</h3>
        <p className="text-sm text-muted-foreground mt-0.5">{promo.subtitle}</p>
        <p className="text-primary font-display font-bold text-lg mt-2">{promo.priceDisplay}</p>
        <ul className="mt-3 space-y-1">
          {promo.includes.slice(0, 3).map(item => (
            <li key={item} className="text-sm text-muted-foreground flex items-center gap-2">
              <Tag className="w-3 h-3 text-primary flex-shrink-0" /> {item}
            </li>
          ))}
        </ul>
        <Link
          to={`/reservar?type=promo&id=${promo.id}`}
          className="mt-4 flex items-center justify-center gap-2 w-full h-11 rounded-full bg-primary text-primary-foreground font-display font-semibold text-sm hover:bg-primary/90 transition-colors"
        >
          Solicitar cita <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
