# ADR-0004: Host the static site on Cloudflare Workers

<!-- nav -->

<sub><a href="../../README.md">Project README</a> · <a href="../README.md">Documentation index</a></sub>

| Status   | Date       |
| -------- | ---------- |
| Accepted | 2026-11-17 |

## Decision

Keep the full static prerender, but serve it from an assets-only Cloudflare Worker instead of cPanel shared hosting. GitHub Actions builds the site and deploys it with Wrangler, so Sanity publishes can still trigger a deploy. Apache rules move to `public/_headers`, `public/_redirects`, `wrangler.jsonc` and zone-level Redirect Rules.

## Alternatives considered

Staying on shared hosting; Cloudflare Workers Builds, which cannot be triggered by the Sanity publish webhook.

## Rationale

Every other STTPS website already runs on Cloudflare. Edge delivery is faster than shared hosting, deploys no longer depend on SSH access to the server, and the site keeps its zero-runtime design.
