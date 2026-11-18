# Configuration

<!-- nav -->

<sub><a href="../README.md">Project README</a> · <a href="README.md">Documentation index</a></sub>

> Environment variables and settings for polishstation.lk. Part of the [project documentation](README.md).

Copy [`.env.example`](../.env.example) to `.env`. Every `VITE_*` value is compiled into the browser bundle and is a public identifier, not a secret.

| Variable                                   | Purpose                                                                 |
| ------------------------------------------ | ----------------------------------------------------------------------- |
| `VITE_POS_API_BASE_URL`                    | Base URL of the POS public intake API (`https://pos.polishstation.lk`)  |
| `VITE_FIREBASE_*`                          | Firebase web app config for the POS Firestore project (contact form)    |
| `GOOGLE_PLACES_API_KEY`, `GOOGLE_PLACE_ID` | Used only by `fetch:reviews` at build time; never shipped to the client |

In CI these come from GitHub Actions secrets (see [Deployment](#deployment)).
