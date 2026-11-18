# ADR-0005: Remove Sanity and pause the blog

<!-- nav -->

<sub><a href="../../README.md">Project README</a> · <a href="../README.md">Documentation index</a></sub>

| Status   | Date       |
| -------- | ---------- |
| Accepted | 2026-11-18 |

## Decision

Remove Sanity (the Studio, the client, the `/blog` routes and the publish webhook). The blog is paused: `/blog` and `/blog/*` redirect to the home page with a temporary 302, and the article drafts stay in `content/blog-drafts/`. Supersedes [ADR-0003](0003-sanity-for-the-blog-with-publish-triggered-deploys.md).

## Alternatives considered

Keep Sanity until the admin portal exists; move the drafts to Markdown routes in this repository.

## Rationale

Polish Station will manage content from its own admin portal, and no post was ever published in Sanity. Removing it drops three dependencies and a second content system. The 302 keeps `/blog` free to come back once posts are served from the portal.
