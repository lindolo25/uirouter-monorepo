# Documentation generator selection

Status: **criteria fixed, prototypes not yet built.** Written 2026-11-21 from
main at `d1d9d5422`.

This record carries out the generator decision in the
[documentation specification](DOCUMENTATION_SPEC.md) (P05 in the
[post-migration program](POST_MIGRATION_PROGRAM.md)). It fixes how the two
candidates, **Docusaurus** and **Astro Starlight**, will be judged before either
prototype exists. The results and the decision are added to this file after
both prototypes are built. The choice takes effect only after maintainer
approval.

## Fairness rules

- Criteria, weights, and scoring anchors are fixed by this document before any
  prototype work. A change after building starts must be recorded below with a
  reason, and applied to both candidates.
- The evaluator's initial preference is Docusaurus. That is the reason the
  criteria are written first; record it rather than hide it.
- Both prototypes build the same six parts (below) from the same source text.
  Content written for one is copied, not rewritten, for the other.
- Use the repository runtime: Node 24.19.0 and npm 11.17.0. Record the exact
  generator, theme, and plugin versions used by each prototype.
- Take every timing on the same machine, with the same command sequence, and
  report the median of three runs.
- Each prototype lives on its own branch (for example
  `docs/prototype-docusaurus` and `docs/prototype-starlight`). Neither is merged
  to main as a result of this evaluation.

## Prototype scope

Each candidate implements exactly these parts from the specification:

1. A landing page with a framework selector (Angular, AngularJS, React, Angular
   Hybrid, React Hybrid).
2. One Angular and one React getting-started page.
3. One TypeDoc API section (Core is enough; a second package is a bonus).
4. One versioned release-notes page.
5. Local full-text search, responsive navigation, and an accessible theme.
6. A preview built from a pull request through GitHub Actions.

Placeholder text is fine where it does not affect a criterion. Branding and
visual polish are not scored.

## Required gates

A candidate that cannot meet a gate is rejected regardless of its score. Record
the evidence for each gate.

| Gate | Pass condition |
| --- | --- |
| G1 Static artifact deploy | The site builds to a static directory that a GitHub Actions job uploads and deploys through the `github-pages` environment. No `gh-pages` branch push, no committed build output. |
| G2 One TypeDoc source | API pages come from the existing per-package `typedoc.json` files and pinned root TypeDoc (`tools/generate-api-docs.mjs` today), or from a single replacement that the existing CI `docs` job also uses. No second, independent TypeDoc configuration. |
| G3 Generated files stay out of Git | Generated API pages and build output are ignored, and a clean checkout builds without them. |
| G4 Broken links fail the build | An intentionally broken internal link, including a guide-to-API link, makes the build exit non-zero. |
| G5 Pinned, offline-capable build | After `npm ci`, the build needs no network access or external service account. |

## Scored criteria

Score each criterion from 1 to 5 using the anchors, then multiply by the weight.
Maximum total is 500.

| # | Criterion | Weight |
| --- | --- | --- |
| C1 | Authoring ergonomics | 20 |
| C2 | TypeDoc integration | 20 |
| C3 | Versioning | 15 |
| C4 | Accessibility | 15 |
| C5 | Search | 10 |
| C6 | Monorepo fit and maintenance | 10 |
| C7 | Build time | 5 |
| C8 | Deployment and previews | 5 |
| | **Total** | **100** |

C6 is not named in the specification. It is added because the site will live
inside this monorepo and share its dependency and CI policy.

### C1 Authoring ergonomics (20)

Measure: write the two getting-started pages; add the front matter the
specification requires (framework, package, supported version line, last
verified release); show the same snippet in framework tabs; reuse one shared
snippet on two pages; edit with the dev server running.

- **1:** Required front matter cannot be enforced; no tabs or shared snippets
  without custom components; live reload unreliable.
- **3:** Markdown/MDX with tabs and live reload work; front matter is accepted
  but not validated, or snippet reuse needs a custom component.
- **5:** Front matter is schema-validated at build time; tabs and snippet reuse
  are built in; errors point at the source file and line.

### C2 TypeDoc integration (20)

Measure: render the Core API section; navigate between guides and API pages;
link from a guide to `StateService.go` and from an API page back to a guide;
make TypeDoc fail and observe the site build.

- **1:** API output is a separate site with its own navigation and styling;
  no guide-to-symbol links; TypeDoc failure is ignored.
- **3:** API pages share site navigation and styling; guide-to-symbol links
  need hand-written URLs; TypeDoc failure fails the build.
- **5:** API pages are first-class site pages in navigation and search; symbol
  links are checked at build time; adding a package is a small, declarative
  change.

### C3 Versioning (15)

UI-Router packages release **independently** (for example Core 6.x, Angular
22.x, React 1.x). Measure: show the release-notes page and the getting-started
pages for more than one supported version line; show how a Core release that
does not change React would appear; show how release notes are sourced from the
package `CHANGELOG.md` files without copying them.

- **1:** Only whole-site snapshots; independent package version lines cannot be
  represented without duplicating the site.
- **3:** Whole-site versioning plus a workable convention (version notices in
  front matter, per-package release pages) that covers independent lines.
- **5:** Independent version lines per package or section are supported
  directly; release notes are generated from package changelogs.

### C4 Accessibility (15)

Measure: run axe (through Playwright, already in the repository) on the landing
page, one guide, one API page, and the search results; walk all four with the
keyboard only; check heading order and colour contrast in light and dark mode;
operate the framework selector by keyboard and screen reader labels.

- **1:** Serious or critical axe violations in the default theme that need
  theme overrides to fix; selector not keyboard-operable.
- **3:** No serious or critical violations after small, documented fixes; minor
  issues remain.
- **5:** No serious or critical violations out of the box; skip link, focus
  order, landmarks, and selector all correct without overrides.

### C5 Search (10)

Measure: with no external account, search for an API symbol (`StateService`), a
concept (`resolve`), and a framework-specific term (`uiSref`). Check result
quality and that results respect the selected framework or section.

- **1:** Search needs an external hosted service or does not index API pages.
- **3:** Local search indexes guides and API pages; ranking or filtering is
  weak.
- **5:** Local search returns all three in the top results and can scope by
  framework or section.

### C6 Monorepo fit and maintenance (10)

Measure: try the site as an npm workspace under the root lock; count added
packages in the lock; check for conflicts with the React and Angular versions
already used by the frameworks; check whether Turbo, syncpack, and CI can run it
like other workspaces; note the generator's release cadence and recent breaking
changes.

- **1:** Must stay outside the workspace with its own lock; conflicts with
  existing dependency policy.
- **3:** Works as a workspace with documented exceptions, or outside it with a
  clear, small CI job.
- **5:** Joins the workspace and normal Turbo/syncpack/CI policy with no
  exceptions and a modest dependency footprint.

### C7 Build time (5)

Measure, after `npm ci` and excluding installs: clean production build including
API generation; rebuild after editing one guide; dev server start to first page.

- **1:** Clean build over 5 minutes, or edits need a full rebuild.
- **3:** Clean build 1 to 5 minutes; incremental rebuild under 10 seconds.
- **5:** Clean build under 1 minute; incremental rebuild under 2 seconds.

### C8 Deployment and previews (5)

Measure: deploy the artifact through Actions with Pages-only permissions and a
separate build job; produce a reviewable preview for a pull request.

- **1:** Deployment needs repository write access or a publishing branch; no
  preview path.
- **3:** Artifact deployment works; previews need a downloadable artifact or a
  separate host.
- **5:** Artifact deployment and a browsable per-PR preview both work with
  least-privilege permissions.

If GitHub Pages cannot provide a required capability (previews, redirects, or
search), record the evidence here; that answers the specification's second
decision for both candidates.

## Results

Fill in after both prototypes are built. Link each score to evidence (commit,
workflow run, axe report, timing log).

### Versions tested

| | Docusaurus | Starlight |
| --- | --- | --- |
| Generator | Docusaurus 3.10.2 (React 18.3.1) | |
| Theme / plugins | `@docusaurus/preset-classic` 3.10.2, `typedoc-plugin-frontmatter` 1.3.3 | |
| TypeDoc bridge | `docusaurus-plugin-typedoc` 1.4.3, `typedoc-plugin-markdown` 4.14.1, TypeDoc 0.28.20 (root pin) | |
| Prototype branch and commit | `docs/prototype-docusaurus` (in progress) | |

### Gates

| Gate | Docusaurus | Starlight |
| --- | --- | --- |
| G1 Static artifact deploy | | |
| G2 One TypeDoc source | Pass with caveat: each package's `typedoc.json` is loaded through TypeDoc's `options`. The site config still also sets content `exclude*` options; move them into each `typedoc.json` or drop them before scoring. Angular Hybrid's new `typedoc.json` is not yet in `tools/generate-api-docs.mjs`. | |
| G3 Generated files stay out of Git | Pass: `docs/.gitignore` covers `build/`, `.docusaurus/`, and generated `docs/api/`. | |
| G4 Broken links fail the build | Pass: `onBrokenLinks`, `onBrokenAnchors`, and `onBrokenMarkdownLinks` set to `throw`; real broken links in generated API pages failed the build (see C2 notes). | |
| G5 Pinned, offline-capable build | | |

### Scores

| Criterion | Weight | Docusaurus (1-5) | Weighted | Starlight (1-5) | Weighted | Evidence |
| --- | --- | --- | --- | --- | --- | --- |
| C1 Authoring | 20 | | | | | |
| C2 TypeDoc | 20 | | | | | |
| C3 Versioning | 15 | | | | | |
| C4 Accessibility | 15 | | | | | |
| C5 Search | 10 | | | | | |
| C6 Monorepo fit | 10 | | | | | |
| C7 Build time | 5 | | | | | |
| C8 Deployment | 5 | | | | | |
| **Total** | **100** | | | | | |

### Prototype notes

Observations recorded while building, to support scoring. Unscored until both
prototypes are complete.

#### Docusaurus: C2 TypeDoc integration

Scope tested: Core, Angular, and Angular Hybrid API sections, a curated menu,
unlisted pages, and an API landing page.

- **Setup.** One `docusaurus-plugin-typedoc` entry per package, pointing TypeDoc's
  `options` at the package's existing `typedoc.json`. A small helper in
  `docusaurus.config.ts` makes adding a package one line. TypeDoc runs inside
  every `docusaurus build`; there is no separate generation step.
- **MDX escaping is required.** Doc comments containing `{ }` and `< >` failed MDX
  compilation until the markdown plugin's `sanitizeComments` output option was
  set.
- **Broken links surfaced real content problems.** Core uses 657 legacy
  `[[Symbol]]` links and Angular 61; TypeDoc dropped that syntax in 0.23, so they
  render as literal text in any generator, including the current HTML docs.
  Two produced invalid Markdown links and failed the build (fixed in source).
  Angular's 61 were converted to `{@link}`; five needed new targets because
  the named symbols no longer exist (`State`, `Ng2StateDeclaration.ngModule`,
  `UrlRouterProvider.deferIntercept`). This applies equally to both candidates.
- **Underscore paths are dropped.** Docusaurus ignores files and folders starting
  with `_`. A README's relative link to `CONTRIBUTING.md` (copied by TypeDoc to
  `_media/`) broke the build until changed to an absolute URL, and
  `_NgHybridStateDeclaration` is published as `NgHybridStateDeclaration-1`.
- **Curated menu.** `@category` tags in source plus `categoryOrder` and
  `defaultCategory: "Unlisted"` in `typedoc.json` shape TypeDoc's generated
  `typedoc-sidebar.cjs`; `sidebars.ts` filters out "Unlisted", adds standalone
  items (`UIRouter`), and composes package menus. Constraints found:
  - Once any category exists, untagged items become one flat list (230 in
    Core); kind groups disappear unless TypeDoc's `navigation` options are used
    (not yet tested).
  - Undocumented types inherit the comment, and the `@category`, of what they
    extend or implement (`LocationPlugin`, `ServicesPlugin`,
    `UIRouterPluginBase` followed `UIRouterPlugin`); giving them their own
    comments fixed it.
  - A symbol carries one category in every package that documents it. Angular
    reads Core from source, so per-package grouping of Core symbols has to be
    done in `sidebars.ts`.
- **Unlisted pages.** Pages left out of the menu are still built, linked, and
  link-checked, but Docusaurus shows no sidebar on them. `typedoc-plugin-frontmatter`
  with `displayed_sidebar: api` fixed this for all 540 generated pages.
- **Duplicated pages.** Angular ends `src/index.ts` with
  `export * from '@uirouter/core'`, so its section repeats Core's API (285 pages
  versus Core's 243). The current HTML docs have the same duplication.
- **No links between packages.** Each package is generated separately, so
  references to another package's types (for example Angular Hybrid to
  `Ng2StateDeclaration`) render as plain code, producing most of Angular Hybrid's
  18 TypeDoc warnings. `externalSymbolLinkMappings` could map them, but that puts
  site URLs into package configuration (a G2 conflict). Unresolved.
- **TypeDoc errors do not fail the site build.** An invalid option was logged as
  `[error]` and the build continued. The plugin also returns without failing
  when TypeDoc conversion produces no project (`typedoc.cjs`). A failed
  conversion has not been tested end to end yet.

#### Docusaurus: C6 Monorepo fit and maintenance

- **Joins the root workspace.** `docs` is an npm workspace under the root lock.
  Docusaurus added 794 packages, the TypeDoc bridge 3, and the frontmatter
  plugin 2 (root lock entries 4,276 to 5,075). The first install changed about
  51,000 lock lines, mostly npm re-marking shared packages.
- **React version is constrained by hoisting.** With React 19.2.8 (the version
  used by the React packages), npm hoisted Docusaurus to the root, where it
  resolved the root's React 18.3.1 while site code used React 19: two React
  copies. The site uses React 18.3.1 to share the hoisted copy, so its React
  version follows whatever the root resolves. npm also kept stale nested React
  19 lock entries after the change; a clean reinstall from the previous lock was
  needed.
- **One existing package changed.** Docusaurus requires `parse5@^8.1.0`, so the
  root `parse5` moved from 8.0.1 to 8.1.1. `jsdom`, used by other packages'
  tests, shares it (within its `^8.0.0` range).
- **CI and tooling.** Root `build`, `test`, and `lint` scripts filter to package
  directories, so CI is unaffected until a docs job is added. `syncpack lint`
  passes; its source globs do not include `docs/`. `sidebars.ts` needed
  Docusaurus's own sidebar types to pass `tsc`.
- **Build reliability.** Three times, a build after a failed build or a change to
  the generated sidebar failed with "Module parse failed: Unexpected end of JSON
  input" until `docusaurus clear` removed the cache. Relevant to C7 as well.
- **Minor.** Two built pages (`core/classes/UIRouter`, `angular/interfaces/$QLike`)
  contain stray control characters that make tools treat the HTML as binary.
  They are not in the generated Markdown or the source. Not investigated
  further.

### Criteria changes after building started

None.

## Decision

Tie-break: if both candidates pass every gate and their totals are within 25
points (5%), decide on C2 and C3 together and explain why.

- Selected generator:
- Why the other candidate was not chosen:
- Open follow-ups (hosting, versioning convention, workspace exception):
- Maintainer approval:
