import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ShareButton } from "@/components/ShareButton";
import { Chip } from "@/components/Chip";
import { packages } from "@/data/packages";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function PaqueteDetalle() {
  const { slug } = useParams();
  const pkg = packages.find(p => p.slug === slug);

  if (!pkg) return (
    <Layout showStickyCTA={false}><div className="container py-16 text-center"><p className="font-display font-semibold">Paquete no encontrado</p><Link to="/paquetes" className="text-primary text-sm mt-2 inline-block">Volver</Link></div></Layout>
  );

  return (
    <Layout stickyLabel={`Solicitar ${pkg.title}`} stickyTo={`/reservar?type=package&id=${pkg.id}`}>
      <div className="container py-6 max-w-3xl">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex gap-2 mb-2 flex-wrap">{pkg.tags.map(t => <Chip key={t} variant="primary">{t}</Chip>)}</div>
            <h1 className="font-display font-bold text-2xl md:text-3xl text-foreground">{pkg.title}</h1>
            <p className="text-primary font-display font-bold text-3xl mt-2">{pkg.sessionsCount} sesiones</p>
            <p className="text-success font-medium mt-1">{pkg.savingsDisplay}</p>
          </div>
          <ShareButton title={pkg.title} text={`${pkg.title} - ${pkg.sessionsCount} sesiones`} url={`/paquetes/${pkg.slug}`} />
        </div>

        <div className="mt-8 space-y-6">
          <div>
            <h2 className="font-display font-semibold text-lg mb-3">¿Qué incluye?</h2>
            <ul className="space-y-2">
              {pkg.includes.map(item => (
                <li key={item} className="text-sm text-muted-foreground flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0 mt-0.5" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display font-semibold text-lg mb-3">¿Cómo se usan las sesiones?</h2>
            <p className="text-sm text-muted-foreground">{pkg.howToUse}</p>
          </div>
          <div>
            <h2 className="font-display font-semibold text-lg mb-3">Ideal para</h2>
            <div className="flex flex-wrap gap-2">{pkg.idealFor.map(f => <Chip key={f} variant="default">{f}</Chip>)}</div>
          </div>
          <Link to={`/reservar?type=package&id=${pkg.id}`} className="flex items-center justify-center gap-2 w-full h-12 rounded-full bg-primary text-primary-foreground font-display font-semibold shadow-glow hover:bg-primary/90 transition-colors">
            Solicitar cita <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </Layout>
  );
}
