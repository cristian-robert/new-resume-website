import type { GitHubRepo } from "@/lib/data/types";
import { ScrollAnimator } from "@/components/ScrollAnimator";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Star, GitFork, ExternalLink, Github } from "lucide-react";

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  Java: "#b07219",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Go: "#00ADD8",
};

function relativeDate(iso: string): string {
  const now = Date.now();
  const then = new Date(iso).getTime();
  const diffMs = now - then;
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);
  if (years > 0) return `${years} year${years > 1 ? "s" : ""} ago`;
  if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`;
  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
  return "just now";
}

function RepoCard({ repo }: { repo: GitHubRepo }) {
  const langColor = repo.language ? LANGUAGE_COLORS[repo.language] ?? "#94a3b8" : null;

  return (
    <a href={repo.url} target="_blank" rel="noopener noreferrer" className="group/repo block h-full">
      <Card className="glass relative flex h-full flex-col border-l-4 border-l-transparent transition-all duration-300 hover:border-l-teal-700 hover:shadow-[0_8px_30px_rgba(15,118,110,0.15)] cursor-pointer">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-bold text-teal-800">
            <span className="min-w-0 truncate">{repo.name}</span>
            <ExternalLink className="h-4 w-4 shrink-0 text-slate-600 transition-colors duration-200 group-hover/repo:text-teal-700" />
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1">
          <p className="line-clamp-3 text-sm leading-relaxed text-slate-700">{repo.description}</p>
        </CardContent>
        <CardFooter className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-slate-200 bg-transparent text-xs text-slate-600">
          {repo.language && langColor && (
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-3 w-3 rounded-full" style={{ backgroundColor: langColor }} />
              {repo.language}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5" />
            {repo.stars}
          </span>
          <span className="flex items-center gap-1">
            <GitFork className="h-3.5 w-3.5" />
            {repo.forks}
          </span>
          <span className="ml-auto text-slate-500" suppressHydrationWarning>
            Updated {relativeDate(repo.updatedAt)}
          </span>
        </CardFooter>
      </Card>
    </a>
  );
}

interface ProjectsProps {
  repos: GitHubRepo[];
}

export function Projects({ repos }: ProjectsProps) {
  return (
    <section id="projects" className="relative px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <ScrollAnimator animation="fadeInUp">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl">
            <span className="text-gradient-accent">Projects</span>
            <a
              href="https://github.com/cristian-robert"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 inline-flex items-center gap-1.5 align-middle text-base font-medium text-slate-600 transition-colors duration-200 hover:text-teal-700"
            >
              <Github className="h-5 w-5" />
              <span className="hidden sm:inline">@cristian-robert</span>
            </a>
          </h2>
        </ScrollAnimator>

        {repos.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {repos.map((repo, index) => (
              <ScrollAnimator key={repo.name} animation="fadeInUp" delay={index * 100}>
                <RepoCard repo={repo} />
              </ScrollAnimator>
            ))}
          </div>
        ) : (
          <ScrollAnimator animation="fadeInUp">
            <div className="flex flex-col items-center gap-4 py-16 text-center">
              <Github className="h-12 w-12 text-slate-600" />
              <p className="text-lg text-slate-700">Projects loading or unavailable.</p>
              <a
                href="https://github.com/cristian-robert"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-teal-700/30 bg-teal-700/8 px-6 py-3 text-sm font-medium text-teal-800 transition-all duration-200 hover:bg-teal-700/12 cursor-pointer"
              >
                <Github className="h-4 w-4" />
                Check out my GitHub
              </a>
            </div>
          </ScrollAnimator>
        )}
      </div>
    </section>
  );
}
