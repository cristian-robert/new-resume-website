import { education, certifications } from "@/lib/data";
import { ScrollAnimator } from "@/components/ScrollAnimator";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Award } from "lucide-react";

export function EducationCertifications() {
  return (
    <section id="education" className="relative px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <ScrollAnimator animation="fadeInUp">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl">
            <span className="text-gradient-accent">Education & Certifications</span>
          </h2>
        </ScrollAnimator>

        {/* Education cards */}
        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {education.map((entry, index) => (
            <ScrollAnimator key={entry.university} animation="fadeInUp" delay={index * 150}>
              <Card className="glass border-l-4 border-l-teal-700/50 transition-all duration-300 hover:border-l-teal-700">
                <CardHeader className="flex flex-row items-start gap-3 space-y-0 pb-2">
                  <GraduationCap className="mt-0.5 h-6 w-6 shrink-0 text-teal-700" />
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-base font-bold leading-snug text-teal-800">
                      {entry.university}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pl-12">
                  <p className="mb-3 text-sm font-medium text-slate-800">
                    {entry.degree}
                    {" · "}
                    <span className="text-slate-700">{entry.field}</span>
                  </p>
                  <Badge
                    variant="outline"
                    className="border-teal-700/30 bg-teal-700/8 text-[10px] text-teal-800"
                  >
                    {entry.period}
                  </Badge>
                </CardContent>
              </Card>
            </ScrollAnimator>
          ))}
        </div>

        {/* Certifications as compact badges */}
        <ScrollAnimator animation="fadeInUp" delay={300}>
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-teal-700/20 to-transparent" />
              <h3 className="shrink-0 text-sm font-semibold tracking-widest uppercase text-teal-700">
                Certifications
              </h3>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-teal-700/20 to-transparent" />
            </div>
            <div className="flex flex-wrap gap-2">
              {certifications.map((cert) => (
                <Badge
                  key={cert.name}
                  variant="outline"
                  className="border-teal-700/25 bg-teal-700/8 px-3 py-1.5 text-xs text-teal-800 transition-colors hover:bg-teal-700/15"
                >
                  <Award className="mr-1.5 h-3 w-3" />
                  {cert.name}
                </Badge>
              ))}
            </div>
          </div>
        </ScrollAnimator>
      </div>
    </section>
  );
}
