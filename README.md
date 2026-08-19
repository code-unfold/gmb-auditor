# GMB Auditor — by Auxilium Technology

Marketing site for **GMB Auditor**, the all-in-one Google Business Profile audit tool by
[Auxilium Technology](https://auxiliumtechnology.com). Recreation of the GMB Everywhere
landing pages, rebranded and rewritten for Auxilium.

## Pages

| Route | Purpose |
| ----- | ------- |
| `/`   | Main landing page — hero, how it works, 8 features, cost comparison, pricing, FAQ |
| `/ai` | AI tools page — 8 AI generator cards (posts, reviews, descriptions, Q&A, images…) |

## Stack

- [Next.js 14](https://nextjs.org) (App Router) + React 18 + TypeScript
- Tailwind CSS 3.4 — brand palette in `tailwind.config.ts` (Auxilium blues `brand.*` / greens `accent.*`)
- No database, no external images — icons and the hero audit mock are inline SVG/CSS

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Before going live

1. **Set the app URL** — edit `lib/config.ts` and point `APP_URL` at the real signup/app domain
   (all CTAs, login/signup buttons and AI tool links read from it).
2. Review pricing copy in `app/page.tsx` (`plans` array) — currently Free / $15 annual / $30 monthly.
3. The comparison table uses generic "typical standalone tool" price ranges — adjust as needed.
4. Add analytics (e.g. GTM) to `app/layout.tsx` if desired.

## Deploy

Standard Next.js deployment — works out of the box on Vercel:

```bash
npx vercel --prod
```

---

Built by Auxilium Technology, Inc. · 12154 Darnestown Rd., Suite 241, Gaithersburg, MD 20878 · (301) 519-9622

GMB Auditor is an independent tool and is not affiliated with or endorsed by Google.
