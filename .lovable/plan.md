

# Leni Sculpting Body — PWA Premium (Front-End Only)

## Overview
A premium mobile-first PWA for a body sculpting studio in Hollywood, FL. App-like experience on mobile (bottom nav, sheets, sticky CTAs), premium web on desktop. All data mocked locally, booking saves to localStorage, confirmations via WhatsApp prefill links.

---

## Phase 1: Foundation & Design System

### Design Tokens & Theme
- Custom palette: Sculpting Pink (`#FF4DA6`), soft surfaces, deep charcoal text
- Typography: **Outfit** (display), **Inter** (body), **Cormorant Garamond** italic (accent for "Leni")
- Spacing scale (4–48), radius (cards 16px, inputs 12px, chips 999px), premium shadows
- All tokens in CSS variables for easy future editing

### Core Layout Shell
- **Mobile**: Compact header (logo + WhatsApp/Call icons) + fixed BottomNav (Inicio/Servicios/Promos/Reservar/Más) + Sticky CTA bar
- **Desktop**: Full TopNav with all sections + footer
- Safe area padding for iOS, `backdrop-blur` on nav elements

### Base Components
- Buttons (Primary/Secondary/Ghost/Icon), Cards, Chips, Tabs, Accordion
- BottomSheet (mobile) / Modal (desktop) pattern
- Toast, Skeleton, EmptyState, ErrorState
- ShareButton (Web Share API + copy fallback)
- MapLinks (auto-detect Apple/Google Maps)
- StatusBadge ("Pendiente", "Vigente", etc.)
- BeforeAfterSlider (draggable clip-path)

---

## Phase 2: Mock Data & API Layer

### Data Files (`/src/data/`)
- `business.json` — name, address, phone, WhatsApp, hours, Instagram
- `services.json` — 20 services (Corporales, Faciales, Add-ons, Combos) with slug, duration, category, objectives, includes, FAQ
- `promos.json` — 4-5 promos with vigencia, pricing display, includes
- `packages.json` — 3 packages (6/8/12 sessions) with savings display
- `results.json` — 8+ portfolio items (image + beforeAfter types)
- `reviews.json` — 8+ reviews with ratings
- `availabilityMock.json` — simulated calendar availability

### API Fake Layer (`/src/lib/apiFake.ts`)
- All getters with simulated 300ms latency (skeleton-ready)
- `booking.createRequest()` → generates REQ-ID, saves to localStorage
- Typed interfaces for all entities

---

## Phase 3: Home & Discovery Pages

### Home (`/`)
1. Hero with H1, trust chips, dual CTAs
2. "Recomendación rápida (30s)" quiz teaser card
3. Featured promos carousel (mobile) / grid (desktop)
4. 6 Objective cards (Reducción, Drenaje, Celulitis, Glúteos, Abdomen, Glow) → link to filtered `/servicios`
5. Popular services (6 cards)
6. Featured packages (3 cards)
7. Portfolio preview (6 items with mini BeforeAfter sliders)
8. Reviews snippet (3 cards + avg rating)
9. Location block (address, hours, open/closed status, action buttons)
10. "Cómo trabajamos" 3-step process
11. Mini FAQ (4 items) + footer with disclaimer

### Recomendador (`/recomendador`)
- 3-step chip-based quiz (objective → preference → intensity)
- Front-end logic maps answers to service/package/promo
- Result: 1 primary + 2 alternatives with "Solicitar cita" CTA

---

## Phase 4: Services, Promos & Packages

### Services (`/servicios` + `/servicios/[slug]`)
- List with SearchBar + filter chips (category, objective, duration, sort)
- ServiceCard → BottomSheet (mobile) or detail page (desktop)
- Detail: hero, duration/category chips, tabbed content (includes/benefits/care/FAQ), add-on suggestions, related packages, sticky CTA

### Promos (`/promos` + `/promos/[slug]`)
- Filtered list (Faciales/Corporales/Flash)
- PromoCard with vigencia badge, includes, share button
- Detail: art hero, conditions, ideal-for chips, ShareButton, OpenGraph meta

### Packages (`/paquetes` + `/paquetes/[slug]`)
- Grid with filters (corporal/facial/objetivo)
- PackageCard: session count, includes, savings display
- Detail: session usage info, ShareButton, CTA

---

## Phase 5: Booking Flow

### Reservar (`/reservar`) — 4-Step Stepper
1. **Selection**: Tabbed picker (Services/Promos/Packages) + add-ons
2. **Date**: Custom calendar grid with mock availability + "Lo antes posible" express option
3. **Time**: Chip-based time slots (Morning/Afternoon/Evening)
4. **Datos + Intake**: Name, phone, email, note + cancellation policy checkbox + contact preference

### Success Screen
- Personalized confirmation with service/date/time
- "PENDIENTE" status
- CTAs: WhatsApp prefilled message, "Ver mi solicitud", "Cómo llegar"
- Saves `latestRequest` to localStorage

### Mi Solicitud (`/mi-solicitud`)
- Shows last request from localStorage with full summary
- Status: PENDIENTE (large badge)
- Actions: WhatsApp confirm, change time (→ `/reservar` prefilled), cancel (clears localStorage + toast)
- EmptyState when no request exists

---

## Phase 6: Trust & Content Pages

### Resultados (`/resultados`)
- Masonry gallery with category filters
- 6+ BeforeAfterSlider items
- Modal view with tags (zone, sessions, protocol) + CTA

### Reseñas (`/reseñas`)
- Average rating display + review list
- "Dejar reseña" placeholder CTA

### Contacto (`/contacto`)
- Address + smart MapLinks, large WhatsApp/Call/Directions buttons
- Hours with live open/closed indicator
- Parking/entrance info section

### FAQ (`/faq`) & Políticas (`/políticas`)
- 10 FAQ items in accordion
- Policies: cancellation, privacy, photo consent, results disclaimer

### Más (`/mas`) — Mobile only
- Grid of links to all secondary pages

---

## Phase 7: PWA & Polish

- `manifest.json` + basic service worker for installability
- OpenGraph/Twitter meta tags per route (dynamic for slugs)
- Scroll restoration on navigation
- Framer Motion page transitions + micro-animations
- Skeleton loaders on all data-fetching views
- WhatsApp prefill link generator utility
- i18n scaffold (ES default, structure ready for EN)
- Lighthouse optimization targets (90+ mobile)

