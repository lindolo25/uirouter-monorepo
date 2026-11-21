import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// Prototype for the generator comparison in planning/DOCS_GENERATOR_SELECTION.md.
// This file runs in Node.js; do not use browser APIs here.

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
