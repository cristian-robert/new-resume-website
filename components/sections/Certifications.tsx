"use client";

import { certifications } from "@/lib/data";
import { ScrollAnimator } from "@/components/ScrollAnimator";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Award } from "lucide-react";

export function Certifications() {
  return (
    <section
      id="certifications"
      className="relative px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
    >
      <div className="mx-auto max-w-5xl">
        {/* Section heading */}
        <ScrollAnimator animation="fadeInUp">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl">
            <span className="text-gradient-amber">Certifications</span>
          </h2>
        </ScrollAnimator>

        {/* Certifications grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, index) => (
            <ScrollAnimator
              key={cert.name}
              animation="fadeInUp"
              delay={index * 100}
            >
              <Card className="glass noise border-l-4 border-l-[var(--accent-amber-dim)]/60 transition-all duration-300 hover:scale-[1.02] hover:border-l-[var(--accent-amber)]">
                <CardHeader className="flex flex-row items-start gap-3 space-y-0 pb-4">
                  <Award className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent-amber)]" />
                  <CardTitle className="text-sm font-medium leading-snug text-foreground">
                    {cert.name}
                  </CardTitle>
                </CardHeader>
              </Card>
            </ScrollAnimator>
          ))}
        </div>
      </div>
    </section>
  );
}
