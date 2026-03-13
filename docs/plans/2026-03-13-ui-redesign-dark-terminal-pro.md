# UI Redesign — "Dark Terminal Pro"

**Date:** 2026-03-13
**Status:** Approved
**Approach:** Full redesign (Approach A from brainstorming)
**Design Skill:** ui-ux-pro-max

---

## Design System

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| Background | `#0F172A` | Page background (slate-900) |
| Card surface | `#1E293B` | Card backgrounds (slate-800) |
| Card elevated | `#334155` | Card hover states (slate-700) |
| Text primary | `#F8FAFC` | Headings, primary content (slate-50) |
| Text secondary | `#94A3B8` | Body text, descriptions (slate-400) |
| Text muted | `#64748B` | Labels, metadata (slate-500) |
| Accent primary | `#22C55E` | CTAs, active states, emphasis (green-500) |
| Accent dim | `#16A34A` | Borders, subtle highlights (green-600) |
| Accent glow | `rgba(34, 197, 94, 0.15)` | Hover glow effects |
| Border | `rgba(248, 250, 252, 0.08)` | Subtle card borders |

**No amber/orange anywhere.** Single accent color for visual coherence.

### Typography

| Role | Font | Weights |
|------|------|---------|
| Headings | Space Grotesk | 600, 700 |
| Body | DM Sans | 400, 500 |
| Mono accents | JetBrains Mono / system mono | 400 |

Google Fonts import:
```
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');
```

### Spacing

- Section padding: `py-16 sm:py-20` (down from `py-24 sm:py-32`)
- Inter-section gaps tightened throughout
- Dead space eliminated

### Cards

- `bg-slate-800/60 backdrop-blur border border-white/[0.08]`
- Remove `noise` texture overlay (invisible, unnecessary DOM nodes)
- Hover: subtle border brightening, no scale/translate (avoid layout shift)

---

## Section Designs

### 1. Hero

- Remove "HELLO, I'M" greeting — just the name, big and bold
- Name gradient: green instead of cyan
- Typed text `>` prompt: green
- Keep gradient orbs but slower animation, less opacity
- CTAs: "View My Work" = filled green (primary), "Get in Touch" = ghost outline (secondary)
- Scroll indicator simplified

### 2. About

- **2-column layout** on desktop, stacked on mobile
- **Left:** 2 summary paragraphs (drop the 3rd — redundant with Skills). All same opacity (fix fading bug).
- **Right:** Stats grid (2x2), dynamically computed:
  - Years of experience — from earliest experience entry start date to now
  - Companies — `experience.length`
  - Testing frameworks — count from "Testing & Automation" skill category
  - Technologies — total unique skills across all categories
- **Below both columns:** Tech Stack Overview mini-grid (from current About, tighter padding)
- Section padding: `py-16`

### 3. Skills — Compact Bento Grid

- Emphasized categories ("Testing & Automation", "AI & LLMs") span 2 columns on lg with green left border + glow
- Regular categories: single column, `border-white/[0.08]`
- Remove `BORDER_COLORS` array — no cycling colors
- Replace pulsing dot with green "Core" badge
- Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`

### 4. Experience — Single-Column Timeline

- Drop alternating left/right layout — full-width single column
- Timeline line on left edge, cards take remaining width
- Timeline nodes: green filled dot (current), slate dot with index (past). No pulsing animation.
- Current role: green left border + subtle glow
- Past roles: `border-white/[0.08]` left border
- Company names: green (current), white (past) — no amber
- Accordion for details stays
- `space-y-8` between entries. Section padding `py-16`.

### 5. Projects

- Filter out repos with no description or test-like names in GitHub fetcher
- Show only quality repos (having a description, not a fork)
- Remove hover translate — use border color transition instead
- Heading: "Projects" (shorter)
- GitHub username link stays
- Section padding `py-16`

### 6. Education & Certifications (Merged)

- Single section replaces two sparse sections
- **Top:** Education cards in 2-column grid. Green left border, university name in green, improved contrast.
- **Below:** Certifications as horizontal flex row of green outline badges/chips (not full cards)
- Romanian cert stays as-is
- Section padding `py-16`

### 7. Contact

- Keep 2-column layout (info cards + form)
- All cyan → green (icon backgrounds, focus rings, submit button)
- Remove Location card (redundant — location is in Experience)
- Section padding `py-16`

### 8. Footer

- Top border: subtle green → transparent gradient
- Social icons: green hover states
- Name in green stays

### 9. Navigation

- Active section indicator: green
- "Download CV" button: green border
- C.R.I logo: green gradient
- Glass backdrop on scroll: stays

### 10. Scroll-to-Top Button (New)

- Fixed position, bottom-right corner
- Appears after scrolling past hero
- Green accent, arrow-up icon
- Smooth scroll to top on click

---

## Anti-Patterns to Avoid

- Flat design without depth
- Text-heavy pages without visual breaks
- Continuous decorative animations (loading indicators only)
- Layout-shifting hover effects (scale, translate)
- Multiple competing accent colors

## Pre-Delivery Checklist

- [ ] No emojis as icons (use Lucide SVGs)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard nav
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] No horizontal scroll on mobile
- [ ] Single accent color (green) used consistently
- [ ] All stats computed dynamically (no hardcoded values)
