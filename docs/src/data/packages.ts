import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

// The public packages as shown on the home page and the section landing pages
// (Frameworks, Hybrid, Plugins). Version lines are not listed here: they come
// from each package.json at build time (docusaurus.config.ts
// customFields.versionLines).
export type PackageEntry = {
  id: string; // tools/packages.json id
  name: string; // npm package name
  title: string; // display name
  description: string;
  docs?: string; // the package's docs in this site (its Getting started page)
  api?: string; // the package's API reference in this site
  externalDocs?: string; // current documentation outside this site, if any
};

export const core: PackageEntry = {
  id: 'core',
  name: '@uirouter/core',
  title: 'Core',
  description: 'Framework-independent, state-based routing that every UI-Router package builds on.',
  docs: '/core',
  api: '/core/api',
};

export const frameworks: PackageEntry[] = [
  {
    id: 'angular',
    name: '@uirouter/angular',
    title: 'Angular',
    description: 'State-based routing for Angular.',
    docs: '/frameworks/angular',
    api: '/frameworks/angular/api',
  },
  {
    id: 'angularjs',
    name: '@uirouter/angularjs',
    title: 'AngularJS',
    description: 'State-based routing for AngularJS 1.x.',
    externalDocs: 'https://ui-router.github.io/ng1/',
  },
  {
    id: 'react',
    name: '@uirouter/react',
    title: 'React',
    description: 'State-based routing for React.',
    docs: '/frameworks/react',
    api: '/frameworks/react/api',
  },
];

export const hybrids: PackageEntry[] = [
  {
    id: 'angular-hybrid',
    name: '@uirouter/angular-hybrid',
    title: 'Angular Hybrid',
    description: 'Route to both AngularJS and Angular components while migrating to Angular.',
    docs: '/hybrid/angular',
    api: '/hybrid/angular/api',
  },
  {
    id: 'react-hybrid',
    name: '@uirouter/react-hybrid',
    title: 'React Hybrid',
    description: 'Route to both AngularJS and React components while migrating to React.',
    externalDocs:
      'https://github.com/ui-router/ui-router/tree/main/frameworks/react-hybrid/uirouter-react-hybrid#readme',
  },
];

export const plugins: PackageEntry[] = [
  {
    id: 'dsr',
    name: '@uirouter/dsr',
    title: 'Deep State Redirect',
    description: 'Return to the most recently activated child state.',
  },
  {
    id: 'sticky-states',
    name: '@uirouter/sticky-states',
    title: 'Sticky States',
    description: 'Keep states and their components alive while another state is active.',
  },
  {
    id: 'rx',
    name: '@uirouter/rx',
    title: 'Rx',
    description: 'Reactive extensions for UI-Router.',
  },
  {
    id: 'redux',
    name: '@uirouter/redux',
    title: 'Redux',
    description: 'Redux bindings for UI-Router.',
  },
  {
    id: 'visualizer',
    name: '@uirouter/visualizer',
    title: 'Visualizer',
    description: 'State tree and transition visualizer.',
  },
];

// "22.x" for a package id, read from package.json at build time.
export function useVersionLine(id: string): string | undefined {
  const { siteConfig } = useDocusaurusContext();
  const versionLines = siteConfig.customFields?.versionLines as Record<string, string> | undefined;
  return versionLines?.[id];
}
