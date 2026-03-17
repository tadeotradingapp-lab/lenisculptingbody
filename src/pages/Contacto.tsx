import { Layout } from "@/components/layout/Layout";
import { business } from "@/data/business";
import { isOpenNow, buildWhatsAppUrl, buildCallUrl, getDirectionsUrl } from "@/lib/whatsapp";
import { MapPin, MessageCircle, Phone, Navigation } from "lucide-react";

export default function Contacto() {
  const openStatus = isOpenNow();

  return (
    <Layout>
      <div className="container py-6 max-w-2xl">
        <h1 className="font-display font-bold text-2xl md:text-3xl text-foreground">Contacto</h1>

        <div className="mt-6 space-y-6">
          {/* Address */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <h2 className="font-display font-semibold text-lg text-foreground">{business.name}</h2>
            <p className="text-sm text-muted-foreground mt-1">Alexander's Hair Salón</p>
            <p className="text-sm text-muted-foreground">{business.address}</p>
            <p className="text-sm text-muted-foreground">{business.city}, {business.state} {business.zip}</p>
            
            <div className="flex items-center gap-2 mt-3">
              <span className={`w-2 h-2 rounded-full ${openStatus.open ? "bg-success" : "bg-destructive"}`} />
              <span className="text-sm font-medium">{openStatus.text}</span>
            </div>
            
            <div className="mt-3 space-y-1">
              {business.hours.map(h => (
                <div key={h.day} className="flex justify-between text-sm text-muted-foreground">
                  <span>{h.day}</span>
                  <span>{h.open ? `${h.open} – ${h.close}` : "Cerrado"}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Map placeholder */}
          <div className="bg-muted rounded-2xl h-48 flex items-center justify-center text-muted-foreground">
            <MapPin className="w-8 h-8" />
          </div>

          {/* Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <a href={buildWhatsAppUrl("Hola, quiero más información.")} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 h-14 rounded-2xl bg-success text-success-foreground font-display font-semibold text-sm">
              <MessageCircle className="w-5 h-5" /> WhatsApp
            </a>
            <a href={buildCallUrl()} className="flex items-center justify-center gap-2 h-14 rounded-2xl bg-primary text-primary-foreground font-display font-semibold text-sm">
              <Phone className="w-5 h-5" /> Llamar
            </a>
            <a href={getDirectionsUrl()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 h-14 rounded-2xl bg-foreground text-background font-display font-semibold text-sm">
              <Navigation className="w-5 h-5" /> Cómo llegar
            </a>
          </div>

          {/* Parking */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <h2 className="font-display font-semibold text-lg text-foreground mb-2">Estacionamiento y entrada</h2>
            <p className="text-sm text-muted-foreground">Estacionamiento gratuito disponible frente al salón. La entrada es directa desde la calle Polk St.</p>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-muted rounded-xl aspect-video flex items-center justify-center text-muted-foreground text-xs">Foto entrada</div>
              <div className="bg-muted rounded-xl aspect-video flex items-center justify-center text-muted-foreground text-xs">Foto parking</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
