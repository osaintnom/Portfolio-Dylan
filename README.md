# Dylan Sbrizza — Photography Portfolio

A premium, image-first photography portfolio built with **Next.js 14 (App Router) · TypeScript · Tailwind CSS · shadcn/ui · Framer Motion**.

The site has three sections — a cinematic hero, an editorial gallery with a full-screen lightbox, and a focused contact area.

---

## Local development

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Editing the site

Three files cover almost everything you'll want to change:

| File | What it controls |
| --- | --- |
| `lib/site.ts` | Photographer name, tagline, contact email, location, social links. |
| `lib/photos.ts` | The full list of photos — order, captions, categories, aspect ratios. |
| `app/globals.css` | Color palette (HSL CSS variables under `:root`). |

### Adding photos

1. Drop image files into `public/photos/`. Use `.jpg`, `.webp`, or `.avif`. Long edge **~2400 px**, sRGB, ~80% quality.
2. Add an entry to the `photos` array in `lib/photos.ts`:

   ```ts
   {
     id: "p11",
     src: "/photos/your-file.jpg",
     alt: "What's in the photo — for screen readers + SEO",
     title: "Caption",
     category: "Portrait",
     aspect: "portrait"
   }
   ```

3. The first photo with `priority: true` becomes the hero image. Set it on exactly one image.

### Aspect ratios

`portrait` (3:4), `landscape` (4:3), `square` (1:1). The gallery's column rhythm uses this to build an editorial layout instead of a uniform grid.

---

## Deploy to Vercel

### Option A — GitHub + Vercel dashboard (recommended)

1. Push this folder to a new GitHub repo.
2. Go to <https://vercel.com/new>, import the repo.
3. Framework preset: **Next.js** (auto-detected). Build command: `next build`. Output dir: `.next`.
4. Click **Deploy**. You'll get `your-project.vercel.app` immediately.
5. Add a custom domain in **Settings → Domains** when ready.

### Option B — Vercel CLI

```bash
npm i -g vercel
vercel             # first deploy (preview)
vercel --prod      # ship to production
```

No environment variables are required.

---

## Tech notes

- Images use `next/image` with AVIF/WebP delivery, responsive `sizes`, and lazy loading.
- The `Cormorant Garamond` display serif + `Inter` body pair is loaded via `next/font` (no runtime CSS request).
- Security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`) are set in `next.config.mjs`.
- External links use `rel="noopener noreferrer"`.
- The site has no API routes, database, or auth — it's a static-friendly Next.js app.

---

## Structure

```
app/
  layout.tsx        # Fonts, metadata, body shell
  page.tsx          # Composes Hero → Gallery → Contact
  globals.css       # Tokens, base typography, grain overlay
components/
  Nav.tsx           # Sticky top nav with scroll-aware blur
  sections/
    Hero.tsx
    Gallery.tsx     # Editorial grid + lightbox
    Contact.tsx
    Footer.tsx
  ui/               # shadcn primitives (Button, Card, Badge)
lib/
  site.ts           # Brand + contact config
  photos.ts         # Photo manifest
  utils.ts          # cn() helper
public/
  photos/           # Drop image files here
```
