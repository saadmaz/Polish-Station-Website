# Polish Station Blog Studio

This is the admin UI for writing/publishing blog posts. It's a separate app
from the main website - it only talks to Sanity's API, and doesn't affect
the site's build in any way. You deploy it once and it lives at its own
`*.sanity.studio` URL, independent of polishstation.lk.

The `post` schema here (`schemaTypes/post.ts`) defines exactly the fields
the website expects in `src/lib/data/blog.ts` - don't rename fields there
without updating both sides.

## One-time setup

1. **Create a Sanity account and project.** Go to https://sanity.io/manage,
   sign up (free), and create a new project. Note the **Project ID** it
   gives you.

2. **Wire the Project ID into this Studio.** Open `sanity.config.ts` in this
   folder and replace `REPLACE_WITH_PROJECT_ID` with the real ID. Leave
   `dataset` as `"production"` unless you changed it in step 1.

3. **Install dependencies:**

   ```
   cd studio
   npm install
   ```

4. **Log in to Sanity from the CLI:**

   ```
   npx sanity login
   ```

   This opens a browser to authenticate - it needs to be run interactively
   by you, not by an automated tool.

5. **Deploy the Studio:**

   ```
   npx sanity deploy
   ```

   It'll ask you to choose a studio hostname (e.g. `polish-station`), then
   give you a URL like `https://polish-station.sanity.studio` - that's your
   admin page for writing posts going forward. Bookmark it.

## Wire the website up to read from this project

Back in the repo root, set these (in your local `.env` for `npm run dev`,
and as GitHub Actions repo secrets named `SANITY_PROJECT_ID` /
`SANITY_DATASET` so the deploy workflow can build with them - see
`.github/workflows/deploy.yml`):

```
VITE_SANITY_PROJECT_ID=<the project ID from step 1>
VITE_SANITY_DATASET=production
```

Until these are set, `/blog` on the live site just shows an empty state -
nothing breaks.

## Publishing a post

Write and publish it from the Studio URL above. **Publishing does not
instantly update the live site** - the site is fully static (see
`.cpanel.yml`), so a new build has to run for the post to appear. Either:

- push any commit to `main` (triggers the existing deploy workflow), or
- manually re-run the "Build & publish deploy branch" GitHub Action, or
- (recommended once you're publishing regularly) add a Sanity webhook that
  fires the GitHub Action automatically on publish - ask for this to be set
  up when you're ready.

## Local development

```
npm run dev
```

Runs the Studio locally so you can preview schema changes before deploying.
