# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Project: Harriet Osen - Fashion Shoe Brand Landing Page

## Tech Stack
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion for animations
- Lucide React for icons
- ConvertKit for mailing list
- Vercel for deployment

## Development Commands

```bash
# Development
npm run dev          # Start dev server on http://localhost:3000
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint

# Formatting
npx prettier --write . # Format all files with Prettier
```

## Code Architecture

### Font System
Two font families are configured in `src/app/layout.tsx`:
- `font-display`: Libre Caslon Condensed (local font) - for headings and display text
- `font-sans`: Inter (Google Fonts) - default body font

Libre Caslon Condensed is loaded from `src/fonts/` directory (Regular and Bold weights). Font CSS variables are applied to the `<html>` element and referenced in Tailwind via `fontFamily` config.

### Styling Approach
- **Brand color**: `brand-red` (#D61C27) defined in `tailwind.config.ts`
- **Custom font sizes**: `display-lg` (96px), `display-md` (55px), `body-lg` (36px)
- Prettier with `prettier-plugin-tailwindcss` automatically sorts Tailwind classes
- Mobile-first responsive design

### Component Organization
- `src/components/ui/`: Reusable primitives (Button, Input, Container)
- `src/components/sections/`: Landing page sections (Hero, Features, ProductShowcase, CallToAction, Newsletter, Footer, BrandStory)
- `src/components/forms/`: Form components (NewsletterForm)
- All components are Server Components by default; only use `"use client"` for interactivity (forms, animations)

### Newsletter Integration
Newsletter subscription flow:
1. Client: `NewsletterForm` (form component with validation)
2. Client: `lib/convertkit.ts` (`subscribeToNewsletter` function makes API call)
3. Server: `app/api/subscribe/route.ts` (API route handler)
4. External: ConvertKit API

The API route validates email, checks for required env vars (`CONVERTKIT_API_KEY`, `CONVERTKIT_FORM_ID`), and calls ConvertKit's form subscription endpoint.

### Configuration
- `src/config/site.ts`: Centralized site metadata (name, description, keywords, social links, OG image)
- Referenced in `app/layout.tsx` for SEO meta tags
- All public-facing URLs and metadata should be updated here

### Type Safety
- TypeScript types in `src/types/index.ts`
- No `any` types allowed
- Currently defines: `SubscribeRequest`, `SubscribeResponse`

## Environment Variables

Required for ConvertKit integration:
```env
CONVERTKIT_API_KEY=      # From ConvertKit Settings → Advanced
CONVERTKIT_FORM_ID=      # From your ConvertKit form
NEXT_PUBLIC_SITE_URL=    # Production URL (http://localhost:3000 for dev)
NEXT_PUBLIC_SITE_NAME=   # Site name (Harriet Osen)
```

Copy `.env.example` to `.env.local` and fill in values.

## Design Assets

Primary Figma Design: https://www.figma.com/design/gxHfzrwTDZA1kBWEzW0Z3O/Website?node-id=19-94&m=dev

When Figma links are shared, use the Figma MCP server to:
- Extract design specifications (colors, typography, spacing)
- Export image assets
- Understand component layouts and structure

## Development Guidelines

1. **Next.js 15 Best Practices**: Use App Router conventions, Server Components by default
2. **TypeScript**: Strict mode, no `any` types
3. **Responsive Design**: Mobile-first approach with Tailwind breakpoints
4. **Image Optimization**: Always use `next/image` component
5. **Accessibility**: WCAG 2.1 AA compliance, semantic HTML, ARIA labels where needed
6. **SEO**: Metadata configured in `layout.tsx`, sitemap at `app/sitemap.ts`, robots at `app/robots.ts`
7. **Styling**: Tailwind utility classes over custom CSS

## Key Files

- `src/config/site.ts`: Site metadata and configuration
- `src/app/layout.tsx`: Root layout with fonts and SEO
- `tailwind.config.ts`: Brand colors, custom fonts, and design tokens
- `src/lib/convertkit.ts`: ConvertKit client function
- `src/app/api/subscribe/route.ts`: Newsletter subscription endpoint
