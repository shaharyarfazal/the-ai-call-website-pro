# The AI Call Website

A premium web application for **The AI Call**, an AI Voice receptionists and automation agency. This application features high-performance voice demos, scheduling integration, and highly polished premium responsive designs.

## Technology Stack

- **Core:** React, TypeScript, Vite
- **Styling:** Tailwind CSS, shadcn/ui, Framer Motion
- **Services:** Supabase, Deno Edge Functions
- **Voice AI Support:** Retell AI client SDK integrations
- **Analytics & Tracking:** Cloudflare Turnstile, Meta Pixel, Clarity, Google Analytics

## Getting Started

### Prerequisites

Ensure you have **Node.js** (v18+) and a package manager (**npm** or **bun**) installed.

### Setup and Local Development

Follow these steps to run the application locally:

```bash
# 1. Clone the repository
git clone <repository-url>

# 2. Navigate to the project directory
cd mysterious-hypatia

# 3. Install the dependencies
npm install

# 4. Start the local development server
npm run dev
```

The development server will start, typically at `http://localhost:8080` or `http://localhost:5173`.

## Core Project Structure

```text
├── public/
│   ├── audio/          # Static audio assets
│   ├── blog/           # Blog structured static resources
│   ├── uploads/        # Uploaded custom logos and graphics
│   └── sw.js           # Services worker definition
├── src/
│   ├── components/     # High-fidelity shared React components
│   ├── lib/            # Shared utilities (SEO, styling, analytics)
│   ├── pages/          # Full page layout views
│   ├── index.css       # Styling tokens and Tailwind integration
│   └── main.tsx        # React entrypoint
├── supabase/
│   └── functions/      # Supabase/Deno Edge Functions
└── vite.config.ts      # Vite configuration file
```

## Production Build

To build the project for production, run:

```bash
npm run build
```

This generates optimized static files in the `dist` directory, ready to be served from any static web host (Vercel, Netlify, Cloudflare Pages, etc.).
