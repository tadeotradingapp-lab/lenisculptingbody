import { services } from "@/data/services";
import { promos } from "@/data/promos";
import { packages } from "@/data/packages";
import { results } from "@/data/results";
import { reviews } from "@/data/reviews";
import { availability } from "@/data/availability";
import { BookingRequest, DayAvailability, TimeSlot } from "@/types";

const delay = (ms = 300) => new Promise(r => setTimeout(r, ms));

export const api = {
  services: {
    async getAll() { await delay(); return services; },
    async getBySlug(slug: string) { await delay(); return services.find(s => s.slug === slug) ?? null; },
    async getPopular() { await delay(); return services.filter(s => s.popular); },
  },
  promos: {
    async getAll() { await delay(); return promos; },
    async getBySlug(slug: string) { await delay(); return promos.find(p => p.slug === slug) ?? null; },
    async getFeatured() { await delay(); return promos.filter(p => p.featured); },
  },
  packages: {
    async getAll() { await delay(); return packages; },
    async getBySlug(slug: string) { await delay(); return packages.find(p => p.slug === slug) ?? null; },
    async getFeatured() { await delay(); return packages.filter(p => p.featured); },
  },
  results: {
    async getAll() { await delay(); return results; },
  },
  reviews: {
    async getAll() { await delay(); return reviews; },
    async getAverage() { await delay(); const avg = reviews.reduce((a, r) => a + r.rating, 0) / reviews.length; return Math.round(avg * 10) / 10; },
  },
  booking: {
    async getAvailableDays(month: string): Promise<DayAvailability[]> {
      await delay();
      return availability.filter(d => d.date.startsWith(month));
    },
    async getAvailableSlots(date: string): Promise<TimeSlot[]> {
      await delay();
      const day = availability.find(d => d.date === date);
      return day?.slots ?? [];
    },
    async createRequest(payload: Omit<BookingRequest, "requestId" | "status" | "createdAt">): Promise<BookingRequest> {
      await delay(500);
      const request: BookingRequest = {
        ...payload,
        requestId: `REQ-${Date.now().toString(36).toUpperCase()}`,
        status: "pending",
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem("leni_latest_request", JSON.stringify(request));
      return request;
    },
    getLatestRequest(): BookingRequest | null {
      const data = localStorage.getItem("leni_latest_request");
      return data ? JSON.parse(data) : null;
    },
    clearRequest() {
      localStorage.removeItem("leni_latest_request");
    },
  },
};
