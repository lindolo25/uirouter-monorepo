import type { ReactNode } from 'react';
import Heading from '@theme/Heading';
import PackageCards from '@site/src/components/PackageCards';
import { frameworks, hybrids } from '@site/src/data/packages';

// The home page's framework choice: one card per framework and hybrid package.
export default function FrameworkSelector(): ReactNode {
  return (
    <section aria-labelledby="choose-framework">
      <Heading as="h2" id="choose-framework">
        Choose your framework
      </Heading>
      <PackageCards packages={[...frameworks, ...hybrids]} />
    </section>
  );
}
