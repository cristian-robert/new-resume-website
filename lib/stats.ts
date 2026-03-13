import { experience, skills } from "@/lib/data";

export function getProfileStats() {
  // Years of experience — from earliest entry's start to now
  const startDates = experience.map((e) => {
    const match = e.period.match(/^(\w+)\s+(\d{4})/);
    if (!match) return new Date();
    const [, month, year] = match;
    return new Date(`${month} 1, ${year}`);
  });
  const earliest = new Date(Math.min(...startDates.map((d) => d.getTime())));
  const now = new Date();
  const yearsOfExperience = Math.floor(
    (now.getTime() - earliest.getTime()) / (365.25 * 24 * 60 * 60 * 1000)
  );

  // Companies
  const companies = experience.length;

  // Testing frameworks — from "Testing & Automation" category
  const testingCategory = skills.find((c) => c.name === "Testing & Automation");
  const testingFrameworks = testingCategory?.skills.length ?? 0;

  // Total technologies — unique skills across all categories
  const allSkills = new Set(skills.flatMap((c) => c.skills));
  const totalTechnologies = allSkills.size;

  return {
    yearsOfExperience,
    companies,
    testingFrameworks,
    totalTechnologies,
  };
}
