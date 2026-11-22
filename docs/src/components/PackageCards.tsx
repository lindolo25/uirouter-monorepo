import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import { useVersionLine, type PackageEntry } from '@site/src/data/packages';

function PackageCard({ pkg }: { pkg: PackageEntry }): ReactNode {
  const versionLine = useVersionLine(pkg.id);
  const headingId = `package-${pkg.id}`;
  const hasLinks = pkg.docs || pkg.api || pkg.externalDocs;
  return (
    <div className="col col--4 margin-bottom--lg">
      <article className="card shadow--md" style={{ height: '100%' }} aria-labelledby={headingId}>
        <div className="card__body">
          {/* Plain heading: the theme Heading adds an anchor link to each card. */}
          <h3 id={headingId} className="margin-bottom--xs">
            {pkg.title}
          </h3>
          <p className="margin-bottom--xs">{pkg.description}</p>
          <small>
            <code>{pkg.name}</code> {versionLine}
          </small>
        </div>
        <div className="card__footer">
          {hasLinks ? (
            <div className="button-group button-group--block">
              {pkg.docs && (
                <Link className="button button--primary button--sm" to={pkg.docs}>
                  Get started
                </Link>
              )}
              {pkg.api && (
                <Link className="button button--secondary button--sm" to={pkg.api}>
                  API reference
                </Link>
              )}
              {!pkg.docs && pkg.externalDocs && (
                <Link className="button button--secondary button--sm" href={pkg.externalDocs}>
                  Current documentation
                </Link>
              )}
            </div>
          ) : (
            <small>Documentation coming soon</small>
          )}
        </div>
      </article>
    </div>
  );
}

// A row of package cards: name, description, version line, and links to the
// package's docs. Used on the home page and the section landing pages.
export default function PackageCards({ packages }: { packages: PackageEntry[] }): ReactNode {
  return (
    <div className="row">
      {packages.map((pkg) => (
        <PackageCard key={pkg.id} pkg={pkg} />
      ))}
    </div>
  );
}
