import { education } from "@/lib/data";
import { ScrollAnimator } from "@/components/ScrollAnimator";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap } from "lucide-react";

export function Education() {
  return (
    <section
      id="education"
      className="relative px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
    >
      <div className="mx-auto max-w-5xl">
        {/* Section heading */}
        <ScrollAnimator animation="fadeInUp">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl">
            <span className="text-gradient-cyan">Education</span>
          </h2>
        </ScrollAnimator>

        {/* Education grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {education.map((entry, index) => (
            <ScrollAnimator
              key={entry.university}
              animation="fadeInUp"
              delay={index * 150}
            >
              <Card className="glass noise border-l-4 border-l-[var(--accent-cyan)]/50 transition-all duration-300 hover:scale-[1.02] hover:border-l-[var(--accent-cyan)]">
                <CardHeader className="flex flex-row items-start gap-3 space-y-0 pb-2">
                  <GraduationCap className="mt-0.5 h-6 w-6 shrink-0 text-[var(--accent-cyan)]" />
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-base font-bold leading-snug text-[var(--accent-cyan)]">
                      {entry.university}
                    </CardTitle>
                  </div>
                </CardHeader>

                <CardContent className="pl-12">
                  <p className="mb-3 text-sm font-medium text-foreground">
                    {entry.degree}
                    {" · "}
                    <span className="text-[var(--muted-foreground)]">
                      {entry.field}
                    </span>
                  </p>
                  <Badge
                    variant="outline"
                    className="border-[var(--accent-cyan-dim)]/40 bg-[var(--accent-cyan)]/10 text-[10px] text-[var(--accent-cyan-bright)]"
                  >
                    {entry.period}
                  </Badge>
                </CardContent>
              </Card>
            </ScrollAnimator>
          ))}
        </div>
      </div>
    </section>
  );
}
