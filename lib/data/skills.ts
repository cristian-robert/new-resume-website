import type { SkillCategory } from "./types";

export const skills: SkillCategory[] = [
  { name: "Programming Languages", skills: ["Java", "JavaScript", "TypeScript", "PHP"], emphasis: false },
  { name: "Frontend", skills: ["React", "Next.js"], emphasis: false },
  { name: "Testing & Automation", skills: ["Selenium", "Playwright", "Cypress", "WebdriverIO", "Cucumber", "RestAssured", "TestNG", "JUnit", "Codeception", "Behat", "JMeter", "K6"], emphasis: true },
  { name: "Backend & Frameworks", skills: ["Spring Boot", "SpringData JPA"], emphasis: false },
  { name: "CI/CD & DevOps", skills: ["Jenkins", "TeamCity", "GitLab CI", "GitHub Actions", "Google Cloud", "Docker", "OpenShift"], emphasis: false },
  { name: "Databases", skills: ["PostgreSQL", "MySQL", "OracleSQL"], emphasis: false },
  { name: "Tools & Platforms", skills: ["Git", "BitBucket", "Jira", "Confluence", "Azure DevOps", "HP ALM", "TestRail", "Maven", "Postman", "Kibana"], emphasis: false },
  { name: "AI & LLMs", skills: ["Claude", "OpenAI (ChatGPT/GPT-4)", "Gemini", "Deepseek", "GitHub Copilot", "Cursor", "Augment Code", "Prompt Engineering", "MCP Integration", "AI Agent Workflows"], emphasis: true },
  { name: "Spoken Languages", skills: ["Romanian (Native)", "English (Professional Working)"], emphasis: false },
];
