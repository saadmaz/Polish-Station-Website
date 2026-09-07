import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/ui/reveal";
import { Gallery } from "@/components/site/Gallery";
import { BeforeAfter } from "@/components/site/BeforeAfter";
import ogGallery from "@/assets/og/og-gallery.jpg";
import { absoluteUrl, SITE_URL } from "@/lib/seo";
import galleryImages from "@/lib/data/gallery-images";

export const Route = createFileRoute("/_layout/gallery/")({
  head: () => ({
    meta: [
      { title: "Gallery - Polish Station" },
      {
        name: "description",
        content:
          "Recent paint correction, ceramic coating and interior detailing work from the Polish Station studio - browse by category or drag the before/after slider.",
      },
      { property: "og:title", content: "Gallery - Polish Station" },
      {
        property: "og:description",
        content: "Recent detailing work from the Polish Station studio.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.polishstation.lk/gallery" },
      { property: "og:image", content: absoluteUrl(ogGallery) },
      { name: "twitter:image", content: absoluteUrl(ogGallery) },
    ],
    links: [{ rel: "canonical", href: "https://www.polishstation.lk/gallery" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Gallery", item: `${SITE_URL}/gallery` },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          galleryImages.map((img) => ({
            "@context": "https://schema.org",
            "@type": "ImageObject",
            contentUrl: absoluteUrl(img.src),
            name: img.label,
          })),
        ),
      },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <>
      <section className="section-padding relative pt-32 pb-0">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal variant="up">
            <div className="eyebrow mb-4">
              <span className="h-px w-8 bg-primary" /> Gallery
            </div>
            <h1 className="font-display text-4xl font-bold uppercase leading-tight md:text-6xl">
              Recent <span className="text-gradient-primary">work.</span>
            </h1>
          </Reveal>
        </div>
      </section>

      <Gallery hideHeading />
      <BeforeAfter />
    </>
  );
}
