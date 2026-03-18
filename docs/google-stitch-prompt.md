# Google Stitch Prompt

Use the prompt below in Google Stitch to generate a portfolio app inspired by this project:

```text
Build a responsive single-page portfolio/resume website for a senior QA automation engineer. The app should feel premium, technical, and polished, with a dark developer-focused aesthetic and subtle motion.

Design direction:
- Use a dark theme with these core colors:
  - background: #0C0C0E
  - surface/card: #141416
  - surface hover: #1C1C1F
  - text primary: #F5F5F5
  - text secondary: #A1A1A6
  - muted text: #5A5A5E
  - accent: #F59E0B
- Use a monospace font like JetBrains Mono across the app.
- Add a subtle dotted grid or patterned background so the page feels more “engineer portfolio” than “corporate template”.
- Keep the layout spacious, modern, and editorial, with rounded cards, thin borders, and soft amber glow on hover.

Structure the app as a smooth-scrolling landing page with these sections in order:

1. Hero section
- Full-screen first section.
- Large name headline.
- Small uppercase role label above the name.
- One-line value proposition under the headline.
- A horizontal row of 4 stats such as years of experience, industries, frameworks/tools, and companies worked with.
- Primary CTA button to download a CV/resume.
- Secondary circular icon buttons for GitHub, LinkedIn, and email.
- Add a subtle animated/downward cue at the bottom to suggest scrolling.

2. Floating navigation
- On desktop, add a floating pill navigation near the bottom center.
- On mobile, replace it with a floating circular menu button that opens a full-screen overlay menu.
- Highlight the active section while scrolling.

3. Short profile / about section
- Use a responsive card grid.
- Include:
  - About card with a professional summary
  - Tech stack card with tag chips
  - QA/testing domains card
  - Location card
  - Strengths card with short bullet points
  - Contact/email card

4. Skills section
- Present grouped technical skills as clean chips, badges, or categorized rows.
- Make the section easy to scan quickly.

5. Experience section
- Show a clear career timeline or stacked experience cards.
- Each role should include company, title, period, short summary, and notable achievements.
- Include technologies used for each role as tags.

6. Projects section
- Split this into two parts:
  - featured projects with richer cards, descriptions, tech tags, and links
  - additional GitHub repositories with lighter cards that show repo name, short description, language, and stars
- Make project cards feel interactive with hover elevation or glow.

7. Education and certifications section
- Group education and certifications together in a clean, structured layout.
- Use expandable rows, cards, or a tidy two-column layout.

8. Contact section
- End with a strong CTA inviting recruiters or collaborators to get in touch.
- Include email, LinkedIn, and GitHub.

9. Footer
- Minimal footer with name and a short closing line.

Interaction and motion:
- Use smooth scrolling if supported.
- Add subtle reveal/fade/slide-up animations as sections enter the viewport.
- Buttons and cards should have tasteful hover feedback.
- Respect reduced-motion preferences and keep the motion elegant rather than flashy.

Responsive behavior:
- Prioritize a polished desktop layout, but make the mobile version feel intentionally designed.
- On mobile, simplify heavy visual effects while preserving the same brand identity.

Content style:
- Tone should be concise, confident, and technical.
- Position the person as a senior QA automation engineer with expertise in test automation, API testing, CI/CD, enterprise quality engineering, and modern tools like Playwright, Selenium, Java, and TypeScript.

Technical guidance:
- Prefer a clean component-based implementation.
- Use reusable card, badge, button, and section components.
- If live GitHub data is possible, include a project feed sourced from public repositories; otherwise use realistic placeholder data with the same structure.

Important: avoid generic startup-landing-page visuals. This should look like a premium personal engineering portfolio for someone in software quality and automation.
```
