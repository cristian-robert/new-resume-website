import { education, certifications } from "@/lib/data";
import { ScrollReveal } from "@/components/ScrollReveal";

export function EducationCertifications() {
  return (
    <section id="education" className="py-32 px-6 sm:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2
            className="font-bold text-text-primary mb-16"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
          >
            Education & <span className="text-accent">Certifications</span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {education.map((entry, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="bg-surface border border-border rounded-xl p-5 hover:border-border-hover transition-all duration-300">
                <p
                  className="text-xs text-text-muted uppercase mb-2"
                  style={{ letterSpacing: "0.1em" }}
                >
                  {entry.period}
                </p>
                <h3 className="text-sm font-semibold text-text-primary mb-1">
                  {entry.degree} — {entry.field}
                </h3>
                <p className="text-xs text-text-secondary">
                  {entry.university}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <h3
            className="text-sm font-semibold uppercase text-text-muted mb-6"
            style={{ letterSpacing: "0.1em" }}
          >
            Certifications
          </h3>
        </ScrollReveal>
        <div className="flex flex-wrap gap-3">
          {certifications.map((cert, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs bg-surface border border-border rounded-lg text-text-secondary">
                <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                {cert.name}
              </span>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
