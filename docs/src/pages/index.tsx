import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import FrameworkSelector from '@site/src/components/FrameworkSelector';

// Home page and the starting point for new users: a short introduction and a
// framework choice that leads to each framework's guide and API reference.
export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout description={siteConfig.tagline}>
      <header className="hero hero--primary">
        <div className="container">
          <Heading as="h1" className="hero__title">
            {siteConfig.title}
          </Heading>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <p>
            UI-Router models an application as a tree of states. Each state can
            define a URL, views, and the data it needs, and UI-Router manages the
            transitions between them.
          </p>
          <Link className="button button--secondary button--lg" to="/about">
            Learn about UI-Router
          </Link>
        </div>
      </header>
      <main className="container margin-vert--xl">
        <FrameworkSelector />
        <p>
          Building on UI-Router directly, or looking for more features? See{' '}
          <Link to="/core">UI-Router Core</Link> and the <Link to="/plugins">plugins</Link>.
        </p>
      </main>
    </Layout>
  );
}
