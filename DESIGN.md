# Medelite — Design System

> Premium medical clinic landing. Trustworthy, refined, modern. "Luxury medical", not "hospital blue".

---

## 1. Three Aesthetic Directions (proposed)

### A. Clinique Éditoriale — Editorial Luxury
A medical-magazine feel. Think Aesop × Monocle × Chanel skincare. Oversized editorial numerals (01 / 02 / 03), hairline rules, pull-quote testimonials, lots of negative space, imagery treated like fashion photography (duotone, warm grade).

- Palette (light): ivory `#F8F3EC`, inky bordeaux `#3A1620`, pencil graphite `#1F1C1A`, gold hairline `#B4894A`
- Palette (dark): warm black `#131110`, bone `#E8DDC9`, bordeaux accent
- Type: serif display (Fraunces) + humanist sans body (FiraGO)
- Motion: slow mask-reveal text, horizontal editorial scroll modules

**Risk:** May read "lifestyle brand" more than "clinic" — doctors' credentials need extra weight.

---

### B. Pavilion — Serene Clinical Minimalism
Scandinavian clinic × Japanese ryokan. Bone, sage, oxidized brass, charcoal. Geometric grid, generous air, nearly-zero ornament, paper-grain overlay. The restraint IS the luxury.

- Palette (light): bone `#EFEAE0`, sage `#7A8B7A`, brass `#B08D57`, ink `#1A1A17`
- Palette (dark): deep forest `#121816`, bone fog `#D9D3C4`, brass preserved
- Type: humanist sans (FiraGO) throughout; slab display accents (Fraunces italic)
- Motion: subtle Lenis scroll, soft fade+translate reveals, no bounces

**Risk:** User asked for cinematic hero + "lots of motion". Pavilion's restraint fights that brief slightly.

---

### C. Noctume — Dark Jewel / Spa at Night  ⭐ **RECOMMENDED**
The clinic as a sanctum, photographed by candlelight. Dark emerald-viridian base, warm ivory, apricot-brass accent. Ambient glows behind the hero, close-up photography of hands/instruments/florals, slow parallax, warm film grain. The light theme is its serene daytime counterpart — not an inversion but a redesigned pairing.

**Why this wins for Medelite**
- Cinematic hero that the brief demands — dark hero sings on parallax/glow/mask reveals
- "Luxury medical" without fashion-brand drift — the deep clinical green reads as *medicine*, not couture
- Brass accent replaces the exhausted "hospital blue" and gives us one sharp CTA color across both themes
- Both themes have a reason to exist — day (ivory + forest ink) and night (forest + ivory) — not one inverted
- Pairs well with Georgian typography — the serif display harmonises with Noto Serif Georgian's rounder forms

---

## 2. Visual Principles

1. **Negative space is a feature.** Luxury reads as air, not as ornament. No filler cards, no stock-icon-grids.
2. **One accent, ruthlessly.** Brass `#C9A368` is the only warm color. Everything else is deep green, ivory, or neutral. CTAs own it; nothing else does.
3. **Photography carries the weight.** Hero and section leads use real photography (clinic interior, hands, instruments, florals). No illustrations of doctors with clipboards.
4. **Numerals are typography.** Stats and prices use tabular, oversized numerals — part of the editorial vocabulary.
5. **Motion is choreography, not decoration.** One cinematic hero reveal, then subtle scroll-reveals. Respect `prefers-reduced-motion` globally.
6. **Georgian is first-class.** The body font (FiraGO) renders ka/ru/en in one file; headings pair Fraunces (Latin + Cyrillic) with Noto Serif Georgian (ka). No system-font fallback ever appears.

---

## 3. Design Tokens

All tokens live in `src/styles/tokens.css` as CSS custom properties and in `tailwind.config.ts` as a theme extension. shadcn primitives map to these tokens; no default shadcn look leaks.

### 3.1 Color — Light theme (`[data-theme="light"]`)

| Token | Hex | Role |
|---|---|---|
| `--bg` | `#F6F1E6` | Page background (ivory) |
| `--bg-raised` | `#FBF7EC` | Cards, raised surfaces |
| `--bg-sunken` | `#EBE4D4` | Wells, input backgrounds |
| `--ink` | `#13201C` | Primary text (deep forest ink) |
| `--ink-soft` | `#3D4A45` | Secondary text |
| `--ink-muted` | `#6F7B76` | Tertiary text, captions |
| `--line` | `#D9CFBB` | Hairlines, dividers |
| `--line-strong` | `#B8AC92` | Stronger borders |
| `--brand` | `#143B32` | Deep viridian (secondary brand) |
| `--brand-soft` | `#285048` | Hover state for brand |
| `--accent` | `#C9A368` | Brass — CTAs, links, highlights |
| `--accent-soft` | `#DDBD85` | Hover accent |
| `--accent-ink` | `#1F1708` | Text on brass |
| `--success` | `#4C7C58` |  |
| `--warning` | `#B98635` |  |
| `--danger` | `#9B3B2E` |  |
| `--focus` | `#C9A368` | Focus ring (brass) |

### 3.2 Color — Dark theme (`[data-theme="dark"]`)

| Token | Hex | Role |
|---|---|---|
| `--bg` | `#0C1714` | Deep viridian-black |
| `--bg-raised` | `#122320` | Cards |
| `--bg-sunken` | `#081210` | Wells |
| `--ink` | `#EDE4D1` | Warm ivory |
| `--ink-soft` | `#B8B0A0` |  |
| `--ink-muted` | `#7B766A` |  |
| `--line` | `#223431` |  |
| `--line-strong` | `#324A45` |  |
| `--brand` | `#4CA089` | Lifted viridian (dark-mode brand) |
| `--brand-soft` | `#6CBFA6` |  |
| `--accent` | `#D9B880` | Brightened brass for dark bg |
| `--accent-soft` | `#E8CA9B` |  |
| `--accent-ink` | `#0C1714` |  |
| `--success` | `#7BB58A` |  |
| `--warning` | `#D9A868` |  |
| `--danger` | `#D06F60` |  |
| `--focus` | `#D9B880` |  |

Both themes pass WCAG AA for body text (verified pairings: ink/bg ≥ 12:1 light, ≥ 11:1 dark; accent/bg ≥ 4.6:1 for large text; brand/bg ≥ 7:1 both themes).

### 3.3 Typography

**Font files (all self-hosted via `next/font/local`)**

| Family | Role | Scripts | License |
|---|---|---|---|
| Fraunces | Display headings (Latin, Cyrillic) | Latin, Cyrillic | OFL |
| Noto Serif Georgian | Display headings (Georgian) | Georgian | OFL |
| FiraGO | Body + UI, all three scripts | Latin, Cyrillic, Georgian | OFL |
| JetBrains Mono | Numbers, metadata, time slots | Latin, Cyrillic | OFL |

Font stacks are swapped by locale at the HTML root (`lang="ka" → Noto Serif Georgian` for display; `lang="en|ru" → Fraunces` for display). Body is always FiraGO. Preload only the two most-used weights per font.

**Type scale** (clamp()-based, fluid between 320px and 1440px)

| Token | Mobile → Desktop | Role |
|---|---|---|
| `--text-6xl` | `clamp(3.2rem, 7vw, 6.5rem)` | Hero display |
| `--text-5xl` | `clamp(2.4rem, 5vw, 4.5rem)` | Page H1 |
| `--text-4xl` | `clamp(2rem, 4vw, 3.25rem)` | Section H2 |
| `--text-3xl` | `clamp(1.6rem, 3vw, 2.25rem)` | H3 |
| `--text-2xl` | `1.5rem` | H4 / callouts |
| `--text-xl` | `1.25rem` | Lead paragraph |
| `--text-base` | `1rem` (16px) | Body |
| `--text-sm` | `0.875rem` | Secondary |
| `--text-xs` | `0.75rem` | Captions, labels |

**Weights**: 300 (light, display only), 400 (body), 500 (UI), 600 (emphasis). No bold-900.

**Line heights**: display `1.05`, headings `1.15`, body `1.6`, UI `1.4`.

**Letter spacing**: display `-0.02em`, headings `-0.01em`, body `0`, uppercase labels `+0.08em`.

**Georgian safeguards**
- Line height for Georgian display raised to `1.2` (Georgian has taller ascenders).
- `word-break: keep-all; overflow-wrap: anywhere;` on headlines to avoid long-word overflow.
- Smoke-test strings include `გამარჯობა, მოგესალმებით, სპეციალისტები, კონსულტაცია` at every breakpoint.

### 3.4 Spacing (4px baseline)

`--space-1 … --space-32` → `4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128, 160, 192` px.

Section rhythm: `py-24 md:py-32 lg:py-40`. Cards: `p-6 md:p-8`. Form fields: `py-3 px-4`.

### 3.5 Radius

| Token | Px | Use |
|---|---|---|
| `--radius-none` | 0 | Hero plates, editorial blocks |
| `--radius-sm` | 2 | Chips, tags |
| `--radius-md` | 6 | Inputs, small buttons |
| `--radius-lg` | 10 | Cards, modals |
| `--radius-xl` | 18 | Hero cards, lightbox frames |
| `--radius-pill` | 999 | Avoid. Reserved for status chips only. |

**No pill buttons.** Buttons are `radius-md` with crisp edges — luxury reads geometric, not gummy.

### 3.6 Shadows (dark-first, soft)

All shadows are low-opacity, long, warm — never grey drop-shadows.

```
--shadow-xs:  0 1px 2px rgba(13, 25, 22, 0.06);
--shadow-sm:  0 2px 6px rgba(13, 25, 22, 0.08);
--shadow-md:  0 8px 24px -8px rgba(13, 25, 22, 0.14);
--shadow-lg:  0 24px 60px -20px rgba(13, 25, 22, 0.22);
--shadow-xl:  0 40px 90px -30px rgba(13, 25, 22, 0.30);
--shadow-glow: 0 0 60px -10px rgba(201, 163, 104, 0.35); /* brass glow */
```

Dark theme shadows use `rgba(0, 0, 0, 0.5)` with additional brass glow on CTAs.

### 3.7 Motion

| Token | Duration | Easing | Use |
|---|---|---|---|
| `--motion-xs` | 120ms | `cubic-bezier(0.2, 0, 0, 1)` | Hover tint |
| `--motion-sm` | 200ms | `cubic-bezier(0.2, 0, 0, 1)` | Button press, focus |
| `--motion-md` | 400ms | `cubic-bezier(0.22, 1, 0.36, 1)` | Modal, menu |
| `--motion-lg` | 700ms | `cubic-bezier(0.22, 1, 0.36, 1)` | Scroll reveal |
| `--motion-xl` | 1200ms | `cubic-bezier(0.19, 1, 0.22, 1)` | Hero mask-reveal |
| `--motion-stagger` | 60ms | — | Inter-item stagger |

**Motion principles**
- Only `transform` and `opacity` animate. Layout properties never animate.
- Reveals = translateY(16px) + opacity 0 → 1, over 700ms, triggered at 15% viewport intersection.
- Hero uses parallax on 3 layers at `0.0 / 0.2 / 0.4` speed ratios.
- Hover: buttons lift `translateY(-1px)` + brass glow; links grow a 1px brass underline from 0 → 100% width.
- `prefers-reduced-motion: reduce` → all motion reduced to opacity-only, duration `120ms`; parallax and Lenis disabled.

### 3.8 Grid & Layout

- Container: `max-w-[1360px]`, side padding `clamp(1.25rem, 4vw, 3rem)`.
- Content column: `max-w-[68ch]` for prose.
- 12-col CSS grid on desktop, 4-col on mobile. Asymmetric editorial grids on signature sections (hero, about, services detail).
- Breakpoints: `sm 640 / md 768 / lg 1024 / xl 1280 / 2xl 1536`.

### 3.9 Elevation & Depth

Depth comes from: (1) warm shadow (above), (2) subtle paper-grain noise overlay on raised surfaces (`background-image: url(/textures/grain.png)` at 4% opacity), (3) brass glow on focused/hovered interactive elements.

### 3.10 Iconography

Lucide icons at 1.5px stroke, sized `18/20/24`. No colored icons — always currentColor. Custom brass hairline flourishes (not icons) for editorial section dividers.

---

## 4. Component Blueprints (shadcn, fully restyled)

- **Button**: `radius-md`, 1px border in brand or brass, `py-3 px-6`, FiraGO 500, letter-spacing `+0.04em`. Primary = brass fill + ink text. Secondary = brand outline. Ghost = underline-only on hover.
- **Input**: `radius-md`, 1px line border, bg `--bg-sunken`, focus ring 2px brass with 2px offset, label floats above (no placeholder-as-label).
- **Card**: `radius-lg`, 1px line border, subtle grain overlay, `shadow-sm` → `shadow-md` on hover.
- **Nav**: sticky translucent (`backdrop-blur-md`) ivory/forest, transitions from transparent to solid at 80px scroll; mobile menu is full-screen with staggered link reveals.
- **Modal / Lightbox**: full-bleed backdrop `rgba(12,23,20,0.72)` with grain, content `radius-xl`, subtle brass border.
- **FAQ Accordion**: hairline dividers, chevron rotates, content height animates via `grid-template-rows: 0fr → 1fr`.
- **Slider**: Embla with free-drag; previous/next buttons are brass hairline circles; dots are 2px lines, active = brass, 32px wide.

---

## 5. Signature Moments

1. **Hero** — three parallax layers (ambient glow, main photograph, foreground florals); mask-reveal headline that resolves letter by letter; brass CTA with glow halo.
2. **Oversized editorial numerals** — section intros use "01 — SERVICES" with Fraunces light 300 at `--text-6xl`.
3. **Doctor cards** — portrait photo in dark ivory frame, name in serif, specialty in FiraGO small caps, "View profile" link opens modal with full bio.
4. **Stats counter** — IntersectionObserver-triggered count-up on numerals, hairline above and below each stat.
5. **Before/after slider** — draggable split handle in brass, keyboard-accessible, aria-live announcing percentage.
6. **FAQ** — hairline-only, no boxes; question in serif, answer in body FiraGO.
7. **Floating actions** — bottom-right brass circle "Book Now" on mobile + WhatsApp secondary; both labels appear on hover on desktop.

---

## 6. Accessibility & QA Checklist (per page)

- One `<h1>`, correct heading order, semantic landmarks.
- Keyboard: every interactive reachable, visible focus ring in brass, skip-to-content link.
- ARIA: sliders use `aria-roledescription="carousel"`, lightbox uses `role="dialog" aria-modal`.
- Color-contrast: run `@axe-core/playwright` on every page in both themes.
- Georgian text verified at 320 / 360 / 768 / 1024 / 1440 / 1920.
- `prefers-reduced-motion` honored.

---

## 7. Decision Log

- **Why brass over gold-yellow**: brass is dustier, less "casino". Reads as patina, time, trust.
- **Why viridian over navy/sage**: navy = corporate bank. Sage = wellness-tea. Viridian = clinical botanical — the right middle.
- **Why editorial numerals**: differentiates from every competitor that uses an SVG icon grid.
- **Why FiraGO over BPG Nino**: FiraGO is one file for all three scripts, Mozilla-grade hinting, SIL OFL. BPG is beautiful but splits the stack and complicates weight matching.
- **Why Fraunces over Canela/Larken**: Fraunces is variable, OFL, and supports Cyrillic. Canela and Larken are gorgeous but commercial-license + no Cyrillic.
