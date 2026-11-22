import fs from 'fs';
import path from 'path';
import { themes as prismThemes } from 'prism-react-renderer';
import type { Config, PluginConfig } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import changelogPage from './plugins/changelog';

// Prototype for the generator comparison in planning/DOCS_GENERATOR_SELECTION.md.
// This file runs in Node.js; do not use browser APIs here.

// Every package gets its own docs instance (guides, release notes, and API
// reference together), so each one is versioned on its own line.
type PackageDocs = {
  id: string; // instance id and URL segment
  dir: string; // package directory, relative to the site directory
};

const packages: PackageDocs[] = [
  { id: 'core', dir: '../core' },
  { id: 'angular', dir: '../frameworks/angular/uirouter-angular' },
  { id: 'angular-hybrid', dir: '../frameworks/angular-hybrid/uirouter-angular-hybrid' },
];

// Each package instance has one sidebar with this id.
const packageSidebar = 'main';

// Options applied on top of every package's own typedoc.json.
const typedocOptions = {
  // MDX treats { } and < > in doc comments as code; escape them.
  sanitizeComments: true,
  // Show the package sidebar on every generated page, including pages that are
  // not listed in the menu, so navigation is never interrupted.
  plugin: ['typedoc-plugin-frontmatter'],
  frontmatterGlobals: { displayed_sidebar: packageSidebar },
};

function readPackage(pkg: PackageDocs): { name: string; version: string } {
  return JSON.parse(fs.readFileSync(path.join(__dirname, pkg.dir, 'package.json'), 'utf8'));
}

// "22.0.0" -> "22.x": the label of the instance's current (unreleased) docs.
function versionLine(pkg: PackageDocs): string {
  return `${readPackage(pkg).version.split('.')[0]}.x`;
}

// Labels for snapshots created with `docusaurus docs:version:<id> <version>`.
function snapshotVersions(pkg: PackageDocs): Record<string, { label: string; banner: 'unmaintained' }> {
  const file = path.join(__dirname, `${pkg.id}_versions.json`);
  const snapshots: string[] = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : [];
  return Object.fromEntries(snapshots.map((v) => [v, { label: v, banner: 'unmaintained' }]));
}

function packagePlugins(pkg: PackageDocs): PluginConfig[] {
  const contentDir = `packages/${pkg.id}`;
  return [
    // Release notes and API pages are generated into the instance folder first.
    [
      changelogPage,
      {
        id: pkg.id,
        source: `${pkg.dir}/CHANGELOG.md`,
        target: `${contentDir}/release-notes.md`,
        title: `${readPackage(pkg).name} release notes`,
        sidebar: packageSidebar,
      },
    ],
    // Gate G2: API pages come from the package's own typedoc.json and the
    // root-pinned TypeDoc. Only output settings are added here.
    [
      'docusaurus-plugin-typedoc',
      {
        id: `api-${pkg.id}`,
        options: `${pkg.dir}/typedoc.json`,
        out: `./${contentDir}/api`,
        docsPath: `./${contentDir}`,
        ...typedocOptions,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: pkg.id,
        path: contentDir,
        routeBasePath: pkg.id,
        sidebarPath: `./sidebars/${pkg.id}.ts`,
        // Current docs describe the released version line, not unreleased
        // work; snapshots of older lines are served under /<id>/<version>/.
        lastVersion: 'current',
        versions: {
          current: { label: versionLine(pkg) },
          ...snapshotVersions(pkg),
        },
      },
    ],
  ];
}

const config: Config = {
  title: 'UI-Router',
  tagline: 'State based routing for client-side web apps',
  favicon: 'img/logo.svg',

  url: 'https://ui-router.github.io',
  baseUrl: process.env.DOCS_BASE_URL ?? '/',
  trailingSlash: false,

  // GitHub org and repository (ui-router/ui-router), used for GitHub links.
  organizationName: 'ui-router',
  projectName: 'ui-router',

  // Gate G4: broken links must fail the build.
  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: packages.flatMap(packagePlugins),

  presets: [
    [
      'classic',
      {
        // Default instance: general pages linked from the navbar. Not
        // versioned; only the About section has a sidebar. Served from the
        // site root so pages keep their current URLs (/about,
        // /about/features, /docs).
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars/default.ts',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        blog: false,
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Light theme only: the code theme (oneLight) has no dark counterpart yet.
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'UI-Router',
      style: 'dark',
      logo: {
        alt: 'UI-Router',
        src: 'img/logo.svg',
      },
      items: [
        {
          // Opens the first page of the About sidebar (About, then Features).
          type: 'docSidebar',
          sidebarId: 'about',
          position: 'left',
          label: 'About',
        },
        {
          // The API landing page, linking to each package.
          type: 'doc',
          docId: 'api',
          position: 'left',
          label: 'API',
        },
        {
          // Version picker for the package being read; hidden elsewhere
          // (src/theme/NavbarItem/PackageVersionNavbarItem.tsx).
          type: 'custom-packageVersion',
          position: 'right',
        },
        {
          href: 'https://github.com/ui-router/ui-router',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'light',
      copyright: 'UI-Router is released under the MIT License.',
    },
    prism: {
      theme: prismThemes.oneLight,
      darkTheme: prismThemes.oneLight,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
