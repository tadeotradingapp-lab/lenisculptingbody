import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { StatusBadge } from "@/components/StatusBadge";
import { EmptyState } from "@/components/EmptyState";
import { api } from "@/lib/apiFake";
import { BookingRequest } from "@/types";
import { buildBookingWhatsApp } from "@/lib/whatsapp";
import { CalendarDays, MessageCircle, Clock, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function MiSolicitud() {
  const [request, setRequest] = useState<BookingRequest | null>(null);

  useEffect(() => {
    setRequest(api.booking.getLatestRequest());
  }, []);

  const handleCancel = () => {
    api.booking.clearRequest();
    setRequest(null);
    toast({ title: "Solicitud cancelada", description: "Si necesitas agendar nuevamente, estamos aquí." });
  };

  if (!request) return (
    <Layout showStickyCTA={false}>
      <EmptyState
        icon={<CalendarDays className="w-12 h-12" />}
        title="No tienes solicitudes"
        description="Cuando envíes una solicitud de cita, aparecerá aquí."
        action={<Link to="/reservar" className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-primary text-primary-foreground font-display font-semibold">Solicitar cita</Link>}
      />
    </Layout>
  );

  return (
    <Layout showStickyCTA={false}>
      <div className="container py-6 max-w-lg">
        <h1 className="font-display font-bold text-2xl text-foreground">Mi solicitud</h1>
        <div className="mt-6 bg-card border border-border rounded-2xl p-6">
          <StatusBadge status="pending" className="mb-4 text-base px-4 py-2" />
          <h2 className="font-display font-bold text-xl text-foreground">{request.selectionName}</h2>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground"><CalendarDays className="w-4 h-4" /> {new Date(request.date + "T12:00:00").toLocaleDateString("es", { weekday: "long", day: "numeric", month: "long" })}</div>
            <div className="flex items-center gap-2 text-muted-foreground"><Clock className="w-4 h-4" /> {request.time}</div>
            <div className="text-muted-foreground"><strong>Nombre:</strong> {request.name}</div>
            <div className="text-muted-foreground"><strong>Teléfono:</strong> {request.phone}</div>
            {request.email && <div className="text-muted-foreground"><strong>Email:</strong> {request.email}</div>}
            {request.note && <div className="text-muted-foreground"><strong>Nota:</strong> {request.note}</div>}
            <div className="text-xs text-muted-foreground">ID: {request.requestId}</div>
          </div>

          <div className="flex flex-col gap-3 mt-6">
            <a href={buildBookingWhatsApp(request.name, request.selectionName, request.date, request.time)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 h-12 rounded-full bg-success text-success-foreground font-display font-semibold">
              <MessageCircle className="w-5 h-5" /> Confirmar por WhatsApp
            </a>
            <Link to={`/reservar?type=${request.selectionType}&id=${request.selectionId}`} className="flex items-center justify-center gap-2 h-12 rounded-full border-2 border-primary text-primary font-display font-semibold">
              Cambiar horario
            </Link>
            <button onClick={handleCancel} className="flex items-center justify-center gap-2 h-12 rounded-full border border-border text-muted-foreground font-medium hover:bg-muted transition-colors">
              <X className="w-4 h-4" /> Cancelar solicitud
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
