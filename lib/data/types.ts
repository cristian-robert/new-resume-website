export interface Profile {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  website: string;
  summary: string[];
}

export interface ExperienceEntry {
  company: string;
  role: string;
  location: string;
  period: string;
  duration: string;
  current: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface SkillCategory {
  name: string;
  skills: string[];
  emphasis: boolean;
}

export interface Certification {
  name: string;
}

export interface EducationEntry {
  university: string;
  degree: string;
  field: string;
  period: string;
}

export interface GitHubRepo {
  name: string;
  description: string | null;
  url: string;
  language: string | null;
  stars: number;
  forks: number;
  updatedAt: string;
}
