"use client";

import { experience } from "@/lib/data";
import type { ExperienceEntry } from "@/lib/data";
import { ScrollAnimator } from "@/components/ScrollAnimator";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MapPin, Calendar, Briefcase, ChevronRight } from "lucide-react";

function TimelineNode({ current, index }: { current: boolean; index: number }) {
  return (
    <div className="relative flex flex-col items-center">
      {/* Node dot */}
      <div
        className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 ${
          current
            ? "border-[var(--accent-cyan)] bg-[var(--accent-cyan)]/20 glow-cyan"
            : "border-[var(--accent-amber-dim)]/50 bg-[var(--accent-amber)]/10"
        }`}
      >
        {current ? (
          <Briefcase className="h-4 w-4 text-[var(--accent-cyan)]" />
        ) : (
          <span
            className={`font-mono text-xs font-bold ${
              index <= 1
                ? "text-[var(--accent-amber)]"
                : "text-[var(--muted-foreground)]"
            }`}
          >
            {String(experience.length - index).padStart(2, "0")}
          </span>
        )}
      </div>
      {/* Pulsing ring for current role */}
      {current && (
        <div className="absolute top-0 left-1/2 h-10 w-10 -translate-x-1/2 animate-pulse-glow rounded-full border border-[var(--accent-cyan)]/40" />
      )}
    </div>
  );
}

function ExperienceCard({ entry }: { entry: ExperienceEntry }) {
  const isCurrent = entry.current;

  return (
    <Card
      className={`glass noise relative border-l-4 transition-all duration-300 hover:scale-[1.01] ${
        isCurrent
          ? "border-l-[var(--accent-cyan)] glow-cyan"
          : "border-l-[var(--accent-amber-dim)]/40"
      }`}
    >
      <CardContent className="pt-5">
        {/* Header: Company + Current badge */}
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <h3
            className={`text-lg font-bold ${
              isCurrent
                ? "text-[var(--accent-cyan)]"
                : "text-[var(--accent-amber)]"
            }`}
          >
            {entry.company}
          </h3>
          {isCurrent && (
            <Badge className="border-[var(--accent-cyan)]/30 bg-[var(--accent-cyan)]/15 text-[var(--accent-cyan)] glow-cyan text-[10px] font-semibold uppercase tracking-wider">
              Current
            </Badge>
          )}
        </div>

        {/* Role */}
        <p className="mb-3 text-sm font-medium text-foreground">
          {entry.role}
        </p>

        {/* Metadata row */}
        <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--muted-foreground)]">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {entry.period}
          </span>
          <Badge
            variant="outline"
            className="border-[var(--border)] text-[10px] text-[var(--muted-foreground)]"
          >
            {entry.duration}
          </Badge>
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {entry.location}
          </span>
        </div>

        {/* Description */}
        <p className="mb-2 text-sm leading-relaxed text-[var(--muted-foreground)]">
          {entry.description}
        </p>

        {/* Expandable details */}
        <Accordion>
          <AccordionItem className="border-b-0">
            <AccordionTrigger className="py-2 text-xs font-semibold tracking-wide uppercase hover:no-underline">
              <span
                className={`flex items-center gap-1 ${
                  isCurrent
                    ? "text-[var(--accent-cyan-dim)]"
                    : "text-[var(--accent-amber-dim)]"
                }`}
              >
                <ChevronRight className="h-3 w-3" />
                View Details
              </span>
            </AccordionTrigger>
            <AccordionContent>
              {/* Achievements */}
              <div className="mb-4">
                <h4 className="mb-2 text-xs font-semibold tracking-wide uppercase text-[var(--muted-foreground)]">
                  Key Achievements
                </h4>
                <ul className="space-y-1.5">
                  {entry.achievements.map((achievement, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm leading-relaxed text-[var(--muted-foreground)]"
                    >
                      <span
                        className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                          isCurrent
                            ? "bg-[var(--accent-cyan)]"
                            : "bg-[var(--accent-amber-dim)]"
                        }`}
                      />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div>
                <h4 className="mb-2 text-xs font-semibold tracking-wide uppercase text-[var(--muted-foreground)]">
                  Technologies
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {entry.technologies.map((tech) => (
                    <Badge
                      key={tech}
                      variant="outline"
                      className={`text-[10px] transition-colors duration-200 ${
                        isCurrent
                          ? "border-[var(--accent-cyan-dim)]/30 bg-[var(--accent-cyan)]/8 text-[var(--accent-cyan-bright)] hover:bg-[var(--accent-cyan)]/15"
                          : "border-[var(--border)] bg-[var(--muted)]/40 text-[var(--muted-foreground)] hover:bg-[var(--muted)]/70"
                      }`}
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}

export function Experience() {
  return (
    <section
      id="experience"
      className="relative px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
    >
      <div className="mx-auto max-w-4xl">
        {/* Section heading */}
        <ScrollAnimator animation="fadeInUp">
          <h2 className="mb-16 text-center text-3xl font-bold tracking-tight sm:text-4xl">
            <span className="text-gradient-cyan">Experience</span>
          </h2>
        </ScrollAnimator>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical timeline line */}
          <div
            className="absolute top-0 left-5 h-full w-px lg:left-1/2 lg:-translate-x-px"
            style={{
              background:
                "linear-gradient(to bottom, var(--accent-cyan), var(--accent-cyan-dim), var(--accent-amber-dim), transparent)",
            }}
          />

          {/* Timeline entries */}
          <div className="space-y-12">
            {experience.map((entry, index) => {
              const isEven = index % 2 === 0;

              return (
                <ScrollAnimator
                  key={entry.company}
                  animation="fadeInLeft"
                  delay={index * 150}
                >
                  <div className="relative flex items-start gap-6 lg:gap-0">
                    {/* Mobile + Desktop layout: node on the left (mobile) or center (desktop) */}

                    {/* Mobile: node on left edge */}
                    <div className="shrink-0 lg:hidden">
                      <TimelineNode current={entry.current} index={index} />
                    </div>

                    {/* Mobile: card takes remaining space */}
                    <div className="min-w-0 flex-1 lg:hidden">
                      <ExperienceCard entry={entry} />
                    </div>

                    {/* Desktop: alternating layout */}
                    {/* Left column */}
                    <div className="hidden w-[calc(50%-28px)] lg:block">
                      {isEven ? (
                        <ExperienceCard entry={entry} />
                      ) : (
                        <div />
                      )}
                    </div>

                    {/* Center node */}
                    <div className="hidden shrink-0 lg:flex lg:w-14 lg:justify-center">
                      <TimelineNode current={entry.current} index={index} />
                    </div>

                    {/* Right column */}
                    <div className="hidden w-[calc(50%-28px)] lg:block">
                      {isEven ? (
                        <div />
                      ) : (
                        <ExperienceCard entry={entry} />
                      )}
                    </div>
                  </div>
                </ScrollAnimator>
              );
            })}
          </div>

          {/* Timeline end marker */}
          <div className="absolute bottom-0 left-5 flex -translate-x-[3px] lg:left-1/2 lg:-translate-x-[3px]">
            <div className="h-2 w-2 rounded-full bg-[var(--accent-amber-dim)]/40" />
          </div>
        </div>
      </div>
    </section>
  );
}
