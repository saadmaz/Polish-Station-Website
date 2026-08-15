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

export async function getAllPosts(): Promise<BlogPostSummary[]> {
  if (!sanityClient) return [];
  return sanityClient.fetch(
    `*[_type == "post" && defined(slug.current) && publishedAt <= now()] | order(publishedAt desc){
      ${SUMMARY_FIELDS}
    }`,
  );
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!sanityClient) return null;
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

export async function getAllPostSlugs(): Promise<string[]> {
  if (!sanityClient) return [];
  const slugs: string[] = await sanityClient.fetch(
    `*[_type == "post" && defined(slug.current) && publishedAt <= now()].slug.current`,
  );
  return slugs;
}
