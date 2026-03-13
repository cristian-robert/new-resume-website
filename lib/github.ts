import type { GitHubRepo } from "@/lib/data/types";

const GITHUB_USERNAME = "cristian-robert";
const GITHUB_API = "https://api.github.com";

export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  const res = await fetch(
    `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30&type=owner`,
    {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
      next: { revalidate: 86400 },
    }
  );

  if (!res.ok) {
    console.error(`GitHub API error: ${res.status}`);
    return [];
  }

  const data = await res.json();

  return data
    .filter((repo: Record<string, unknown>) => !repo.fork)
    .map((repo: Record<string, unknown>) => ({
      name: repo.name as string,
      description: (repo.description as string) ?? null,
      url: repo.html_url as string,
      language: (repo.language as string) ?? null,
      stars: repo.stargazers_count as number,
      forks: repo.forks_count as number,
      updatedAt: repo.updated_at as string,
    }))
    .sort((a: GitHubRepo, b: GitHubRepo) => b.stars - a.stars);
}

export { GITHUB_USERNAME };
