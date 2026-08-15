import { createClient, type SanityClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import type { PortableTextBlock } from "@portabletext/react";

// Public, read-only project config - safe to expose to the client, same as
// any other Sanity CDN read. Posts are only ever written from Sanity Studio.
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET || "production";

export const sanityConfigured = Boolean(projectId);

export const sanityClient: SanityClient | null = sanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2024-01-01",
      useCdn: true,
    })
  : null;

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

export function urlForImage(source: SanityImageSource) {
  if (!builder) return undefined;
  return builder.image(source);
}

export type BlogPostSummary = {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: SanityImageSource | null;
  publishedAt: string;
  author: string;
  tags: string[];
};

export type BlogPost = BlogPostSummary & {
  body: PortableTextBlock[];
  seoDescription: string | null;
};

const SUMMARY_FIELDS = `
  "slug": slug.current,
  title,
  excerpt,
  coverImage,
  publishedAt,
  author,
  "tags": coalesce(tags, [])
`;

// Studio schema validation requires a well-formed slug before a post can be
// published, but this filters defensively too: one malformed slug (e.g.
// typed by hand instead of clicking "Generate") must never be able to crash
// the entire prerendered build over a single bad post.
const VALID_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export async function getAllPosts(): Promise<BlogPostSummary[]> {
  if (!sanityClient) return [];
  const posts: BlogPostSummary[] = await sanityClient.fetch(
    `*[_type == "post" && defined(slug.current) && publishedAt <= now()] | order(publishedAt desc){
      ${SUMMARY_FIELDS}
    }`,
  );
  return posts.filter((post) => VALID_SLUG.test(post.slug));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!sanityClient || !VALID_SLUG.test(slug)) return null;
  const post = await sanityClient.fetch(
    `*[_type == "post" && slug.current == $slug && publishedAt <= now()][0]{
      ${SUMMARY_FIELDS},
      body,
      seoDescription
    }`,
    { slug },
  );
  return post ?? null;
}
