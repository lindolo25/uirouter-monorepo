import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

// Default docs instance (general, unversioned pages). Only the About section
// has a sidebar; other general pages, such as the API landing page, are not in
// any sidebar and render without one. Package docs have their own sidebars in
// sidebars/<package>.ts.
const sidebars: SidebarsConfig = {
  about: ['about/index', 'about/features'],
};

export default sidebars;
