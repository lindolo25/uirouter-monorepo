import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';
import { apiSection, listedCategories, page, typedocCategories } from './helpers';

const api = typedocCategories('core');

const sidebars: SidebarsConfig = {
  main: [
    page('index', 'Overview'),
    page('release-notes', 'Release notes'),
    apiSection('API reference', [
      // The router entry point, listed on its own above the categories.
      page('api/classes/UIRouter', 'UIRouter'),
      ...listedCategories(api),
    ]),
  ],
};

export default sidebars;
