"use client";

import { profile } from "@/lib/data";
import { GITHUB_USERNAME } from "@/lib/github";
import { Separator } from "@/components/ui/separator";
import { buttonVariants } from "@/components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const socialLinks = [
  {
    label: "GitHub",
    href: `https://github.com/${GITHUB_USERNAME}`,
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: profile.linkedin,
    icon: Linkedin,
  },
  {
    label: "Email",
    href: `mailto:${profile.email}`,
    icon: Mail,
  },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto overflow-hidden bg-white/85 backdrop-blur">
      {/* Top gradient border */}
      <div className="h-px bg-gradient-to-r from-transparent via-teal-700/30 to-transparent" />

      <Separator className="bg-slate-200" />

      <div className="relative mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          {/* Name — left */}
          <span className="text-sm font-semibold tracking-wide text-teal-800">
            {profile.name}
          </span>

          {/* Copyright — center */}
          <span className="order-last text-xs text-slate-600 sm:order-none" suppressHydrationWarning>
            &copy; {year} Cristian-Robert Iosef
          </span>

          {/* Social icon buttons — right */}
          <div className="flex items-center gap-1">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel={
                  href.startsWith("mailto:") ? undefined : "noopener noreferrer"
                }
                aria-label={label}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "h-8 w-8 text-slate-600 transition-colors duration-200 hover:bg-teal-700/10 hover:text-teal-700 cursor-pointer"
                )}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
