import generatedReviews from "./reviews.generated.json";

export type Review = { name: string; rating: number; text: string; relativeTime: string };

// Populated at build time by scripts/fetch-google-reviews.ts (needs
// GOOGLE_PLACES_API_KEY + GOOGLE_PLACE_ID in .env) - empty until then.
// Both the Reviews section and the Hero's rating badge/stats read from
// here so neither can show a review-based number that isn't real.
export const reviews = generatedReviews as Review[];
export const hasReviews = reviews.length > 0;
export const reviewCount = reviews.length;
export const averageRating = hasReviews
  ? Math.round((reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length) * 10) / 10
  : null;

export const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/search/?api=1&query=Polish+Station+Dehiwala";
