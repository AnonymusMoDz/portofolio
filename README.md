# Luigi Chelini Portfolio

Personal portfolio built with Next.js, TypeScript, Tailwind and Motion. See [CONTEXT.md](CONTEXT.md) for the project's terms.

## Run locally

```sh
npm install
npm run dev
```

## Edit content

All content lives in `content-seed/resume.ts`. Edit it, commit and redeploy.

## Deploy to Vercel

Import the repository. The only environment variable is `NEXT_PUBLIC_SITE_URL` (see `.env.example`), which is optional.

### Launch check

Production builds fail unless an Experience entry in `content-seed/resume.ts` started at least 8 years ago, because the site claims "8+ years". Preview deployments aren't affected. Run the check yourself with `npm run check:launch`.

## Change the photo

The photo also serves as the site's logo. `public/photos/luigi-chelini.jpg` is the default. The hero shows the four outfit photos listed in `HERO_OUTFITS` in `src/lib/site.ts`. To change them, replace the files in `public/photos/`.

## Contact form

The form on `/contact` opens the visitor's email app with the message filled in, so it needs no server or email service.

## Move to a custom domain

Add the domain in Vercel, update `NEXT_PUBLIC_SITE_URL` and redeploy.

## Checks

```sh
npm run lint
npm run typecheck
npm test
npm run build
```
