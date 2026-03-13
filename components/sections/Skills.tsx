"use client";

import { skills } from "@/lib/data";
import type { SkillCategory } from "@/lib/data";
import { ScrollAnimator } from "@/components/ScrollAnimator";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/** Accent color palette cycled across non-emphasis categories */
const BORDER_COLORS = [
  "border-l-[var(--accent-amber)]",
  "border-l-[var(--chart-3)]",
  "border-l-[var(--chart-4)]",
  "border-l-[var(--chart-5)]",
  "border-l-[var(--accent-amber-dim)]",
  "border-l-[var(--chart-2)]",
  "border-l-[var(--chart-1)]",
] as const;

function SkillCard({
  category,
  colorIndex,
}: {
  category: SkillCategory;
  colorIndex: number;
}) {
  const isEmphasized = category.emphasis;
  const borderColor = BORDER_COLORS[colorIndex % BORDER_COLORS.length];

  return (
    <Card
      className={`glass noise relative border-l-4 transition-all duration-300 hover:scale-[1.02] ${
        isEmphasized
          ? "border-l-[var(--accent-cyan)] glow-cyan"
          : borderColor
      }`}
    >
      <CardHeader>
        <CardTitle
          className={`text-lg font-bold ${
            isEmphasized
              ? "text-[var(--accent-cyan)]"
              : "text-foreground"
          }`}
        >
          {category.name}
          {isEmphasized && (
            <span className="ml-2 inline-block h-2 w-2 animate-pulse-glow rounded-full bg-[var(--accent-cyan)]" />
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
                  ? "border-[var(--accent-cyan-dim)]/40 bg-[var(--accent-cyan)]/10 text-[var(--accent-cyan-bright)] hover:bg-[var(--accent-cyan)]/20"
                  : "border-[var(--border)] bg-[var(--muted)]/40 text-[var(--muted-foreground)] hover:bg-[var(--muted)]/70 hover:text-foreground"
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
  // Track a separate color index for non-emphasis cards
  let colorIndex = 0;

  return (
    <section
      id="skills"
      className="relative px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
    >
      <div className="mx-auto max-w-5xl">
        {/* Section heading */}
        <ScrollAnimator animation="fadeInUp">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl">
            <span className="text-gradient-cyan">Skills & Expertise</span>
          </h2>
        </ScrollAnimator>

        {/* Skills grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((category, index) => {
            const currentColorIndex = category.emphasis ? 0 : colorIndex++;

            return (
              <ScrollAnimator
                key={category.name}
                animation="fadeInUp"
                delay={index * 100}
              >
                <SkillCard
                  category={category}
                  colorIndex={currentColorIndex}
                />
              </ScrollAnimator>
            );
          })}
        </div>
      </div>
    </section>
  );
}
