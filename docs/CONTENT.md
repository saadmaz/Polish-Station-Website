# Content

<!-- nav -->

<sub><a href="../README.md">Project README</a> · <a href="README.md">Documentation index</a></sub>

> How to update services, pricing, gallery and reviews on polishstation.lk. Part of the [project documentation](README.md).

| Task                                   | Where                                                                                                                                                                                |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Edit services and service detail pages | `src/lib/data/services.ts`                                                                                                                                                           |
| Edit packages and pricing              | `src/lib/data/pricing.ts`                                                                                                                                                            |
| Edit FAQ                               | `src/lib/data/faq.ts`                                                                                                                                                                |
| Add gallery images                     | `src/assets/` and `src/lib/data/gallery-images.ts`                                                                                                                                   |
| Refresh Google reviews                 | `bun run fetch:reviews`, then commit `reviews.generated.json`                                                                                                                        |
| Blog posts                             | Paused until the Polish Station admin portal; drafts are in `content/blog-drafts/` and `/blog` redirects to the home page ([ADR-0005](adr/0005-remove-sanity-and-pause-the-blog.md)) |
| Add a page                             | Create a route in `src/routes/_layout/`, set its metadata with `src/lib/seo.ts` and add it to `scripts/generate-sitemap.ts`                                                          |
