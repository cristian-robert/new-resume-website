# UI Redesign "Dark Terminal Pro" — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Full visual redesign of the portfolio website — replace cyan/amber dual-accent with a single green accent, new typography (Space Grotesk + DM Sans), tighter spacing, restructured sections, dynamic stats, filtered projects, merged Education/Certifications.

**Architecture:** Component-by-component replacement. Theme changes in `globals.css` propagate everywhere. Each section component gets rewritten in place. New utility `lib/stats.ts` for dynamic computations. New `ScrollToTop` component. GitHub fetcher gains quality filter.

**Tech Stack:** Next.js 16, React 19, TypeScript strict, Tailwind CSS 4, shadcn/ui, Lucide icons

**Design doc:** `docs/plans/2026-03-13-ui-redesign-dark-terminal-pro.md`

---

## File Map

| Action | File | Responsibility |
|--------|------|---------------|
| Modify | `app/globals.css` | Replace color tokens, remove amber, add green accent, remove noise utility |
| Modify | `app/layout.tsx` | Add DM Sans font, update font variables |
| Modify | `app/page.tsx` | Replace `<Certifications />` + `<Education />` with merged `<EducationCertifications />` |
| Create | `lib/stats.ts` | Dynamic stat computations (years, companies, frameworks, technologies) |
| Modify | `lib/github.ts` | Add quality filter (skip repos with no description) |
| Modify | `components/Navigation.tsx` | Green accent colors |
| Modify | `components/Footer.tsx` | Green accents, top border gradient |
| Modify | `components/sections/Hero.tsx` | Remove greeting, green accents, CTA hierarchy |
| Modify | `components/sections/About.tsx` | 2-column layout with stats grid, trim paragraphs |
| Modify | `components/sections/Skills.tsx` | Bento grid, remove color cycling, green emphasis, "Core" badge |
| Modify | `components/sections/Experience.tsx` | Single-column timeline, remove alternating, green accents |
| Modify | `components/sections/Projects.tsx` | Simplified heading, remove translate hover, green accents |
| Create | `components/sections/EducationCertifications.tsx` | Merged section: education cards + certification badges |
| Delete | `components/sections/Education.tsx` | Replaced by merged component |
| Delete | `components/sections/Certifications.tsx` | Replaced by merged component |
| Modify | `components/sections/Contact.tsx` | Green accents, remove Location card |
| Create | `components/ScrollToTop.tsx` | Fixed button, appears after hero, smooth scroll |

---

## Chunk 1: Foundation (Theme + Fonts + Utilities)

### Task 1: Update color tokens and theme in globals.css

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Replace the custom accent palette variables in `:root`**

Replace lines 90-98 (custom accent palette in `:root`):
```css
/* Custom accent palette */
--accent-green: #22C55E;
--accent-green-dim: #16A34A;
--accent-green-bright: #4ADE80;
--glow-green: rgba(34, 197, 94, 0.15);
```

- [ ] **Step 2: Replace the dark mode custom accent palette**

Replace lines 133-140 (custom accent palette in `.dark`):
```css
/* Custom accent palette — dark mode overrides */
--accent-green: #22C55E;
--accent-green-dim: #16A34A;
--accent-green-bright: #4ADE80;
--glow-green: rgba(34, 197, 94, 0.12);
```

- [ ] **Step 3: Update dark mode semantic tokens to use green**

In `.dark` block, update:
- `--primary` → `oklch(0.72 0.19 145)` (green-500 in oklch)
- `--primary-foreground` → `oklch(0.13 0.005 260)` (dark bg)
- `--accent` → `oklch(0.72 0.19 145)` (green, not amber)
- `--ring` → `oklch(0.72 0.19 145 / 50%)` (green ring)
- Update chart colors to use green spectrum instead of amber

- [ ] **Step 4: Replace gradient text utilities**

Replace `.text-gradient-cyan` and `.text-gradient-amber`:
```css
.text-gradient-green {
  background: linear-gradient(135deg, var(--accent-green), var(--accent-green-bright));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```
Remove `.text-gradient-cyan` and `.text-gradient-amber`.

- [ ] **Step 5: Replace glow utilities**

Replace `.glow-cyan` and `.glow-amber`:
```css
.glow-green {
  box-shadow: 0 0 40px var(--glow-green), 0 0 80px rgba(34, 197, 94, 0.06);
}
```
Remove `.glow-cyan` and `.glow-amber`.

- [ ] **Step 6: Remove the `.noise` utility class**

Delete the `.noise::before` rule (lines 381-389). It adds invisible DOM overhead.

- [ ] **Step 7: Update section padding**

Section padding convention changes from `py-24 sm:py-32` to `py-16 sm:py-20` — this is done per-component in later tasks, but document it here.

- [ ] **Step 8: Verify build compiles**

Run: `npm run build`
Expected: Compilation succeeds (will have unused-variable warnings from components still referencing old classes — that's expected, fixed in later tasks).

- [ ] **Step 9: Commit**

```
git add app/globals.css
git commit -m "refactor: replace cyan/amber theme with single green accent"
```

---

### Task 2: Add DM Sans font to layout

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Import and configure DM_Sans from next/font/google**

Add DM_Sans import alongside existing fonts:
```tsx
import { Space_Grotesk, DM_Sans, JetBrains_Mono } from "next/font/google";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});
```

- [ ] **Step 2: Add DM Sans variable to body className**

Update body className to include `${dmSans.variable}`.

- [ ] **Step 3: Update globals.css font-body mapping**

In `@theme inline`, add: `--font-body: var(--font-dm-sans);`

In `@layer base`, update `html` to use `font-sans` for headings (Space Grotesk stays as `--font-sans`), and set body text elements to use DM Sans via Tailwind `font-[family-name:var(--font-dm-sans)]` or a custom utility.

Actually — simpler approach: Space Grotesk is already `--font-sans`. Add a `--font-body` variable and use it on `body` element, then headings explicitly use `font-sans` (Space Grotesk). Body defaults to DM Sans.

- [ ] **Step 4: Verify fonts render**

Run: `npm run dev`
Check: Headings use Space Grotesk, body text uses DM Sans.

- [ ] **Step 5: Commit**

```
git add app/layout.tsx app/globals.css
git commit -m "feat: add DM Sans body font alongside Space Grotesk headings"
```

---

### Task 3: Create dynamic stats utility

**Files:**
- Create: `lib/stats.ts`

- [ ] **Step 1: Create `lib/stats.ts`**

```tsx
import { experience, skills } from "@/lib/data";

export function getProfileStats() {
  // Years of experience — from earliest entry's start to now
  const startDates = experience.map((e) => {
    const match = e.period.match(/^(\w+)\s+(\d{4})/);
    if (!match) return new Date();
    const [, month, year] = match;
    return new Date(`${month} 1, ${year}`);
  });
  const earliest = new Date(Math.min(...startDates.map((d) => d.getTime())));
  const now = new Date();
  const yearsOfExperience = Math.floor(
    (now.getTime() - earliest.getTime()) / (365.25 * 24 * 60 * 60 * 1000)
  );

  // Companies
  const companies = experience.length;

  // Testing frameworks — from "Testing & Automation" category
  const testingCategory = skills.find((c) => c.name === "Testing & Automation");
  const testingFrameworks = testingCategory?.skills.length ?? 0;

  // Total technologies — unique skills across all categories
  const allSkills = new Set(skills.flatMap((c) => c.skills));
  const totalTechnologies = allSkills.size;

  return {
    yearsOfExperience,
    companies,
    testingFrameworks,
    totalTechnologies,
  };
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: No type errors.

- [ ] **Step 3: Commit**

```
git add lib/stats.ts
git commit -m "feat: add dynamic profile stats utility"
```

---

### Task 4: Add quality filter to GitHub fetcher

**Files:**
- Modify: `lib/github.ts`

- [ ] **Step 1: Add description filter**

After the existing `.filter((repo) => !repo.fork)`, chain an additional filter:
```tsx
.filter((repo: Record<string, unknown>) => !repo.fork)
.filter((repo: Record<string, unknown>) => {
  const desc = repo.description as string | null;
  return desc !== null && desc.trim().length > 0 && desc.trim().toLowerCase() !== "test";
})
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Compiles. Repos without descriptions are excluded.

- [ ] **Step 3: Commit**

```
git add lib/github.ts
git commit -m "feat: filter out GitHub repos without meaningful descriptions"
```

---

## Chunk 2: Navigation + Footer + ScrollToTop

### Task 5: Update Navigation to green accent

**Files:**
- Modify: `components/Navigation.tsx`

- [ ] **Step 1: Replace all cyan color references with green**

Find and replace throughout the file:
- `text-gradient-cyan` → `text-gradient-green`
- `var(--accent-cyan)` → `var(--accent-green)`
- `var(--accent-cyan-dim)` → `var(--accent-green-dim)`
- `var(--glow-cyan)` → `var(--glow-green)`

- [ ] **Step 2: Verify navigation renders**

Run: `npm run dev`
Check: Logo, active states, and Download CV button use green.

- [ ] **Step 3: Commit**

```
git add components/Navigation.tsx
git commit -m "refactor: update navigation to green accent"
```

---

### Task 6: Update Footer to green accent

**Files:**
- Modify: `components/Footer.tsx`

- [ ] **Step 1: Replace cyan references with green**

- `var(--accent-cyan)` → `var(--accent-green)`
- Add a subtle top border gradient line above the separator:
```tsx
<div className="h-px bg-gradient-to-r from-transparent via-[var(--accent-green-dim)]/30 to-transparent" />
```

- [ ] **Step 2: Commit**

```
git add components/Footer.tsx
git commit -m "refactor: update footer to green accent with top gradient border"
```

---

### Task 7: Create ScrollToTop component

**Files:**
- Create: `components/ScrollToTop.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `components/ScrollToTop.tsx`**

```tsx
"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > window.innerHeight);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed right-6 bottom-6 z-50 h-10 w-10 rounded-full border-[var(--accent-green-dim)]/40 bg-[var(--card)]/80 backdrop-blur transition-all duration-300 hover:border-[var(--accent-green)] hover:bg-[var(--accent-green)]/10 cursor-pointer"
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-4 w-4 text-[var(--accent-green)]" />
    </Button>
  );
}
```

- [ ] **Step 2: Add ScrollToTop to page.tsx**

Import and render `<ScrollToTop />` after `<Footer />` in `app/page.tsx`.

- [ ] **Step 3: Verify it appears/disappears on scroll**

Run: `npm run dev`
Check: Button appears after scrolling past hero, scrolls to top on click.

- [ ] **Step 4: Commit**

```
git add components/ScrollToTop.tsx app/page.tsx
git commit -m "feat: add scroll-to-top button"
```

---

## Chunk 3: Hero + About Sections

### Task 8: Redesign Hero section

**Files:**
- Modify: `components/sections/Hero.tsx`

- [ ] **Step 1: Remove greeting line**

Delete the `<p>` tag with "Hello, I'm" text.

- [ ] **Step 2: Replace all cyan/amber references with green**

Throughout Hero.tsx:
- `text-gradient-cyan` → `text-gradient-green`
- `var(--accent-cyan)` → `var(--accent-green)`
- `var(--accent-cyan-bright)` → `var(--accent-green-bright)`
- `var(--accent-cyan-dim)` → `var(--accent-green-dim)`
- `var(--accent-amber)` → `var(--accent-green)` (the `>` prompt)
- `glow-cyan` → `glow-green`
- `var(--glow-cyan)` → `var(--glow-green)`

- [ ] **Step 3: Fix CTA button hierarchy**

"View My Work" button: keep as filled green (primary).
"Get in Touch" button: ensure it's clearly an outline ghost button with green border.
They should already have this hierarchy from the current code — verify after color swap.

- [ ] **Step 4: Remove amber orb from background**

Replace the amber gradient orb with a second, dimmer green orb (or remove it entirely for a cleaner look).

- [ ] **Step 5: Remove `noise` class references**

Remove `className="noise ..."` from the noise overlay div — or remove the div entirely.

- [ ] **Step 6: Slow down float animation on orbs**

Add `animationDuration: "12s"` to the primary orb (currently default 6s). Reduce opacity to 15%.

- [ ] **Step 7: Verify hero renders correctly**

Run: `npm run dev`
Check: Green gradient name, green typed prompt, green CTAs, no amber.

- [ ] **Step 8: Commit**

```
git add components/sections/Hero.tsx
git commit -m "refactor: redesign hero with green accent, remove greeting"
```

---

### Task 9: Redesign About section with stats

**Files:**
- Modify: `components/sections/About.tsx`

- [ ] **Step 1: Rewrite About.tsx with 2-column layout + stats**

Complete rewrite:
- Import `getProfileStats` from `@/lib/stats`
- Top: section heading "About Me" in green gradient
- 2-column grid (`lg:grid-cols-2`):
  - Left: first 2 summary paragraphs only (drop 3rd). Same opacity for all.
  - Right: 2x2 stats grid. Each stat = big number (green, text-4xl font-bold) + label below (muted text-sm).
- Below: Tech Stack Overview grid (keep the `CategoryCard` component, but update colors from cyan → green and remove `noise` class references)
- Section padding: `py-16 sm:py-20`

- [ ] **Step 2: Update CategoryCard colors**

- `var(--accent-cyan)` → `var(--accent-green)` throughout
- `var(--accent-cyan-dim)` → `var(--accent-green-dim)`
- `glow-cyan` → `glow-green`
- Remove `noise` from card className

- [ ] **Step 3: Verify About renders correctly**

Run: `npm run dev`
Check: 2 columns, stats show dynamic numbers, green accents, no dead space.

- [ ] **Step 4: Commit**

```
git add components/sections/About.tsx
git commit -m "refactor: redesign about section with 2-column stats layout"
```

---

## Chunk 4: Skills + Experience Sections

### Task 10: Redesign Skills as bento grid

**Files:**
- Modify: `components/sections/Skills.tsx`

- [ ] **Step 1: Remove `BORDER_COLORS` array and color cycling logic**

Delete the `BORDER_COLORS` constant and the `colorIndex` variable in the component.

- [ ] **Step 2: Update SkillCard component**

- All cards get `border-white/[0.08]` border
- Emphasized cards get: `border-l-[var(--accent-green)] glow-green` + `lg:col-span-2`
- Non-emphasized: `border-l-transparent`
- Replace pulsing dot with `<Badge>` that says "Core":
```tsx
{isEmphasized && (
  <Badge className="ml-2 border-[var(--accent-green-dim)]/40 bg-[var(--accent-green)]/15 text-[10px] text-[var(--accent-green)]">
    Core
  </Badge>
)}
```
- Remove `noise` from card className
- Replace all cyan color references with green

- [ ] **Step 3: Update grid to support col-span**

Wrap each card in a div that conditionally applies `lg:col-span-2`:
```tsx
<div className={category.emphasis ? "lg:col-span-2" : ""}>
  <SkillCard category={category} />
</div>
```

- [ ] **Step 4: Update section padding**

`py-16 sm:py-20`

- [ ] **Step 5: Verify skills renders correctly**

Run: `npm run dev`
Check: Emphasized cards span 2 columns, single green accent, "Core" badges, no color cycling.

- [ ] **Step 6: Commit**

```
git add components/sections/Skills.tsx
git commit -m "refactor: redesign skills as bento grid with green accent"
```

---

### Task 11: Redesign Experience as single-column timeline

**Files:**
- Modify: `components/sections/Experience.tsx`

- [ ] **Step 1: Remove the desktop alternating layout**

Remove the entire `{/* Desktop: alternating layout */}` block (lines 225-247).
Keep only the mobile layout but make it work at all breakpoints:
- Timeline line on the left
- Node on the left
- Card takes full width to the right

Remove `lg:hidden` from the mobile sections so they show at all sizes.
Remove the `lg:left-1/2` and `lg:-translate-x-px` from the timeline line — keep it on the left always.

- [ ] **Step 2: Replace all color references**

- `var(--accent-cyan)` → `var(--accent-green)`
- `var(--accent-cyan-dim)` → `var(--accent-green-dim)`
- `var(--accent-amber)` → remove, past items use `var(--muted-foreground)`
- `var(--accent-amber-dim)` → `var(--muted-foreground)`
- `glow-cyan` → `glow-green`
- Remove `noise` from card classNames

- [ ] **Step 3: Simplify TimelineNode**

- Current: green filled dot with briefcase icon
- Past: `bg-slate-700 border-slate-600` with index number in `text-muted-foreground`
- Remove the pulsing ring animation

- [ ] **Step 4: Update ExperienceCard colors**

- Current role: green left border, company name in green
- Past roles: `border-white/[0.08]` left border, company name in `text-foreground` (white)
- Technology badges: green-tinted for current, neutral slate for past

- [ ] **Step 5: Tighten spacing**

- `space-y-8` between entries (down from `space-y-12`)
- Section padding: `py-16 sm:py-20`
- `mb-12` on heading (down from `mb-16`)

- [ ] **Step 6: Verify experience renders correctly**

Run: `npm run dev`
Check: Single column at all sizes, full-width cards, green accent on current, no empty right side.

- [ ] **Step 7: Commit**

```
git add components/sections/Experience.tsx
git commit -m "refactor: redesign experience as single-column timeline"
```

---

## Chunk 5: Projects + Education/Certifications + Contact

### Task 12: Update Projects section

**Files:**
- Modify: `components/sections/Projects.tsx`

- [ ] **Step 1: Simplify heading**

Change "Open Source & Projects" → "Projects"

- [ ] **Step 2: Replace all color references with green**

- `var(--accent-cyan)` → `var(--accent-green)`
- `glow-cyan` → `glow-green`
- `var(--glow-cyan)` → `var(--glow-green)`
- Remove `noise` from card classNames

- [ ] **Step 3: Remove translate hover effect**

Replace `hover:-translate-y-[2px]` with `hover:border-l-[var(--accent-green)]` (border color transition only — no layout shift).

- [ ] **Step 4: Update section padding**

`py-16 sm:py-20`

- [ ] **Step 5: Commit**

```
git add components/sections/Projects.tsx
git commit -m "refactor: update projects with green accent, remove hover translate"
```

---

### Task 13: Create merged EducationCertifications section

**Files:**
- Create: `components/sections/EducationCertifications.tsx`
- Modify: `app/page.tsx`
- Delete: `components/sections/Education.tsx`
- Delete: `components/sections/Certifications.tsx`

- [ ] **Step 1: Create `components/sections/EducationCertifications.tsx`**

```tsx
import { education, certifications } from "@/lib/data";
import { ScrollAnimator } from "@/components/ScrollAnimator";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Award } from "lucide-react";

export function EducationCertifications() {
  return (
    <section id="education" className="relative px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Section heading */}
        <ScrollAnimator animation="fadeInUp">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl">
            <span className="text-gradient-green">Education & Certifications</span>
          </h2>
        </ScrollAnimator>

        {/* Education cards */}
        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {education.map((entry, index) => (
            <ScrollAnimator key={entry.university} animation="fadeInUp" delay={index * 150}>
              <Card className="glass border-l-4 border-l-[var(--accent-green)]/50 transition-all duration-300 hover:border-l-[var(--accent-green)]">
                <CardHeader className="flex flex-row items-start gap-3 space-y-0 pb-2">
                  <GraduationCap className="mt-0.5 h-6 w-6 shrink-0 text-[var(--accent-green)]" />
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-base font-bold leading-snug text-[var(--accent-green)]">
                      {entry.university}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pl-12">
                  <p className="mb-3 text-sm font-medium text-foreground">
                    {entry.degree}{" · "}
                    <span className="text-[var(--muted-foreground)]">{entry.field}</span>
                  </p>
                  <Badge variant="outline" className="border-[var(--accent-green-dim)]/40 bg-[var(--accent-green)]/10 text-[10px] text-[var(--accent-green-bright)]">
                    {entry.period}
                  </Badge>
                </CardContent>
              </Card>
            </ScrollAnimator>
          ))}
        </div>

        {/* Certifications as compact badges */}
        <ScrollAnimator animation="fadeInUp" delay={300}>
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[var(--accent-green-dim)]/30 to-transparent" />
              <h3 className="shrink-0 text-sm font-semibold tracking-widest uppercase text-[var(--accent-green-dim)]">
                Certifications
              </h3>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[var(--accent-green-dim)]/30 to-transparent" />
            </div>
            <div className="flex flex-wrap gap-2">
              {certifications.map((cert) => (
                <Badge
                  key={cert.name}
                  variant="outline"
                  className="border-[var(--accent-green-dim)]/30 bg-[var(--accent-green)]/8 px-3 py-1.5 text-xs text-[var(--accent-green-bright)] transition-colors hover:bg-[var(--accent-green)]/15"
                >
                  <Award className="mr-1.5 h-3 w-3" />
                  {cert.name}
                </Badge>
              ))}
            </div>
          </div>
        </ScrollAnimator>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Update `app/page.tsx`**

- Remove imports for `Certifications` and `Education`
- Add import for `EducationCertifications`
- Replace `<Certifications />` and `<Education />` with single `<EducationCertifications />`

- [ ] **Step 3: Delete old files**

Delete `components/sections/Education.tsx` and `components/sections/Certifications.tsx`.

- [ ] **Step 4: Verify renders correctly**

Run: `npm run dev`
Check: Merged section with education cards on top, cert badges below.

- [ ] **Step 5: Commit**

```
git add components/sections/EducationCertifications.tsx app/page.tsx
git rm components/sections/Education.tsx components/sections/Certifications.tsx
git commit -m "refactor: merge education and certifications into single section"
```

---

### Task 14: Update Contact section

**Files:**
- Modify: `components/sections/Contact.tsx`

- [ ] **Step 1: Replace all cyan references with green**

- `var(--accent-cyan)` → `var(--accent-green)`
- `var(--accent-cyan-dim)` → `var(--accent-green-dim)`
- `var(--accent-cyan-bright)` → `var(--accent-green-bright)`
- `var(--glow-cyan)` → `var(--glow-green)`
- Remove `noise` from form and card classNames

- [ ] **Step 2: Remove Location from contactLinks**

Delete the MapPin/Location entry from the `contactLinks` array (last item).

- [ ] **Step 3: Update section padding**

`py-16 sm:py-20`

- [ ] **Step 4: Commit**

```
git add components/sections/Contact.tsx
git commit -m "refactor: update contact section with green accent, remove location"
```

---

## Chunk 6: Final Verification

### Task 15: Full build + visual verification

**Files:** None (verification only)

- [ ] **Step 1: Run full production build**

Run: `npm run build`
Expected: Build succeeds with zero errors.

- [ ] **Step 2: Run linter**

Run: `npm run lint`
Expected: No errors (warnings acceptable).

- [ ] **Step 3: Visual check via tester agent**

Launch tester-agent to screenshot all sections and verify:
- Single green accent throughout
- No amber/cyan remnants
- Tighter spacing, no dead space voids
- About section has 2-column stats layout
- Skills bento grid with "Core" badges
- Experience single-column timeline, full width
- Projects filtered (no empty descriptions)
- Merged Education & Certifications section
- ScrollToTop button visible after scrolling
- Contact form with green accents

- [ ] **Step 4: Final commit if any cleanup needed**

```
git commit -m "fix: address final visual review findings"
```
