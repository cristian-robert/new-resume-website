import { profile, skills } from "@/lib/data";
import type { SkillCategory } from "@/lib/data";
import { ScrollAnimator } from "@/components/ScrollAnimator";
import { Badge } from "@/components/ui/badge";

/** Icon mapping for skill categories — keeps the component self-contained */
const CATEGORY_ICONS: Record<string, string> = {
  "Programming Languages": "{ }",
  "Frontend": "</>",
  "Testing & Automation": "QA",
  "Backend & Frameworks": "API",
  "CI/CD & DevOps": "CI",
  "Databases": "DB",
  "Tools & Platforms": "CLI",
  "AI & LLMs": "AI",
  "Spoken Languages": "Aa",
};

function CategoryCard({ category }: { category: SkillCategory }) {
  const icon = CATEGORY_ICONS[category.name] ?? "...";
  const isEmphasized = category.emphasis;

  return (
    <div
      className={`glass noise relative flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 hover:scale-[1.03] ${
        isEmphasized
          ? "border border-[var(--accent-cyan-dim)]/40 glow-cyan"
          : "border border-transparent"
      }`}
    >
      {/* Icon badge */}
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-bold ${
          isEmphasized
            ? "bg-[var(--accent-cyan)]/15 text-[var(--accent-cyan)]"
            : "bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]"
        }`}
      >
        {icon}
      </span>

      {/* Label + skill count */}
      <div className="min-w-0">
        <p
          className={`text-sm font-semibold leading-tight ${
            isEmphasized ? "text-[var(--accent-cyan)]" : "text-foreground"
          }`}
        >
          {category.name}
        </p>
        <p className="text-xs text-[var(--muted-foreground)]">
          {category.skills.length} skill{category.skills.length !== 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
}

export function About() {
  // Filter out "Spoken Languages" from tech stack overview — it's not a tech category
  const techCategories = skills.filter((c) => c.name !== "Spoken Languages");

  return (
    <section
      id="about"
      className="relative px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
    >
      <div className="mx-auto max-w-3xl">
        {/* Section heading */}
        <ScrollAnimator animation="fadeInUp">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl">
            <span className="text-gradient-cyan">About Me</span>
          </h2>
        </ScrollAnimator>

        {/* Summary paragraphs */}
        <div className="space-y-6">
          {profile.summary.map((paragraph, i) => (
            <ScrollAnimator key={i} animation="fadeInUp" delay={100 + i * 100}>
              <p className="text-base leading-relaxed text-[var(--muted-foreground)] sm:text-lg">
                {paragraph}
              </p>
            </ScrollAnimator>
          ))}
        </div>

        {/* Tech Stack Overview */}
        <ScrollAnimator animation="fadeInUp" delay={500}>
          <div className="mt-16">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[var(--accent-cyan-dim)]/30 to-transparent" />
              <h3 className="shrink-0 text-sm font-semibold tracking-widest uppercase text-[var(--accent-cyan-dim)]">
                Tech Stack Overview
              </h3>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[var(--accent-cyan-dim)]/30 to-transparent" />
            </div>

            {/* Category grid */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {techCategories.map((category, i) => (
                <ScrollAnimator
                  key={category.name}
                  animation="fadeInUp"
                  delay={600 + i * 80}
                >
                  <CategoryCard category={category} />
                </ScrollAnimator>
              ))}
            </div>

            {/* Emphasis legend — subtle note */}
            <p className="mt-4 text-center text-xs text-[var(--muted-foreground)]/60">
              <Badge
                variant="outline"
                className="mr-1 border-[var(--accent-cyan-dim)]/40 text-[10px] text-[var(--accent-cyan-dim)]"
              >
                highlighted
              </Badge>
              categories represent core specializations
            </p>
          </div>
        </ScrollAnimator>
      </div>
    </section>
  );
}
