"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Menu, Download } from "lucide-react";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
] as const;

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Scroll detection for navbar background
  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for scroll-spy
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((link) => link.href.slice(1));
    const observers: IntersectionObserver[] = [];

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    });

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    }

    observers.push(observer);

    return () => {
      for (const obs of observers) {
        obs.disconnect();
      }
    };
  }, []);

  const handleMobileLinkClick = useCallback(() => {
    setMobileOpen(false);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "glass border-b border-[oklch(1_0_0/8%)]"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo / Name */}
        <a
          href="#"
          className="text-lg font-bold tracking-tight text-gradient-cyan"
        >
          C.R.I
        </a>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeSection === link.href.slice(1)
                  ? "text-[var(--accent-cyan)]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </a>
          ))}

          <a
            href="/Cristian-Robert-Iosef-CV.pdf"
            download
            className="ml-3"
          >
            <Button variant="outline" size="sm">
              <Download className="size-3.5" data-icon="inline-start" />
              Download CV
            </Button>
          </a>
        </div>

        {/* Mobile nav */}
        <div className="lg:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" aria-label="Open menu" />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>

            <SheetContent side="right" className="w-72 glass">
              <SheetHeader>
                <SheetTitle className="text-gradient-cyan font-bold">
                  C.R.I
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-1 px-4">
                {NAV_LINKS.map((link) => (
                  <SheetClose
                    key={link.href}
                    render={
                      <a
                        href={link.href}
                        onClick={handleMobileLinkClick}
                        className={`px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                          activeSection === link.href.slice(1)
                            ? "text-[var(--accent-cyan)] bg-[var(--glow-cyan)]"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        }`}
                      />
                    }
                  >
                    {link.label}
                  </SheetClose>
                ))}
              </div>

              <div className="mt-auto px-4 pb-4">
                <a
                  href="/Cristian-Robert-Iosef-CV.pdf"
                  download
                  className="block"
                >
                  <Button variant="outline" size="default" className="w-full">
                    <Download className="size-4" data-icon="inline-start" />
                    Download CV
                  </Button>
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
