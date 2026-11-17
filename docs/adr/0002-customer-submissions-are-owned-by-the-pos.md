# ADR-0002: Customer submissions are owned by the POS

<!-- nav -->

<sub><a href="../../README.md">Project README</a> · <a href="../README.md">Documentation index</a></sub>

| Status   | Date       |
| -------- | ---------- |
| Accepted | 2026-08-16 |

## Decision

Send bookings and newsletter sign-ups to the POS public intake API and contact enquiries to the POS Firestore project. The website stores no customer data.

## Alternatives considered

A third-party email relay; a separate database for the website.

## Rationale

Staff work every lead in one place, the POS applies validation and spam protection, and the website stays stateless.
