function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "http://localhost:3000";
}

/** Shown until a different photo is uploaded. */
export const DEFAULT_PHOTO_URL = "/photos/luigi-chelini.jpg";

/** The hero's photo stack, front card first. */
export const HERO_OUTFITS = [
  "/photos/luigi-look-navy-suit.jpg",
  "/photos/luigi-look-black-turtleneck.jpg",
  "/photos/luigi-look-white-shirt.jpg",
  "/photos/luigi-look-tweed-jacket.jpg",
];

/** The one setting that decides the site's public address. */
export const siteUrl = resolveSiteUrl().replace(/\/$/, "");
