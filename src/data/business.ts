import { Business } from "@/types";

export const business: Business = {
  name: "Leni Sculpting Body",
  address: "1888 Polk St",
  city: "Hollywood",
  state: "FL",
  zip: "33020",
  phone: "(305) 319-2584",
  whatsapp: "13053192584",
  instagram: "@lenisculptingbody",
  instagramUrl: "https://instagram.com/lenisculptingbody",
  timezone: "America/New_York",
  hours: [
    { day: "Lunes", open: "09:00", close: "18:00" },
    { day: "Martes", open: "09:00", close: "18:00" },
    { day: "Miércoles", open: "09:00", close: "18:00" },
    { day: "Jueves", open: "09:00", close: "18:00" },
    { day: "Viernes", open: "09:00", close: "19:00" },
    { day: "Sábado", open: "09:00", close: "16:00" },
    { day: "Domingo", open: "", close: "" },
  ],
};
