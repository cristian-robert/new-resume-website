"use client";

import { Github, Linkedin } from "lucide-react";
import { toast } from "sonner";
import { profile } from "@/lib/data";
import { GITHUB_USERNAME } from "@/lib/github";
import { MagneticButton } from "@/components/MagneticButton";
import { ScrollReveal } from "@/components/ScrollReveal";

const SOCIAL_LINKS = [
  {
    icon: Github,
    href: `https://github.com/${GITHUB_USERNAME}`,
    label: "GitHub",
  },
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
            Interested in working together or have a question? Reach out
            directly.
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
