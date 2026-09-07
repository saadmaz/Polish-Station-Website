import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/ui/reveal";
import { Gallery } from "@/components/site/Gallery";
import { BeforeAfter } from "@/components/site/BeforeAfter";

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
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.polishstation.lk/gallery" }],
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
