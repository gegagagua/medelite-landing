import type { Metadata, Viewport } from "next";
import { getLocale } from "next-intl/server";
import { fontVariables } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://medelite.ge"),
  title: {
    default: "Medelite",
    template: "%s — Medelite",
  },
  description: "A modern multidisciplinary clinic in Tbilisi.",
  applicationName: "Medelite",
  authors: [{ name: "Medelite Clinic", url: "https://medelite.ge" }],
  creator: "Medelite Clinic",
  publisher: "Medelite Clinic",
  category: "health",
  formatDetection: { telephone: true, email: true, address: true },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f1e6" },
    { media: "(prefers-color-scheme: dark)", color: "#0c1714" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      dir="ltr"
      suppressHydrationWarning
      className={`${fontVariables} h-full antialiased`}
    >
      <head>
        {/* Theme flash prevention — must run before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('theme');
                  var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var theme = stored === 'light' || stored === 'dark'
                    ? stored
                    : (systemDark ? 'dark' : 'light');
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {
                  document.documentElement.setAttribute('data-theme', 'light');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-dvh flex flex-col bg-bg text-ink">
        {children}
      </body>
    </html>
  );
}
