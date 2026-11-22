import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

// Home page, also the starting point for new users. The framework selector is
// a later prototype step.
export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout description={siteConfig.tagline}>
      <main className="container margin-vert--xl">
        <Heading as="h1">{siteConfig.title}</Heading>
        <p>{siteConfig.tagline}</p>
        <div className="margin-top--md">
          <Link className="button button--primary button--lg margin-right--md" to="/about">
            About UI-Router
          </Link>
          <Link className="button button--secondary button--lg" to="/docs">
            API reference
          </Link>
        </div>
      </main>
    </Layout>
  );
}
