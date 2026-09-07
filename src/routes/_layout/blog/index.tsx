import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { getAllPosts, sanityConfigured, urlForImage, type BlogPostSummary } from "@/lib/data/blog";

export const Route = createFileRoute("/_layout/blog/")({
  loader: async () => {
    const posts = await getAllPosts();
    return { posts };
  },
  head: () => ({
    meta: [
      { title: "Blog - Polish Station" },
      {
        name: "description",
        content:
          "Detailing tips, coating breakdowns and behind-the-scenes work from the Polish Station studio.",
      },
    ],
    links: [{ rel: "canonical", href: "https://www.polishstation.lk/blog" }],
  }),
  component: BlogIndex,
});

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function BlogIndex() {
  const { posts } = Route.useLoaderData();

  return (
    <section className="section-padding relative pt-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal variant="up">
          <div className="eyebrow mb-4">
            <span className="h-px w-8 bg-primary" /> Blog
          </div>
          <h1 className="font-display text-4xl font-bold uppercase leading-tight md:text-6xl">
            Notes from the <span className="text-gradient-primary">studio</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Detailing tips, coating breakdowns and behind-the-scenes work.
          </p>
        </Reveal>

        {!sanityConfigured && (
          <div className="mt-12 rounded-2xl glass p-8 text-sm text-muted-foreground">
            Blog isn't connected yet - set VITE_SANITY_PROJECT_ID to start publishing.
          </div>
        )}

        {sanityConfigured && posts.length === 0 && (
          <div className="mt-12 rounded-2xl glass p-8 text-sm text-muted-foreground">
            No posts yet - check back soon.
          </div>
        )}

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} variant="up" delay={i * 70}>
              <PostCard post={post} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PostCard({ post }: { post: BlogPostSummary }) {
  const imageUrl = post.coverImage
    ? urlForImage(post.coverImage)?.width(640).height(400).fit("crop").url()
    : undefined;

  return (
    <a href={`/blog/${post.slug}`} className="block h-full">
      <TiltCard
        intensity={6}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl glass depth-shadow cursor-pointer"
      >
        {imageUrl && (
          <div className="aspect-video w-full overflow-hidden">
            <img
              src={imageUrl}
              alt=""
              width={640}
              height={400}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
        <div className="flex flex-1 flex-col p-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {formatDate(post.publishedAt)}
          </span>
          <h2 className="mt-3 font-display text-lg font-bold uppercase tracking-wide">
            {post.title}
          </h2>
          <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>
          <div className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary opacity-0 transition-opacity group-hover:opacity-100">
            Read More <ArrowUpRight className="h-3 w-3" />
          </div>
        </div>
      </TiltCard>
    </a>
  );
}
