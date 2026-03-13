import { profile, skills } from "@/lib/data";
import type { SkillCategory } from "@/lib/data";
import { getProfileStats } from "@/lib/stats";
import { ScrollAnimator } from "@/components/ScrollAnimator";
import { Badge } from "@/components/ui/badge";

const CATEGORY_ICONS: Record<string, string> = {
  "Programming Languages": "{ }",
  Frontend: "</>",
  "Testing & Automation": "QA",
  "Backend & Frameworks": "API",
  "CI/CD & DevOps": "CI",
  Databases: "DB",
  "Tools & Platforms": "CLI",
  "AI & LLMs": "AI",
  "Spoken Languages": "Aa",
};

function CategoryCard({ category }: { category: SkillCategory }) {
  const icon = CATEGORY_ICONS[category.name] ?? "...";
  const isEmphasized = category.emphasis;

  return (
    <div
      className={`glass relative flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 hover:scale-[1.03] cursor-pointer ${
        isEmphasized
          ? "border border-teal-700/25 glow-accent"
          : "border border-slate-200/80"
      }`}
    >
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-bold ${
          isEmphasized
            ? "bg-teal-700/10 text-teal-700"
            : "bg-slate-200 text-slate-700"
        }`}
      >
        {icon}
      </span>
      <div className="min-w-0">
        <p
          className={`text-sm font-semibold leading-tight ${
            isEmphasized ? "text-teal-800" : "text-slate-800"
          }`}
        >
          {category.name}
        </p>
        <p className="text-xs text-slate-600">
          {category.skills.length} skill{category.skills.length !== 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
}

function StatCard({ value, label, delay }: { value: string; label: string; delay: number }) {
  return (
    <ScrollAnimator animation="scaleIn" delay={delay}>
      <div className="flex flex-col items-center gap-1 rounded-xl border border-slate-200 bg-white/85 px-4 py-5 text-center">
        <span className="text-3xl font-bold text-teal-700 sm:text-4xl">{value}</span>
        <span className="text-xs font-medium tracking-wide text-slate-600 uppercase">{label}</span>
      </div>
    </ScrollAnimator>
  );
}

export function About() {
  const techCategories = skills.filter((c) => c.name !== "Spoken Languages");
  const stats = getProfileStats();

  return (
    <section id="about" className="relative px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <ScrollAnimator animation="fadeInUp">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl">
            <span className="text-gradient-accent">About Me</span>
          </h2>
        </ScrollAnimator>

        {/* Two-column: summary + stats */}
        <div className="mb-16 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-6">
            {profile.summary.slice(0, 2).map((paragraph, i) => (
              <ScrollAnimator key={i} animation="fadeInUp" delay={100 + i * 100}>
                <p className="text-base leading-relaxed text-slate-700 sm:text-lg">{paragraph}</p>
              </ScrollAnimator>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <StatCard value={`${stats.yearsOfExperience}+`} label="Years Experience" delay={200} />
            <StatCard value={`${stats.companies}`} label="Companies" delay={300} />
            <StatCard value={`${stats.testingFrameworks}+`} label="Test Frameworks" delay={400} />
            <StatCard value={`${stats.totalTechnologies}+`} label="Technologies" delay={500} />
          </div>
        </div>

        {/* Tech Stack Overview */}
        <ScrollAnimator animation="fadeInUp" delay={500}>
          <div>
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-teal-700/20 to-transparent" />
              <h3 className="shrink-0 text-sm font-semibold tracking-widest uppercase text-teal-700">
                Tech Stack Overview
              </h3>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-teal-700/20 to-transparent" />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {techCategories.map((category, i) => (
                <ScrollAnimator key={category.name} animation="fadeInUp" delay={600 + i * 80}>
                  <CategoryCard category={category} />
                </ScrollAnimator>
              ))}
            </div>

            <p className="mt-4 text-center text-xs text-slate-600">
              <Badge variant="outline" className="mr-1 border-teal-700/30 text-[10px] text-teal-700">
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
