"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
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

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = NAV_LINKS.map((link) => link.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  const handleMobileLinkClick = useCallback(() => {
    setMobileOpen(false);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "glass border-b border-slate-200/80"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#" className="text-lg font-bold tracking-tight text-slate-900">
          C.R.I
        </a>

        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                activeSection === link.href.slice(1)
                  ? "text-teal-700 bg-teal-50"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
              }`}
            >
              {link.label}
            </a>
          ))}
          <Button
            variant="outline"
            size="sm"
            className="ml-3 border-teal-700/30 text-teal-800 hover:bg-teal-50 hover:border-teal-700 cursor-pointer"
            render={<a href="/Cristian-Robert-Iosef-CV.pdf" download />}
          >
              <Download className="size-3.5" data-icon="inline-start" />
              Download CV
          </Button>
        </div>

        <div className="lg:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={<Button variant="ghost" size="icon" aria-label="Open menu" />}
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72 border-l border-slate-200 bg-white/95 backdrop-blur">
              <SheetHeader>
                <SheetTitle className="text-slate-900 font-bold">C.R.I</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-1 px-4">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={handleMobileLinkClick}
                    className={`px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                      activeSection === link.href.slice(1)
                        ? "text-teal-700 bg-teal-50"
                        : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <div className="mt-auto px-4 pb-4">
                <Button
                  variant="outline"
                  size="default"
                  className="w-full border-teal-700/30 text-teal-800 hover:bg-teal-50 cursor-pointer"
                  render={<a href="/Cristian-Robert-Iosef-CV.pdf" download className="block" />}
                >
                    <Download className="size-4" data-icon="inline-start" />
                    Download CV
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
