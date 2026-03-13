# Editorial Precision Redesign — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete visual redesign of the portfolio from generic teal-on-white glassmorphism to an opinionated editorial dark theme with amber/gold accent, JetBrains Mono typography, bento grid layouts, GSAP scroll animations, magnetic buttons, and a WebGL shader hero.

**Architecture:** Single-page Next.js 16 app. All existing section components get rewritten in-place. New utility components (SmoothScroll, MagneticButton, ShaderBackground, ScrollReveal) go in `components/`. Data layer unchanged. Three new dependencies: gsap, @gsap/react, lenis.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, GSAP + ScrollTrigger, Lenis, raw WebGL (no Three.js), shadcn/ui (minimal usage — only Sonner toast retained)

**Design Doc:** `docs/plans/2026-03-13-editorial-redesign-design.md`

---

## Chunk 1: Foundation

### Task 1: Install Dependencies & Self-Host Font

**Files:**
- Modify: `package.json`
- Create: `public/fonts/JetBrainsMono-Variable.woff2`

- [ ] **Step 1: Install new dependencies**

```bash
npm install gsap @gsap/react lenis
```

- [ ] **Step 2: Download JetBrains Mono variable font**

```bash
curl -L -o /tmp/jetbrains-mono.zip "https://github.com/JetBrains/JetBrainsMono/releases/download/v2.304/JetBrainsMono-2.304.zip"
unzip -o /tmp/jetbrains-mono.zip -d /tmp/jetbrains-mono
cp /tmp/jetbrains-mono/fonts/variable/JetBrainsMono\[wght\].woff2 public/fonts/JetBrainsMono-Variable.woff2
```

- [ ] **Step 3: Verify font file exists**

```bash
ls -la public/fonts/JetBrainsMono-Variable.woff2
```
Expected: file exists, ~150-250KB

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json public/fonts/
git commit -m "chore: add gsap, lenis, self-hosted JetBrains Mono variable font"
```

---

### Task 2: Rewrite globals.css — Color System & Base Styles

**Files:**
- Modify: `app/globals.css`

Replace the entire CSS file with new color tokens, typography base, dot-grid background texture, scrollbar styling, selection colors, and `prefers-reduced-motion` rules. Remove all old animation keyframes, `.glass`, `.glow-accent`, `.text-gradient-accent` utilities, dark mode variant, and teal color references.

- [ ] **Step 1: Rewrite globals.css**

```css
@import "tailwindcss";
@import "shadcn/tailwind.css";

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-surface: var(--surface);
  --color-surface-hover: var(--surface-hover);
  --color-border: var(--border);
  --color-border-hover: var(--border-hover);
  --color-accent: var(--accent);
  --color-accent-glow: var(--accent-glow);
  --color-text-primary: var(--text-primary);
  --color-text-secondary: var(--text-secondary);
  --color-text-muted: var(--text-muted);
  --font-mono: var(--font-mono);
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
}

@font-face {
  font-family: "JetBrains Mono";
  src: url("/fonts/JetBrainsMono-Variable.woff2") format("woff2-variations");
  font-weight: 100 800;
  font-display: swap;
  font-style: normal;
}

:root {
  --background: #0C0C0E;
  --foreground: #F5F5F5;
  --surface: #141416;
  --surface-hover: #1C1C1F;
  --border: rgba(255, 255, 255, 0.08);
  --border-hover: rgba(255, 255, 255, 0.15);
  --text-primary: #F5F5F5;
  --text-secondary: #A1A1A6;
  --text-muted: #5A5A5E;
  --accent: #F59E0B;
  --accent-glow: rgba(245, 158, 11, 0.15);
  --radius: 0.625rem;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;

  /* shadcn compatibility tokens */
  --primary: #F59E0B;
  --primary-foreground: #0C0C0E;
  --card: #141416;
  --card-foreground: #F5F5F5;
  --popover: #141416;
  --popover-foreground: #F5F5F5;
  --secondary: #1C1C1F;
  --secondary-foreground: #F5F5F5;
  --muted: #1C1C1F;
  --muted-foreground: #5A5A5E;
  --destructive: #ef4444;
  --input: rgba(255, 255, 255, 0.12);
  --ring: rgba(245, 158, 11, 0.5);
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

@layer base {
  * { @apply border-border outline-ring/50; }

  body {
    @apply bg-background text-foreground antialiased;
    font-family: var(--font-mono);
    font-size: 0.9375rem;
    line-height: 1.7;
    /* dot grid texture */
    background-image: radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 24px 24px;
  }

  ::selection {
    background: #F59E0B;
    color: #0C0C0E;
  }

  ::-moz-selection {
    background: #F59E0B;
    color: #0C0C0E;
  }

  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #5A5A5E; border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: #F59E0B; }

  * {
    scrollbar-width: thin;
    scrollbar-color: #5A5A5E transparent;
  }
}
```

- [ ] **Step 2: Verify no build errors**

```bash
npm run build
```
Expected: build succeeds (sections will look broken visually — that's expected, we'll rewrite them next)

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat: rewrite color system to dark charcoal + amber editorial theme"
```

---

### Task 3: Update Root Layout — Single Font, Remove Old Fonts

**Files:**
- Modify: `app/layout.tsx`

Remove Syne and Outfit font imports. Remove Google Font loading entirely (JetBrains Mono is now self-hosted via @font-face in globals.css). Keep Toaster. Remove `next-themes` if it's used anywhere.

- [ ] **Step 1: Rewrite layout.tsx**

```tsx
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cristian-Robert Iosef | Senior QA Automation Engineer",
  description:
    "Test Automation Architect specializing in enterprise-grade frameworks across web, API, and performance domains.",
  keywords: [
    "QA Automation",
    "Test Automation",
    "Playwright",
    "Selenium",
    "Java",
    "TypeScript",
    "CI/CD",
    "Senior Engineer",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Build to verify**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "refactor: remove Google Fonts, use self-hosted JetBrains Mono via CSS"
```

---

## Chunk 2: Core Infrastructure Components

### Task 4: Create SmoothScroll Provider (Lenis + GSAP)

**Files:**
- Create: `components/SmoothScroll.tsx`
- Modify: `app/page.tsx` (wrap content)

- [ ] **Step 1: Create SmoothScroll.tsx**

```tsx
"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Disable Lenis on mobile — native scroll is better for touch
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) return;

    const lenis = new Lenis({
      lerp: 0.1,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
```

- [ ] **Step 2: Create ScrollReveal.tsx — reusable scroll animation wrapper**

Create: `components/ScrollReveal.tsx`

```tsx
"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const from = {
      opacity: 0,
      y: direction === "up" ? 30 : 0,
      x: direction === "left" ? -30 : direction === "right" ? 30 : 0,
    };

    gsap.from(ref.current, {
      ...from,
      duration: 0.7,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 85%",
        once: true,
      },
    });
  }, { scope: ref });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
```

- [ ] **Step 3: Update page.tsx to use SmoothScroll**

```tsx
import { fetchGitHubRepos } from "@/lib/github";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { EducationCertifications } from "@/components/sections/EducationCertifications";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/Footer";

export default async function Home() {
  const repos = await fetchGitHubRepos();

  return (
    <SmoothScroll>
      <Navigation />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects repos={repos} />
        <EducationCertifications />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
```

Note: `ScrollToTop` component removed — the floating pill nav replaces it.

- [ ] **Step 4: Build to verify**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add components/SmoothScroll.tsx components/ScrollReveal.tsx app/page.tsx
git commit -m "feat: add Lenis smooth scroll provider and ScrollReveal animation wrapper"
```

---

### Task 5: Create MagneticButton Component

**Files:**
- Create: `components/MagneticButton.tsx`

- [ ] **Step 1: Create MagneticButton.tsx**

```tsx
"use client";

import { useRef, useCallback } from "react";
import { gsap } from "gsap";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  as?: "button" | "a";
  href?: string;
  download?: boolean;
  strength?: number;
  onClick?: () => void;
}

export function MagneticButton({
  children,
  className = "",
  as: Tag = "button",
  href,
  download,
  strength = 0.3,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      if (isMobile) return;

      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(ref.current, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: "power2.out",
      });
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.5)",
    });
  }, []);

  const props = {
    ref: ref as React.RefObject<HTMLButtonElement & HTMLAnchorElement>,
    className,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onClick,
    ...(Tag === "a" ? { href, download } : {}),
  };

  return <Tag {...props}>{children}</Tag>;
}
```

- [ ] **Step 2: Build to verify**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add components/MagneticButton.tsx
git commit -m "feat: add MagneticButton component with GSAP elastic easing"
```

---

### Task 6: Create WebGL Shader Background Component

**Files:**
- Create: `components/ShaderBackground.tsx`

The shader renders an animated gradient noise in amber/charcoal tones on a fullscreen quad. Uses raw WebGL — no Three.js.

- [ ] **Step 1: Create ShaderBackground.tsx**

```tsx
"use client";

import { useRef, useEffect } from "react";

const VERTEX_SHADER = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision mediump float;
  uniform float u_time;
  uniform vec2 u_resolution;

  // Simplex-style noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    float t = u_time * 0.15;

    float n1 = snoise(uv * 2.0 + t);
    float n2 = snoise(uv * 3.0 - t * 0.7);
    float n = (n1 + n2) * 0.5;

    // Amber: rgb(245, 158, 11) = vec3(0.96, 0.62, 0.04)
    // Charcoal: rgb(12, 12, 14) = vec3(0.047, 0.047, 0.055)
    vec3 amber = vec3(0.96, 0.62, 0.04);
    vec3 charcoal = vec3(0.047, 0.047, 0.055);
    vec3 darkAmber = vec3(0.3, 0.15, 0.02);

    vec3 color = mix(charcoal, darkAmber, n * 0.5 + 0.5);
    color = mix(color, amber, smoothstep(0.6, 1.0, n) * 0.15);

    gl_FragColor = vec4(color, 1.0);
  }
`;

export function ShaderBackground({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Disable on mobile or reduced motion
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (isMobile || prefersReducedMotion) {
      canvas.style.display = "none";
      return;
    }

    const gl = canvas.getContext("webgl");
    if (!gl) {
      canvas.style.display = "none";
      return;
    }

    // Compile shaders
    function createShader(gl: WebGLRenderingContext, type: number, source: string) {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    }

    const vs = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    // Fullscreen quad
    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const posLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const timeLoc = gl.getUniformLocation(program, "u_time");
    const resLoc = gl.getUniformLocation(program, "u_resolution");

    function resize() {
      if (!canvas || !gl) return;
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    }

    resize();
    window.addEventListener("resize", resize);

    const startTime = performance.now();

    function render() {
      if (!gl) return;
      const elapsed = (performance.now() - startTime) / 1000;
      gl.uniform1f(timeLoc, elapsed);
      gl.uniform2f(resLoc, canvas!.width, canvas!.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationRef.current = requestAnimationFrame(render);
    }

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full opacity-35 ${className}`}
        aria-hidden="true"
      />
      {/* CSS fallback for mobile / reduced motion / no WebGL */}
      <div
        className="absolute inset-0 w-full h-full opacity-35 md:hidden"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(245,158,11,0.08), transparent 60%), radial-gradient(ellipse at 70% 30%, rgba(245,158,11,0.05), transparent 50%)",
        }}
        aria-hidden="true"
      />
    </>
  );
}
```

- [ ] **Step 2: Build to verify**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add components/ShaderBackground.tsx
git commit -m "feat: add WebGL shader background with ambient amber noise"
```

---

## Chunk 3: Navigation & Hero

### Task 7: Rewrite Navigation — Floating Pill

**Files:**
- Modify: `components/Navigation.tsx`

Complete rewrite. Remove old sticky header. Create floating pill nav at bottom-center that appears after scrolling past hero. Keep IntersectionObserver for active section tracking. Mobile: hamburger pill → full-screen overlay.

- [ ] **Step 1: Rewrite Navigation.tsx**

```tsx
"use client";

import { useState, useEffect } from "react";
import { Download, Menu, X } from "lucide-react";
import { MagneticButton } from "@/components/MagneticButton";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export function Navigation() {
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const heroEl = document.getElementById("hero");
    if (!heroEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.href.slice(1));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -40% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <>
      {/* Desktop floating pill */}
      <nav
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-1 px-2 py-2 rounded-full bg-surface/80 backdrop-blur-md border border-border transition-all duration-500 ${
          visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        aria-label="Main navigation"
      >
        {NAV_ITEMS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={`relative px-4 py-2 text-xs font-medium uppercase tracking-[0.1em] transition-colors duration-300 rounded-full ${
              activeSection === item.href.slice(1)
                ? "text-accent"
                : "text-text-secondary hover:text-accent"
            }`}
          >
            {item.label}
            {activeSection === item.href.slice(1) && (
              <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent" />
            )}
          </a>
        ))}
      </nav>

      {/* Mobile hamburger pill */}
      <button
        className={`fixed bottom-8 right-6 z-50 md:hidden flex items-center justify-center w-12 h-12 rounded-full bg-surface/80 backdrop-blur-md border border-border transition-all duration-500 ${
          visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(true)}
        aria-label="Open navigation"
      >
        <Menu className="w-5 h-5 text-text-primary" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-sm flex flex-col items-center justify-center gap-8">
          <button
            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full border border-border"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation"
          >
            <X className="w-5 h-5 text-text-primary" />
          </button>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`text-2xl font-medium tracking-[0.05em] transition-colors ${
                activeSection === item.href.slice(1)
                  ? "text-accent"
                  : "text-text-primary hover:text-accent"
              }`}
            >
              {item.label}
            </a>
          ))}
          <MagneticButton
            as="a"
            href="/Cristian-Robert-Iosef-CV.pdf"
            download
            className="mt-4 px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] border border-accent text-accent rounded-full hover:bg-accent hover:text-background transition-colors"
          >
            <Download className="w-4 h-4 inline mr-2" />
            Download CV
          </MagneticButton>
        </div>
      )}
    </>
  );
}
```

- [ ] **Step 2: Build to verify**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add components/Navigation.tsx
git commit -m "feat: rewrite navigation as floating pill with mobile overlay"
```

---

### Task 8: Rewrite Hero Section — Stats-Forward with Shader

**Files:**
- Modify: `components/sections/Hero.tsx`
- Delete: `components/ScrollAnimator.tsx` (if exists — old scroll animation wrapper)

- [ ] **Step 1: Rewrite Hero.tsx**

```tsx
"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Github, Linkedin, Mail, Download, ChevronDown } from "lucide-react";
import { profile } from "@/lib/data";
import { ShaderBackground } from "@/components/ShaderBackground";
import { MagneticButton } from "@/components/MagneticButton";

const STATS = [
  { value: "7+", label: "Years Experience" },
  { value: "3", label: "Industries" },
  { value: "15+", label: "Frameworks & Tools" },
  { value: "5", label: "Companies" },
];

const SOCIAL_LINKS = [
  { icon: Github, href: "https://github.com/cristian-robert", label: "GitHub" },
  { icon: Linkedin, href: profile.linkedin, label: "LinkedIn" },
  { icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
];

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;

      // Animate stats numbers counting up
      if (statsRef.current) {
        const numberEls = statsRef.current.querySelectorAll("[data-stat-value]");
        numberEls.forEach((el) => {
          const raw = el.getAttribute("data-stat-value") || "0";
          const hasPlus = raw.includes("+");
          const target = parseInt(raw.replace("+", ""), 10);
          if (isNaN(target)) return;

          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 1.5,
            ease: "power2.out",
            delay: 0.5,
            onUpdate: () => {
              el.textContent = Math.round(obj.val) + (hasPlus ? "+" : "");
            },
          });
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-6 sm:px-8 lg:px-12 overflow-hidden"
    >
      <ShaderBackground />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Role label */}
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-muted mb-4">
          Software Quality Engineer
        </p>

        {/* Name */}
        <h1
          className="font-bold text-text-primary mb-3"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
        >
          {profile.name}
        </h1>

        {/* Tagline */}
        <p className="text-text-secondary text-lg max-w-2xl mb-12">
          Building quality into software at Deutsche Bank
        </p>

        {/* Stats row */}
        <div
          ref={statsRef}
          className="flex flex-wrap gap-8 sm:gap-12 mb-12"
        >
          {STATS.map((stat, i) => (
            <div key={i} className="flex flex-col">
              <span
                data-stat-value={stat.value}
                className="text-accent font-extrabold"
                style={{ fontSize: "clamp(2.5rem, 5vw, 3.75rem)" }}
              >
                {stat.value}
              </span>
              <span className="text-xs font-medium uppercase tracking-[0.1em] text-text-muted mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* CTA + Social */}
        <div className="flex flex-wrap items-center gap-6">
          <MagneticButton
            as="a"
            href="/Cristian-Robert-Iosef-CV.pdf"
            download
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] border border-accent text-accent rounded-full hover:bg-accent hover:text-background transition-colors duration-300"
          >
            <Download className="w-4 h-4" />
            Download CV
          </MagneticButton>

          <div className="flex gap-3">
            {SOCIAL_LINKS.map((link) => (
              <MagneticButton
                key={link.label}
                as="a"
                href={link.href}
                className="flex items-center justify-center w-11 h-11 rounded-full border border-border text-text-secondary hover:bg-accent hover:text-background hover:border-accent transition-all duration-300"
                strength={0.4}
              >
                <link.icon className="w-4 h-4" />
                <span className="sr-only">{link.label}</span>
              </MagneticButton>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <ChevronDown className="w-4 h-4 text-accent animate-bounce" />
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Remove old ScrollAnimator if it exists**

```bash
rm -f components/ScrollAnimator.tsx
```

- [ ] **Step 3: Remove old useTypedText hook if it exists**

```bash
find components lib hooks -name "useTypedText*" -delete 2>/dev/null || true
```

- [ ] **Step 4: Build to verify**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add components/sections/Hero.tsx
git add -u  # stage any deletions
git commit -m "feat: rewrite Hero with stats-forward layout, shader background, magnetic buttons"
```

---

## Chunk 4: Content Sections

### Task 9: Rewrite About → Bento Grid

**Files:**
- Modify: `components/sections/About.tsx`

Replace the two-column stat cards layout with an asymmetric bento grid.

- [ ] **Step 1: Rewrite About.tsx**

```tsx
import { profile, skills } from "@/lib/data";
import { ScrollReveal } from "@/components/ScrollReveal";

const QA_DOMAINS = ["E2E Testing", "API Testing", "Performance Testing", "BDD/TDD", "CI/CD Integration", "Cloud Testing"];
const STRENGTHS = ["Framework architecture from scratch", "Multi-stack automation (Java + TypeScript)", "Enterprise-grade test infrastructure"];

export function About() {
  // Flatten top tech from emphasized categories
  const topTech = skills
    .filter((s) => s.emphasis)
    .flatMap((s) => s.skills)
    .slice(0, 12);

  return (
    <section id="about" className="py-32 px-6 sm:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2
            className="font-bold text-text-primary mb-16"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
          >
            Short <span className="text-accent">Profile</span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Bio — spans 2 cols */}
          <ScrollReveal className="lg:col-span-2 md:col-span-2 bg-surface border border-border rounded-2xl p-6 hover:border-border-hover hover:shadow-[0_0_30px_var(--accent-glow)] transition-all duration-300">
            <p className="text-xs font-medium uppercase tracking-[0.1em] text-text-muted mb-4">About</p>
            <p className="text-text-secondary leading-relaxed">
              {profile.summary[0]}
            </p>
          </ScrollReveal>

          {/* Tech Stack */}
          <ScrollReveal delay={0.1} className="lg:col-span-2 bg-surface border border-border rounded-2xl p-6 hover:border-border-hover hover:shadow-[0_0_30px_var(--accent-glow)] transition-all duration-300">
            <p className="text-xs font-medium uppercase tracking-[0.1em] text-text-muted mb-4">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {topTech.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs bg-surface-hover border border-border rounded-lg text-text-secondary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </ScrollReveal>

          {/* QA Domains */}
          <ScrollReveal delay={0.2} className="lg:col-span-1 bg-surface border border-border rounded-2xl p-6 hover:border-border-hover hover:shadow-[0_0_30px_var(--accent-glow)] transition-all duration-300">
            <p className="text-xs font-medium uppercase tracking-[0.1em] text-text-muted mb-4">Domains</p>
            <div className="flex flex-col gap-2">
              {QA_DOMAINS.map((d) => (
                <span key={d} className="text-xs text-text-secondary">{d}</span>
              ))}
            </div>
          </ScrollReveal>

          {/* Location */}
          <ScrollReveal delay={0.3} className="bg-surface border border-border rounded-2xl p-6 hover:border-border-hover hover:shadow-[0_0_30px_var(--accent-glow)] transition-all duration-300">
            <p className="text-xs font-medium uppercase tracking-[0.1em] text-text-muted mb-4">Location</p>
            <p className="text-2xl mb-1">🇷🇴</p>
            <p className="text-sm text-text-secondary">{profile.location}</p>
          </ScrollReveal>

          {/* Key Strengths */}
          <ScrollReveal delay={0.4} className="lg:col-span-2 bg-surface border border-border rounded-2xl p-6 hover:border-border-hover hover:shadow-[0_0_30px_var(--accent-glow)] transition-all duration-300">
            <p className="text-xs font-medium uppercase tracking-[0.1em] text-text-muted mb-4">Strengths</p>
            <ul className="space-y-2">
              {STRENGTHS.map((s) => (
                <li key={s} className="text-sm text-text-secondary flex items-start gap-2">
                  <span className="text-accent mt-1 text-xs">▸</span>
                  {s}
                </li>
              ))}
            </ul>
          </ScrollReveal>

          {/* Contact Email */}
          <ScrollReveal delay={0.5} className="lg:col-span-2 bg-surface border border-border rounded-2xl p-6 hover:border-border-hover hover:shadow-[0_0_30px_var(--accent-glow)] transition-all duration-300 flex flex-col justify-between">
            <p className="text-xs font-medium uppercase tracking-[0.1em] text-text-muted mb-4">Contact</p>
            <a
              href={`mailto:${profile.email}`}
              className="text-accent hover:underline text-sm break-all"
            >
              {profile.email}
            </a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Build to verify**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/About.tsx
git commit -m "feat: rewrite About as asymmetric bento grid with scroll reveals"
```

---

### Task 10: Rewrite Skills Section — Category Groups + Tags

**Files:**
- Modify: `components/sections/Skills.tsx`

- [ ] **Step 1: Rewrite Skills.tsx**

```tsx
import { skills } from "@/lib/data";
import { ScrollReveal } from "@/components/ScrollReveal";

export function Skills() {
  return (
    <section id="skills" className="py-32 px-6 sm:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2
            className="font-bold text-text-primary mb-16"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
          >
            My <span className="text-accent">Skills</span>
          </h2>
        </ScrollReveal>

        <div className="space-y-12">
          {skills.map((category, i) => (
            <ScrollReveal key={category.name} delay={i * 0.1}>
              <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-text-muted mb-4">
                {category.name}
                {category.emphasis && (
                  <span className="ml-2 text-accent">●</span>
                )}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-xs bg-surface border border-border rounded-lg text-text-secondary hover:bg-surface-hover transition-colors duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Build to verify**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/Skills.tsx
git commit -m "feat: rewrite Skills as category groups with tag clouds"
```

---

### Task 11: Rewrite Experience Section — Timeline with Year Markers

**Files:**
- Modify: `components/sections/Experience.tsx`

- [ ] **Step 1: Rewrite Experience.tsx**

```tsx
"use client";

import { useState } from "react";
import { ChevronRight, MapPin, Calendar } from "lucide-react";
import { experience } from "@/lib/data";
import { ScrollReveal } from "@/components/ScrollReveal";

export function Experience() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section id="experience" className="py-32 px-6 sm:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2
            className="font-bold text-text-primary mb-16"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
          >
            Work <span className="text-accent">Experience</span>
          </h2>
        </ScrollReveal>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[7px] top-0 bottom-0 w-px bg-border" aria-hidden="true" />

          <div className="space-y-12">
            {experience.map((entry, i) => (
              <ScrollReveal key={i} delay={i * 0.1} direction="left">
                <div className="relative pl-10">
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-0 top-2 w-[15px] h-[15px] rounded-full border-2 ${
                      entry.current
                        ? "bg-accent border-accent"
                        : "bg-background border-border"
                    }`}
                  />

                  {/* Card */}
                  <div
                    className={`bg-surface border rounded-xl p-6 transition-all duration-300 hover:border-border-hover ${
                      entry.current ? "border-accent/30" : "border-border"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-text-primary">
                          {entry.role}
                        </h3>
                        <p className="text-accent text-sm font-medium">
                          {entry.company}
                        </p>
                      </div>
                      {entry.current && (
                        <span className="inline-flex px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] bg-accent/10 text-accent rounded-full self-start">
                          Current
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-4 text-xs text-text-muted mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {entry.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {entry.location}
                      </span>
                    </div>

                    <p className="text-sm text-text-secondary mb-4">
                      {entry.description}
                    </p>

                    {/* Expandable details */}
                    <button
                      onClick={() =>
                        setExpandedIndex(expandedIndex === i ? null : i)
                      }
                      className="flex items-center gap-1 text-xs text-text-muted hover:text-accent transition-colors"
                    >
                      <ChevronRight
                        className={`w-3 h-3 transition-transform duration-200 ${
                          expandedIndex === i ? "rotate-90" : ""
                        }`}
                      />
                      {expandedIndex === i ? "Hide" : "View"} Details
                    </button>

                    {expandedIndex === i && (
                      <div className="mt-4 pt-4 border-t border-border space-y-4">
                        <div>
                          <p className="text-xs font-medium uppercase tracking-[0.1em] text-text-muted mb-2">
                            Achievements
                          </p>
                          <ul className="space-y-1.5">
                            {entry.achievements.map((a, j) => (
                              <li
                                key={j}
                                className="text-xs text-text-secondary flex items-start gap-2"
                              >
                                <span className="text-accent mt-0.5">▸</span>
                                {a}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-xs font-medium uppercase tracking-[0.1em] text-text-muted mb-2">
                            Technologies
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {entry.technologies.map((t) => (
                              <span
                                key={t}
                                className="px-2 py-0.5 text-[10px] bg-surface-hover border border-border rounded text-text-secondary"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Build to verify**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/Experience.tsx
git commit -m "feat: rewrite Experience as timeline with expandable cards"
```

---

### Task 12: Rewrite Projects Section — Curated Cards

**Files:**
- Create: `lib/data/projects.ts` (curated project config)
- Modify: `components/sections/Projects.tsx`
- Modify: `app/page.tsx` (update Projects props if needed)

- [ ] **Step 1: Create lib/data/projects.ts — curated project config**

```ts
export interface CuratedProject {
  /** GitHub repo name (matches fetched repo) */
  repo: string;
  /** Custom description (overrides GitHub description) */
  description: string;
  /** What this project demonstrates */
  highlight?: string;
  /** Technologies to display */
  tech: string[];
  /** Optional live URL */
  liveUrl?: string;
}

/**
 * Hand-curated list of projects to feature.
 * Only repos listed here will be displayed.
 * Order determines display order.
 */
export const curatedProjects: CuratedProject[] = [
  {
    repo: "resume-website",
    description: "Personal portfolio website built with Next.js 16, React 19, and Tailwind CSS 4. Features editorial dark theme with GSAP animations and WebGL shader effects.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP", "WebGL"],
    liveUrl: "https://www.criosef-resume.info/",
  },
  // Add more curated projects here as needed.
  // Each entry matches a GitHub repo by name and overrides its display.
];
```

- [ ] **Step 2: Update lib/data/index.ts to export curated projects**

Add to the existing barrel export:

```ts
export { curatedProjects, type CuratedProject } from "./projects";
```

- [ ] **Step 3: Rewrite Projects.tsx**

```tsx
import { ExternalLink, Github, Star } from "lucide-react";
import type { GitHubRepo } from "@/lib/data/types";
import { curatedProjects } from "@/lib/data/projects";
import { ScrollReveal } from "@/components/ScrollReveal";

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Java: "#b07219",
  Python: "#3572A5",
  PHP: "#4F5D95",
  HTML: "#e34c26",
  CSS: "#563d7c",
};

interface ProjectsProps {
  repos: GitHubRepo[];
}

export function Projects({ repos }: ProjectsProps) {
  // Match fetched repos with curated config
  const featured = curatedProjects
    .map((curated) => {
      const repo = repos.find(
        (r) => r.name.toLowerCase() === curated.repo.toLowerCase()
      );
      return { curated, repo };
    })
    .filter(({ repo }) => repo !== undefined);

  // Also show non-curated repos that have stars or are interesting
  const curatedNames = new Set(curatedProjects.map((p) => p.repo.toLowerCase()));
  const otherRepos = repos
    .filter((r) => !curatedNames.has(r.name.toLowerCase()))
    .slice(0, 4); // Show up to 4 additional repos

  return (
    <section id="projects" className="py-32 px-6 sm:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2
            className="font-bold text-text-primary mb-16"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
          >
            Featured <span className="text-accent">Projects</span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Curated projects */}
          {featured.map(({ curated, repo }, i) => (
            <ScrollReveal key={curated.repo} delay={i * 0.15}>
              <div className="group bg-surface border border-border rounded-2xl overflow-hidden hover:border-border-hover hover:shadow-[0_0_30px_var(--accent-glow)] hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                {/* Gradient placeholder for screenshot */}
                <div className="h-40 bg-gradient-to-br from-surface-hover to-surface border-b border-border flex items-center justify-center">
                  <span className="text-4xl font-bold text-text-muted/20">
                    {curated.repo.charAt(0).toUpperCase()}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    {repo!.name}
                  </h3>
                  <p className="text-sm text-text-secondary mb-4 flex-1">
                    {curated.description}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {curated.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 text-[10px] bg-surface-hover border border-border rounded text-text-secondary"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4 text-xs">
                    {curated.liveUrl && (
                      <a
                        href={curated.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-accent hover:underline"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Live
                      </a>
                    )}
                    <a
                      href={repo!.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-text-muted hover:text-accent transition-colors"
                    >
                      <Github className="w-3 h-3" />
                      Source
                    </a>
                    {repo!.stargazers_count > 0 && (
                      <span className="flex items-center gap-1 text-text-muted">
                        <Star className="w-3 h-3" />
                        {repo!.stargazers_count}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}

          {/* Other repos (non-curated) */}
          {otherRepos.map((repo, i) => (
            <ScrollReveal key={repo.name} delay={(featured.length + i) * 0.15}>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-surface border border-border rounded-2xl p-6 hover:border-border-hover hover:shadow-[0_0_30px_var(--accent-glow)] hover:-translate-y-1 transition-all duration-300 h-full"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors">
                    {repo.name}
                  </h3>
                  <ExternalLink className="w-3.5 h-3.5 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-xs text-text-secondary mb-3 line-clamp-2">
                  {repo.description}
                </p>
                <div className="flex items-center gap-3 text-xs text-text-muted">
                  {repo.language && (
                    <span className="flex items-center gap-1">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{
                          backgroundColor:
                            LANGUAGE_COLORS[repo.language] || "#8b8b8b",
                        }}
                      />
                      {repo.language}
                    </span>
                  )}
                  {repo.stargazers_count > 0 && (
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      {repo.stargazers_count}
                    </span>
                  )}
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Build to verify**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add lib/data/projects.ts lib/data/index.ts components/sections/Projects.tsx
git commit -m "feat: rewrite Projects with curated cards and editorial context"
```

---

## Chunk 5: Remaining Sections & Cleanup

### Task 13: Rewrite Education & Certifications

**Files:**
- Modify: `components/sections/EducationCertifications.tsx`

- [ ] **Step 1: Rewrite EducationCertifications.tsx**

```tsx
import { education, certifications } from "@/lib/data";
import { ScrollReveal } from "@/components/ScrollReveal";

export function EducationCertifications() {
  return (
    <section id="education" className="py-32 px-6 sm:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2
            className="font-bold text-text-primary mb-16"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
          >
            Education & <span className="text-accent">Certifications</span>
          </h2>
        </ScrollReveal>

        {/* Education */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {education.map((entry, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="bg-surface border border-border rounded-xl p-5 hover:border-border-hover transition-all duration-300">
                <p className="text-xs text-text-muted uppercase tracking-[0.1em] mb-2">
                  {entry.period}
                </p>
                <h3 className="text-sm font-semibold text-text-primary mb-1">
                  {entry.degree}
                </h3>
                <p className="text-xs text-text-secondary">
                  {entry.institution}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Certifications */}
        <ScrollReveal>
          <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-text-muted mb-6">
            Certifications
          </h3>
        </ScrollReveal>
        <div className="flex flex-wrap gap-3">
          {certifications.map((cert, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs bg-surface border border-border rounded-lg text-text-secondary">
                <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                {cert.name}
                {cert.issuer && (
                  <span className="text-text-muted">— {cert.issuer}</span>
                )}
              </span>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Build to verify**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/EducationCertifications.tsx
git commit -m "feat: rewrite Education & Certifications with compact editorial design"
```

---

### Task 14: Rewrite Contact — "Let's Talk"

**Files:**
- Modify: `components/sections/Contact.tsx`

Replace the form with a bold "Let's Talk" heading, click-to-copy email, and social links. Remove react-hook-form and zod dependencies from this component.

- [ ] **Step 1: Rewrite Contact.tsx**

```tsx
"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { toast } from "sonner";
import { profile } from "@/lib/data";
import { GITHUB_USERNAME } from "@/lib/github";
import { MagneticButton } from "@/components/MagneticButton";
import { ScrollReveal } from "@/components/ScrollReveal";

const SOCIAL_LINKS = [
  { icon: Github, href: `https://github.com/${GITHUB_USERNAME}`, label: "GitHub" },
  { icon: Linkedin, href: profile.linkedin, label: "LinkedIn" },
];

export function Contact() {
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      toast.success("Email copied to clipboard");
    } catch {
      toast.error("Failed to copy email");
    }
  };

  return (
    <section id="contact" className="py-32 px-6 sm:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto text-center">
        <ScrollReveal>
          <h2
            className="font-bold text-text-primary mb-6"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            Let&apos;s <span className="text-accent">Talk</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="text-text-secondary mb-10 max-w-md mx-auto">
            Interested in working together or have a question? Reach out directly.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <button
            onClick={copyEmail}
            className="text-lg text-accent hover:underline cursor-pointer mb-10 block mx-auto transition-colors active:text-text-primary"
          >
            {profile.email}
          </button>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="flex justify-center gap-4">
            {SOCIAL_LINKS.map((link) => (
              <MagneticButton
                key={link.label}
                as="a"
                href={link.href}
                className="flex items-center justify-center w-12 h-12 rounded-full border border-border text-text-secondary hover:bg-accent hover:text-background hover:border-accent transition-all duration-300"
                strength={0.4}
              >
                <link.icon className="w-5 h-5" />
                <span className="sr-only">{link.label}</span>
              </MagneticButton>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Build to verify**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/Contact.tsx
git commit -m "feat: rewrite Contact as bold Let's Talk CTA with click-to-copy email"
```

---

### Task 15: Rewrite Footer — Minimal

**Files:**
- Modify: `components/Footer.tsx`

- [ ] **Step 1: Rewrite Footer.tsx**

```tsx
export function Footer() {
  return (
    <footer className="border-t border-border py-8 px-6 sm:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
        <span>Cristian-Robert Iosef</span>
        <span>Built with Next.js</span>
        <span>&copy; {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Build to verify**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add components/Footer.tsx
git commit -m "feat: rewrite Footer as minimal single row"
```

---

### Task 16: Cleanup — Remove Unused Code & Dependencies

**Files:**
- Delete: `components/ScrollToTop.tsx`
- Delete: `components/ScrollAnimator.tsx` (if still exists)
- Delete: any `useTypedText` hook file
- Modify: `app/page.tsx` (remove ScrollToTop import if not already)
- Modify: `package.json` (remove unused deps)

- [ ] **Step 1: Delete unused component files**

```bash
rm -f components/ScrollToTop.tsx
rm -f components/ScrollAnimator.tsx
find . -name "useTypedText*" -not -path "*/node_modules/*" -delete 2>/dev/null || true
```

- [ ] **Step 2: Verify page.tsx no longer imports deleted components**

Check that `app/page.tsx` doesn't import `ScrollToTop` or `ScrollAnimator`. If it does, remove those imports.

- [ ] **Step 3: Uninstall unused dependencies**

```bash
npm uninstall next-themes tw-animate-css @base-ui/react react-hook-form @hookform/resolvers zod
```

Note: Keep `react-hook-form`, `@hookform/resolvers`, and `zod` if any other component still uses them. Check first:

```bash
grep -r "react-hook-form\|useForm\|zodResolver" components/ lib/ app/ --include="*.tsx" --include="*.ts" 2>/dev/null
```

If only `Contact.tsx` used them (and we removed the form), safe to uninstall. If shadcn components reference them, keep them.

- [ ] **Step 4: Final build verification**

```bash
npm run build
```
Expected: clean build, no errors, no warnings about missing modules.

- [ ] **Step 5: Run dev server and visually verify**

```bash
npm run dev
```
Open http://localhost:3000 and verify:
- Dark charcoal background with dot grid texture
- Amber/gold accent color throughout
- JetBrains Mono font on all text
- Hero: shader background, stats counting up, magnetic buttons working
- Floating pill nav appears when scrolling past hero
- All sections render with new design
- Scroll animations trigger smoothly
- Mobile: shader disabled, Lenis disabled, hamburger nav works

- [ ] **Step 6: Commit cleanup**

```bash
git add -A
git commit -m "chore: remove unused components, fonts, and dependencies"
```

---

### Task 17: Final Polish & Verification

- [ ] **Step 1: Run lint**

```bash
npm run lint
```
Fix any lint errors.

- [ ] **Step 2: Run production build**

```bash
npm run build
```
Verify zero errors, zero warnings.

- [ ] **Step 3: Commit any lint fixes**

```bash
git add -A
git commit -m "fix: resolve lint errors from redesign"
```
