<!-- Loads automatically for app/**, components/**, lib/** -->

## Frontend Development

Load these skills when working in this domain:
- `/nextjs-app-router-patterns` — App Router, layouts, SSG
- `/shadcn-ui` — Component installation and usage
- `/vercel-react-best-practices` — React performance patterns

Conventions:
- All components in `components/` — sections in `components/sections/`, UI in `components/ui/`
- Use `@/` path alias for all imports
- Tailwind CSS for styling — no CSS modules or inline styles
- shadcn/ui for base components — customize via Tailwind
- Static data imported from `lib/data/` — never hardcode content in components
- GitHub repos fetched at build time using Next.js SSG (`fetch` in server components or `generateStaticParams`)

MCP tools available:
- `context7` — Look up Next.js, React, Tailwind docs before using unfamiliar APIs
- `shadcn` — Search components, get examples, audit checklist
