## New Page: AI CRM Case Study

Create a dedicated case study page showcasing the custom AI CRM with multiple autonomous AI agents (LinkedIn lead gen, enrichment, calling, email, SMS), embedding the provided Loom video.

### Route
- Path: `/case-studies/ai-crm-multi-agent`
- File: `src/pages/resources/AiCrmCaseStudy.tsx`
- Register lazy import + `<Route>` in `src/App.tsx`
- Add link from `src/pages/resources/CaseStudies.tsx` and homepage/Resources where relevant

### Page Structure (matches provided copy)
1. **Hero** — Title "AI CRM Powered by Autonomous AI Agents", subhead, two CTAs ("Book a Demo" → `/book-appointment`, "Talk to an AI Agent" → triggers existing voice call / links to `/demo`)
2. **Loom Video Embed** — Responsive 16:9-ish wrapper (64.6% padding-bottom) with the provided iframe `https://www.loom.com/embed/b8b6ca431d3b47f1972f191ca82ad90f`, lazy-loaded
3. **The Problem** — Bullet list of pain points
4. **The Solution** — Intro to multi-agent architecture
5. **Multi-Agent AI Architecture** — 5 cards (LinkedIn Lead Gen, Enrichment, Calling, Email, SMS) each with icon + capabilities/features
6. **Workflow** — 7-step numbered flow (scrape → enrich → personalize → call → email/SMS → book → sync)
7. **Key Features** — Autonomous, Hyper-personalized, Omnichannel, AI Booking, Scalable
8. **Technologies Used** — Badge grid (OpenAI, Twilio, Cal.com, etc.)
9. **Results & Impact** — Outcomes list
10. **FAQ** — 4–6 Q&As using existing `Accordion`
11. **Final CTA** — "Build Your Own AI Sales Engine" with three CTAs

### Design / Styling
- Reuse existing semantic tokens (black/white/orange brand) — no custom colors
- Use `Header`, `Footer`, `Card`, `Button`, `Accordion`, `Badge` from existing UI kit
- Lucide icons for each agent (Linkedin, Database, Phone, Mail, MessageSquare, Workflow, Bot, Calendar)
- Center-aligned headings, `pt-32 pb-20` per project layout standard
- Generate 1 hero image (`src/assets/ai-crm-case-study-hero.jpg`) — premium photorealistic dashboard visual
- Optional: 1 architecture/dashboard image asset

### SEO
- `<Helmet>` with title (<60 chars): "AI CRM Case Study | Multi-Agent Lead Generation"
- Meta description (<160 chars) targeting keywords: AI CRM, AI outbound calling, LinkedIn lead generation AI, AI appointment setter
- Canonical via `getCanonicalUrl('/case-studies/ai-crm-multi-agent')`
- JSON-LD: `Article` + `FAQPage` schema
- Single H1, semantic section/h2 headings, descriptive alt text
- Add page URL to `public/sitemap.xml`

### Performance
- Lazy-load Loom iframe (`loading="lazy"`), `title` attribute for accessibility
- Hero image with explicit width/height, `loading="eager"` for above-fold, lazy for rest
- Page lazy-loaded in router (matches existing pattern)

### Files to Create
- `src/pages/resources/AiCrmCaseStudy.tsx`
- `src/assets/ai-crm-case-study-hero.jpg` (generated)

### Files to Edit
- `src/App.tsx` — add lazy import + route
- `src/pages/resources/CaseStudies.tsx` — add link card to new case study
- `public/sitemap.xml` — add new URL
