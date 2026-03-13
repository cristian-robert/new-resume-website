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
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-1 px-2 py-2 rounded-full border transition-all duration-500 ${
          visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        style={{
          backgroundColor: "rgba(20, 20, 22, 0.8)",
          backdropFilter: "blur(12px)",
          borderColor: "rgba(255, 255, 255, 0.08)",
        }}
        aria-label="Main navigation"
      >
        {NAV_ITEMS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={`relative px-4 py-2 text-xs font-medium uppercase transition-colors duration-300 rounded-full ${
              activeSection === item.href.slice(1)
                ? "text-accent"
                : "text-text-secondary hover:text-accent"
            }`}
            style={{ letterSpacing: "0.1em" }}
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
        className={`fixed bottom-8 right-6 z-50 md:hidden flex items-center justify-center w-12 h-12 rounded-full border transition-all duration-500 ${
          visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        style={{
          backgroundColor: "rgba(20, 20, 22, 0.8)",
          backdropFilter: "blur(12px)",
          borderColor: "rgba(255, 255, 255, 0.08)",
        }}
        onClick={() => setMobileOpen(true)}
        aria-label="Open navigation"
      >
        <Menu className="w-5 h-5 text-text-primary" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-8"
          style={{
            backgroundColor: "rgba(12, 12, 14, 0.95)",
            backdropFilter: "blur(4px)",
          }}
        >
          <button
            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full border"
            style={{ borderColor: "rgba(255, 255, 255, 0.08)" }}
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
              className={`text-2xl font-medium transition-colors ${
                activeSection === item.href.slice(1)
                  ? "text-accent"
                  : "text-text-primary hover:text-accent"
              }`}
              style={{ letterSpacing: "0.05em" }}
            >
              {item.label}
            </a>
          ))}
          <MagneticButton
            as="a"
            href="/Cristian-Robert-Iosef-CV.pdf"
            download
            className="mt-4 inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase border border-accent text-accent rounded-full hover:bg-accent hover:text-background transition-colors"
          >
            <Download className="w-4 h-4" />
            Download CV
          </MagneticButton>
        </div>
      )}
    </>
  );
}
