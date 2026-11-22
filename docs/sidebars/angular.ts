import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';
import { apiSection, category, hasId, page, typedocCategories } from './helpers';

const api = typedocCategories('angular');

const sidebars: SidebarsConfig = {
  main: [
    page('index', 'Overview'),
    page('getting-started', 'Getting started'),
    page('release-notes', 'Release notes'),
    // Angular re-exports Core, and Core's tags come along with it. Angular's
    // own symbols are tagged in its source; the Core symbols this menu needs
    // are picked here.
    apiSection('API reference', [
      category('UIRouter', [page('api/classes/UIRouter', 'UIRouter'), ...api['UIRouter']]),
      category(
        'Services',
        api['Services'].filter((item) => !hasId(item, 'api/classes/ViewService')),
      ),
      category('Components', api['Components']),
      category('Standalone', api['Standalone']),
      category('Other', [
        page('api/classes/Transition', 'Transition'),
        page('api/classes/Trace', 'Trace'),
      ]),
    ]),
  ],
};

export default sidebars;
