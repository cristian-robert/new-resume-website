export interface CuratedProject {
  repo: string;
  description: string;
  tech: string[];
  liveUrl?: string;
}

export const curatedProjects: CuratedProject[] = [
  {
    repo: "resume-website",
    description:
      "Personal portfolio site built with Next.js 16, React 19, and Tailwind CSS 4. Features WebGL shader backgrounds, GSAP scroll animations, and editorial dark theme.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP", "WebGL"],
    liveUrl: "https://cristianiosef.com",
  },
];
