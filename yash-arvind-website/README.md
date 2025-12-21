# Yash Arvind - Personal Website

A sophisticated, dark-themed personal website built for fintech/AI-focused professionals. Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

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
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── projects/          # Ventures/projects page
│   ├── finance/           # Finance systems page
│   ├── trajectory/        # Career timeline page
│   ├── beyond/            # Outside interests page
│   ├── now/               # Current focus page
│   ├── contact/           # Contact page
│   ├── layout.tsx         # Root layout with nav/footer
│   └── globals.css        # Global styles
├── components/
│   ├── Navigation.tsx     # Header navigation
│   ├── Footer.tsx         # Site footer
│   └── ui/                # Reusable UI components
├── public/                # Static assets (add images here)
├── tailwind.config.js     # Design system configuration
└── package.json           # Dependencies
```

## ✏️ How to Customize

### Updating Your Information

Each page file contains clearly marked sections for customization. Look for comments like:

```typescript
// =============================================================================
// YOUR DATA HERE - Edit this section
// =============================================================================
```

### Key Files to Edit

1. **`app/layout.tsx`** - Site title, meta description, navigation links
2. **`app/page.tsx`** - Homepage hero, stats, featured projects
3. **`app/projects/page.tsx`** - Your ventures and technical skills
4. **`app/finance/page.tsx`** - Finance/trading systems details
5. **`app/trajectory/page.tsx`** - Work experience, achievements, education
6. **`app/beyond/page.tsx`** - Sports, hobbies, social impact
7. **`app/now/page.tsx`** - Current focus and availability
8. **`app/contact/page.tsx`** - Contact info and social links
9. **`components/Footer.tsx`** - Social links and footer content

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

## 📧 Contact Form Setup

The contact form needs a backend service to actually send emails. Options:

### Option 1: Formspree (Easiest)
1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form
3. Update `app/contact/page.tsx` with your form endpoint

### Option 2: Custom API Route
Create `app/api/contact/route.ts` with your email service (Resend, SendGrid, etc.)

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
