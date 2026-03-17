"use client";

import { useState } from "react";
import { ChevronRight, MapPin, Calendar } from "lucide-react";
import { experience } from "@/lib/data";
import { ScrollReveal } from "@/components/ScrollReveal";

export function Experience() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section id="experience" className="py-32 px-6 sm:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2
            className="font-bold text-text-primary mb-16"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
          >
            Work <span className="text-accent">Experience</span>
          </h2>
        </ScrollReveal>

        <div className="relative">
          <div
            className="absolute left-[7px] top-0 bottom-0 w-px bg-border"
            aria-hidden="true"
          />

          <div className="space-y-12">
            {experience.map((entry, i) => (
              <ScrollReveal key={i} delay={i * 0.1} direction="left">
                <div className="relative pl-10">
                  <div
                    className={`absolute left-0 top-2 w-[15px] h-[15px] rounded-full border-2 ${
                      entry.current
                        ? "bg-accent border-accent"
                        : "bg-background border-border"
                    }`}
                  />

                  <div
                    className={`bg-surface border rounded-xl p-6 transition-all duration-300 hover:border-border-hover ${
                      entry.current ? "border-accent/30" : "border-border"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-text-primary">
                          {entry.role}
                        </h3>
                        <p className="text-accent text-sm font-medium">
                          {entry.company}
                        </p>
                      </div>
                      {entry.current && (
                        <span
                          className="inline-flex px-2 py-0.5 text-[10px] font-semibold uppercase bg-accent/10 text-accent rounded-full self-start"
                          style={{ letterSpacing: "0.1em" }}
                        >
                          Current
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-4 text-xs text-text-muted mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {entry.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {entry.location}
                      </span>
                    </div>

                    <p className="text-sm text-text-secondary mb-4">
                      {entry.description}
                    </p>

                    <button
                      onClick={() =>
                        setExpandedIndex(expandedIndex === i ? null : i)
                      }
                      className="flex items-center gap-1 text-xs text-text-muted hover:text-accent transition-colors"
                    >
                      <ChevronRight
                        className={`w-3 h-3 transition-transform duration-200 ${
                          expandedIndex === i ? "rotate-90" : ""
                        }`}
                      />
                      {expandedIndex === i ? "Hide" : "View"} Details
                    </button>

                    {expandedIndex === i && (
                      <div className="mt-4 pt-4 border-t border-border space-y-4">
                        <div>
                          <p
                            className="text-xs font-medium uppercase text-text-muted mb-2"
                            style={{ letterSpacing: "0.1em" }}
                          >
                            Achievements
                          </p>
                          <ul className="space-y-1.5">
                            {entry.achievements.map((a, j) => (
                              <li
                                key={j}
                                className="text-xs text-text-secondary flex items-start gap-2"
                              >
                                <span className="text-accent mt-0.5">▸</span>
                                {a}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p
                            className="text-xs font-medium uppercase text-text-muted mb-2"
                            style={{ letterSpacing: "0.1em" }}
                          >
                            Technologies
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {entry.technologies.map((t) => (
                              <span
                                key={t}
                                className="px-2 py-0.5 text-[10px] bg-surface-hover border border-border rounded text-text-secondary"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
