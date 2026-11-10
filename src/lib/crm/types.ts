/**
 * CRM domain types. These are the contract the landing site talks in,
 * independent of which adapter (mock / laravel) serves them.
 */

export type Locale = "ka" | "ru" | "en";

export type LocalizedString = Partial<Record<Locale, string>> & { en: string };

export interface Service {
  id: string;
  slug: string;
  name: LocalizedString;
  department: LocalizedString;
  description?: LocalizedString;
  priceFromGEL?: number;
  priceToGEL?: number;
  durationMinutes?: number;
  doctorIds?: string[];
}

export interface Doctor {
  id: string;
  slug: string;
  firstName: LocalizedString;
  lastName: LocalizedString;
  title?: LocalizedString;
  specialities: LocalizedString[];
  bio?: LocalizedString;
  photoUrl?: string;
  languages: Locale[];
}

/** YYYY-MM-DD */
export type ISODate = string;
/** HH:mm (24h) */
export type HHmm = string;

export interface TimeSlot {
  date: ISODate;
  time: HHmm;
  available: boolean;
}

export interface BookingPayload {
  serviceId: string;
  doctorId: string;
  date: ISODate;
  time: HHmm;
  patient: {
    fullName: string;
    idNumber: string;
    phone: string;
    email?: string;
    notes?: string;
  };
  /** Honeypot — must be empty to pass. */
  honeypot?: string;
  /** reCAPTCHA / Turnstile token if used */
  captchaToken?: string;
}

export interface BookingResult {
  id: string;
  confirmationCode: string;
  date: ISODate;
  time: HHmm;
  doctorName: string;
}

export interface CRMAdapter {
  getServices(locale: Locale): Promise<Service[]>;
  getService(idOrSlug: string, locale: Locale): Promise<Service | null>;
  getDoctors(locale: Locale): Promise<Doctor[]>;
  getDoctor(idOrSlug: string, locale: Locale): Promise<Doctor | null>;
  getAvailableSlots(input: { doctorId: string; date: ISODate }): Promise<TimeSlot[]>;
  createBooking(payload: BookingPayload): Promise<BookingResult>;
  sendContactMessage(input: {
    fullName: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
    honeypot?: string;
  }): Promise<{ ok: true }>;
}
