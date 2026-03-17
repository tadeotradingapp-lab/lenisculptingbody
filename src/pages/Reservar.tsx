import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Chip } from "@/components/Chip";
import { services } from "@/data/services";
import { promos } from "@/data/promos";
import { packages } from "@/data/packages";
import { availability } from "@/data/availability";
import { api } from "@/lib/apiFake";
import { buildBookingWhatsApp, getDirectionsUrl } from "@/lib/whatsapp";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, ArrowLeft, CalendarDays, Clock, CheckCircle2, MapPin, MessageCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type SelectionType = "service" | "promo" | "package";

export default function Reservar() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [tab, setTab] = useState<SelectionType>((params.get("type") as SelectionType) || "service");
  const [selectedId, setSelectedId] = useState(params.get("id") || "");
  const [addOns, setAddOns] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [contactPref, setContactPref] = useState<"whatsapp" | "call">("whatsapp");
  const [acceptPolicy, setAcceptPolicy] = useState(false);
  const [photoConsent, setPhotoConsent] = useState(false);
  const [success, setSuccess] = useState(false);
  const [requestData, setRequestData] = useState<any>(null);

  const allItems = tab === "service" ? services : tab === "promo" ? promos : packages;
  const selectedItem = allItems.find((i: any) => i.id === selectedId);
  const selectedName = selectedItem ? ("name" in selectedItem ? selectedItem.name : selectedItem.title) : "";
  const addOnServices = services.filter(s => s.category === "addon");

  const availableDays = availability.filter(d => d.available);
  const daySlots = availability.find(d => d.date === selectedDate)?.slots.filter(s => s.available) ?? [];

  const canNext = () => {
    if (step === 1) return !!selectedId;
    if (step === 2) return !!selectedDate;
    if (step === 3) return !!selectedTime;
    if (step === 4) return !!name && !!phone && acceptPolicy;
    return false;
  };

  const handleSubmit = async () => {
    const result = await api.booking.createRequest({
      selectionType: tab,
      selectionId: selectedId,
      selectionName: selectedName,
      addOns,
      date: selectedDate,
      time: selectedTime,
      name, phone, email, note,
      contactPreference: contactPref,
      photoConsent,
    });
    setRequestData(result);
    setSuccess(true);
    toast({ title: "¡Solicitud enviada!", description: "Te confirmaremos por WhatsApp." });
  };

  if (success && requestData) {
    return (
      <Layout showStickyCTA={false}>
        <div className="container py-12 max-w-lg text-center">
          <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-success" />
          </div>
          <h1 className="font-display font-bold text-2xl text-foreground">¡Solicitud enviada!</h1>
          <p className="text-muted-foreground mt-3">
            Gracias, <strong>{name}</strong>. Hemos recibido tu solicitud para <strong>{selectedName}</strong> el <strong>{new Date(selectedDate).toLocaleDateString("es")}</strong> a las <strong>{selectedTime}</strong>.
          </p>
          <p className="text-sm text-muted-foreground mt-2">Tu cita queda <strong>PENDIENTE</strong> hasta confirmación. Te confirmaremos por WhatsApp lo antes posible.</p>
          <div className="flex flex-col gap-3 mt-6">
            <a href={buildBookingWhatsApp(name, selectedName, selectedDate, selectedTime)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 h-12 rounded-full bg-success text-success-foreground font-display font-semibold">
              <MessageCircle className="w-5 h-5" /> Enviar WhatsApp ahora
            </a>
            <button onClick={() => navigate("/mi-solicitud")} className="flex items-center justify-center gap-2 h-12 rounded-full border-2 border-primary text-primary font-display font-semibold">
              Ver mi solicitud
            </button>
            <a href={getDirectionsUrl()} target="_blank" rel="noopener noreferrer" className="text-primary text-sm font-medium flex items-center justify-center gap-1">
              <MapPin className="w-4 h-4" /> Cómo llegar
            </a>
          </div>
          <p className="text-xs text-muted-foreground mt-6">Si necesitas cambiar horario, escríbenos por WhatsApp.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout showStickyCTA={false}>
      <div className="container py-6 max-w-2xl">
        <h1 className="font-display font-bold text-2xl text-foreground">Solicitar cita</h1>
        
        {/* Stepper */}
        <div className="flex items-center gap-2 mt-4 mb-6">
          {[1, 2, 3, 4].map(s => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${s <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{s}</div>
              {s < 4 && <div className={`flex-1 h-0.5 ${s < step ? "bg-primary" : "bg-border"}`} />}
            </div>
          ))}
        </div>

        {/* Step 1: Selection */}
        {step === 1 && (
          <div>
            <h2 className="font-display font-semibold text-lg mb-4">¿Qué te gustaría reservar?</h2>
            <div className="flex gap-2 mb-4">
              {([["service", "Servicios"], ["promo", "Promos"], ["package", "Paquetes"]] as [SelectionType, string][]).map(([key, label]) => (
                <Chip key={key} variant="outline" active={tab === key} onClick={() => { setTab(key); setSelectedId(""); }}>{label}</Chip>
              ))}
            </div>
            <div className="space-y-2 max-h-[50vh] overflow-y-auto">
              {allItems.map((item: any) => (
                <button key={item.id} onClick={() => setSelectedId(item.id)} className={`w-full text-left p-4 rounded-xl border transition-all ${selectedId === item.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}>
                  <p className="font-medium text-foreground">{"name" in item ? item.name : item.title}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {"durationMin" in item && `${item.durationMin} min · `}
                    {"priceDisplay" in item && item.priceDisplay}
                    {"sessionsCount" in item && `${item.sessionsCount} sesiones`}
                  </p>
                </button>
              ))}
            </div>
            {tab === "service" && (
              <div className="mt-4">
                <p className="text-sm font-medium text-foreground mb-2">Add-ons (opcional)</p>
                {addOnServices.map(a => (
                  <label key={a.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                    <Checkbox checked={addOns.includes(a.id)} onCheckedChange={c => setAddOns(c ? [...addOns, a.id] : addOns.filter(x => x !== a.id))} />
                    <div>
                      <p className="text-sm font-medium text-foreground">{a.name}</p>
                      <p className="text-xs text-muted-foreground">{a.durationMin} min</p>
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Step 2: Date */}
        {step === 2 && (
          <div>
            <h2 className="font-display font-semibold text-lg mb-4"><CalendarDays className="inline w-5 h-5 mr-1" /> Elige una fecha</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-[50vh] overflow-y-auto">
              {availableDays.slice(0, 28).map(d => {
                const date = new Date(d.date + "T12:00:00");
                return (
                  <button key={d.date} onClick={() => setSelectedDate(d.date)} className={`p-3 rounded-xl border text-center transition-all ${selectedDate === d.date ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}>
                    <p className="text-xs text-muted-foreground">{date.toLocaleDateString("es", { weekday: "short" })}</p>
                    <p className="font-semibold text-foreground">{date.getDate()}</p>
                    <p className="text-xs text-muted-foreground">{date.toLocaleDateString("es", { month: "short" })}</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3: Time */}
        {step === 3 && (
          <div>
            <h2 className="font-display font-semibold text-lg mb-4"><Clock className="inline w-5 h-5 mr-1" /> Elige una hora</h2>
            <p className="text-sm text-muted-foreground mb-3">{new Date(selectedDate + "T12:00:00").toLocaleDateString("es", { weekday: "long", day: "numeric", month: "long" })}</p>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {daySlots.map(s => (
                <button key={s.time} onClick={() => setSelectedTime(s.time)} className={`p-3 rounded-xl border text-center font-medium transition-all ${selectedTime === s.time ? "border-primary bg-primary/5 text-primary" : "border-border hover:border-primary/30 text-foreground"}`}>
                  {s.time}
                </button>
              ))}
            </div>
            {daySlots.length === 0 && <p className="text-center text-muted-foreground py-8">No hay horarios disponibles para esta fecha.</p>}
          </div>
        )}

        {/* Step 4: Data */}
        {step === 4 && (
          <div className="space-y-4">
            <h2 className="font-display font-semibold text-lg">Tus datos</h2>
            <Input placeholder="Nombre *" value={name} onChange={e => setName(e.target.value)} className="rounded-xl" />
            <Input placeholder="Teléfono *" type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="rounded-xl" />
            <Input placeholder="Email (opcional)" type="email" value={email} onChange={e => setEmail(e.target.value)} className="rounded-xl" />
            <Input placeholder="Nota (opcional)" value={note} onChange={e => setNote(e.target.value)} className="rounded-xl" />
            
            <div>
              <p className="text-sm font-medium text-foreground mb-2">Preferencia de contacto</p>
              <div className="flex gap-2">
                <Chip variant="outline" active={contactPref === "whatsapp"} onClick={() => setContactPref("whatsapp")}>WhatsApp</Chip>
                <Chip variant="outline" active={contactPref === "call"} onClick={() => setContactPref("call")}>Llamada</Chip>
              </div>
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <Checkbox checked={acceptPolicy} onCheckedChange={c => setAcceptPolicy(!!c)} className="mt-0.5" />
              <span className="text-sm text-muted-foreground">Acepto la <a href="/politicas" className="text-primary underline">política de cancelación</a> *</span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <Checkbox checked={photoConsent} onCheckedChange={c => setPhotoConsent(!!c)} className="mt-0.5" />
              <span className="text-sm text-muted-foreground">Acepto fotos antes/después (opcional)</span>
            </label>
          </div>
        )}

        {/* Summary bar */}
        {selectedItem && (
          <div className="bg-muted rounded-xl p-4 mt-6 text-sm">
            <p className="font-medium text-foreground">{selectedName}</p>
            {selectedDate && <p className="text-muted-foreground">{new Date(selectedDate + "T12:00:00").toLocaleDateString("es", { weekday: "long", day: "numeric", month: "long" })}</p>}
            {selectedTime && <p className="text-muted-foreground">Hora: {selectedTime}</p>}
            {addOns.length > 0 && <p className="text-muted-foreground">+ {addOns.length} add-on(s)</p>}
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-3 mt-6">
          {step > 1 && (
            <button onClick={() => setStep(step - 1)} className="flex items-center gap-2 h-12 px-6 rounded-full border border-border font-medium hover:bg-muted transition-colors">
              <ArrowLeft className="w-4 h-4" /> Atrás
            </button>
          )}
          {step < 4 ? (
            <button disabled={!canNext()} onClick={() => setStep(step + 1)} className="flex-1 flex items-center justify-center gap-2 h-12 rounded-full bg-primary text-primary-foreground font-display font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors">
              Siguiente <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button disabled={!canNext()} onClick={handleSubmit} className="flex-1 flex items-center justify-center gap-2 h-12 rounded-full bg-primary text-primary-foreground font-display font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-glow hover:bg-primary/90 transition-colors">
              Enviar solicitud <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
}
