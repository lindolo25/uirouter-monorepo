import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

// Placeholder landing page. The framework selector is a later prototype step.
export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout description={siteConfig.tagline}>
      <main className="container margin-vert--xl">
        <Heading as="h1">{siteConfig.title}</Heading>
        <p>{siteConfig.tagline}</p>
        <Link className="button button--primary button--lg" to="/docs/get-started">
          Get started
        </Link>
      </main>
    </Layout>
  );
}
