import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Chip } from "@/components/Chip";
import { ShareButton } from "@/components/ShareButton";
import { promos } from "@/data/promos";
import { ArrowRight, Tag, AlertCircle } from "lucide-react";

export default function PromoDetalle() {
  const { slug } = useParams();
  const promo = promos.find(p => p.slug === slug);

  if (!promo) return (
    <Layout showStickyCTA={false}><div className="container py-16 text-center"><p className="font-display font-semibold">Promo no encontrada</p><Link to="/promos" className="text-primary text-sm mt-2 inline-block">Volver</Link></div></Layout>
  );

  const endDate = new Date(promo.endDate);
  const daysLeft = Math.ceil((endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

  return (
    <Layout stickyLabel="Solicitar esta promo" stickyTo={`/reservar?type=promo&id=${promo.id}`}>
      <div className="container py-6 max-w-3xl">
        <div className="relative bg-gradient-to-br from-primary/10 to-secondary rounded-2xl p-8 mb-6">
          <ShareButton title={promo.title} text={`${promo.title} - ${promo.priceDisplay}`} url={`/promos/${promo.slug}`} className="absolute top-4 right-4" />
          <div className="flex flex-wrap gap-2 mb-3">
            {promo.tags.map(t => <Chip key={t} variant="primary">{t}</Chip>)}
            {daysLeft > 0 && <Chip variant="success">{daysLeft} días restantes</Chip>}
          </div>
          <h1 className="font-display font-bold text-2xl md:text-3xl text-foreground">{promo.title}</h1>
          <p className="text-muted-foreground mt-1">{promo.subtitle}</p>
          <p className="text-primary font-display font-bold text-3xl mt-4">{promo.priceDisplay}</p>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="font-display font-semibold text-lg mb-3">¿Qué incluye?</h2>
            <ul className="space-y-2">
              {promo.includes.map(item => (
                <li key={item} className="text-sm text-muted-foreground flex items-start gap-2"><Tag className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" /> {item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display font-semibold text-lg mb-3">Ideal para</h2>
            <div className="flex flex-wrap gap-2">
              {promo.idealFor.map(f => <Chip key={f} variant="default">{f}</Chip>)}
            </div>
          </div>
          <div className="bg-muted rounded-xl p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Condiciones</p>
              <p className="text-sm text-muted-foreground mt-1">{promo.conditions}</p>
              <p className="text-xs text-muted-foreground mt-2">Vigencia: {new Date(promo.startDate).toLocaleDateString("es")} – {endDate.toLocaleDateString("es")}</p>
            </div>
          </div>
          <Link to={`/reservar?type=promo&id=${promo.id}`} className="flex items-center justify-center gap-2 w-full h-12 rounded-full bg-primary text-primary-foreground font-display font-semibold shadow-glow hover:bg-primary/90 transition-colors">
            Solicitar cita <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-xs text-center text-muted-foreground">Resultados pueden variar según cada persona.</p>
        </div>
      </div>
    </Layout>
  );
}
