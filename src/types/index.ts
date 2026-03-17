export interface Business {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  whatsapp: string;
  instagram: string;
  instagramUrl: string;
  hours: { day: string; open: string; close: string }[];
  timezone: string;
}

export type ServiceCategory = "corporal" | "facial" | "addon" | "combo";
export type Objective = "reduccion" | "drenaje" | "celulitis" | "gluteos" | "abdomen" | "glow";

export interface Service {
  id: string;
  slug: string;
  name: string;
  category: ServiceCategory;
  objectives: Objective[];
  durationMin: number;
  shortDescription: string;
  shortBenefits: string[];
  includes: string[];
  recommendations: string[];
  aftercare: string[];
  faq: { q: string; a: string }[];
  imageUrl: string;
  popular?: boolean;
}

export interface Promo {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  priceDisplay: string;
  includes: string[];
  tags: string[];
  idealFor: string[];
  conditions: string;
  startDate: string;
  endDate: string;
  imageUrl: string;
  featured: boolean;
}

export interface Package {
  id: string;
  slug: string;
  title: string;
  sessionsCount: number;
  priceDisplay: string;
  savingsDisplay: string;
  includes: string[];
  idealFor: string[];
  howToUse: string;
  tags: string[];
  featured: boolean;
}

export interface Result {
  id: string;
  type: "image" | "beforeAfter";
  serviceSlug: string;
  serviceName: string;
  beforeUrl: string;
  afterUrl: string;
  imageUrl: string;
  tags: string[];
  sessions?: number;
}

export interface Review {
  id: string;
  displayName: string;
  rating: number;
  text: string;
  date: string;
  service?: string;
}

export interface BookingRequest {
  requestId: string;
  status: "pending";
  selectionType: "service" | "promo" | "package";
  selectionId: string;
  selectionName: string;
  addOns: string[];
  date: string;
  time: string;
  name: string;
  phone: string;
  email?: string;
  note?: string;
  contactPreference: "whatsapp" | "call";
  photoConsent: boolean;
  createdAt: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface DayAvailability {
  date: string;
  available: boolean;
  slots: TimeSlot[];
}
