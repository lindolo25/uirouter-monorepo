import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'UI-Router',
  tagline: 'State based routing for client-side web apps',
  favicon: 'img/logo.svg',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'UI-Router', // Usually your GitHub org/user name.
  projectName: 'UI-Router', // Usually your repo name.
  onBrokenLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts'
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      "docusaurus-plugin-typedoc",
      {
        id: "api-core",
        entryPoints: ["../core/src/index.ts"],
        tsconfig: "../core/tsconfig.docgen.json",
        out: "docs/api/core",
        sanitizeComments: true,
        excludeExternals: true,
        excludeNotDocumented: false,
        excludeInternal: true,
        excludePrivate: true,
        excludePrivateClassFields: true,
        excludeProtected: true,
        excludeReferences: true,
        excludeCategories: true
      }
    ],
    [
      "docusaurus-plugin-typedoc",
      {
        id: "api-angular",
        entryPoints: ["../frameworks/angular/uirouter-angular/src/index.ts"],
        tsconfig: "./frameworks/angular/uirouter-angular/tsconfig.docgen.json",
        out: "docs/api/angular",
        sanitizeComments: true,
        excludeExternals: true,
        excludeNotDocumented: false,
        excludeInternal: true,
        excludePrivate: true,
        excludePrivateClassFields: true,
        excludeProtected: true,
        excludeReferences: true,
        excludeCategories: true
      }
    ]
  ],

  themeConfig: {
    colorMode: {
      defaultMode: "light",
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
          type: 'docSidebar',
          sidebarId: 'gettingStartedSidebar',
          position: 'left',
          label: 'Getting started',
        },
        {
          type: "docSidebar",
          sidebarId: "apiSidebar",
          position: "left",
          label: "API"
        }
      ],
    },
    footer: {
      style: 'light',
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.oneLight,
      darkTheme: prismThemes.oneLight,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
