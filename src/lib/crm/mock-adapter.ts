import type { CRMAdapter, BookingPayload, BookingResult, TimeSlot } from "./types";
import { mockDoctors, mockServices } from "./mock-data";

function generateSlotsForDay(date: string): TimeSlot[] {
  const times = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"];
  return times.map((time, i) => ({
    date,
    time,
    // Deterministic pseudo-availability so mock doesn't flicker between renders
    available: (i + date.length) % 3 !== 0,
  }));
}

function randomCode(): string {
  const alphabet = "ACDEFHJKMNPRTWXY2346789";
  return Array.from({ length: 6 }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join("");
}

export const mockAdapter: CRMAdapter = {
  async getServices() {
    return mockServices;
  },
  async getService(idOrSlug) {
    return mockServices.find((s) => s.id === idOrSlug || s.slug === idOrSlug) ?? null;
  },
  async getDoctors() {
    return mockDoctors;
  },
  async getDoctor(idOrSlug) {
    return mockDoctors.find((d) => d.id === idOrSlug || d.slug === idOrSlug) ?? null;
  },
  async getAvailableSlots({ date }) {
    return generateSlotsForDay(date);
  },
  async createBooking(payload: BookingPayload): Promise<BookingResult> {
    const doctor = mockDoctors.find((d) => d.id === payload.doctorId);
    const name = doctor
      ? `${doctor.firstName.en} ${doctor.lastName.en}`
      : "Unknown doctor";
    return {
      id: `mock-${Date.now()}`,
      confirmationCode: randomCode(),
      date: payload.date,
      time: payload.time,
      doctorName: name,
    };
  },
  async sendContactMessage() {
    // In mock mode we just resolve
    return { ok: true };
  },
};
