import { skills } from "@/lib/data";
import type { SkillCategory } from "@/lib/data";
import { ScrollAnimator } from "@/components/ScrollAnimator";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function SkillCard({ category }: { category: SkillCategory }) {
  const isEmphasized = category.emphasis;

  return (
    <Card
      className={`glass relative border-l-4 transition-all duration-300 hover:scale-[1.02] cursor-pointer ${
        isEmphasized
          ? "border-l-emerald-500 glow-accent"
          : "border-l-white/[0.08]"
      }`}
    >
      <CardHeader>
        <CardTitle className={`text-lg font-bold ${isEmphasized ? "text-emerald-400" : "text-slate-100"}`}>
          {category.name}
          {isEmphasized && (
            <Badge className="ml-2 border-emerald-500/30 bg-emerald-500/15 text-[10px] text-emerald-400">
              Core
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {category.skills.map((skill) => (
            <Badge
              key={skill}
              variant="outline"
              className={`text-xs transition-colors duration-200 ${
                isEmphasized
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20"
                  : "border-white/[0.08] bg-slate-800/40 text-slate-400 hover:bg-slate-800/70 hover:text-slate-200"
              }`}
            >
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <ScrollAnimator animation="fadeInUp">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl">
            <span className="text-gradient-accent">Skills & Expertise</span>
          </h2>
        </ScrollAnimator>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((category, index) => (
            <ScrollAnimator key={category.name} animation="fadeInUp" delay={index * 100}>
              <div className={category.emphasis ? "lg:col-span-2" : ""}>
                <SkillCard category={category} />
              </div>
            </ScrollAnimator>
          ))}
        </div>
      </div>
    </section>
  );
}
