# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2026-11-16

First versioned release of [polishstation.lk](https://www.polishstation.lk), covering everything shipped to production since launch.

### Added

- Home page with hero, services, packages, process, before-and-after comparison, gallery, Google reviews, FAQ teaser and call to action.
- Dedicated routes for About, Services (with a detail page per service), Gallery, Blog, FAQ, Contact and Book.
- Multi-service booking form with a date picker and an "other service" option, submitted to the POS intake API.
- Contact form that writes enquiries to the POS Firestore project, and newsletter sign-ups stored as POS subscribers.
- Blog powered by Sanity Studio, with automatic rebuild and deploy on publish.
- Google reviews fetched at build time.
- Full static prerender of every route for shared hosting.
- SEO: per-page metadata, Open Graph images, `Offer`, `BreadcrumbList`, `FAQPage` and `ImageObject` structured data, generated sitemap, `robots.txt` and `llms.txt`.
- Google Tag Manager and Search Console verification.
- Sticky mobile Call / WhatsApp / Book bar and a floating WhatsApp button.
- Automated deployment to cPanel through a `deploy` branch and SSH.
- Pull request CI: lint, formatting, type check and production build.
- Project documentation, contribution guidelines, security policy, code of conduct, issue forms, pull request template, CODEOWNERS and Dependabot.

### Changed

- Bun is the single package manager; the duplicate npm lockfile was removed and the Bun version is pinned in CI.
- Source files formatted to the project Prettier configuration.

### Fixed

- Type error from a deep import of the Sanity image URL types.
- A malformed blog slug no longer fails the whole build.

### Removed

- Unused scaffold server function and configuration module.

[Unreleased]: https://github.com/saadmaz/Polish-Station-Website/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/saadmaz/Polish-Station-Website/releases/tag/v1.0.0
