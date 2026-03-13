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
              (el as HTMLElement).textContent =
                Math.round(obj.val) + (hasPlus ? "+" : "");
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
        <p
          className="text-xs font-medium uppercase text-text-muted mb-4"
          style={{ letterSpacing: "0.2em" }}
        >
          Software Quality Engineer
        </p>

        <h1
          className="font-bold text-text-primary mb-3"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
        >
          {profile.name}
        </h1>

        <p className="text-text-secondary text-lg max-w-2xl mb-12">
          Building quality into software at Deutsche Bank
        </p>

        <div ref={statsRef} className="flex flex-wrap gap-8 sm:gap-12 mb-12">
          {STATS.map((stat, i) => (
            <div key={i} className="flex flex-col">
              <span
                data-stat-value={stat.value}
                className="text-accent font-extrabold"
                style={{ fontSize: "clamp(2.5rem, 5vw, 3.75rem)" }}
              >
                {stat.value}
              </span>
              <span
                className="text-xs font-medium uppercase text-text-muted mt-1"
                style={{ letterSpacing: "0.1em" }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <MagneticButton
            as="a"
            href="/Cristian-Robert-Iosef-CV.pdf"
            download
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase border border-accent text-accent rounded-full hover:bg-accent hover:text-background transition-colors duration-300"
            style={{ letterSpacing: "0.15em" }}
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

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <ChevronDown className="w-4 h-4 text-accent animate-bounce" />
      </div>
    </section>
  );
}
