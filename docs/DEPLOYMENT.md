# Deployment

<!-- nav -->

<sub><a href="../README.md">Project README</a> · <a href="README.md">Documentation index</a></sub>

> How polishstation.lk reaches production. Part of the [project documentation](README.md).

## Environments

| Environment   | Branch    | URL                                                  | Deploys                                                                      |
| ------------- | --------- | ---------------------------------------------------- | ---------------------------------------------------------------------------- |
| `development` | `develop` | [dev.polishstation.lk](https://dev.polishstation.lk) | Automatically on every merge into `develop`                                  |
| `production`  | `main`    | [www.polishstation.lk](https://www.polishstation.lk) | Automatically when `develop` is promoted to `main` by a release pull request |

The Deploy workflow builds on GitHub Actions, publishes the static site to a deploy branch and runs the cPanel deployment over SSH. Each environment is a GitHub Environment with its own variables (`APP_URL` and host settings) and secrets, so one workflow serves both. Production accepts deployments from `main` only; development from `develop` only.

Development deploys are switched on per repository by setting the `DEVELOPMENT_ENABLED` repository variable to `true` once the development host exists. Until then, `develop` is built and tested by CI but not deployed.

### Setting up development

cPanel: create `dev.polishstation.lk` with document root `dev.polishstation.lk`, and clone this repository to `repositories/polish-station-development` tracking `deploy-development`.

### Promotion

1. Feature branches merge into `develop` and deploy to development.
2. When development is verified, open a release pull request from `develop` into `main` (see [runbooks/release.md](runbooks/release.md)).
3. Merging it deploys to production.

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
