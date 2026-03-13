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
        <div
          className="animate-float absolute -top-20 right-[10%] h-[500px] w-[500px] rounded-full opacity-[0.12] blur-[100px] sm:h-[600px] sm:w-[600px]"
          style={{
            background: "radial-gradient(circle, #10B981 0%, #059669 40%, transparent 70%)",
            animationDuration: "14s",
          }}
        />
        <div
          className="animate-float animation-delay-300 absolute -bottom-32 -left-20 h-[400px] w-[400px] rounded-full opacity-[0.08] blur-[120px] sm:h-[500px] sm:w-[500px]"
          style={{
            background: "radial-gradient(circle, #34D399 0%, #059669 40%, transparent 70%)",
            animationDuration: "18s",
            animationDirection: "reverse",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Name */}
        <h1 className="animate-fadeInUp mb-6 text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
          <span className="text-gradient-accent">{profile.name}</span>
        </h1>

        {/* Typed text — terminal style */}
        <div className="animate-fadeInUp animation-delay-100 mb-8 flex items-center justify-center gap-1">
          <span className="font-mono text-lg text-teal-700 sm:text-xl md:text-2xl">
            {">"}&nbsp;
          </span>
          <span className="font-mono text-lg text-slate-700 sm:text-xl md:text-2xl">
            {typedText}
          </span>
          <span className="animate-blink-cursor inline-block h-6 w-[2px] translate-y-[1px] bg-teal-700 sm:h-7 md:h-8" />
        </div>

        {/* Summary */}
        <p className="animate-fadeInUp animation-delay-200 mx-auto mb-10 max-w-2xl text-base leading-relaxed text-slate-700 sm:text-lg">
          {shortSummary}
        </p>

        {/* CTA Buttons */}
        <div className="animate-fadeInUp animation-delay-300 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="glow-accent cursor-pointer gap-2 bg-teal-700 px-6 py-5 text-sm font-semibold text-white transition-all duration-300 hover:bg-teal-600 hover:shadow-lg sm:text-base"
            render={<a href="#experience" />}
          >
              View My Work
              <ArrowDown className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="cursor-pointer gap-2 border-teal-700/30 bg-white/70 px-6 py-5 text-sm font-semibold text-slate-800 transition-all duration-300 hover:border-teal-700 hover:bg-teal-50 sm:text-base"
            render={<a href="#contact" />}
          >
              <Mail className="size-4" />
              Get in Touch
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fadeInUp animation-delay-500">
        <div className="flex flex-col items-center gap-2 text-slate-600 opacity-70" aria-hidden="true">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="h-8 w-[1px] bg-teal-600/40 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
