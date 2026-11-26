# UI-Router documentation site (Docusaurus prototype)

This workspace is the Docusaurus prototype for the documentation generator
comparison in
[`planning/DOCS_GENERATOR_SELECTION.md`](../planning/DOCS_GENERATOR_SELECTION.md).
It is not the production site.

Use the repository's Node.js and npm versions (Node 24.19.0, npm 11.17.0) and
install from the repository root with `npm ci`.

## Work on the site

```bash
npm run start --workspace docs        # dev server with live reload
npm run build --workspace docs        # production build into docs/build
npm run serve --workspace docs        # serve the last build at http://localhost:3000
npm run verify:build --workspace docs # check the last build (see below)
npm run typecheck --workspace docs
```

Search only works with a production build: its index is generated after the
pages are built, so use `build` then `serve` to try it. If a build fails or its
output looks wrong after a configuration change, run
`npm run clear --workspace docs` and build again.

## Where content lives

| Content | Location | Notes |
| --- | --- | --- |
| Home page | `src/pages/index.tsx` | |
| About, Features, section landing pages | `docs/` | Not versioned |
| Package guides | `packages/<package>/*.mdx` | Versioned per package; front matter `framework`, `package`, `version_line`, and `last_verified` is required |
| API reference | Generated into `packages/<package>/api/` | From each package's source comments and `typedoc.json`; not committed |
| Release notes | Generated into `packages/<package>/release-notes.md` | From each package's `CHANGELOG.md`; not committed |
| Package list for cards | `src/data/packages.ts` | Version lines come from each `package.json` at build time |
| Sidebars | `sidebars/` | One file per section |

## Checks

The build fails on broken links and anchors, MDX errors, and missing or
malformed required front matter. A successful build is then checked by
`scripts/verify-build.mjs`: every package version listed in the browser-side
site data must have a built page showing its version label in the version
picker, an API reference, and a search index. This catches builds that pass
but produce inconsistent output.

## Deployment (`.github/workflows/docs.yml`)

The site is deployed **only when a maintainer runs the Docs workflow
manually on `main`**, after everything that should be published is merged.

- **Pull requests** that change the site or anything it is generated from
  (package sources, `typedoc.json`, `package.json`, `CHANGELOG.md`) build and
  check the site and upload it as the `docs-preview` artifact. To review it,
  download and unzip the artifact and serve the folder, for example with
  `npx serve docs-preview`. GitHub Pages cannot host per-pull-request previews.
- **Pushes to `main`** build and check the site, so a broken `main` is found
  right away. They do not deploy.
- **A manual run on `main`** (Actions, Docs, Run workflow) builds the site for
  GitHub Pages and deploys it with GitHub's `deploy-pages` action. Nothing is
  committed or pushed to a branch.

### When to deploy

The docs change in two ways, and both are published with a manual run:

1. **A release.** Release notes and version labels come from each package's
   `CHANGELOG.md` and `package.json`, and API pages from its source. After the
   feature pull request and the release pull request are both merged, run the
   Docs workflow on `main`.
2. **A docs correction** (guides, the About section, landing pages, or source
   doc comments). Run the Docs workflow on `main` after the fix is merged.

A deployment publishes everything on `main`. If another package has merged
docs for changes it has not released yet, those are published too; keep guide
changes for unreleased features with their release when that matters.

### Enabling deployment (maintainers)

Deployment is off by default. To turn it on:

1. In the repository's **Settings, Pages**, set **Source** to **GitHub
   Actions**.
2. Under **Settings, Secrets and variables, Actions, Variables**, set
   `DOCS_DEPLOY_ENABLED` to `true`.
3. Optionally set `DOCS_BASE_URL`. GitHub Pages serves this repository at
   `https://ui-router.github.io/ui-router/`, so the default base URL is
   `/ui-router/`. Serving the site at the domain root is a separate decision
   for the switchover, because the current site is published from the
   `ui-router/ui-router.github.io` repository.
4. Run the **Docs** workflow manually on `main`.

### Releases

Release Please writes each package's `package.json` version and
`CHANGELOG.md`. The site reads both at build time, so the next deployment
after a release shows the new release notes and, for a new major version, the
new version label. The docs build also runs on release pull requests, so a
changelog entry that breaks the release notes page is found before the
release. **Deploying the docs is a manual step of every release** (see
"When to deploy" above).

When a package moves to a new major version, its previous major's docs can be
kept as a snapshot with `npx docusaurus docs:version:<package> <major>.x` (run
from `docs/`), committed in its own pull request. Snapshots copy the
generated API pages into Git, and taking them from the previous release's tag
is not automated yet; see the C3 notes in the selection document.
