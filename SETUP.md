# Sai Charan Portfolio — Setup Guide

## Prerequisites

Install **Node.js 20+** from https://nodejs.org/

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
# http://localhost:3000
```

## Production Build

```bash
npm run build
npm run start
```

## Deploy to Vercel

```bash
npm install -g vercel
vercel
```

## Customisation

| File | Purpose |
|------|---------|
| `src/data/portfolio.ts` | All personal info, projects, skills, etc. |
| `src/app/globals.css` | Design tokens and global styles |
| `tailwind.config.ts` | Colour palette and animations |
| `public/resume.pdf` | Place your resume PDF here |

## Resume

Add your resume as `public/resume.pdf` — the Download Resume buttons will link to it automatically.

## Contact Form

The contact form currently simulates a send. To wire it to a real backend:
- **Formspree**: Replace the `handleSubmit` fetch URL in `src/components/sections/Contact.tsx`
- **EmailJS**: Use the `@emailjs/browser` package
- **API Route**: Create `src/app/api/contact/route.ts`
