# Test Patterns

## Key Pages

| Page | Path | Auth Required | Key Elements |
|------|------|--------------|--------------|
| Home (single page) | / | No | Nav, Hero, Skills, Experience, Certifications, Education, GitHub Projects, Contact, Footer |

## Sections to Verify

| Section | Expected Content | Data Source |
|---------|-----------------|-------------|
| Hero | Name, title, summary, contact links | `lib/data/profile.ts` |
| Skills | Tech stack grouped by category | `lib/data/skills.ts` |
| Experience | Timeline of 4 roles (Deutsche Bank, Twispay, 2Checkout, eMAG, Ubisoft) | `lib/data/experience.ts` |
| Certifications | 4 certifications | `lib/data/certifications.ts` |
| Education | 2 degrees (Master's + Bachelor's) | `lib/data/education.ts` |
| GitHub Projects | Public repos from GitHub | Build-time fetch |
| Contact | Email, phone, LinkedIn, personal site | `lib/data/profile.ts` |

## Common UI Elements

- Navigation bar (all viewports)
- Section headings
- Smooth scroll anchors
- Dark/light mode (if implemented)
- Footer with social links

## Responsive Breakpoints

- Mobile: 375px
- Tablet: 768px
- Desktop: 1280px
