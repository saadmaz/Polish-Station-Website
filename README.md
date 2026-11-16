<div align="center">

# Polish Station

**Restore. Protect. Perfect.**

The official website of Polish Station, a premium automotive detailing studio in Dehiwala, Sri Lanka.

[![Website](https://img.shields.io/badge/website-polishstation.lk-374151?style=flat-square&labelColor=111827)](https://www.polishstation.lk)
[![CI](https://github.com/saadmaz/Polish-Station-Website/actions/workflows/ci.yml/badge.svg)](https://github.com/saadmaz/Polish-Station-Website/actions/workflows/ci.yml)
[![Version](https://img.shields.io/badge/version-v1.0.0-374151?style=flat-square&labelColor=111827)](https://github.com/saadmaz/Polish-Station-Website/releases)
![License](https://img.shields.io/badge/license-proprietary-374151?style=flat-square&labelColor=111827)

[**polishstation.lk**](https://www.polishstation.lk) · [Documentation](docs/README.md) · [Report a bug](https://github.com/saadmaz/Polish-Station-Website/issues/new?template=bug_report.yml) · [Request a change](https://github.com/saadmaz/Polish-Station-Website/issues/new?template=feature_request.yml)

</div>

---

## Contents

- [About](#about)
- [Features](#features)
- [Architecture](#architecture)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Configuration](#configuration)
- [Project structure](#project-structure)
- [Quality checks](#quality-checks)
- [Deployment](#deployment)
- [Documentation](#documentation)
- [Releases and versioning](#releases-and-versioning)
- [Contributing](#contributing)
- [Security](#security)
- [License](#license)

## About

Polish Station restores, protects and perfects vehicle finishes using paint-depth analysis, certified technicians, premium products and multi-light inspection. This repository powers [polishstation.lk](https://www.polishstation.lk): the services, gallery, reviews and booking flow customers use to book a detail.

|                  |                                                                         |
| ---------------- | ----------------------------------------------------------------------- |
| **Organisation** | Polish Station (Pvt) Ltd                                                |
| **Status**       | Live                                                                    |
| **Website**      | [polishstation.lk](https://www.polishstation.lk)                        |
| **Studio**       | 22C, Saranankara Road, Dehiwala · Mon to Sat, 8:00 to 19:00             |
| **Contact**      | [info@polishstation.lk](mailto:info@polishstation.lk) · +94 71 188 5252 |
| **Maintainer**   | [Saad Mazhar](https://github.com/saadmaz)                               |

## Features

- **Service pages:** Paint correction, cut and polish, ceramic and graphene coating, interior and exterior detailing, engine bay cleaning and headlight restoration, each with its own detail page.
- **Online booking:** A multi-service booking form with a date picker, sent straight into the Polish Station POS.
- **Contact and newsletter:** Enquiries land in the POS Inquiries screen; newsletter sign-ups are stored as POS subscribers.
- **Blog:** Articles written and published in Sanity Studio, rebuilt and deployed automatically on publish.
- **Social proof:** Google reviews fetched at build time, before-and-after comparisons and a gallery.
- **Fully static:** Every route is prerendered to HTML, so the site is fast and runs on plain shared hosting.
- **SEO:** Per-page metadata and Open Graph images, a generated `sitemap.xml`, `robots.txt` and `llms.txt`.
- **Mobile-first contact:** Sticky Call / WhatsApp / Book bar on phones and a floating WhatsApp button.

## Architecture

A TanStack Start site prerendered to static HTML and served from cPanel shared hosting. It stores no customer data: bookings and newsletter sign-ups go to the [Polish Station POS](https://github.com/saadmaz/Polish-Station-POS) intake API and contact enquiries to the POS Firestore project. Blog posts come from Sanity, and publishing triggers a rebuild.

The full picture, with diagrams, is in [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md). Significant decisions are recorded as [ADRs](docs/adr/README.md).

## Tech stack

| Layer     | Technology                                                                                         |
| --------- | -------------------------------------------------------------------------------------------------- |
| Framework | [TanStack Start](https://tanstack.com/start) (React 19, file-based routing, full static prerender) |
| Language  | TypeScript (strict)                                                                                |
| Styling   | Tailwind CSS v4 and Radix-based UI primitives                                                      |
| Forms     | React Hook Form + Zod                                                                              |
| Content   | Sanity (blog), Google Places API (reviews, build time only)                                        |
| Data      | Firebase Firestore and the POS intake API                                                          |
| Build     | Vite                                                                                               |
| Hosting   | cPanel shared hosting, deployed by GitHub Actions                                                  |
| Tooling   | Bun, ESLint, Prettier                                                                              |

## Getting started

### Prerequisites

- [Bun](https://bun.sh) 1.4 or later
- Git

### Install and run

```sh
git clone https://github.com/saadmaz/Polish-Station-Website.git
cd Polish-Station-Website
bun install
cp .env.example .env    # fill in the values you need
bun run dev
```

Vite prints the local address when the server starts.

### Scripts

| Command                    | Description                                                         |
| -------------------------- | ------------------------------------------------------------------- |
| `bun run dev`              | Start the development server with hot reload                        |
| `bun run build`            | Regenerate the sitemap, then prerender the site into `dist/client/` |
| `bun run preview`          | Serve the production build locally                                  |
| `bun run lint`             | Lint with ESLint (includes Prettier rules)                          |
| `bun run typecheck`        | Type-check the project with `tsc`                                   |
| `bun run format`           | Format with Prettier                                                |
| `bun run format:check`     | Check formatting without writing                                    |
| `bun run fetch:reviews`    | Refresh `src/lib/data/reviews.generated.json` from Google           |
| `bun run generate:sitemap` | Regenerate `public/sitemap.xml`                                     |

## Configuration

All `VITE_*` values are public identifiers compiled into the bundle: the POS API URL, the Sanity project and the Firebase web config. The Google Places key is used only at build time to refresh reviews.

Every variable, where it is set and which are secret: [docs/CONFIGURATION.md](docs/CONFIGURATION.md). How to update content is in [docs/CONTENT.md](docs/CONTENT.md).

## Project structure

```
.
├── .github/workflows/       # CI on pull requests, deploy on main
├── .cpanel.yml              # Server-side copy into public_html
├── content/blog-drafts/     # Article drafts in Markdown before they go into Sanity
├── public/                  # robots.txt, sitemap.xml, llms.txt, logo
├── scripts/                 # Sitemap generator and Google reviews fetcher
├── src/
│   ├── assets/              # Photography, fonts and Open Graph images
│   ├── components/
│   │   ├── site/            # Page sections: Hero, Services, Packages, Reviews...
│   │   └── ui/              # Radix-based UI primitives
│   ├── hooks/               # Scroll reveal, count-up and tilt effects
│   ├── lib/
│   │   ├── api/             # POS intake API and Firestore inquiries
│   │   ├── data/            # Services, pricing, FAQ, gallery, reviews, blog client
│   │   └── seo.ts           # Page metadata helpers
│   ├── routes/              # File-based routes (see src/routes/README.md)
│   └── styles.css           # Design tokens and global styles
└── studio/                  # Sanity Studio for writing blog posts
```

## Quality checks

Every push and pull request to `main` runs the [CI workflow](.github/workflows/ci.yml): lint, formatting, type check and a production build. Run the same checks locally before opening a pull request:

```sh
bun run lint && bun run format:check && bun run typecheck && bun run build
```

## Deployment

Every push to `main`, manual run or Sanity publish builds the site on GitHub Actions, publishes it to the `deploy` branch and runs the cPanel deployment over SSH.

Setup, secrets and post-deployment checks are in [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md). To release or roll back, follow the [runbooks](docs/runbooks/README.md).

## Documentation

All documentation lives in [`docs/`](docs/README.md), using the same layout in every STTPS repository.

| Document                                  | Covers                                              |
| ----------------------------------------- | --------------------------------------------------- |
| [ARCHITECTURE.md](docs/ARCHITECTURE.md)   | How the system is built and how data flows          |
| [CONFIGURATION.md](docs/CONFIGURATION.md) | Environment variables and configuration files       |
| [DEPLOYMENT.md](docs/DEPLOYMENT.md)       | Hosting, the delivery pipeline and first-time setup |
| [CONTENT.md](docs/CONTENT.md)             | Updating copy, business data, imagery and articles  |
| [adr/](docs/adr/README.md)                | Architecture decision records                       |
| [runbooks/](docs/runbooks/README.md)      | Release and rollback procedures                     |

Product and reference documents for this project are listed in the [documentation index](docs/README.md).

## Releases and versioning

The project follows [Semantic Versioning](https://semver.org). Each release is tagged `vX.Y.Z` and published on the [Releases](https://github.com/saadmaz/Polish-Station-Website/releases) page. Notable changes are recorded in [CHANGELOG.md](CHANGELOG.md), and the release procedure is in [docs/runbooks/release.md](docs/runbooks/release.md).

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) for the branching model, commit conventions and pull request checklist. All participants are expected to follow the [Code of Conduct](CODE_OF_CONDUCT.md).

## Security

Please do not report security issues in public issues. See [SECURITY.md](SECURITY.md) for how to report a vulnerability privately.

## License

Copyright © 2026 Polish Station (Pvt) Ltd. All rights reserved.

This is proprietary software. No permission is granted to use, copy, modify or distribute it without prior written consent. See [LICENSE](LICENSE).
