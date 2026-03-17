import { Result } from "@/types";
import imgMaderoterapia from "@/assets/services/corporal-maderoterapia.jpg";
import imgMasaje from "@/assets/services/corporal-masaje.jpg";
import imgFacial from "@/assets/services/facial-limpieza.jpg";
import imgAparatologia from "@/assets/services/aparatologia.jpg";
import imgDermaplaning from "@/assets/services/facial-dermaplaning.jpg";
import imgDrenaje from "@/assets/services/corporal-drenaje.jpg";

export const results: Result[] = [
  { id: "r1", type: "beforeAfter", serviceSlug: "maderoterapia", serviceName: "Maderoterapia", beforeUrl: imgMaderoterapia, afterUrl: imgMasaje, imageUrl: "", tags: ["Abdomen", "8 sesiones"], sessions: 8 },
  { id: "r2", type: "beforeAfter", serviceSlug: "masaje-reductivo", serviceName: "Masaje Reductivo", beforeUrl: imgMasaje, afterUrl: imgDrenaje, imageUrl: "", tags: ["Flancos", "6 sesiones"], sessions: 6 },
  { id: "r3", type: "beforeAfter", serviceSlug: "vacuumterapia", serviceName: "Vacuumterapia", beforeUrl: imgDrenaje, afterUrl: imgMasaje, imageUrl: "", tags: ["Glúteos", "10 sesiones"], sessions: 10 },
  { id: "r4", type: "image", serviceSlug: "limpieza-facial-profunda", serviceName: "Limpieza Facial", beforeUrl: "", afterUrl: "", imageUrl: imgFacial, tags: ["Facial", "Glow"] },
  { id: "r5", type: "beforeAfter", serviceSlug: "aparatologia-combo", serviceName: "Aparatología Combo", beforeUrl: imgAparatologia, afterUrl: imgMasaje, imageUrl: "", tags: ["Abdomen", "12 sesiones"], sessions: 12 },
  { id: "r6", type: "beforeAfter", serviceSlug: "cavitacion", serviceName: "Cavitación", beforeUrl: imgAparatologia, afterUrl: imgDrenaje, imageUrl: "", tags: ["Abdomen", "6 sesiones"], sessions: 6 },
  { id: "r7", type: "image", serviceSlug: "dermaplaning", serviceName: "Dermaplaning", beforeUrl: "", afterUrl: "", imageUrl: imgDermaplaning, tags: ["Facial", "Glow"] },
  { id: "r8", type: "beforeAfter", serviceSlug: "radiofrecuencia-corporal", serviceName: "Radiofrecuencia", beforeUrl: imgMaderoterapia, afterUrl: imgDrenaje, imageUrl: "", tags: ["Muslos", "8 sesiones"], sessions: 8 },
];
