import { DayAvailability } from "@/types";

function generateMockAvailability(): DayAvailability[] {
  const days: DayAvailability[] = [];
  const now = new Date();
  
  for (let i = 1; i <= 60; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() + i);
    const dayOfWeek = date.getDay();
    
    if (dayOfWeek === 0) {
      days.push({ date: date.toISOString().split("T")[0], available: false, slots: [] });
      continue;
    }
    
    const slots = [];
    const startHour = 9;
    const endHour = dayOfWeek === 6 ? 16 : dayOfWeek === 5 ? 19 : 18;
    
    for (let h = startHour; h < endHour; h++) {
      for (const m of [0, 30]) {
        const available = Math.random() > 0.3;
        slots.push({
          time: `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`,
          available,
        });
      }
    }
    
    days.push({
      date: date.toISOString().split("T")[0],
      available: slots.some(s => s.available),
      slots,
    });
  }
  
  return days;
}

export const availability = generateMockAvailability();
