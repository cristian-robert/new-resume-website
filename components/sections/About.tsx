import { profile, skills } from "@/lib/data";
import { ScrollReveal } from "@/components/ScrollReveal";

const QA_DOMAINS = [
  "E2E Testing",
  "API Testing",
  "Performance Testing",
  "BDD/TDD",
  "CI/CD Integration",
  "Cloud Testing",
];

const STRENGTHS = [
  "Framework architecture from scratch",
  "Multi-stack automation (Java + TypeScript)",
  "Enterprise-grade test infrastructure",
];

export function About() {
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
          <ScrollReveal className="lg:col-span-2 md:col-span-2 bg-surface border border-border rounded-2xl p-6 hover:border-border-hover hover:shadow-[0_0_30px_var(--accent-glow)] transition-all duration-300">
            <p className="text-xs font-medium uppercase text-text-muted mb-4" style={{ letterSpacing: "0.1em" }}>
              About
            </p>
            <p className="text-text-secondary leading-relaxed">
              {profile.summary[0]}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="lg:col-span-2 bg-surface border border-border rounded-2xl p-6 hover:border-border-hover hover:shadow-[0_0_30px_var(--accent-glow)] transition-all duration-300">
            <p className="text-xs font-medium uppercase text-text-muted mb-4" style={{ letterSpacing: "0.1em" }}>
              Tech Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {topTech.map((tech) => (
                <span key={tech} className="px-3 py-1 text-xs bg-surface-hover border border-border rounded-lg text-text-secondary">
                  {tech}
                </span>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="lg:col-span-1 bg-surface border border-border rounded-2xl p-6 hover:border-border-hover hover:shadow-[0_0_30px_var(--accent-glow)] transition-all duration-300">
            <p className="text-xs font-medium uppercase text-text-muted mb-4" style={{ letterSpacing: "0.1em" }}>
              Domains
            </p>
            <div className="flex flex-col gap-2">
              {QA_DOMAINS.map((d) => (
                <span key={d} className="text-xs text-text-secondary">{d}</span>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3} className="bg-surface border border-border rounded-2xl p-6 hover:border-border-hover hover:shadow-[0_0_30px_var(--accent-glow)] transition-all duration-300">
            <p className="text-xs font-medium uppercase text-text-muted mb-4" style={{ letterSpacing: "0.1em" }}>
              Location
            </p>
            <p className="text-2xl mb-1">🇷🇴</p>
            <p className="text-sm text-text-secondary">{profile.location}</p>
          </ScrollReveal>

          <ScrollReveal delay={0.4} className="lg:col-span-2 bg-surface border border-border rounded-2xl p-6 hover:border-border-hover hover:shadow-[0_0_30px_var(--accent-glow)] transition-all duration-300">
            <p className="text-xs font-medium uppercase text-text-muted mb-4" style={{ letterSpacing: "0.1em" }}>
              Strengths
            </p>
            <ul className="space-y-2">
              {STRENGTHS.map((s) => (
                <li key={s} className="text-sm text-text-secondary flex items-start gap-2">
                  <span className="text-accent mt-1 text-xs">▸</span>
                  {s}
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={0.5} className="lg:col-span-2 bg-surface border border-border rounded-2xl p-6 hover:border-border-hover hover:shadow-[0_0_30px_var(--accent-glow)] transition-all duration-300 flex flex-col justify-between">
            <p className="text-xs font-medium uppercase text-text-muted mb-4" style={{ letterSpacing: "0.1em" }}>
              Contact
            </p>
            <a href={`mailto:${profile.email}`} className="text-accent hover:underline text-sm break-all">
              {profile.email}
            </a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
