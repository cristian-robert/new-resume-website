"use client";

import { profile } from "@/lib/data";
import { useTypedText } from "@/hooks/useTypedText";
import { Button } from "@/components/ui/button";
import { ArrowDown, Mail } from "lucide-react";

const TYPED_STRINGS = [
  "Test Automation Architect",
  "AI Enthusiast",
  "QA Engineer",
  "Framework Builder",
];

export function Hero() {
  const typedText = useTypedText({
    strings: TYPED_STRINGS,
    typingSpeed: 80,
    deletingSpeed: 40,
    pauseDuration: 2000,
  });

  const shortSummary = profile.summary[0].split(".").slice(0, 2).join(".") + ".";

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      {/* Background gradient orbs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {/* Primary cyan orb — top right */}
        <div
          className="animate-float absolute -top-20 right-[10%] h-[500px] w-[500px] rounded-full opacity-20 blur-[100px] sm:h-[600px] sm:w-[600px]"
          style={{
            background:
              "radial-gradient(circle, var(--accent-cyan) 0%, var(--accent-cyan-dim) 40%, transparent 70%)",
          }}
        />
        {/* Secondary amber orb — bottom left */}
        <div
          className="animate-float animation-delay-200 absolute -bottom-32 -left-20 h-[400px] w-[400px] rounded-full opacity-15 blur-[100px] sm:h-[500px] sm:w-[500px]"
          style={{
            background:
              "radial-gradient(circle, var(--accent-amber) 0%, var(--accent-amber-dim) 40%, transparent 70%)",
            animationDuration: "8s",
            animationDirection: "reverse",
          }}
        />
        {/* Tertiary cyan orb — center left, subtle */}
        <div
          className="animate-float animation-delay-400 absolute top-1/2 left-[5%] h-[300px] w-[300px] -translate-y-1/2 rounded-full opacity-10 blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, var(--accent-cyan-bright) 0%, transparent 60%)",
            animationDuration: "10s",
          }}
        />
      </div>

      {/* Noise texture overlay */}
      <div className="noise pointer-events-none absolute inset-0" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Greeting line */}
        <p className="animate-fadeInUp mb-4 text-sm font-medium tracking-widest uppercase text-[var(--accent-cyan-dim)] sm:text-base">
          Hello, I&apos;m
        </p>

        {/* Name — massive typography */}
        <h1 className="animate-fadeInUp animation-delay-100 mb-6 text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
          <span className="text-gradient-cyan">{profile.name}</span>
        </h1>

        {/* Typed text line — terminal style */}
        <div className="animate-fadeInUp animation-delay-200 mb-8 flex items-center justify-center gap-1">
          <span className="font-mono text-lg text-[var(--accent-amber)] sm:text-xl md:text-2xl">
            {">"}&nbsp;
          </span>
          <span className="font-mono text-lg text-[var(--muted-foreground)] sm:text-xl md:text-2xl">
            {typedText}
          </span>
          <span className="animate-blink-cursor inline-block h-6 w-[2px] translate-y-[1px] bg-[var(--accent-cyan)] sm:h-7 md:h-8" />
        </div>

        {/* Summary */}
        <p className="animate-fadeInUp animation-delay-300 mx-auto mb-10 max-w-2xl text-base leading-relaxed text-[var(--muted-foreground)] sm:text-lg">
          {shortSummary}
        </p>

        {/* CTA Buttons */}
        <div className="animate-fadeInUp animation-delay-400 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a href="#experience">
            <Button
              size="lg"
              className="glow-cyan cursor-pointer gap-2 bg-[var(--accent-cyan)] px-6 py-5 text-sm font-semibold text-[oklch(0.13_0.005_260)] transition-all duration-300 hover:bg-[var(--accent-cyan-bright)] hover:shadow-lg sm:text-base"
            >
              View My Work
              <ArrowDown className="size-4" />
            </Button>
          </a>
          <a href="#contact">
            <Button
              variant="outline"
              size="lg"
              className="cursor-pointer gap-2 border-[var(--accent-cyan-dim)] px-6 py-5 text-sm font-semibold text-[var(--accent-cyan)] transition-all duration-300 hover:border-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/10 sm:text-base"
            >
              <Mail className="size-4" />
              Get in Touch
            </Button>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fadeInUp animation-delay-600">
        <div
          className="flex flex-col items-center gap-2 text-[var(--muted-foreground)] opacity-60"
          aria-hidden="true"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="h-8 w-[1px] animate-pulse-glow bg-[var(--accent-cyan-dim)]" />
        </div>
      </div>
    </section>
  );
}
