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
          ? "border-l-teal-700 glow-accent"
          : "border-l-slate-200"
      }`}
    >
      <CardHeader>
        <CardTitle className={`text-lg font-bold ${isEmphasized ? "text-teal-800" : "text-slate-900"}`}>
          {category.name}
          {isEmphasized && (
            <Badge className="ml-2 border-teal-700/30 bg-teal-700/10 text-[10px] text-teal-700">
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
                  ? "border-teal-700/25 bg-teal-700/10 text-teal-800 hover:bg-teal-700/15"
                  : "border-slate-300 bg-white/70 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
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
