# ADR-0001: Full static prerender on shared hosting

| Status   | Date       |
| -------- | ---------- |
| Accepted | 2026-07-13 |

## Decision

Prerender every route to static HTML with TanStack Start and serve the output from cPanel shared hosting.

## Alternatives considered

A Node.js server for server-side rendering.

## Rationale

The site has no per-request logic. Static files are fast, cheap and need no runtime on the host.
