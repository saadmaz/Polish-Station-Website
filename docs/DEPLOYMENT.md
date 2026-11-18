# Deployment

<!-- nav -->

<sub><a href="../README.md">Project README</a> · <a href="README.md">Documentation index</a></sub>

> How polishstation.lk reaches production. Part of the [project documentation](README.md).

> [!IMPORTANT]
> The site is moving from shared hosting to **Cloudflare Workers**. The version live at [www.polishstation.lk](https://www.polishstation.lk) stays on the previous host until DNS moves. Cloudflare deploys switch on with the `CLOUDFLARE_ENABLED` repository variable, so nothing reaches production before you are ready.

## Environments

| Environment   | Branch    | URL                                                  | Worker                               |
| ------------- | --------- | ---------------------------------------------------- | ------------------------------------ |
| `development` | `develop` | [dev.polishstation.lk](https://dev.polishstation.lk) | `polish-station-website-development` |
| `production`  | `main`    | [www.polishstation.lk](https://www.polishstation.lk) | `polish-station-website`             |

Each is a GitHub Environment with its own variables (`APP_URL`, `POS_API_URL`) and secrets. Production accepts deployments from `main` only; development from `develop` only.

### Promotion

1. Feature branches merge into `develop` and deploy to development (once `DEVELOPMENT_ENABLED` is `true`).
2. A release pull request from `develop` into `main` (see [runbooks/release.md](runbooks/release.md)) promotes the change.
3. Merging it deploys to production (once `CLOUDFLARE_ENABLED` is `true`).

## How a deploy works

[`deploy.yml`](../.github/workflows/deploy.yml) runs on every push to `main` or `develop` and on manual dispatch:

1. Install dependencies and run `bun run build`, which prerenders every route into `dist/client/` using the environment's Firebase and POS values.
2. Deploy `dist/client/` with Wrangler as an assets-only Worker ([`wrangler.jsonc`](../wrangler.jsonc)). No Worker code runs on a request.
3. Smoke-test the environment URL.

Static behaviour is configured in the repository:

| File                | Controls                                                                                                            |
| ------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `wrangler.jsonc`    | Worker names, the assets directory, `/about` without a trailing slash, and the app-shell fallback for unknown paths |
| `public/_headers`   | Security headers and one-year caching for `/assets/*`                                                               |
| `public/_redirects` | Path redirects such as `/aftercare` → `/services/ceramic-coating`, and `/blog` → `/` while the blog is paused       |

## First-time setup

1. **Cloudflare API token.** Create a token with the _Edit Cloudflare Workers_ template and store it as the `CLOUDFLARE_API_TOKEN` repository secret. `CLOUDFLARE_ACCOUNT_ID` is already set as a repository variable.
2. **Build secrets.** The `FIREBASE_*` web config values are repository secrets already used by every environment. Add environment-level secrets with the same names only if development should use a different project.
3. **Switch on deploys.** Set the repository variable `CLOUDFLARE_ENABLED` to `true`, then run the **Deploy** workflow on `main`.
4. **Domains.** In the Worker's settings, add `www.polishstation.lk` as a custom domain. On the `polishstation.lk` zone, enable **Always Use HTTPS** and add a Redirect Rule from `polishstation.lk/*` to `https://www.polishstation.lk/${1}` (301).
5. Repeat steps 2 to 4 for development with `dev.polishstation.lk`, then set `DEVELOPMENT_ENABLED` to `true`.

## Preview locally

```sh
bun run preview:worker   # build, then serve in Cloudflare's runtime at http://localhost:8787
bun run deploy           # build and deploy from your machine (after `npx wrangler login`)
```

## Post-deployment checks

1. https://www.polishstation.lk and an inner page such as `/services/ceramic-coating` load directly.
2. `https://polishstation.lk` redirects to `https://www.polishstation.lk`, and `/aftercare` redirects to the ceramic coating page.
3. A test booking arrives in the POS, and a test message from `/contact` arrives on the POS Inquiries screen.
