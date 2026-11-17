# Architecture

<!-- nav -->

<sub><a href="../README.md">Project README</a> · <a href="README.md">Documentation index</a></sub>

> How polishstation.lk is built and served. Part of the [project documentation](README.md).

## Overview

```mermaid
flowchart LR
  Visitor((Visitor)) --> Site["polishstation.lk<br/>static Worker on Cloudflare"]
  Site -- booking, newsletter --> POSAPI["pos.polishstation.lk<br/>public intake API"]
  Site -- contact form --> Firestore[("Firestore<br/>inquiries")]
  POSAPI --> Firestore
  Sanity["Sanity Studio<br/>blog posts"] -- publish webhook --> GHA["GitHub Actions<br/>build and deploy"]
  GHA -- wrangler deploy --> Site
```

The website holds no customer data of its own. Every submission is handed to the [Polish Station POS](https://github.com/saadmaz/Polish-Station-POS), where staff manage bookings, leads and subscribers.

## Building blocks

| Part             | Responsibility                                                      |
| ---------------- | ------------------------------------------------------------------- |
| `src/routes/`    | File-based routes, every one prerendered to HTML                    |
| `src/lib/data/`  | Services, pricing, FAQ, gallery, reviews and the Sanity blog client |
| `src/lib/api/`   | POS intake API client and Firestore enquiries                       |
| `src/lib/seo.ts` | Page metadata and structured data                                   |
| `scripts/`       | Sitemap generation and Google reviews fetch, run at build time      |
| `studio/`        | Sanity Studio for blog authors                                      |

Significant decisions are recorded in [adr/](adr/README.md).
