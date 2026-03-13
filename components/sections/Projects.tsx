import { ExternalLink, Github, Star } from "lucide-react";
import type { GitHubRepo } from "@/lib/data/types";
import { curatedProjects } from "@/lib/data/projects";
import { ScrollReveal } from "@/components/ScrollReveal";

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Java: "#b07219",
  Python: "#3572A5",
  PHP: "#4F5D95",
  HTML: "#e34c26",
  CSS: "#563d7c",
};

interface ProjectsProps {
  repos: GitHubRepo[];
}

export function Projects({ repos }: ProjectsProps) {
  const featured = curatedProjects
    .map((curated) => {
      const repo = repos.find(
        (r) => r.name.toLowerCase() === curated.repo.toLowerCase()
      );
      return { curated, repo };
    })
    .filter(({ repo }) => repo !== undefined);

  const curatedNames = new Set(
    curatedProjects.map((p) => p.repo.toLowerCase())
  );
  const otherRepos = repos
    .filter((r) => !curatedNames.has(r.name.toLowerCase()))
    .slice(0, 4);

  return (
    <section id="projects" className="py-32 px-6 sm:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2
            className="font-bold text-text-primary mb-16"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
          >
            Featured <span className="text-accent">Projects</span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featured.map(({ curated, repo }, i) => (
            <ScrollReveal key={curated.repo} delay={i * 0.15}>
              <div className="group bg-surface border border-border rounded-2xl overflow-hidden hover:border-border-hover hover:shadow-[0_0_30px_var(--accent-glow)] hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                <div className="h-40 bg-gradient-to-br from-surface-hover to-surface border-b border-border flex items-center justify-center">
                  <span className="text-4xl font-bold text-text-muted/20">
                    {curated.repo.charAt(0).toUpperCase()}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    {repo!.name}
                  </h3>
                  <p className="text-sm text-text-secondary mb-4 flex-1">
                    {curated.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {curated.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 text-[10px] bg-surface-hover border border-border rounded text-text-secondary"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-xs">
                    {curated.liveUrl && (
                      <a
                        href={curated.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-accent hover:underline"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Live
                      </a>
                    )}
                    <a
                      href={repo!.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-text-muted hover:text-accent transition-colors"
                    >
                      <Github className="w-3 h-3" />
                      Source
                    </a>
                    {repo!.stars > 0 && (
                      <span className="flex items-center gap-1 text-text-muted">
                        <Star className="w-3 h-3" />
                        {repo!.stars}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}

          {otherRepos.map((repo, i) => (
            <ScrollReveal
              key={repo.name}
              delay={(featured.length + i) * 0.15}
            >
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-surface border border-border rounded-2xl p-6 hover:border-border-hover hover:shadow-[0_0_30px_var(--accent-glow)] hover:-translate-y-1 transition-all duration-300 h-full"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors">
                    {repo.name}
                  </h3>
                  <ExternalLink className="w-3.5 h-3.5 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-xs text-text-secondary mb-3 line-clamp-2">
                  {repo.description}
                </p>
                <div className="flex items-center gap-3 text-xs text-text-muted">
                  {repo.language && (
                    <span className="flex items-center gap-1">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{
                          backgroundColor:
                            LANGUAGE_COLORS[repo.language] || "#8b8b8b",
                        }}
                      />
                      {repo.language}
                    </span>
                  )}
                  {repo.stars > 0 && (
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      {repo.stars}
                    </span>
                  )}
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
