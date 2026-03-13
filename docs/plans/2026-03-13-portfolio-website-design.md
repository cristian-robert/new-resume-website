# Portfolio Website Design

**Date:** 2026-03-13
**Status:** Approved

## Goals

Mix of job hunting, professional branding, and personal showcase. Must impress recruiters (quick scanning), represent professional expertise broadly, and serve as a polished online presence for LinkedIn/networking.

## Style & Approach

- **Visual style:** Bold & expressive — strong colors, distinctive typography, animations, stands out from typical developer portfolios
- **Architecture:** Section-scroll single page (Approach A) — one continuous scrolling page with distinct visual sections, sticky nav with smooth-scroll anchors
- **Animations:** Medium — scroll-triggered fade-ins, typed text hero, animated skill elements. CSS + Intersection Observer only, no heavy JS libraries. GPU-friendly (`transform`/`opacity` only). Mobile-optimized with `prefers-reduced-motion` support
- **Mobile-first:** All designs responsive, simplified animations on mobile

## Tech Stack

- Next.js 16 + React 19 + TypeScript (strict)
- Tailwind CSS 4 + shadcn/ui
- Static data from `lib/data/` (typed TypeScript)
- GitHub API via ISR (`revalidate: 86400` — once per day)
- Formspree for contact form backend
- Lucide icons (via shadcn/ui)

## Architecture

```
app/
  layout.tsx          — Root layout, fonts, metadata, global providers
  page.tsx            — Composes all section components, fetches GitHub repos (server component)
  globals.css         — Tailwind + CSS custom properties + animation keyframes

components/
  sections/
    Hero.tsx          — Full viewport, gradient bg, typed text, CTAs
    About.tsx         — Extended summary + tech stack overview
    Skills.tsx        — Categorized skill cards with animated badges
    Experience.tsx    — Vertical timeline with expandable details
    Projects.tsx      — GitHub repos card grid
    Certifications.tsx — Simple cert cards
    Education.tsx     — Two-card layout
    Contact.tsx       — Split layout: contact info + form
  ui/                 — shadcn/ui components
  Navigation.tsx      — Sticky header, scroll-spy, mobile hamburger (Sheet)
  Footer.tsx          — Name, copyright, social links
  ScrollAnimator.tsx  — Reusable Intersection Observer wrapper

lib/
  data/
    *.md              — Raw CV data (existing)
    types.ts          — TypeScript interfaces
    index.ts          — Parsed + typed data exports
  github.ts           — GitHub API fetcher (build-time, ISR 24h)
  utils.ts            — cn() helper, etc.
```

## Section Designs

### Navigation
- Sticky header, transparent initially, backdrop-blur + background on scroll
- Name/logo left, section links right
- Mobile: hamburger with slide-in Sheet drawer
- Scroll-spy highlights active section
- "Download CV" button

### Hero
- Full viewport height, bold gradient background (deep dark base + vibrant accent gradients)
- Large bold name typography
- Typed-text effect cycling: "Test Automation Architect", "AI Enthusiast", "QA Engineer", "Framework Builder" — custom hook using requestAnimationFrame
- 2-3 line summary
- Two CTAs: "View My Work" (scroll to Experience), "Get in Touch" (scroll to Contact)
- Animated CSS gradient orbs in background (transform/opacity only)
- Mobile: vertical stack, simplified background animations

### Skills
- Cards grouped by category in responsive grid (3/2/1 columns)
- Skills as badges/chips inside each card
- Category cards with colored left borders/accents
- "Testing & Automation" and "AI & LLMs" get visual emphasis
- Animation: staggered fade-in + slide-up on scroll, badges pop-in with scale

### Experience
- Vertical timeline — line center/left on desktop, left edge on mobile
- Each entry: company, role, period, location, brief description
- Expandable details via Collapsible/Accordion (shadcn/ui) — achievements + technology badges
- Deutsche Bank gets extra visual weight ("Current" badge)
- Animation: entries from alternating sides on desktop, left on mobile. Timeline line draws on scroll

### GitHub Projects
- Card grid (3/2/1 columns), sorted by stars or last updated
- Each card: repo name, description, language (color dot), stars, forks, last updated, link
- Section header links to full GitHub profile
- Animation: stagger-fade-in, hover lift + accent glow
- Data: ISR fetch once per day (revalidate: 86400)

### Certifications
- Compact cards with certificate icon
- Simple grid/row layout
- Fade-in on scroll

### Education
- Two cards side by side (desktop), stacked (mobile)
- University, degree, field, period

### Contact
- Split layout: contact info left, form right
- Contact info: email, phone, LinkedIn, website, location — icons + clickable links
- Form: Name, Email, Subject, Message — React Hook Form + Zod validation
- Backend: Formspree (free tier)
- Submit with loading state, success/error toasts (shadcn/ui Toast)
- Mobile: stacked vertically, info first

### Footer
- Minimal: name, copyright year, social links (LinkedIn, GitHub, email)
