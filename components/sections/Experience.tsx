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
      <div
        className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 ${
          current
            ? "border-emerald-500 bg-emerald-500/20 glow-accent"
            : "border-slate-600 bg-slate-800"
        }`}
      >
        {current ? (
          <Briefcase className="h-4 w-4 text-emerald-400" />
        ) : (
          <span className="font-mono text-xs font-bold text-slate-400">
            {String(experience.length - index).padStart(2, "0")}
          </span>
        )}
      </div>
    </div>
  );
}

function ExperienceCard({ entry }: { entry: ExperienceEntry }) {
  const isCurrent = entry.current;

  return (
    <Card
      className={`glass relative border-l-4 transition-all duration-300 ${
        isCurrent ? "border-l-emerald-500 glow-accent" : "border-l-white/[0.08]"
      }`}
    >
      <CardContent className="pt-5">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <h3 className={`text-lg font-bold ${isCurrent ? "text-emerald-400" : "text-slate-100"}`}>
            {entry.company}
          </h3>
          {isCurrent && (
            <Badge className="border-emerald-500/30 bg-emerald-500/15 text-emerald-400 text-[10px] font-semibold uppercase tracking-wider">
              Current
            </Badge>
          )}
        </div>

        <p className="mb-3 text-sm font-medium text-slate-200">{entry.role}</p>

        <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {entry.period}
          </span>
          <Badge variant="outline" className="border-white/[0.08] text-[10px] text-slate-500">
            {entry.duration}
          </Badge>
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {entry.location}
          </span>
        </div>

        <p className="mb-2 text-sm leading-relaxed text-slate-400">{entry.description}</p>

        <Accordion>
          <AccordionItem className="border-b-0">
            <AccordionTrigger className="py-2 text-xs font-semibold tracking-wide uppercase hover:no-underline cursor-pointer">
              <span className={`flex items-center gap-1 ${isCurrent ? "text-emerald-600" : "text-slate-500"}`}>
                <ChevronRight className="h-3 w-3" />
                View Details
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="mb-4">
                <h4 className="mb-2 text-xs font-semibold tracking-wide uppercase text-slate-500">
                  Key Achievements
                </h4>
                <ul className="space-y-1.5">
                  {entry.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-slate-400">
                      <span
                        className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                          isCurrent ? "bg-emerald-500" : "bg-slate-600"
                        }`}
                      />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="mb-2 text-xs font-semibold tracking-wide uppercase text-slate-500">
                  Technologies
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {entry.technologies.map((tech) => (
                    <Badge
                      key={tech}
                      variant="outline"
                      className={`text-[10px] transition-colors duration-200 ${
                        isCurrent
                          ? "border-emerald-500/20 bg-emerald-500/8 text-emerald-300 hover:bg-emerald-500/15"
                          : "border-white/[0.08] bg-slate-800/40 text-slate-400 hover:bg-slate-800/70"
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
    <section id="experience" className="relative px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <ScrollAnimator animation="fadeInUp">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl">
            <span className="text-gradient-accent">Experience</span>
          </h2>
        </ScrollAnimator>

        <div className="relative">
          <div
            className="absolute top-0 left-5 h-full w-px"
            style={{
              background: "linear-gradient(to bottom, #10B981, #059669, #334155, transparent)",
            }}
          />

          <div className="space-y-8">
            {experience.map((entry, index) => (
              <ScrollAnimator key={entry.company} animation="fadeInUp" delay={index * 150}>
                <div className="relative flex items-start gap-6">
                  <div className="shrink-0">
                    <TimelineNode current={entry.current} index={index} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <ExperienceCard entry={entry} />
                  </div>
                </div>
              </ScrollAnimator>
            ))}
          </div>

          <div className="absolute bottom-0 left-5 flex -translate-x-[3px]">
            <div className="h-2 w-2 rounded-full bg-slate-600" />
          </div>
        </div>
      </div>
    </section>
  );
}
