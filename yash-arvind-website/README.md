# Yash Arvind - Personal Website

Personal site for Yash Arvind, product builder. Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Navigate to the project directory
cd yash-arvind-website

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📁 Project Structure

```
yash-arvind-website/
├── content/               # ALL site copy and facts (single source of truth)
│   ├── profile.ts         # Name, headline, contact, education, SEO, nav links
│   ├── stats.ts           # Home proof strip + stat cards
│   ├── caseStudies.ts     # /work/[slug] case studies
│   ├── experience.ts      # Work experience
│   ├── hackathons.ts      # Hackathons + recognition
│   ├── ventures.ts        # Other projects
│   ├── skills.ts          # Skill groups
│   └── beyond.ts          # /beyond page
├── app/                   # Next.js App Router pages
│   ├── page.tsx           # Home
│   ├── work/              # /work and /work/[slug] case studies
│   ├── experience/        # Experience, education, recognition, skills
│   ├── beyond/            # Outside interests
│   ├── contact/           # Contact
│   ├── opengraph-image.tsx, sitemap.ts, robots.ts
│   └── layout.tsx         # Root layout, site-wide metadata
├── components/            # Navigation, Footer, ui/, work/
├── lib/                   # Metadata + OG image helpers
└── public/                # Static assets (resume PDF, images, video)
```

`/projects` and `/trajectory` redirect to `/work` and `/experience` (see `next.config.js`).

## ✏️ How to Customize

### Updating Your Information

Edit the files in `content/`. Pages read from them, so each fact is a one-file edit.
To add a case study, append an entry to `content/caseStudies.ts`; its page, OG image,
and sitemap entry are generated automatically. Sections left empty are not rendered.

To update the resume, replace `public/Yash_Arvind_Resume.pdf`.

### Updating Colors

Edit `tailwind.config.js` to change the color scheme:

```javascript
colors: {
  accent: {
    400: '#fbbf24', // Main accent color (gold)
    // Add more shades as needed
  },
  // ...
}
```

### Adding Images

1. Place images in the `/public` directory
2. Reference them in code as `/image-name.jpg`
3. Recommended: Add a favicon at `/public/favicon.ico`
4. Recommended: Add an OG image at `/public/og-image.jpg`

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Click "Deploy"

Or use the Vercel CLI:

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect your repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`

### Other Platforms

The site is a standard Next.js application and can be deployed to any platform that supports Node.js.

## 🎨 Design System

### Typography
- **Display Font**: Instrument Serif (editorial feel)
- **Body Font**: Inter (clean, readable)
- **Mono Font**: JetBrains Mono (code/numbers)

### Colors
- **Background**: Deep blacks (#0a0a0b)
- **Text**: Steel grays (light to dark)
- **Accent**: Gold/Amber (#fbbf24)
- **Status**: Green (active), Amber (warning)

### Animations
All animations use Framer Motion with:
- Fade-up on scroll
- Staggered children
- Smooth hover states

## 📱 Responsive Design

The site is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔒 Security

The site includes security headers configured in `next.config.js`:
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy

## 📄 License

This is a personal website template. Feel free to use and modify for your own portfolio.

---

Built with ❤️ using Next.js, TypeScript, Tailwind CSS, and Framer Motion
