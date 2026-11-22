import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// Prototype for the generator comparison in planning/DOCS_GENERATOR_SELECTION.md.
// This file runs in Node.js; do not use browser APIs here.

// Options applied on top of every package's own typedoc.json.
const typedocOptions = {
  // MDX treats { } and < > in doc comments as code; escape them.
  sanitizeComments: true,
  // Show the API sidebar on every generated page, including pages that are
  // not listed in the menu, so navigation is never interrupted.
  plugin: ['typedoc-plugin-frontmatter'],
  frontmatterGlobals: { displayed_sidebar: 'api' }
};

// One API section per package: id, the package's typedoc.json, output folder.
function apiReference(id: string, typedocJson: string) {
  return [
    'docusaurus-plugin-typedoc',
    {
      id: `api-${id}`,
      options: typedocJson,
      out: `./docs/api/${id}`,
      ...typedocOptions,
    },
  ];
}

const config: Config = {
  title: 'UI-Router',
  tagline: 'State-based routing for client-side web applications',

  url: 'https://ui-router.github.io',
  baseUrl: process.env.DOCS_BASE_URL ?? '/',
  trailingSlash: false,

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

  // Gate G2: API pages come from each package's existing typedoc.json and the
  // root-pinned TypeDoc. Only output settings are added here.
  plugins: [
    apiReference('core', '../core/typedoc.json'),
    apiReference('angular', '../frameworks/angular/uirouter-angular/typedoc.json'),
    apiReference('angular-hybrid', '../frameworks/angular-hybrid/uirouter-angular-hybrid/typedoc.json'),
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: false,
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'UI-Router',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'getStarted',
          position: 'left',
          label: 'Get started',
        },
        {
          // The API landing page; the API sidebar opens alongside it.
          type: 'doc',
          docId: 'api',
          position: 'left',
          label: 'API',
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
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
