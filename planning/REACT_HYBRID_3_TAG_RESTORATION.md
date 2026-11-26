# React Hybrid 3.0.0 tag restoration

The monorepo imported React Hybrid history on August 24, 2026. The original
repository released 3.0.0 afterward, so that release was missing from the import.
The public npm package records upstream commit
`2779bd13aeae470276812d187214e03486e4d9da`, which is also the original repository's
`3.0.0` tag target.

The restored monorepo tag, `react-hybrid@3.0.0`, points to
`6ad064064b94b4d9f8364a8d22e142d4bd161ef1`. It uses the original import prefix,
`framework/react-hybrid/router`, and extends the existing imported ancestry.

| Upstream commit | Imported commit | Change |
| --- | --- | --- |
| `80138d43cb922f26857d97694919e12893ecff71` | `640c1f96a381959a2092dd81c13e13c103f22416` | Drop React 16 support |
| `a9c016e08d0854e8732f53f2de0cc01611fd7f85` | `70f9d261b1e38bc5d997dcf408c8bea0a21ca0ea` | Update publish-scripts |
| `2779bd13aeae470276812d187214e03486e4d9da` | `6ad064064b94b4d9f8364a8d22e142d4bd161ef1` | Release 3.0.0 |

The reconstruction preserves upstream file contents, commit messages, authors,
committers, and timestamps. Trees and parent IDs change for the import layout;
signatures that would no longer verify after rewriting are removed, as in the
original history import.

Validation reproduced the recorded mappings for the existing 2.0.0 tag and
imported source head before extending them with these three commits. The
restored release tree matches upstream 3.0.0 under the historical prefix. The
restored tag is a descendant of `react-hybrid@2.0.0`.

PR #32 already brought the React 16 retirement into the current monorepo source.
The ancestry merge retains today's package files, including later tooling and
type changes. Its only current-file addition is this provenance document.

Merge this history-restoration PR with a normal merge commit before PR #48.
Squash or rebase merging would discard the imported ancestry and leave the tag
outside `main`'s history. PR #48 consumes the restored tag separately through
normal Release Please package-tag discovery.

The tag has already been pushed. This restoration does not publish a new npm
version or create a GitHub release. Release Please remains disabled during setup.
