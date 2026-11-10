# Medelite — Premium medical-clinic landing

A production-grade landing site for a multidisciplinary medical clinic in Tbilisi, with CRM-backed online booking. Built with Next.js 16 (App Router, Server Components), Tailwind v4, next-intl (ka / ru / en), next-themes, Motion, Lenis, Embla, and react-hook-form + zod.

Full design-system spec: [`DESIGN.md`](./DESIGN.md).

---

## Getting started

```bash
pnpm install
cp .env.example .env.local
pnpm dev          # http://localhost:3000
pnpm build
pnpm start
pnpm lint
```

Node ≥ 20. Package manager: pnpm.

---

## Project layout

```
src/
  app/
    layout.tsx                 # root <html>/<body>, sets lang + theme flash prevention
    not-found.tsx              # root 404 (fallback — rarely hit, locale route handles 404s)
    globals.css                # design tokens + Tailwind v4 theme
    fonts/index.ts             # next/font loaders for Cormorant / Fira Sans / Noto Serif Georgian / Noto Sans Georgian / JetBrains Mono
    [locale]/
      layout.tsx               # i18n + theme providers + chrome
      page.tsx                 # home
      not-found.tsx            # locale-aware 404
      services/page.tsx
      services/[slug]/page.tsx
      booking/page.tsx
      news/page.tsx
      news/[slug]/page.tsx
      about/page.tsx
      contact/page.tsx
  components/
    site-header.tsx            # sticky translucent nav, scroll transition, mobile menu
    site-footer.tsx            # columns, newsletter, 7 social icons
    theme-provider.tsx         # next-themes wrapper
    theme-toggle.tsx           # animated sun/moon toggle
    language-switcher.tsx      # ka / ru / en, preserves current route
    smooth-scroll.tsx          # Lenis (disabled under prefers-reduced-motion)
    floating-actions.tsx       # floating Book-now + WhatsApp
    cookie-notice.tsx          # localStorage-backed consent
    placeholder-page.tsx       # "coming soon" shell used by Phase 1 routes
  i18n/
    routing.ts                 # locales + typed pathnames
    navigation.ts              # typed Link/useRouter/usePathname
    request.ts                 # loads messages/{locale}.json
  lib/
    cn.ts                      # clsx + tailwind-merge
    crm/
      types.ts                 # CRMAdapter interface + domain types
      mock-data.ts             # realistic fixtures (services, doctors)
      mock-adapter.ts          # the Phase-1 default — no CRM needed
      laravel-adapter.ts       # calls your medical-laravel API with CRM_API_KEY
      index.ts                 # factory picks adapter by CRM_ADAPTER env
  proxy.ts                     # next-intl middleware (Next 16 "proxy" convention)
messages/
  ka.json  ru.json  en.json    # all UI strings + clinic placeholder copy
public/
  textures/grain.svg           # paper-grain overlay used by .grain utility
DESIGN.md                      # design-system spec (colors, type, spacing, motion)
.env.example                   # env contract
```

---

## Design system

Tokens live in `src/app/globals.css` as CSS custom properties and are mapped to Tailwind v4 via the `@theme inline` block. Everything (shadcn primitives when we restyle them in Phase 2+, animations, custom utilities) consumes these tokens — never a hardcoded color.

Themes: `data-theme="light"` and `data-theme="dark"`. Both are designed on purpose (see DESIGN.md §3). A pre-paint inline script in the root layout reads `localStorage.theme` or `prefers-color-scheme` and sets `data-theme` before first paint — no flash.

Fonts: `next/font/google` self-hosts and preloads:

| Family | Role | Scripts |
|---|---|---|
| Cormorant Garamond | display | Latin, Cyrillic |
| Noto Serif Georgian | display (Georgian) | Georgian |
| Fira Sans | body | Latin, Cyrillic |
| Noto Sans Georgian | body (Georgian) | Georgian |
| JetBrains Mono | numerals, metadata | Latin, Cyrillic |

Georgian never falls back to a system font — the Georgian stack is always present in the CSS font-family cascade, and `html[lang="ka"]` swaps the primary display face to Noto Serif Georgian.

---

## i18n

Three locales: **ka** (default), **ru**, **en**. Routes are locale-prefixed: `/ka/...`, `/ru/...`, `/en/...`. The middleware at `src/proxy.ts` redirects `/` to the user's best-match locale.

Translations live in `messages/{locale}.json`. Keys are organized by scope (`meta.*`, `nav.*`, `pages.home.*`, `footer.*`, `cookies.*`, `common.*`, `theme.*`, `lang.*`).

### Adding a new string

1. Add the key under the correct scope in all three `messages/*.json` files.
2. Use `const t = useTranslations('scope')` (client) or `await getTranslations('scope')` (server).
3. No lorem ipsum — write real Georgian, Russian, and English. The ka/ru/en files already have realistic clinic placeholder copy for Phase 1.

### Adding a new page

1. Add it to `src/i18n/routing.ts` `pathnames` (with localized slugs if you want them).
2. Create `src/app/[locale]/<name>/page.tsx` (server component) exporting:
   - `generateMetadata({ params })` — unique localized title + description.
   - The default page, calling `setRequestLocale(locale)` before any i18n call.
3. Add translations for the page's visible strings.

---

## Theming

- `next-themes` with `attribute="data-theme"` and `enableSystem`.
- Toggle via `<ThemeToggle />` in the header.
- Any component can read the resolved theme via `useTheme()`, but prefer CSS tokens — most components should never need the theme name at all.

---

## CRM integration

The booking flow (Phase 3) and the services/doctors catalog talk to the clinic's Laravel CRM through a typed service layer in `src/lib/crm/`.

**Only server-side code may call the adapter.** `src/lib/crm/index.ts` imports `"server-only"` so any accidental client import fails the build. The two adapters currently shipped:

- `mock-adapter.ts` — in-memory fixtures. Default (`CRM_ADAPTER=mock`).
- `laravel-adapter.ts` — calls the medical-laravel API:
  - `GET  /api/services` → `getServices`
  - `GET  /api/users` (filtered to `role=doctor`) → `getDoctors`
  - `GET  /api/bookings?doctor_id=&date=` → busy slots for `getAvailableSlots`
  - `POST /api/bookings` → `createBooking`

Switch adapters via env:

```env
CRM_ADAPTER=laravel
CRM_API_URL=https://crm.medelite.ge
CRM_API_KEY=<sanctum-personal-access-token>
```

Issue the token in the CRM once:

```php
// php artisan tinker
$user = User::where('email', 'landing-bot@medelite.ge')->first();
echo $user->createToken('landing', ['*'])->plainTextToken;
```

Rate limiting, honeypot and zod validation live at the Route Handler layer (added in Phase 3) — the adapter stays pure data access.

---

## Dark/light smoke test

After any UI change, verify both themes in all three locales at the common widths:

```bash
pnpm dev
# then in the browser: toggle theme + switch locale on
# /, /services, /booking, /news, /about, /contact
# at 360, 768, 1024, 1440
```

---

## What's done (Phase 1)

- Scaffold, deps, fonts, design tokens, themes, i18n routing
- Chrome: sticky header, mobile menu, footer, floating actions, cookie notice
- Placeholder content on every route so navigation works end-to-end
- CRM service layer with mock + Laravel adapters and `.env.example`
- Build + lint clean, routes return 200 in all 3 locales

## What's next

- **Phase 2** — Home page composition: cinematic hero (parallax layers + mask-reveal), service slider, animated counters, doctor slider, testimonials, gallery, FAQ accordion.
- **Phase 3** — Services list + detail + full multi-step booking flow against the CRM.
- **Phase 4** — News (MDX), About, Contact + map (lazy-loaded).
- **Phase 5** — SEO (sitemap, OG images, JSON-LD), performance pass, a11y pass.
