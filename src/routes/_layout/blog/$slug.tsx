import { createFileRoute, notFound } from "@tanstack/react-router";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { getPostBySlug, urlForImage } from "@/lib/data/blog";

export const Route = createFileRoute("/_layout/blog/$slug")({
  loader: async ({ params }) => {
    const post = await getPostBySlug(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { post } = loaderData;
    const description = post.seoDescription || post.excerpt;
    const url = `https://www.polishstation.lk/blog/${post.slug}`;
    return {
      meta: [
        { title: `${post.title} - Polish Station` },
        { name: "description", content: description },
        { property: "og:title", content: post.title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description,
            datePublished: post.publishedAt,
            author: { "@type": "Person", name: post.author },
            publisher: { "@type": "Organization", name: "Polish Station" },
            mainEntityOfPage: url,
          }),
        },
      ],
    };
  },
  component: BlogPost,
});

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mt-12 font-display text-2xl font-bold uppercase tracking-wide">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 font-display text-xl font-bold uppercase tracking-wide">{children}</h3>
    ),
    normal: ({ children }) => <p className="mt-4 leading-relaxed text-foreground/90">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="mt-6 rounded-2xl glass border-l-4 border-primary p-6 text-foreground/90 italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mt-4 list-disc space-y-2 pl-6">{children}</ul>,
    number: ({ children }) => <ol className="mt-4 list-decimal space-y-2 pl-6">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="text-foreground/90">{children}</li>,
    number: ({ children }) => <li className="text-foreground/90">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline underline-offset-4 hover:no-underline"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => {
      const url = urlForImage(value)?.width(1200).fit("max").url();
      if (!url) return null;
      return (
        <img src={url} alt={value?.alt ?? ""} loading="lazy" className="mt-8 w-full rounded-2xl" />
      );
    },
  },
};

function BlogPost() {
  const { post } = Route.useLoaderData();
  const coverUrl = post.coverImage
    ? urlForImage(post.coverImage)?.width(1600).height(900).fit("crop").url()
    : undefined;

  return (
    <>
      <section className="section-padding relative pt-32">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal variant="up">
            <div className="eyebrow mb-4">
              <span className="h-px w-8 bg-primary" /> Blog
            </div>
            <h1 className="font-display text-3xl font-bold uppercase leading-tight md:text-5xl">
              {post.title}
            </h1>
            <div className="mt-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              <span>{post.author}</span>
              <span className="h-1 w-1 rounded-full bg-muted-foreground" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
          </Reveal>
        </div>
      </section>

      {coverUrl && (
        <section className="relative">
          <div className="mx-auto max-w-5xl px-6">
            <Reveal variant="scale">
              <img src={coverUrl} alt="" className="aspect-video w-full rounded-3xl object-cover" />
            </Reveal>
          </div>
        </section>
      )}

      <section className="relative">
        <div className="mx-auto max-w-3xl px-6 py-12">
          <Reveal variant="up">
            <PortableText value={post.body} components={portableTextComponents} />
          </Reveal>
        </div>
      </section>

      <section className="section-padding relative">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal variant="scale">
            <div className="flex flex-col items-start justify-between gap-6 rounded-3xl glass-strong p-10 sm:flex-row sm:items-center">
              <div>
                <h2 className="font-display text-2xl font-bold uppercase tracking-wide">
                  Ready to book your detail?
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Tell us about your car and we'll confirm a slot.
                </p>
              </div>
              <a
                href="/book"
                className="group inline-flex flex-none items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-wider text-primary-foreground shadow-glow-primary transition-transform hover:scale-105"
              >
                Book Now
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
