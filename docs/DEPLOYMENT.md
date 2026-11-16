# Deployment

> How polishstation.lk reaches production. Part of the [project documentation](README.md).

The site is static HTML served from cPanel shared hosting. [`deploy.yml`](../.github/workflows/deploy.yml) publishes it on every push to `main`, on manual dispatch, and whenever a post is published in Sanity (`repository_dispatch: sanity-publish`).

1. GitHub Actions installs dependencies and runs `bun run build` with production values from repository secrets.
2. The prerendered output in `dist/client/` is force-pushed to the `deploy` branch together with [`.cpanel.yml`](../.cpanel.yml).
3. The workflow connects over SSH, checks out `deploy` on the server and runs the cPanel deployment, which copies the files into `public_html`.

The `deploy` branch is a build artefact. Never commit to it by hand.

## Required secrets

| Secret                                                                                                                                          | Purpose                                  |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `SANITY_PROJECT_ID`, `SANITY_DATASET`                                                                                                           | Blog content at build time               |
| `FIREBASE_API_KEY`, `FIREBASE_AUTH_DOMAIN`, `FIREBASE_PROJECT_ID`, `FIREBASE_STORAGE_BUCKET`, `FIREBASE_MESSAGING_SENDER_ID`, `FIREBASE_APP_ID` | Firebase web config for the contact form |
| `ZIRCON_SSH_HOST`, `ZIRCON_SSH_PORT`, `ZIRCON_SSH_USER`, `ZIRCON_SSH_KEY`                                                                       | SSH access to the hosting account        |
