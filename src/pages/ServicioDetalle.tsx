import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Chip } from "@/components/Chip";
import { services } from "@/data/services";
import { packages } from "@/data/packages";
import { PackageCard } from "@/components/PackageCard";
import { Clock, ArrowRight, MessageCircle } from "lucide-react";
import { buildServiceWhatsApp } from "@/lib/whatsapp";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function ServicioDetalle() {
  const { slug } = useParams();
  const service = services.find(s => s.slug === slug);

  if (!service) return (
    <Layout showStickyCTA={false}>
      <div className="container py-16 text-center">
        <p className="font-display font-semibold text-lg">Servicio no encontrado</p>
        <Link to="/servicios" className="text-primary text-sm mt-2 inline-block">Volver a servicios</Link>
      </div>
    </Layout>
  );

  const addOns = services.filter(s => s.category === "addon");
  const relatedPackages = packages.slice(0, 2);

  return (
    <Layout stickyLabel={`Solicitar cita · ${service.name}`} stickyTo={`/reservar?type=service&id=${service.id}`}>
      <div className="container py-6">
        <div className="max-w-3xl">
          {/* Hero */}
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <Chip variant="primary" className="capitalize">{service.category}</Chip>
            <Chip variant="primary"><Clock className="w-3 h-3" /> {service.durationMin} min</Chip>
          </div>
          <h1 className="font-display font-bold text-2xl md:text-4xl text-foreground">{service.name}</h1>
          <p className="text-muted-foreground mt-2">{service.shortDescription}</p>
          
          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground flex-wrap">
            <span>Ideal para:</span>
            {service.objectives.map(o => <Chip key={o} variant="default" className="capitalize">{o}</Chip>)}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mt-6">
            <Link to={`/reservar?type=service&id=${service.id}`} className="inline-flex items-center gap-2 h-12 px-8 rounded-full bg-primary text-primary-foreground font-display font-semibold shadow-glow hover:bg-primary/90 transition-colors">
              Solicitar cita <ArrowRight className="w-4 h-4" />
            </Link>
            <a href={buildServiceWhatsApp(service.name)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-success text-success-foreground font-medium hover:bg-success/90 transition-colors">
              <MessageCircle className="w-4 h-4" /> Preguntar por WhatsApp
            </a>
          </div>

          {/* Content tabs */}
          <div className="mt-8">
            <Accordion type="multiple" defaultValue={["includes", "benefits"]}>
              <AccordionItem value="includes">
                <AccordionTrigger className="font-display font-semibold">Qué incluye</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2">
                    {service.includes.map(item => (
                      <li key={item} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-1">•</span> {item}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="benefits">
                <AccordionTrigger className="font-display font-semibold">Beneficios</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2">
                    {service.shortBenefits.map(b => (
                      <li key={b} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-success mt-1">✓</span> {b}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              {service.recommendations.length > 0 && (
                <AccordionItem value="recs">
                  <AccordionTrigger className="font-display font-semibold">Recomendaciones</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2">
                      {service.recommendations.map(r => (
                        <li key={r} className="text-sm text-muted-foreground">• {r}</li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              )}
              <AccordionItem value="aftercare">
                <AccordionTrigger className="font-display font-semibold">Cuidados posteriores</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2">
                    {service.aftercare.map(a => (
                      <li key={a} className="text-sm text-muted-foreground">• {a}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              {service.faq.length > 0 && (
                <AccordionItem value="faq">
                  <AccordionTrigger className="font-display font-semibold">Preguntas frecuentes</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      {service.faq.map((f, i) => (
                        <div key={i}>
                          <p className="font-medium text-sm text-foreground">{f.q}</p>
                          <p className="text-sm text-muted-foreground mt-1">{f.a}</p>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>
          </div>

          {/* Add-ons */}
          {service.category !== "addon" && (
            <div className="mt-8">
              <h2 className="font-display font-semibold text-lg text-foreground mb-3">Combínalo con</h2>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {addOns.map(a => (
                  <Link key={a.id} to={`/servicios/${a.slug}`} className="flex-shrink-0 bg-card border border-border rounded-xl p-3 min-w-[160px] hover:border-primary/30 transition-colors">
                    <p className="font-medium text-sm text-foreground">{a.name}</p>
                    <p className="text-xs text-muted-foreground">{a.durationMin} min · Add-on</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Related packages */}
          <div className="mt-8">
            <h2 className="font-display font-semibold text-lg text-foreground mb-3">Paquetes recomendados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedPackages.map(p => <PackageCard key={p.id} pkg={p} />)}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
