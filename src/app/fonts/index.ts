import { Cormorant_Garamond, Fira_Sans, Noto_Serif_Georgian, Noto_Sans_Georgian, JetBrains_Mono } from "next/font/google";

export const fontDisplay = Cormorant_Garamond({
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
  preload: true,
});

export const fontDisplayGeorgian = Noto_Serif_Georgian({
  subsets: ["georgian"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-display-ka",
  display: "swap",
  preload: true,
});

export const fontBody = Fira_Sans({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-body",
  display: "swap",
  preload: true,
});

export const fontBodyGeorgian = Noto_Sans_Georgian({
  subsets: ["georgian"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body-ka",
  display: "swap",
  preload: true,
});

export const fontMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
  preload: false,
});

export const fontVariables = [
  fontDisplay.variable,
  fontDisplayGeorgian.variable,
  fontBody.variable,
  fontBodyGeorgian.variable,
  fontMono.variable,
].join(" ");
