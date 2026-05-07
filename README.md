# مكتبي — Maktabi

A bilingual (Arabic/English) dropshipping e-commerce store built with Next.js 14. Demonstrates the dropshipping business model as a practical FinTech course project.

**Niche:** Minimalist Desk & Workspace Accessories  
**Stack:** Next.js 14 · TypeScript · Tailwind CSS · next-intl · Zustand

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to `/ar` (Arabic, default).

## How It Works

Every product is sourced from AliExpress, Alibaba, or Amazon. Clicking **"Buy Now"** opens the supplier's listing in a new tab — this simulates the dropshipping handoff where the store operator forwards the order to the supplier.

## Editing Products

All product data lives in `/data/products.json`. To add or change products:

1. Open `data/products.json`
2. Add a new object following the existing shape (bilingual name/description, source URL, prices, etc.)
3. Use Unsplash URLs for images or replace with your own
4. To connect to real affiliate links, replace the `sourceUrl` field with your actual affiliate URL

## Project Structure

```
├── data/products.json          # All product data
├── messages/
│   ├── ar.json                 # Arabic translations
│   └── en.json                 # English translations
├── src/
│   ├── app/[locale]/           # Pages (homepage, shop, product, cart, checkout, etc.)
│   ├── components/             # Shared components (Header, Footer, ProductCard, Toast)
│   ├── lib/products.ts         # Product utilities
│   ├── store/cart.ts           # Zustand cart store
│   ├── i18n.ts                 # next-intl config
│   └── middleware.ts           # Locale routing middleware
```

## Academic Layer

- **How it Works page** (`/how-it-works`): Explains the dropshipping model with a step-by-step flow diagram
- **Course Concepts**: Three cards connecting the store to FinTech course concepts
- **Transparency Mode**: Toggle to reveal source vs. retail pricing and margin analysis
- **Footer**: Displays student name, course code, instructor, and semester

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push to GitHub
2. Import in Vercel — zero configuration required
3. Done!

## Customization

- **Store name/tagline**: Edit `messages/ar.json` and `messages/en.json`
- **Colors**: Edit CSS variables in `src/app/globals.css`
- **Student info**: Edit `src/components/Footer.tsx`
- **Products**: Edit `data/products.json`
