// Build-time script - NOT run by the deployed site (there is no server in
// production; the site is static files on Cloudflare). Run this manually to
// refresh src/lib/data/reviews.generated.json with real Google reviews:
//
//   GOOGLE_PLACES_API_KEY=... GOOGLE_PLACE_ID=... bun run fetch:reviews
//
// Uses Places API (New). The legacy Places API can no longer be enabled on
// new Google Cloud projects. Google returns at most five reviews per place.
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

type PlaceReview = {
  rating?: number;
  text?: { text?: string };
  originalText?: { text?: string };
  authorAttribution?: { displayName?: string };
  relativePublishTimeDescription?: string;
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

  const res = await fetch(
    `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`,
    {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "rating,userRatingCount,reviews",
      },
    },
  );
  const data = (await res.json().catch(() => null)) as {
    reviews?: PlaceReview[];
    error?: { status?: string; message?: string };
  } | null;

  if (!res.ok || !data) {
    console.error(
      `Places API error: ${data?.error?.status ?? res.status} - ${data?.error?.message ?? "unknown"}`,
    );
    process.exit(1);
  }

  const reviews: GeneratedReview[] = (data.reviews ?? [])
    .map((r) => ({
      name: r.authorAttribution?.displayName ?? "Google user",
      rating: r.rating ?? 0,
      text: r.originalText?.text ?? r.text?.text ?? "",
      relativeTime: r.relativePublishTimeDescription ?? "",
    }))
    .filter((r) => r.rating > 0 && r.text.trim().length > 0);

  writeFileSync(OUTPUT_PATH, JSON.stringify(reviews, null, 2) + "\n");
  console.log(`Wrote ${reviews.length} reviews to ${OUTPUT_PATH}`);
}

main();
