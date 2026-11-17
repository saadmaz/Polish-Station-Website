# Rollback

<!-- nav -->

<sub><a href="../../README.md">Project README</a> · <a href="../README.md">Documentation index</a></sub>

> [!WARNING]
> Use this when a deploy has broken production. Restore service first, then fix the cause.

Production is rebuilt from `main` on every deploy, so rollback is a revert.

1. Revert the bad change on `main`:

   ```sh
   git revert <bad-commit-sha>
   ```

2. Open the revert as a pull request and merge it once CI passes. The **Deploy** workflow rebuilds the site and republishes the `deploy` branch.
3. If the site is down and you cannot wait for review, a maintainer may run the **Deploy** workflow manually from the Actions tab after the revert is merged.

Never commit to the `deploy` branch by hand; it is overwritten on every deploy.

Afterwards, record what happened and the fix in the pull request that resolves the root cause.
