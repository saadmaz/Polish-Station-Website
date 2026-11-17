# ADR-0003: Sanity for the blog, with publish-triggered deploys

<!-- nav -->

<sub><a href="../../README.md">Project README</a> · <a href="../README.md">Documentation index</a></sub>

| Status   | Date       |
| -------- | ---------- |
| Accepted | 2026-08-15 |

## Decision

Write posts in Sanity Studio and rebuild the static site through a `repository_dispatch` webhook whenever a post is published.

## Alternatives considered

Markdown files in the repository; a database-backed blog.

## Rationale

Editors publish without touching Git, and the site stays fully static.
