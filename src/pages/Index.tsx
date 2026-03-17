import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ServiceCard } from "@/components/ServiceCard";
import { PromoCard } from "@/components/PromoCard";
import { PackageCard } from "@/components/PackageCard";
import { ReviewCard } from "@/components/ReviewCard";
import { ObjectiveCard } from "@/components/ObjectiveCard";
import { Chip } from "@/components/Chip";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { services } from "@/data/services";
import { promos } from "@/data/promos";
import { packages } from "@/data/packages";
import { results } from "@/data/results";
import { reviews } from "@/data/reviews";
import { business } from "@/data/business";
import { isOpenNow, buildWhatsAppUrl, buildCallUrl, getDirectionsUrl } from "@/lib/whatsapp";
import { MapPin, MessageCircle, Phone, ArrowRight, Star, Sparkles, Clock, HelpCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useInView } from "@/hooks/useInView";
import heroImg from "@/assets/hero-spa.jpg";

const objectives = [
  { key: "reduccion" as const, label: "Reducción", icon: "🔥" },
  { key: "drenaje" as const, label: "Drenaje", icon: "💧" },
  { key: "celulitis" as const, label: "Celulitis", icon: "✨" },
  { key: "gluteos" as const, label: "Glúteos", icon: "🍑" },
  { key: "abdomen" as const, label: "Abdomen", icon: "💪" },
  { key: "glow" as const, label: "Glow", icon: "🌟" },
];

const faqs = [
  { q: "¿Cómo funciona la solicitud de cita?", a: "Envías tu solicitud desde la web y te confirmamos por WhatsApp lo antes posible." },
  { q: "¿Las promociones son acumulables?", a: "No, las promociones no se acumulan con otras ofertas salvo que se indique lo contrario." },
  { q: "¿Necesito preparación previa?", a: "Depende del tratamiento. Te enviaremos recomendaciones al confirmar tu cita." },
  { q: "¿Cuántas sesiones necesito para ver resultados?", a: "Varía según el tratamiento y cada persona. Generalmente entre 4 y 8 sesiones." },
];

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, isInView } = useInView();
  return (
    <div ref={ref} className={`transition-all duration-700 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${className}`}>
      {children}
    </div>
  );
}

export default function Index() {
  const popular = services.filter(s => s.popular).slice(0, 6);
  const featuredPromos = promos.filter(p => p.featured).slice(0, 3);
  const featuredPackages = packages.filter(p => p.featured);
  const featuredResults = results.slice(0, 6);
  const featuredReviews = reviews.slice(0, 3);
  const avgRating = (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1);
  const openStatus = isOpenNow();

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/60 via-background to-primary/5" />
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-secondary blur-2xl" />

        <div className="container relative py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <h1 className="font-display font-bold text-3xl md:text-5xl leading-tight text-gradient-primary">
                Tratamientos corporales y faciales personalizados en Hollywood, FL.
              </h1>
              <p className="text-muted-foreground mt-4 text-base md:text-lg leading-relaxed">
                Envía tu solicitud de cita en minutos. Te confirmamos por WhatsApp.
              </p>
              <div className="flex flex-wrap gap-3 mt-8 justify-center md:justify-start">
                <Link to="/reservar" className="inline-flex items-center gap-2 h-12 px-8 rounded-full bg-primary text-primary-foreground font-display font-semibold shadow-glow hover:bg-primary/90 transition-all active:scale-[0.98]">
                  Solicitar cita <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/promos" className="inline-flex items-center gap-2 h-12 px-8 rounded-full border-2 border-primary text-primary font-display font-semibold hover:bg-primary/5 transition-colors active:scale-[0.98]">
                  Ver promociones
                </Link>
              </div>
              <div className="flex flex-wrap gap-2 mt-6 justify-center md:justify-start">
                <Chip variant="primary"><MapPin className="w-3 h-3" /> Hollywood, FL</Chip>
                <Chip variant="primary">Atención en español</Chip>
                <Chip variant="primary"><Clock className="w-3 h-3" /> Solicitud rápida</Chip>
                <Chip variant="primary"><Star className="w-3 h-3" /> Resultados reales</Chip>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-3xl rotate-3 scale-105" />
                <img src={heroImg} alt="Leni Sculpting Body - tratamientos premium" className="relative rounded-3xl shadow-elevated object-cover w-full aspect-[4/3]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recomendador teaser */}
      <AnimatedSection className="container py-10">
        <Link to="/recomendador" className="block bg-gradient-to-r from-primary/10 via-secondary to-primary/5 rounded-2xl p-6 border border-primary/20 hover:shadow-card transition-all active:scale-[0.99]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="font-display font-semibold text-foreground">Recomendación rápida (30s)</h2>
              <p className="text-sm text-muted-foreground">Te sugerimos el mejor protocolo según tu objetivo.</p>
            </div>
            <ArrowRight className="w-5 h-5 text-primary flex-shrink-0" />
          </div>
        </Link>
      </AnimatedSection>

      {/* Promos destacadas */}
      <AnimatedSection className="container py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="section-heading">Promociones destacadas</h2>
          <Link to="/promos" className="text-primary text-sm font-medium flex items-center gap-1">Ver todas <ArrowRight className="w-3.5 h-3.5" /></Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredPromos.map(p => <PromoCard key={p.id} promo={p} />)}
        </div>
      </AnimatedSection>

      {/* Objetivos */}
      <section className="bg-secondary/20 py-12">
        <AnimatedSection className="container">
          <h2 className="section-heading mb-8">¿Cuál es tu objetivo?</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {objectives.map(o => <ObjectiveCard key={o.key} objective={o.key} label={o.label} icon={o.icon} />)}
          </div>
        </AnimatedSection>
      </section>

      {/* Servicios populares */}
      <AnimatedSection className="container py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="section-heading">Servicios populares</h2>
          <Link to="/servicios" className="text-primary text-sm font-medium flex items-center gap-1">Ver todos <ArrowRight className="w-3.5 h-3.5" /></Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {popular.map(s => <ServiceCard key={s.id} service={s} />)}
        </div>
      </AnimatedSection>

      {/* Paquetes */}
      <section className="bg-secondary/20 py-12">
        <AnimatedSection className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="section-heading">Paquetes de sesiones</h2>
            <Link to="/paquetes" className="text-primary text-sm font-medium flex items-center gap-1">Ver todos <ArrowRight className="w-3.5 h-3.5" /></Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredPackages.map((pkg, i) => <PackageCard key={pkg.id} pkg={pkg} featured={i === 1} />)}
          </div>
        </AnimatedSection>
      </section>

      {/* Resultados */}
      <AnimatedSection className="container py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="section-heading">Resultados reales</h2>
          <Link to="/resultados" className="text-primary text-sm font-medium flex items-center gap-1">Ver todos <ArrowRight className="w-3.5 h-3.5" /></Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {featuredResults.map(r => (
            <div key={r.id} className="rounded-2xl overflow-hidden bg-muted aspect-square group relative">
              {r.type === "beforeAfter" ? (
                <BeforeAfterSlider beforeUrl={r.beforeUrl} afterUrl={r.afterUrl} className="w-full h-full" />
              ) : (
                <img src={r.imageUrl} alt={r.serviceName} className="w-full h-full object-cover" loading="lazy" />
              )}
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-background font-display font-semibold text-sm bg-foreground/60 px-4 py-2 rounded-full">Ver detalle</span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground text-center mt-3">Resultados pueden variar según cada persona.</p>
      </AnimatedSection>

      {/* Reseñas */}
      <section className="bg-secondary/20 py-12">
        <AnimatedSection className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="section-heading">Lo que dicen nuestras clientas</h2>
              <div className="flex items-center gap-2 mt-4">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-4 h-4 fill-warning text-warning" />)}
                </div>
                <span className="text-sm font-semibold text-foreground">{avgRating}</span>
                <span className="text-sm text-muted-foreground">({reviews.length} reseñas)</span>
              </div>
            </div>
            <Link to="/resenas" className="text-primary text-sm font-medium flex items-center gap-1">Ver todas <ArrowRight className="w-3.5 h-3.5" /></Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featuredReviews.map(r => <ReviewCard key={r.id} review={r} />)}
          </div>
        </AnimatedSection>
      </section>

      {/* Ubicación */}
      <AnimatedSection className="container py-12">
        <h2 className="section-heading mb-8">Nuestra ubicación</h2>
        <div className="bg-card rounded-2xl border border-border p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <p className="font-display font-semibold text-foreground">{business.name}</p>
              <p className="text-sm text-muted-foreground mt-1">{business.address}</p>
              <p className="text-sm text-muted-foreground">{business.city}, {business.state} {business.zip}</p>
              <div className="flex items-center gap-2 mt-3">
                <span className={`w-2 h-2 rounded-full ${openStatus.open ? "bg-success" : "bg-destructive"}`} />
                <span className="text-sm font-medium text-foreground">{openStatus.text}</span>
              </div>
              <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                {business.hours.map(h => (
                  <div key={h.day} className="flex justify-between max-w-xs">
                    <span>{h.day}</span>
                    <span>{h.open ? `${h.open} – ${h.close}` : "Cerrado"}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 bg-muted rounded-xl min-h-[200px] flex items-center justify-center text-muted-foreground text-sm">
              <MapPin className="w-8 h-8" />
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mt-6">
            <a href={getDirectionsUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-foreground text-background font-medium text-sm hover:bg-foreground/90 transition-colors active:scale-[0.98]">
              <MapPin className="w-4 h-4" /> Cómo llegar
            </a>
            <a href={buildWhatsAppUrl("Hola, quiero información.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-success text-success-foreground font-medium text-sm hover:bg-success/90 transition-colors active:scale-[0.98]">
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
            <a href={buildCallUrl()} className="inline-flex items-center gap-2 h-11 px-6 rounded-full border border-border font-medium text-sm hover:bg-muted transition-colors active:scale-[0.98]">
              <Phone className="w-4 h-4" /> Llamar
            </a>
          </div>
        </div>
      </AnimatedSection>

      {/* Cómo trabajamos */}
      <section className="bg-secondary/20 py-12">
        <AnimatedSection className="container">
          <h2 className="section-heading mx-auto text-center block mb-10">Cómo trabajamos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              { step: "1", title: "Solicitas tu cita", desc: "Elige servicio, fecha y hora desde la web." },
              { step: "2", title: "Te confirmamos por WhatsApp", desc: "Revisamos disponibilidad y te confirmamos rápidamente." },
              { step: "3", title: "Protocolo personalizado", desc: "Cada tratamiento se adapta a tus necesidades." },
            ].map(s => (
              <div key={s.step} className="text-center">
                <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground font-display font-bold text-xl flex items-center justify-center mx-auto shadow-glow">{s.step}</div>
                <h3 className="font-display font-semibold mt-4 text-foreground">{s.title}</h3>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* FAQ */}
      <AnimatedSection className="container py-12 mb-8">
        <h2 className="section-heading mb-8">Preguntas frecuentes</h2>
        <div className="max-w-2xl">
          <Accordion type="single" collapsible>
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left font-medium text-sm">{f.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <Link to="/faq" className="inline-flex items-center gap-1 text-primary text-sm font-medium mt-4"><HelpCircle className="w-3.5 h-3.5" /> Ver todas las preguntas</Link>
        </div>
      </AnimatedSection>
    </Layout>
  );
}
