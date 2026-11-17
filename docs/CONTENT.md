# Content

> How to update services, pricing, gallery, reviews and the blog on polishstation.lk. Part of the [project documentation](README.md).

| Task                                   | Where                                                                                                                                            |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Edit services and service detail pages | `src/lib/data/services.ts`                                                                                                                       |
| Edit packages and pricing              | `src/lib/data/pricing.ts`                                                                                                                        |
| Edit FAQ                               | `src/lib/data/faq.ts`                                                                                                                            |
| Add gallery images                     | `src/assets/` and `src/lib/data/gallery-images.ts`                                                                                               |
| Refresh Google reviews                 | `bun run fetch:reviews`, then commit `reviews.generated.json`                                                                                    |
| Write and publish a blog post          | [Sanity Studio](https://polishstation.sanity.studio). Publishing triggers a rebuild automatically; see [`studio/README.md`](../studio/README.md) |
| Add a page                             | Create a route in `src/routes/_layout/`, set its metadata with `src/lib/seo.ts` and add it to `scripts/generate-sitemap.ts`                      |
