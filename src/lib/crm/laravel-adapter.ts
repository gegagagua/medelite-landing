import "server-only";

import type {
  CRMAdapter,
  BookingPayload,
  BookingResult,
  TimeSlot,
  Service,
  Doctor,
  HHmm,
  ISODate,
  Locale,
} from "./types";

/**
 * Laravel adapter — talks to the medical-laravel CRM via
 *   GET  /api/services
 *   GET  /api/users           (filtered to doctors)
 *   GET  /api/bookings?doctor_id=&date=
 *   POST /api/bookings
 *
 * All requests carry a Bearer token (`CRM_API_KEY`) issued via
 * `php artisan tinker` → `$user->createToken('landing')`.
 */

const WORK_START_MIN = 9 * 60;
const WORK_END_MIN = 18 * 60;
const SLOT_STEP_MIN = 30;

type LaravelServiceDTO = {
  id: number | string;
  name?: string;
  title?: string;
  department?: string;
  description?: string;
  price?: number;
  price_from?: number;
  price_to?: number;
  duration?: number;
};

type LaravelUserDTO = {
  id: number | string;
  first_name?: string;
  last_name?: string;
  role?: string;
  department?: string;
  photo_url?: string;
};

type LaravelBookingDTO = {
  id: number | string;
  doctor_id: number | string;
  date: string;
  time: HHmm;
};

function env(key: string): string {
  const v = process.env[key];
  if (!v) throw new Error(`[crm/laravel] Missing env: ${key}`);
  return v;
}

async function request<T>(
  path: string,
  init: RequestInit & { revalidate?: number } = {},
): Promise<T> {
  const { revalidate, ...rest } = init;
  const url = `${env("CRM_API_URL").replace(/\/$/, "")}${path}`;
  const res = await fetch(url, {
    ...rest,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${env("CRM_API_KEY")}`,
      ...(rest.headers ?? {}),
    },
    next: revalidate !== undefined ? { revalidate } : undefined,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `[crm/laravel] ${rest.method ?? "GET"} ${path} → ${res.status}: ${text.slice(0, 200)}`,
    );
  }
  return (await res.json()) as T;
}

function mapService(dto: LaravelServiceDTO): Service {
  const name = dto.name ?? dto.title ?? `Service ${dto.id}`;
  return {
    id: String(dto.id),
    slug: slugify(name),
    name: { ka: name, ru: name, en: name },
    department: { ka: dto.department ?? "", ru: dto.department ?? "", en: dto.department ?? "" },
    description: dto.description
      ? { ka: dto.description, ru: dto.description, en: dto.description }
      : undefined,
    priceFromGEL: dto.price_from ?? dto.price,
    priceToGEL: dto.price_to,
    durationMinutes: dto.duration,
  };
}

function mapDoctor(dto: LaravelUserDTO): Doctor {
  const first = dto.first_name ?? "";
  const last = dto.last_name ?? "";
  const full = `${first} ${last}`.trim() || `Doctor ${dto.id}`;
  return {
    id: String(dto.id),
    slug: slugify(full),
    firstName: { ka: first, ru: first, en: first },
    lastName: { ka: last, ru: last, en: last },
    specialities: dto.department
      ? [{ ka: dto.department, ru: dto.department, en: dto.department }]
      : [],
    photoUrl: dto.photo_url,
    languages: ["ka", "en"],
  };
}

function slugify(input: string): string {
  return (
    input
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 80) || "item"
  );
}

function minutesToHHmm(mins: number): HHmm {
  const h = Math.floor(mins / 60).toString().padStart(2, "0");
  const m = (mins % 60).toString().padStart(2, "0");
  return `${h}:${m}` as HHmm;
}

async function fetchServices(): Promise<Service[]> {
  const dto = await request<LaravelServiceDTO[] | { data: LaravelServiceDTO[] }>("/api/services", {
    method: "GET",
    revalidate: 300,
  });
  const list = Array.isArray(dto) ? dto : dto.data;
  return list.map(mapService);
}

async function fetchDoctors(): Promise<Doctor[]> {
  const dto = await request<LaravelUserDTO[] | { data: LaravelUserDTO[] }>("/api/users", {
    method: "GET",
    revalidate: 300,
  });
  const list = Array.isArray(dto) ? dto : dto.data;
  return list.filter((u) => (u.role ?? "").toLowerCase() === "doctor").map(mapDoctor);
}

export const laravelAdapter: CRMAdapter = {
  async getServices(_locale: Locale) {
    void _locale;
    return fetchServices();
  },
  async getService(idOrSlug, _locale) {
    void _locale;
    const list = await fetchServices();
    return list.find((s) => s.id === idOrSlug || s.slug === idOrSlug) ?? null;
  },
  async getDoctors(_locale) {
    void _locale;
    return fetchDoctors();
  },
  async getDoctor(idOrSlug, _locale) {
    void _locale;
    const list = await fetchDoctors();
    return list.find((d) => d.id === idOrSlug || d.slug === idOrSlug) ?? null;
  },
  async getAvailableSlots({ doctorId, date }: { doctorId: string; date: ISODate }): Promise<TimeSlot[]> {
    const busy = await request<LaravelBookingDTO[]>(
      `/api/bookings?doctor_id=${encodeURIComponent(doctorId)}&date=${encodeURIComponent(date)}`,
      { method: "GET", revalidate: 30 },
    );
    const busySet = new Set(busy.map((b) => b.time.slice(0, 5)));
    const slots: TimeSlot[] = [];
    for (let m = WORK_START_MIN; m < WORK_END_MIN; m += SLOT_STEP_MIN) {
      const time = minutesToHHmm(m);
      slots.push({ date, time, available: !busySet.has(time) });
    }
    return slots;
  },
  async createBooking(payload: BookingPayload): Promise<BookingResult> {
    const doctor = await laravelAdapter.getDoctor(payload.doctorId, "en");
    const doctorName = doctor ? `${doctor.firstName.en} ${doctor.lastName.en}` : "";
    const body = {
      doctor_id: Number(payload.doctorId) || payload.doctorId,
      doctor_name: doctorName,
      patient_name: payload.patient.fullName,
      patient_id_number: payload.patient.idNumber,
      patient_phone: payload.patient.phone,
      date: payload.date,
      time: payload.time,
    };
    const res = await request<{
      booking: { id: number | string; date: string; time: HHmm; doctorName?: string };
    }>("/api/bookings", { method: "POST", body: JSON.stringify(body) });
    const id = String(res.booking.id);
    return {
      id,
      confirmationCode: id.padStart(6, "0").slice(-6).toUpperCase(),
      date: res.booking.date,
      time: res.booking.time,
      doctorName: res.booking.doctorName ?? doctorName,
    };
  },
  async sendContactMessage() {
    // CRM doesn't expose a public contact endpoint.
    // The route handler will fall back to SMTP in a later phase.
    return { ok: true };
  },
};
