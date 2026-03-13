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
    <footer className="relative mt-auto overflow-hidden bg-[oklch(0.09_0.005_260)]">
      {/* Noise texture overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
      />

      <Separator className="bg-[oklch(1_0_0/6%)]" />

      <div className="relative mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          {/* Name — left */}
          <span className="text-sm font-semibold tracking-wide text-[var(--accent-cyan)]">
            {profile.name}
          </span>

          {/* Copyright — center */}
          <span className="order-last text-xs text-[oklch(0.55_0.02_250)] sm:order-none">
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
                  "h-8 w-8 text-[oklch(0.55_0.02_250)] transition-colors duration-200 hover:bg-[var(--accent-cyan)]/10 hover:text-[var(--accent-cyan)]"
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
