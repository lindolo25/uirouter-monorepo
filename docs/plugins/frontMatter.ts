import path from 'path';
import type { ParseFrontMatter } from '@docusaurus/types';

// Hand-written package pages (guides and overviews) must say which framework,
// package, and version line they describe, and the last release they were
// checked against (planning/DOCUMENTATION_SPEC.md). A missing or malformed
// field fails the build. Generated pages (API reference, release notes) and
// general pages are not checked.

const frameworks = ['core', 'angular', 'angularjs', 'react', 'angular-hybrid', 'react-hybrid'];

// packages/<id>/... (current docs) or <id>_versioned_docs/version-<v>/... (snapshots)
function packageOf(filePath: string): string | undefined {
  const parts = filePath.split(path.sep);
  const current = parts.lastIndexOf('packages');
  if (current >= 0 && parts[current + 1]) {
    const rest = parts.slice(current + 2);
    return rest[0] === 'api' || rest.join('/') === 'release-notes.md' ? undefined : parts[current + 1];
  }
  const snapshot = parts.find((p) => p.endsWith('_versioned_docs'));
  if (snapshot) {
    const rest = parts.slice(parts.indexOf(snapshot) + 2);
    return rest[0] === 'api' || rest.join('/') === 'release-notes.md'
      ? undefined
      : snapshot.replace(/_versioned_docs$/, '');
  }
  return undefined;
}

function problems(pkg: string, fm: Record<string, unknown>): string[] {
  const found: string[] = [];
  if (!frameworks.includes(fm.framework as string)) {
    found.push(`framework must be one of: ${frameworks.join(', ')}`);
  }
  if (fm.package !== `@uirouter/${pkg}`) {
    found.push(`package must be "@uirouter/${pkg}" for a page in the ${pkg} docs`);
  }
  if (typeof fm.version_line !== 'string' || !/^\d+\.x$/.test(fm.version_line)) {
    found.push('version_line must look like "22.x"');
  }
  if (typeof fm.last_verified !== 'string' || !/^\d+\.\d+\.\d+$/.test(fm.last_verified)) {
    found.push('last_verified must be a release version such as "22.0.0" (quote it)');
  }
  return found;
}

export const parseFrontMatter: ParseFrontMatter = async (params) => {
  const result = await params.defaultParseFrontMatter(params);
  const pkg = packageOf(params.filePath);
  if (pkg) {
    const found = problems(pkg, result.frontMatter);
    if (found.length) {
      throw new Error(
        `Front matter in ${params.filePath}:\n${found.map((p) => `  - ${p}`).join('\n')}`,
      );
    }
  }
  return result;
};
