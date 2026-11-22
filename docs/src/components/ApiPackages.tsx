import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';

type ApiPackage = {
  name: string;
  description: string;
  versionLine: string;
  // Docs path of the package's API section; omitted until it is generated.
  to?: string;
};

type ApiGroup = { title: string; packages: ApiPackage[] };

const groups: ApiGroup[] = [
  {
    title: 'Core',
    packages: [
      {
        name: '@uirouter/core',
        description: 'Framework-independent, state-based routing that every UI-Router package builds on.',
        versionLine: '6.x',
        to: '/core/api',
      },
    ],
  },
  {
    title: 'Frameworks',
    packages: [
      {
        name: '@uirouter/angular',
        description: 'State-based routing for Angular.',
        versionLine: '22.x',
        to: '/angular/api',
      },
      {
        name: '@uirouter/angularjs',
        description: 'State-based routing for AngularJS 1.x.',
        versionLine: '1.x',
      },
      {
        name: '@uirouter/react',
        description: 'State-based routing for React.',
        versionLine: '1.x',
      },
    ],
  },
  {
    title: 'Hybrid applications',
    packages: [
      {
        name: '@uirouter/angular-hybrid',
        description: 'Route to both AngularJS and Angular components while migrating to Angular.',
        versionLine: '22.x',
        to: '/angular-hybrid/api',
      },
      {
        name: '@uirouter/react-hybrid',
        description: 'Route to both AngularJS and React components while migrating to React.',
        versionLine: '3.x',
      },
    ],
  },
  {
    title: 'Plugins',
    packages: [
      {
        name: '@uirouter/dsr',
        description: 'Deep State Redirect: return to the most recently activated child state.',
        versionLine: '1.x',
      },
      {
        name: '@uirouter/sticky-states',
        description: 'Keep states and their components alive while another state is active.',
        versionLine: '1.x',
      },
      {
        name: '@uirouter/rx',
        description: 'Reactive extensions for UI-Router.',
        versionLine: '1.x',
      },
      {
        name: '@uirouter/redux',
        description: 'Redux bindings for UI-Router.',
        versionLine: '1.x',
      },
      {
        name: '@uirouter/visualizer',
        description: 'State tree and transition visualizer.',
        versionLine: '7.x',
      },
    ],
  },
];

function PackageCard({ pkg }: { pkg: ApiPackage }): ReactNode {
  const body = (
    <div className="card__body">
      <h3 className="margin-bottom--xs">{pkg.name}</h3>
      <p className="margin-bottom--sm">{pkg.description}</p>
      <small>
        {pkg.versionLine}
        {pkg.to ? '' : ' · API reference coming soon'}
      </small>
    </div>
  );
  return (
    <div className="col col--6 margin-bottom--lg">
      {pkg.to ? (
        <Link className="card shadow--md" to={pkg.to} style={{ height: '100%' }}>
          {body}
        </Link>
      ) : (
        <div className="card" style={{ height: '100%', opacity: 0.7 }}>
          {body}
        </div>
      )}
    </div>
  );
}

export default function ApiPackages(): ReactNode {
  return (
    <>
      {groups.map((group) => (
        <section key={group.title}>
          <h2>{group.title}</h2>
          <div className="row">
            {group.packages.map((pkg) => (
              <PackageCard key={pkg.name} pkg={pkg} />
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
