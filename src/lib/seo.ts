export const SITE_URL = "https://www.polishstation.lk";

/** Vite-imported asset paths are site-root-relative (e.g. "/assets/x-HASH.jpg") -
 * social crawlers need an absolute URL for og:image/twitter:image. */
export function absoluteUrl(path: string) {
  return `${SITE_URL}${path}`;
}
