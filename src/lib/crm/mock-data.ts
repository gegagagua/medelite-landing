import type { Service, Doctor } from "./types";

export const mockServices: Service[] = [
  {
    id: "svc-001",
    slug: "consultation",
    name: {
      ka: "კონსულტაცია",
      ru: "Консультация",
      en: "Consultation",
    },
    department: {
      ka: "ზოგადი",
      ru: "Общее",
      en: "General",
    },
    description: {
      ka: "სრული კონსულტაცია სპეციალისტთან — ანამნეზი, შემოწმება, რეკომენდაციები.",
      ru: "Полная консультация со специалистом — анамнез, осмотр, рекомендации.",
      en: "A full consultation with a specialist — history, exam, recommendations.",
    },
    priceFromGEL: 80,
    priceToGEL: 150,
    durationMinutes: 30,
    doctorIds: ["doc-001", "doc-002"],
  },
  {
    id: "svc-002",
    slug: "diagnostics",
    name: {
      ka: "დიაგნოსტიკა",
      ru: "Диагностика",
      en: "Diagnostics",
    },
    department: {
      ka: "დიაგნოსტიკა",
      ru: "Диагностика",
      en: "Diagnostics",
    },
    description: {
      ka: "ულტრაბგერითი კვლევა და ლაბორატორიული ანალიზები.",
      ru: "УЗИ и лабораторные анализы.",
      en: "Ultrasound and laboratory analysis.",
    },
    priceFromGEL: 40,
    priceToGEL: 400,
    durationMinutes: 45,
    doctorIds: ["doc-002"],
  },
  {
    id: "svc-003",
    slug: "aesthetic-medicine",
    name: {
      ka: "ესთეტიკური მედიცინა",
      ru: "Эстетическая медицина",
      en: "Aesthetic medicine",
    },
    department: {
      ka: "დერმატოლოგია",
      ru: "Дерматология",
      en: "Dermatology",
    },
    priceFromGEL: 150,
    priceToGEL: 1200,
    durationMinutes: 60,
    doctorIds: ["doc-003"],
  },
];

export const mockDoctors: Doctor[] = [
  {
    id: "doc-001",
    slug: "n-tavadze",
    firstName: { ka: "ნინო", ru: "Нино", en: "Nino" },
    lastName: { ka: "თავაძე", ru: "Тавадзе", en: "Tavadze" },
    title: { ka: "მედიცინის დოქტორი", ru: "Доктор медицинских наук", en: "MD, PhD" },
    specialities: [
      { ka: "კარდიოლოგია", ru: "Кардиология", en: "Cardiology" },
    ],
    languages: ["ka", "ru", "en"],
  },
  {
    id: "doc-002",
    slug: "g-kobakhidze",
    firstName: { ka: "გიორგი", ru: "Георгий", en: "Giorgi" },
    lastName: { ka: "კობახიძე", ru: "Кобахидзе", en: "Kobakhidze" },
    title: { ka: "მედიცინის დოქტორი", ru: "Доктор медицинских наук", en: "MD" },
    specialities: [
      { ka: "ზოგადი ექიმი", ru: "Терапевт", en: "General Practitioner" },
      { ka: "დიაგნოსტიკა", ru: "Диагностика", en: "Diagnostics" },
    ],
    languages: ["ka", "en"],
  },
  {
    id: "doc-003",
    slug: "m-tsikaridze",
    firstName: { ka: "მარიამ", ru: "Мариам", en: "Mariam" },
    lastName: { ka: "ციქარიძე", ru: "Цикаридзе", en: "Tsikaridze" },
    title: { ka: "მედიცინის დოქტორი", ru: "Доктор медицинских наук", en: "MD" },
    specialities: [
      { ka: "დერმატოლოგია", ru: "Дерматология", en: "Dermatology" },
      { ka: "ესთეტიკური მედიცინა", ru: "Эстетическая медицина", en: "Aesthetic medicine" },
    ],
    languages: ["ka", "ru"],
  },
];
