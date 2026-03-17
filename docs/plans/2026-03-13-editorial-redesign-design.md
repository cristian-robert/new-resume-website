# Editorial Precision Redesign — Design Document

**Date:** 2026-03-13
**Status:** Approved
**Direction:** Editorial Precision (Bento) + Magnetic Buttons + Scroll-Driven Shader Hero

## Design Summary

Complete visual redesign of the portfolio website. Replaces the current generic "AI slop" aesthetic (floating gradient orbs, glassmorphism cards, typing effect, teal-on-white) with an opinionated editorial design: dark charcoal base, amber/gold accent, single monospace font (JetBrains Mono), asymmetric bento grid layouts, GSAP scroll animations, magnetic button interactions, and a custom WebGL shader hero background.

## Decisions

| Decision | Choice |
|---|---|
| Colors | Dark charcoal (`#0C0C0E`) + amber/gold (`#F59E0B`) accent |
| Typography | Single font: JetBrains Mono (variable weight, locally hosted) |
| Hero | Stats-forward — name, role, credibility numbers, shader background |
| Projects | Curated cards with context (hand-picked + editorial descriptions) |
| Scroll | Subtle — GSAP ScrollTrigger + Lenis smooth scroll, staggered reveals |
| Navigation | Minimal floating pill, bottom-center, appears after scrolling past hero |
| Contact | No form — bold "Let's Talk" + click-to-copy email + social links |

## Color System

| Token | Value | Usage |
|---|---|---|
| `--background` | `#0C0C0E` | Page background — near-black with neutral undertone |
| `--surface` | `#141416` | Card/section backgrounds — subtle lift from base |
| `--surface-hover` | `#1C1C1F` | Hover states on cards |
| `--border` | `rgba(255,255,255,0.08)` | Subtle borders, dividers |
| `--border-hover` | `rgba(255,255,255,0.15)` | Borders on hover |
| `--text-primary` | `#F5F5F5` | Headings, primary content |
| `--text-secondary` | `#A1A1A6` | Body text, descriptions |
| `--text-muted` | `#5A5A5E` | Labels, timestamps |
| `--accent` | `#F59E0B` | Amber — links, active states, highlights |
| `--accent-glow` | `rgba(245,158,11,0.15)` | Soft glow behind accent elements |

No secondary accent. One color used with confidence.

## Typography

Single font: **JetBrains Mono** (variable weight, locally hosted, `font-display: swap`)

| Element | Size | Weight | Notes |
|---|---|---|---|
| Hero name | `clamp(2.5rem, 5vw, 4rem)` | 700 | Largest text on page |
| Section headings | `clamp(1.75rem, 3vw, 2.5rem)` | 700 | With amber keyword highlight |
| Card titles | `1.125rem` | 600 | — |
| Body text | `0.9375rem` (15px) | 400 | Slightly smaller for monospace readability |
| Labels/meta | `0.75rem` | 500 | Uppercase, `tracking-[0.1em]` |
| Stats numbers | `clamp(2.5rem, 5vw, 3.75rem)` | 800 | Hero credibility numbers |

Fluid sizing via `clamp()` — no breakpoint jumps.

## Page Structure

```
HERO (min-h-screen)
  - WebGL shader canvas background (ambient noise, amber/charcoal, opacity 0.3-0.4)
  - Role label: "SOFTWARE QUALITY ENGINEER" (text-xs, uppercase, tracking-[0.2em], text-muted)
  - Name: large monospace (clamp 2.5-4rem, weight 700)
  - Tagline: one line, text-secondary
  - Stats row: 4 numbers with labels, separated by vertical dividers
  - CTA: Download CV (magnetic button) + social icons
  - Scroll indicator: thin amber line animating downward

ABOUT / SHORT PROFILE (Bento Grid)
  - 5 columns desktop, 2 mobile, asymmetric
  - Cells: Bio (spans 2), Tech Stack, QA Domains, Location, Key Strengths, Contact Email
  - Surface bg, border, rounded-2xl, hover glow

SKILLS
  - Category groups (not cards): heading + horizontal tag wrap
  - Categories: Testing & QA, Languages, DevOps & CI/CD, Frameworks
  - Tags: surface bg, border, rounded-lg, text-xs
  - Optional: horizontal marquee/ticker strip

EXPERIENCE
  - Vertical timeline, left-aligned
  - Year markers: large muted text (text-3xl, weight 700)
  - Role cards: surface bg, rounded-xl, expandable details
  - Left border accent: amber on current role, border on past
  - Staggered scroll reveal

PROJECTS
  - 2-column grid desktop, 1 mobile
  - Each card: screenshot top + content bottom
  - Project name, 2-line description, tech tags, Live/GitHub links
  - Hover: translateY(-4px) + amber glow shadow
  - Data: GitHub API filtered via curated config in lib/data/projects.ts

EDUCATION & CERTIFICATIONS
  - 2-column grid for education, compact cards
  - Certifications as horizontal tag wrap with amber dot bullets

CONTACT — "LET'S TALK"
  - Large heading: "Let's" primary + "Talk" accent, centered
  - Email: large monospace, click-to-copy with toast
  - Social icons: circular bordered, hover fill amber
  - No form

FOOTER
  - Minimal single row: name + "Built with Next.js" + copyright
  - Faint border top, text-muted, text-xs
```

### Navigation — Floating Pill

- Hidden on initial load, appears after scrolling past hero
- Centered floating pill: `fixed bottom-8 left-1/2 -translate-x-1/2 z-50`
- Backdrop-blur, surface background, border
- Active state: amber text + amber dot below
- Compact: text-xs, uppercase, tracking-[0.1em]
- Mobile: hamburger pill icon → full-screen overlay

### Spacing

- Between major sections: `py-32` (128px)
- Within sections: `gap-8` to `gap-12`
- Max content width: `max-w-6xl` (1152px) centered
- Background: faint dot grid at 2-3% opacity for texture

## Interactions & Animation

### New Dependencies

| Package | Purpose |
|---|---|
| `gsap` + `@gsap/react` | ScrollTrigger, magnetic button, staggered reveals |
| `lenis` | Smooth scroll engine |
| Custom GLSL shader (no Three.js) | Hero background — ambient noise/gradient |

### Hero Shader Background

- Single `<canvas>`, absolute positioned, covers hero viewport
- Custom GLSL fragment shader — animated gradient noise in amber/charcoal
- Low intensity (opacity 0.3-0.4), atmospheric texture
- Raw WebGL (single fullscreen quad), ~50 lines of shader
- Reduced motion: falls back to static CSS radial gradient
- Mobile: disabled, replaced with CSS gradient

### Magnetic Buttons

- Download CV button + social icons in hero
- Mouse enter: content shifts toward cursor (max ~8px)
- Mouse leave: springs back with easing via GSAP `quickTo()`
- Mobile: disabled — normal buttons

### Scroll Animations (GSAP ScrollTrigger)

| Element | Animation | Trigger |
|---|---|---|
| Section headings | Fade up + slide from y:30px | Enter viewport at 80% |
| Bento grid cells | Staggered fade up, 0.1s delay | Enter viewport |
| Skill category groups | Staggered fade up | Enter viewport |
| Experience timeline cards | Fade in from left, staggered | Enter viewport |
| Project cards | Fade up, 0.15s stagger | Enter viewport |
| Stats numbers | Count up from 0 (1.5s, power2.out) | Hero loads |
| Floating pill nav | Fade in | Scroll past hero |

Rules:
- `ease: "power3.out"` globally
- Duration: 0.6s-0.8s
- Each element animates once — no replay on scroll back
- All respect `prefers-reduced-motion`

### Lenis Smooth Scroll

- Wraps entire page, `lerp: 0.1`
- Synced with GSAP ScrollTrigger
- Mobile: disabled — native scroll

### Hover Effects

| Element | Effect |
|---|---|
| Bento cells | Border brightens, faint amber glow shadow |
| Project cards | `translateY(-4px)`, amber glow shadow |
| Experience cards | Left border transitions to amber |
| Nav pill links | Text → amber |
| Social icons | Background fills amber, icon inverts to dark |
| Skill tags | Background → surface-hover |
| Email (contact) | Underline appears, amber color |

All: `transition-all duration-300 ease-out`

### Click-to-Copy Email

- Click → clipboard → Sonner toast ("Email copied")
- Brief amber flash on email text

## What Gets Removed

- Floating gradient orbs
- Terminal typing effect
- Glassmorphism (`.glass` utility)
- `hover:scale-[1.02]` on cards
- Left-border-4 accent pattern
- Contact form (Zod + react-hook-form)
- `next-themes` (dark mode only, no toggle needed)
- `Syne` and `Outfit` fonts
- `tw-animate-css` (replaced by GSAP)

## What Gets Added

- `gsap`, `@gsap/react` — animation engine
- `lenis` — smooth scroll
- Custom WebGL shader (~50 lines, no library)
- JetBrains Mono variable font (self-hosted)
- Curated projects config in `lib/data/projects.ts`

## Data Layer

No changes to the data layer structure. All existing typed TS files in `lib/data/` remain. One addition:

- `lib/data/projects.ts` — curated project config array specifying which GitHub repos to feature, with custom descriptions and optional screenshot paths

## Accessibility

- All animations respect `prefers-reduced-motion`
- WebGL shader disabled when reduced motion preferred
- Color contrast: amber on dark exceeds 4.5:1 for body text
- Keyboard navigation preserved — floating pill nav is focusable
- Semantic HTML structure unchanged
- No content hidden behind interactions (expandable details are progressive enhancement)
