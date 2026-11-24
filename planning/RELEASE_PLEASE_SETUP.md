# Set up draft release PRs

This step lets Release Please open and update a separate **draft** PR for each
package. It does not create tags, GitHub releases, or npm publications. The
workflow stays off until `RELEASE_PLEASE_ENABLED` is set to `true`.

## Create the GitHub App

Create a GitHub App from your account or the ui-router organization's developer
settings. Give it a recognizable name, such as UI-Router Releases (names must be
available), and use the repository URL as its homepage. Disable webhooks; this
app only needs to act when our GitHub workflow requests a token.

Grant these repository permissions:

| Permission | Access | Purpose |
| --- | --- | --- |
| Contents | Read and write | Update the bot's release branches |
| Pull requests | Read and write | Open and update release PRs |
| Issues | Read and write | Apply the release labels |
| Metadata | Read | GitHub's required default |

No organization permissions or event subscriptions are needed. Install the app
on **only `ui-router/ui-router`**. Generate a private key, then add these values
under the repository's Settings → Secrets and variables → Actions:

- Variable `RELEASE_PLEASE_APP_ID`: the app's numeric App ID, not its installation ID.
- Secret `RELEASE_PLEASE_APP_PRIVATE_KEY`: the complete downloaded PEM private key.

Do not put the private key in Git or paste it into a PR or chat. No npm token is
needed for this step.

After this workflow PR is merged and the app is installed, set the repository
variable `RELEASE_PLEASE_ENABLED` to `true` and manually run **Release proposals**
on `main`. Future pushes to main will update the proposals automatically.
Creating the app and enabling the bot are maintainer setup actions; this PR does
not change external settings.

## Review the first proposals

The manifest starts at the twelve versions already published on npm. Each version
has a matching namespaced tag. Release Please uses those tags as its release
boundaries, with no shared `last-release-sha` or `bootstrap-sha` override.
`commit-search-depth` is 5,000 because the oldest baseline tags are about 4,000
commits back in the combined repository history, beyond the default 500.
The initial history scan can require thousands of read requests. The job has a
55-minute limit, within the App token's one-hour lifetime. Hosted execution time
still needs validation when proposals are enabled; credential setup does not
enable the workflow.

The late upstream React Hybrid 3.0.0 release was restored on November 24, 2026.
Its original release commit, `2779bd13aeae470276812d187214e03486e4d9da`, maps to
`6ad064064b94b4d9f8364a8d22e142d4bd161ef1` under the original import prefix
`framework/react-hybrid/router`. The tag `react-hybrid@3.0.0` points to that
rewritten commit. Its three late upstream commits extend the existing imported
history; the ancestry merge preserves the current monorepo source, which already
contains the React 16 retirement from PR #32 and later tooling changes.
Merge PR #48 with a normal merge commit so the restored tag remains reachable
from `main`. Squashing or rebasing this PR would discard the imported ancestry.

Before the tag restoration, a read-only run of the exact library bundled in our
pinned action (Release Please 17.3.0) against GitHub main at `d1d9d5422` generated
eight separate draft proposals:
Core 6.1.3, Angular 22.0.1, AngularJS 1.2.0, React 1.0.9, React Hybrid 3.1.0,
DSR 1.3.0, Sticky States 1.6.0, and Publish Scripts 2.9.0. These are automatic
suggestions, **not approved release versions**. They include old tooling changes
and a React 16 retirement note that need comparison with what was already
published. We have not edited existing authored changelogs.

Check the proposed versions and notes, then confirm:

- Each PR changes only its package release files plus the shared manifest/lock.
- Each PR updates its package version in the root lock, without changing other packages' versions.
- The app's PR updates trigger CI, and the final PR head passes the checks.

Keep these draft proposals unmerged during setup. Before enabling real releases,
compare the proposed notes with genuine unpublished changes and already published
packages, preserving authored breaking-change notes. Change the
setup-only draft/header settings as part of that reviewed activation.

The restoration was checked against the original commit map: reconstructing the
existing 2.0.0 tag and imported source head reproduced their recorded hashes,
then the three late upstream commits were mapped onto that ancestry. The
restored release tree matches upstream 3.0.0 under the historical prefix, and the
ancestry merge leaves the current source tree unchanged.

Release Please 17.3.0 resolves all twelve baseline tags, including the restored
3.0.0 tag. A local full-history simulation builds twelve draft proposals without
the shared cutoff. A 500-commit simulation produces different notes and versions,
so it is not a substitute for the full search. These remain unapproved proposals.
The read-only GitHub-backed full-history preview hit a gateway timeout; hosted
generation and actual App authentication still need validation while publishing
remains disabled. None of these checks enabled the bot or created release PRs.

## How the shared lock is updated

Each package's `extra-files` setting tells Release Please to update that package's
version field in the root `package-lock.json`. This is a built-in JSON updater:
there is no follow-up script, npm install, or extra bot commit. Independent PRs
change independent version fields. The workspace plugin is not enabled, so a
compatible dependency release does not automatically bump its consumers.

Dependency changes still need npm lock regeneration in the ordinary code PR
that changes them. The release PR then updates only the package version. Keep
internal workspace dependencies on compatible ranges, including private examples;
an exact pin could cause npm to resolve an older registry copy after a local bump.
A major release outside an existing range needs explicit dependency review and
lock regeneration before merging the release PR.

The configuration was tested with Release Please 17.3.0 by generating independent
patch releases for all twelve packages, then comparing each lock with npm's own
regeneration. The Angular Hybrid example's remaining exact Rx pin was changed to
`^1.0.0` so an Rx patch does not change dependency resolution. Separate React and
Angular proposals also kept their lock updates independent.

## What remains before publishing

The npm publisher and optional previews come in the next change. npm trust is
configured separately for each package when we are ready to test a real publish.
The first live publication still needs explicit approval.

At setup inspection, the repository's UIRouter ruleset was disabled and main had
no classic branch protection. Before live publishing, agree on and enable the
intended maintainer/CI merge rules; this change does not modify them.

Local checks cover the package configuration, built-in JSON lock updates compared
with npm regeneration, action syntax, and read-only RP proposals from actual
GitHub history. Creating app-authored PRs and confirming their CI requires the app
setup above and remains to be tested.

References: [Release Please action](https://github.com/googleapis/release-please-action),
[GitHub App tokens](https://github.com/actions/create-github-app-token),
[manifest configuration](https://github.com/googleapis/release-please/blob/main/docs/manifest-releaser.md).
