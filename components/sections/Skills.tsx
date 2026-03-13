import { skills } from "@/lib/data";
import { ScrollReveal } from "@/components/ScrollReveal";

export function Skills() {
  return (
    <section id="skills" className="py-32 px-6 sm:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2
            className="font-bold text-text-primary mb-16"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
          >
            My <span className="text-accent">Skills</span>
          </h2>
        </ScrollReveal>

        <div className="space-y-12">
          {skills.map((category, i) => (
            <ScrollReveal key={category.name} delay={i * 0.1}>
              <h3
                className="text-sm font-semibold uppercase text-text-muted mb-4"
                style={{ letterSpacing: "0.1em" }}
              >
                {category.name}
                {category.emphasis && (
                  <span className="ml-2 text-accent">●</span>
                )}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-xs bg-surface border border-border rounded-lg text-text-secondary hover:bg-surface-hover transition-colors duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
