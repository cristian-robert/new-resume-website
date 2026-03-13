---
name: cv-parser
description: Parse a PDF CV/resume and generate structured markdown data files for a portfolio website. Use this skill whenever the user updates docs/Profile.pdf, asks to regenerate CV data, mentions syncing CV data, wants to update the portfolio's content from the resume, or says things like "parse my CV", "update resume data", "regenerate profile data", or "refresh content from PDF". Also use when setting up the data layer for the first time.
---

# CV Parser

Read `docs/Profile.pdf` and generate structured markdown files in `lib/data/` that serve as the data layer for the portfolio website. These `.md` files are the single source of truth — components read them to render content.

## When to Use

- First-time setup of the portfolio data layer
- User updates `docs/Profile.pdf` and needs data refreshed
- User asks to parse, extract, or regenerate CV data
- Data files are missing or out of sync with the PDF

## Process

### Step 1: Read the PDF

Read `docs/Profile.pdf` using the Read tool.

### Step 2: Extract and Generate Markdown Files

Generate one `.md` file per section in `lib/data/`. Each file uses YAML frontmatter for structured fields and markdown body for rich text content. This format is easy for both humans to verify and AI agents to parse when building components.

Generate these files:

---

#### `lib/data/profile.md`

The hero section data — name, title, location, and professional summary.

```markdown
---
name: "Full Name"
title: "Professional Title from CV headline"
location: "City, Region, Country"
email: "email@example.com"
phone: "+1234567890"
linkedin: "https://linkedin.com/in/..."
website: "https://..."
---

First summary paragraph extracted verbatim from CV.

Second summary paragraph if present.

Additional paragraphs as they appear.
```

---

#### `lib/data/skills.md`

All skills grouped into logical categories for a portfolio website. Group by domain, not by how the CV lists them — reorganize into categories that make sense for showcasing to recruiters and hiring managers.

```markdown
# Skills

## Category Name
- Skill 1
- Skill 2
- Skill 3

## Another Category
- Skill A
- Skill B
```

Suggested categories (adapt based on CV content):
- Programming Languages
- Frontend
- Testing & Automation
- CI/CD & DevOps
- Databases
- Tools & Platforms
- AI & LLMs
- Spoken Languages

---

#### `lib/data/experience.md`

Work history, ordered most recent first. Each role is a section with frontmatter-style metadata in a consistent format.

```markdown
# Experience

## Company Name
**Role:** Job Title
**Location:** City, Country
**Period:** Month Year - Month Year (Duration)

Description paragraph(s) extracted from CV.

### Achievements
- Achievement or responsibility 1
- Achievement or responsibility 2

### Technologies
- Tech 1, Tech 2, Tech 3
```

Repeat the `## Company Name` block for each role. Preserve all achievements and descriptions verbatim from the CV — never summarize or omit.

---

#### `lib/data/certifications.md`

```markdown
# Certifications

- Certification Name 1
- Certification Name 2
```

---

#### `lib/data/education.md`

```markdown
# Education

## Institution Name
**Degree:** Degree Type
**Field:** Field of Study
**Period:** Start Year - End Year

## Another Institution
**Degree:** Degree Type
**Field:** Field of Study
**Period:** Start Year - End Year
```

---

### Step 3: Verify Completeness

After generating all files, do a completeness check:

1. **Every section from the PDF is represented** — no data left behind
2. **Every role in Experience has achievements AND technologies** — these are critical for the portfolio
3. **Skills are properly categorized** — not dumped in a single list
4. **Dates and durations are accurate**
5. **Contact info is complete**

Report a summary:

```
CV Parser Summary:
- Profile: ✓ (name, title, location, N paragraphs summary)
- Skills: ✓ (N categories, N total skills)
- Experience: ✓ (N roles)
- Certifications: ✓ (N items)
- Education: ✓ (N degrees)
```

## Rules

- Extract ALL data from the PDF — completeness over brevity
- Preserve exact text for achievements, descriptions, and summaries — do not rephrase
- Keep experiences ordered most recent first
- If a field is not present in the CV, omit it rather than guessing
- Skills should be deduplicated — if a skill appears in multiple CV sections, list it once in the most relevant category
- The markdown files are the source of truth — components will be built from these, so structure matters
