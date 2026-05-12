# Deploying to Vercel

You have two ways to ship this site. **Option A (GitHub)** is recommended for the long term — every git push redeploys.

---

## Before you deploy

Open `lib/site.ts` and replace the placeholder email with Dylan's real one:

```ts
email: "dylan@your-real-domain.com",
```

That's the only required edit. Optional: add Instagram / Behance URLs in the same file to surface them in the contact section.

---

## Option A — GitHub + Vercel dashboard (recommended)

1. **Create a new GitHub repo** (private or public, doesn't matter).
2. **Push the project**. From this folder:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<your-user>/dylan-sbrizza-portfolio.git
   git push -u origin main
   ```
3. Go to <https://vercel.com/new>, click **Import Git Repository**, pick the repo.
4. Framework preset is auto-detected as **Next.js**. Leave the defaults:
   - Build Command: `next build`
   - Output Directory: `.next`
   - Install Command: `npm install`
5. Click **Deploy**. First build takes 60–90 seconds. You'll get a URL like `dylan-sbrizza-portfolio.vercel.app`.
6. (Optional) Add a custom domain in **Settings → Domains**.

Every subsequent `git push` redeploys automatically.

---

## Option B — Vercel CLI (one-shot deploy)

```bash
npm install -g vercel
cd "Dylan PORTFOLIO"
vercel              # first run: log in, link the project, preview deploy
vercel --prod       # promote to production
```

No environment variables are required.

---

## Local development

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. Changes to `lib/photos.ts` or any `.tsx` file hot-reload instantly.

---

## Production checks Vercel performs for you

- `npm install` — pulls Next 14, React 18, Tailwind, Framer Motion, lucide-react.
- `next build` — type-checks all TypeScript, lints, and produces an optimized build.
- Image optimization — every photo in `/public/photos` is converted to AVIF/WebP and served with the correct `srcset` for each device.

---

## Updating photos later

Three steps (no rebuild needed locally if you're using GitHub + Vercel):

1. Drop new image files into `public/photos/`. Use `.jpg`, ~2400px on the long edge.
2. Open `lib/photos.ts` and add an entry to the `photos` array:
   ```ts
   {
     id: "moto-13",
     src: "/photos/moto-13.jpg",
     alt: "Short description of the photo",
     title: "Motorcycles · 13",
     category: "Motorcycles",
     aspect: "landscape" // or "portrait" or "square"
   }
   ```
3. Commit and push. Vercel redeploys in ~60 seconds.

To **remove** a photo: delete its entry from the array (you can leave the file in `/photos` or remove it). To **reorder**: rearrange entries — order in the array = order on the page. To **change the hero image**: move `priority: true` to a different entry.

---

## Notes & gotchas

- The `photos dylan/` folder in this workspace is your raw source. It's outside `/public` and never deployed — feel free to keep originals there as a backup.
- `.trash-*` folders are leftover artifacts from setup; safe to delete locally before pushing to git (or add `.trash-*` to `.gitignore`).
- The site has **no API routes, no database, and no auth** — it's a fully static-friendly Next.js app, which is why deploy is essentially free on Vercel's hobby tier.
