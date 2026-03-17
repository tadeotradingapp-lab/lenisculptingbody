

# Plan: Premium Design Overhaul + Logo + AI-Generated Placeholder Images

## 1. Add Brand Logo

Copy the uploaded logo (`user-uploads://1000062945_-_Editada.png`) to `src/assets/logo-lsb.png`. Update `Header.tsx` and `Footer.tsx` to display the logo image (approx 32px height on mobile, 36px on desktop) immediately before the italic "Leni" text in the top-left. The logo is black on transparent, which works on the white header.

## 2. Generate Placeholder Images via AI

Use the Nano banana image generation API to create ~8 images for services and portfolio results. These will be professional beauty/spa-style images stored in `public/images/`.

**Service images** (soft pink/neutral tones, abstract/close-up style to avoid model faces):
- `corporal-maderoterapia.webp` — wooden massage tools on skin
- `corporal-masaje-reductivo.webp` — hands performing body massage
- `corporal-drenaje.webp` — lymphatic drainage technique
- `facial-limpieza.webp` — facial treatment close-up
- `facial-dermaplaning.webp` — dermaplaning blade on skin
- `aparatologia.webp` — RF/cavitation device on body

**Portfolio before/after** (stylized body silhouette illustrations, no real people):
- `result-abdomen-before.webp` / `result-abdomen-after.webp`
- `result-gluteos-before.webp` / `result-gluteos-after.webp`

Update `src/data/services.ts` and `src/data/results.ts` to reference these new image paths. Services sharing a category can share images.

## 3. Premium Design Improvements

### 3a. Hero Section (Index.tsx)
- Add a hero background image or gradient mesh (CSS-only) with subtle radial gradients in pink/peach tones
- Add a decorative blurred circle element behind the hero text for depth
- Increase vertical padding, add a subtle image/illustration on the right side on desktop (2-column layout)

### 3b. Cards — Elevate Visual Quality
- **ServiceCard**: Add a subtle gradient overlay at the bottom of the image for text readability. Add hover lift (`hover:-translate-y-1`). Use `aspect-[4/3]` with rounded corners and a soft inner shadow.
- **PromoCard**: Add a gradient banner strip at the top showing the price. Refine the vigencia badge with a pulsing dot for urgency.
- **PackageCard**: Add a "most popular" ribbon/badge on the featured one. Use a subtle border-gradient effect.
- **ReviewCard**: Add quotation mark decorative element. Add subtle left border accent in primary color.
- **ObjectiveCard**: Replace emoji with elegant Lucide icons. Add subtle animation on hover (scale + shadow).

### 3c. Section Styling (Index.tsx)
- Add alternating section backgrounds (white / very subtle pink-tinted `bg-secondary/20`)
- Add section dividers or decorative shapes between sections
- Increase spacing between sections (`py-12` instead of `py-8`)
- Add fade-in animation on scroll using Intersection Observer (lightweight, no library)

### 3d. Typography & Spacing
- Hero H1: gradient text effect (primary to a darker pink)
- Section headings: add a small decorative underline element (2px wide, primary color, centered or left-aligned)
- Increase line-height on body text for readability

### 3e. Header Enhancement
- Add a very subtle bottom shadow on scroll (not just border)
- Logo + "Leni Sculpting Body" with the new logo image
- On desktop, add a subtle hover underline animation on nav links

### 3f. BottomNav Polish
- Add a subtle top shadow instead of just a border
- Active item: add a small dot indicator below the icon instead of just color change

### 3g. Footer
- Add the logo image
- Use a richer dark background with subtle gradient
- Add Instagram icon with link

### 3h. Resultados Page
- Add hover overlay with a "Ver detalle" label on portfolio items
- Better masonry spacing

### 3i. Global Polish
- Add `scroll-smooth` to html
- Add subtle transition animations to page route changes
- Ensure all interactive elements have `active:scale-[0.98]` for tactile feel
- Add a subtle loading skeleton shimmer effect (gradient animation)

## Technical Details

- Images generated via `POST https://ai.gateway.lovable.dev/v1/chat/completions` with `google/gemini-2.5-flash-image` model
- Images saved as base64 → decoded → written to `public/images/`
- Scroll animations implemented with a small `useInView` hook using IntersectionObserver (no external dependency)
- All CSS changes stay within Tailwind utilities + `index.css` custom classes
- No new dependencies needed

## Files Modified
- `src/assets/logo-lsb.png` (new — copied from upload)
- `public/images/*.webp` (new — AI generated)
- `src/components/layout/Header.tsx` — add logo image
- `src/components/layout/Footer.tsx` — add logo, enhance styling
- `src/components/layout/BottomNav.tsx` — polish active state
- `src/components/ServiceCard.tsx` — premium hover effects, gradient overlay
- `src/components/PromoCard.tsx` — price banner, urgency indicator
- `src/components/PackageCard.tsx` — popular ribbon
- `src/components/ReviewCard.tsx` — decorative quote, accent border
- `src/components/ObjectiveCard.tsx` — Lucide icons, hover animation
- `src/pages/Index.tsx` — hero redesign, section spacing, scroll animations, alternating backgrounds
- `src/pages/Resultados.tsx` — hover overlay
- `src/pages/Servicios.tsx` — minor spacing
- `src/data/services.ts` — update imageUrl references
- `src/data/results.ts` — update image references
- `src/index.css` — scroll-smooth, shimmer skeleton, gradient text utility
- `tailwind.config.ts` — add shimmer keyframe
- `src/hooks/useInView.ts` (new) — lightweight scroll animation hook

