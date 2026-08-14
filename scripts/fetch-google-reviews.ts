// Build-time script - NOT run by the deployed site (there is no server in
// production; see .cpanel.yml). Run this manually before each deploy to
// refresh src/lib/data/reviews.generated.json with real Google reviews:
//
//   GOOGLE_PLACES_API_KEY=... GOOGLE_PLACE_ID=... bun run fetch:reviews
//
// The API key never ships to the client - it's only used here, at build
// time, on your own machine or in CI.

import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

export type GeneratedReview = {
  name: string;
  rating: number;
  text: string;
  relativeTime: string;
};

const OUTPUT_PATH = fileURLToPath(
  new URL("../src/lib/data/reviews.generated.json", import.meta.url),
);

async function main() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    console.error("Missing GOOGLE_PLACES_API_KEY or GOOGLE_PLACE_ID. See .env.example.");
    process.exit(1);
  }

  const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
  url.searchParams.set("place_id", placeId);
  url.searchParams.set("fields", "reviews,rating,user_ratings_total");
  url.searchParams.set("key", apiKey);

  const res = await fetch(url);
  const data = await res.json();

  if (data.status !== "OK") {
    console.error(`Places API error: ${data.status} - ${data.error_message ?? "unknown"}`);
    process.exit(1);
  }

  const reviews: GeneratedReview[] = (data.result?.reviews ?? []).map(
    (r: {
      author_name: string;
      rating: number;
      text: string;
      relative_time_description: string;
    }) => ({
      name: r.author_name,
      rating: r.rating,
      text: r.text,
      relativeTime: r.relative_time_description,
    }),
  );

  writeFileSync(OUTPUT_PATH, JSON.stringify(reviews, null, 2) + "\n");
  console.log(`Wrote ${reviews.length} reviews to ${OUTPUT_PATH}`);
}

main();
