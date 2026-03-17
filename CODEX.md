# Resume Portfolio Website

## Project Overview

Single-page interactive portfolio/resume website for Cristian-Robert Iosef. Showcases professional experience, skills, certifications, education, and public GitHub projects. Data is statically typed in TypeScript files, generated from `docs/Profile.pdf` via the local `cv-parser` skill.

## Tech Stack

- **Framework:** Next.js 16, React 19, TypeScript (strict)
- **Styling:** Tailwind CSS 4, shadcn/ui
- **Data:** Static TypeScript files in `lib/data/`, GitHub API (public repos at build time)
- **Deployment:** Vercel
- **Package Manager:** npm

## Directory Structure

```text
resume-website/
├── app/                # Next.js App Router (single page + layout)
├── components/         # React components (sections, UI)
├── lib/                # Utilities and data
├── public/             # Static assets
├── docs/               # Source CV PDF and planning docs
├── .claude/            # Claude-oriented local setup
└── .codex/             # Codex-oriented local setup
    ├── plans/          # Local implementation plans
    ├── agents/         # Agent protocols and test patterns
    ├── rules/          # Domain-specific rules
    └── skills/         # Project-local skills
```

## Core Principles

1. **TYPE SAFETY** - All data typed, no `any`, strict mode
2. **KISS** - Simple, readable solutions; avoid over-engineering
3. **STATIC FIRST** - CV data is static TypeScript; GitHub repos fetched at build time
4. **YAGNI** - Build what is needed now

## Development Workflow (Codex)

1. Create a plan in `.codex/plans/<date>-<feature>.md`
2. Break work into phases with checkboxes
3. Implement sequentially, keeping scope tight
4. Run validation (`npm run lint`, `npm run build`) before finishing
5. Commit with conventional commit messages

## Setup & Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint
```

## Code Conventions

- TypeScript strict mode; no `any`
- Functional components and hooks
- Keep comments minimal and only for non-obvious logic
- Use `@/` path alias for imports from project root
- Tailwind CSS for styling; avoid inline styles and CSS modules
- Keep content in `lib/data/`; avoid hardcoding copy in components

## Skill Loading (Codex)

Load matching skills from `AGENTS.md` when triggers apply:

| Trigger | Skill | When |
|---------|-------|------|
| Brainstorming or behavior design | `brainstorming` | Before non-trivial creative/behavior changes |
| New frontend UI | `frontend-design` | Building pages/components with strong visual quality |
| Next.js patterns | `nextjs-app-router-patterns` | App Router, server components, SSG/SSR |
| shadcn/ui work | `shadcn-ui` | Installing/using shadcn components |
| React/Next performance | `vercel-react-best-practices` | Refactors or perf-focused work |
| UI review/a11y checks | `web-design-guidelines` | Reviewing design/UX/accessibility |
| CV data regeneration | `cv-parser` | `docs/Profile.pdf` changed or data refresh requested |
| Multi-source research | `research` | Broader web synthesis |
| Quick web lookup | `search` | Focused lookup on one topic |

### Design Skill Preference

Before significant UI creation, align on one path:

1. `frontend-design` - full component/page implementation
2. `ui-ux-pro-max` - design direction and exploration
3. `web-design-guidelines` - review-only/audit mode

## Agent Protocols

Project-local protocols live in `.codex/agents/`.

### Tester-Agent Protocol

- **When:** After UI changes, before claiming done
- **Where:** `.codex/agents/tester-agent/AGENT.md`
- **Patterns:** `.codex/agents/tester-agent/test-patterns.md`
- **Execution:** Use Playwright/browser tooling for checks and responsive verification

## Cross-Cutting Recipes

- **New section/feature:** `brainstorming` -> plan doc -> implement -> tester-agent verification -> lint/build -> commit
- **Bug fixing:** reproduce -> isolate root cause -> fix -> tester-agent verification -> commit
- **CV data update:** update `docs/Profile.pdf` -> run `cv-parser` process -> verify `lib/data/*` -> commit
- **Unfamiliar library APIs:** check docs/tooling first (`context7` if available), then implement

## Git Workflow

- Use conventional commits (`feat:`, `fix:`, `refactor:`, `docs:`, `chore:`)
- Use feature branches with `codex/` prefix
- Avoid committing directly to `main`
