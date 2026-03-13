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
            ? "border-teal-700 bg-teal-700/12 glow-accent"
            : "border-slate-300 bg-slate-100"
        }`}
      >
        {current ? (
          <Briefcase className="h-4 w-4 text-teal-700" />
        ) : (
          <span className="font-mono text-xs font-bold text-slate-700">
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
        isCurrent ? "border-l-teal-700 glow-accent" : "border-l-slate-200"
      }`}
    >
      <CardContent className="pt-5">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <h3 className={`text-lg font-bold ${isCurrent ? "text-teal-800" : "text-slate-900"}`}>
            {entry.company}
          </h3>
          {isCurrent && (
            <Badge className="border-teal-700/30 bg-teal-700/10 text-teal-700 text-[10px] font-semibold uppercase tracking-wider">
              Current
            </Badge>
          )}
        </div>

        <p className="mb-3 text-sm font-medium text-slate-800">{entry.role}</p>

        <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {entry.period}
          </span>
          <Badge variant="outline" className="border-slate-300 text-[10px] text-slate-600">
            {entry.duration}
          </Badge>
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {entry.location}
          </span>
        </div>

        <p className="mb-2 text-sm leading-relaxed text-slate-700">{entry.description}</p>

        <Accordion>
          <AccordionItem className="border-b-0">
            <AccordionTrigger className="py-2 text-xs font-semibold tracking-wide uppercase hover:no-underline cursor-pointer">
              <span className={`flex items-center gap-1 ${isCurrent ? "text-teal-700" : "text-slate-600"}`}>
                <ChevronRight className="h-3 w-3" />
                View Details
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="mb-4">
                <h4 className="mb-2 text-xs font-semibold tracking-wide uppercase text-slate-600">
                  Key Achievements
                </h4>
                <ul className="space-y-1.5">
                  {entry.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-slate-700">
                      <span
                        className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                          isCurrent ? "bg-teal-700" : "bg-slate-500"
                        }`}
                      />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="mb-2 text-xs font-semibold tracking-wide uppercase text-slate-600">
                  Technologies
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {entry.technologies.map((tech) => (
                    <Badge
                      key={tech}
                      variant="outline"
                      className={`text-[10px] transition-colors duration-200 ${
                        isCurrent
                          ? "border-teal-700/25 bg-teal-700/8 text-teal-800 hover:bg-teal-700/12"
                          : "border-slate-300 bg-white/75 text-slate-700 hover:bg-slate-100"
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
              background: "linear-gradient(to bottom, #0f766e, #14b8a6, #94a3b8, transparent)",
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
            <div className="h-2 w-2 rounded-full bg-slate-500" />
          </div>
        </div>
      </div>
    </section>
  );
}
