import { business } from "@/data/business";

export function buildWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${business.whatsapp}?text=${encoded}`;
}

export function buildBookingWhatsApp(name: string, selection: string, date: string, time: string): string {
  const msg = `Hola, soy ${name}. Envié una solicitud de cita para ${selection} el ${date} a las ${time}. ¿Me pueden confirmar?`;
  return buildWhatsAppUrl(msg);
}

export function buildServiceWhatsApp(serviceName: string): string {
  return buildWhatsAppUrl(`Hola, me interesa el servicio de ${serviceName}. ¿Me pueden dar más información?`);
}

export function buildCallUrl(): string {
  return `tel:${business.phone.replace(/[^+\d]/g, "")}`;
}

export function getDirectionsUrl(): string {
  const address = encodeURIComponent(`${business.address}, ${business.city}, ${business.state} ${business.zip}`);
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  return isIOS ? `maps://maps.apple.com/?q=${address}` : `https://www.google.com/maps/search/?api=1&query=${address}`;
}

export function isOpenNow(): { open: boolean; text: string } {
  try {
    const now = new Date(new Date().toLocaleString("en-US", { timeZone: business.timezone }));
    const dayIndex = now.getDay();
    const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const todayHours = business.hours.find(h => h.day === days[dayIndex]);
    
    if (!todayHours || !todayHours.open) return { open: false, text: "Cerrado hoy" };
    
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const [openH, openM] = todayHours.open.split(":").map(Number);
    const [closeH, closeM] = todayHours.close.split(":").map(Number);
    const openMin = openH * 60 + openM;
    const closeMin = closeH * 60 + closeM;
    
    if (currentMinutes >= openMin && currentMinutes < closeMin) {
      return { open: true, text: `Abierto · Cierra a las ${todayHours.close}` };
    }
    return { open: false, text: `Cerrado · Abre a las ${todayHours.open}` };
  } catch {
    return { open: false, text: "Horario no disponible" };
  }
}
