# Harriet Osen - Fashion Shoe Brand Landing Page

Premium fashion footwear website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Modern, responsive landing page design
- Newsletter subscription with Notion integration
- Feedback form with Notion integration
- SEO optimized with comprehensive meta tags
- Server-side rendering with Next.js 15 App Router
- Type-safe development with TypeScript
- Tailwind CSS for styling
- Accessibility compliant (WCAG 2.1 AA)

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animation**: Framer Motion
- **Deployment**: Vercel
- **Data Storage**: Notion

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Notion account (for storing newsletter subscriptions and feedback)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

Copy `.env.example` to `.env.local` and fill in your credentials:

```env
NOTION_API_KEY=your_notion_api_key_here
NOTION_DATABASE_ID=your_notion_database_id_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Harriet Osen
```

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/               # API routes
│   │   │   ├── subscribe/    # Newsletter subscription endpoint
│   │   │   └── feedback/      # Feedback form endpoint
│   │   ├── layout.tsx         # Root layout with SEO
│   │   ├── page.tsx           # Landing page
│   │   ├── globals.css        # Global styles
│   │   ├── sitemap.ts         # Dynamic sitemap
│   │   └── robots.ts          # Robots.txt configuration
│   ├── components/
│   │   ├── ui/                # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Container.tsx
│   │   ├── sections/          # Landing page sections
│   │   │   ├── Hero.tsx
│   │   │   ├── Features.tsx
│   │   │   ├── ProductShowcase.tsx
│   │   │   ├── CallToAction.tsx
│   │   │   ├── Newsletter.tsx
│   │   │   └── Footer.tsx
│   │   └── forms/
│   │       └── NewsletterForm.tsx
│   ├── lib/
│   │   ├── utils.ts           # Utility functions
│   │   └── notion.ts          # Notion API client
│   ├── config/
│   │   └── site.ts            # Site configuration
│   └── types/
│       └── index.ts           # TypeScript types
├── public/                    # Static assets
└── .claude/                   # Claude Code configuration
```

## Notion Setup

1. Create a Notion integration:
   - Go to [notion.so/my-integrations](https://www.notion.so/my-integrations)
   - Click "New integration"
   - Give it a name (e.g., "Harriet Osen Feedback")
   - Select your workspace
   - Copy the "Internal Integration Token" (this is your `NOTION_API_KEY`)

2. Create a database in Notion with the following properties:
   - **Name** (Title) - for the person's name
   - **Email** (Email) - for the email address
   - **Where do you live?** (Select) - for the user's country
   - **Selected Shoes** (Multi-select) - for the selected shoe names
   - **Newsletter** (Checkbox) - for newsletter subscription preference
   - **Submitted On** (Date) - for the submission timestamp

3. Share the database with your integration:
   - Open your database in Notion
   - Click the "..." menu in the top right
   - Click "Add connections"
   - Select your integration

4. Get your Database ID:
   - Open your database in Notion
   - Copy the URL (it will look like: `https://www.notion.so/workspace/DATABASE_ID?v=...`)
   - The Database ID is the 32-character string after the last `/` and before the `?`
   - Add it to your `.env.local` file as `NOTION_DATABASE_ID`

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Configure environment variables in Vercel project settings:
   - `NOTION_API_KEY`
   - `NOTION_DATABASE_ID`
   - `NEXT_PUBLIC_SITE_URL` (your production URL)
   - `NEXT_PUBLIC_SITE_NAME`
4. Deploy!

The site will automatically deploy on every push to the main branch.

## Customization

### Design Tokens

Update `tailwind.config.ts` with your brand colors, fonts, and spacing based on your Figma design.

### Content

- Update site metadata in `src/config/site.ts`
- Replace placeholder content in section components
- Add your product images to `public/images/`

### Figma Integration

The project is set up to work with Figma MCP for design token extraction. Configure Figma MCP by following the instructions in `.claude/CLAUDE.md`.

## SEO

The site includes:
- Comprehensive meta tags (Open Graph, Twitter Card)
- Dynamic sitemap
- Robots.txt
- Structured data (JSON-LD)
- Semantic HTML
- Image optimization with next/image

## Performance

- Server-side rendering with React Server Components
- Automatic code splitting
- Image optimization (WebP/AVIF)
- Font optimization with next/font
- Tailwind CSS for minimal CSS bundle size

## Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation support
- Proper ARIA labels
- Semantic HTML structure
- Focus management
- Form validation with accessible error messages

## License

All rights reserved.

## Support

For questions or issues, please contact [support@harrietosen.com]
