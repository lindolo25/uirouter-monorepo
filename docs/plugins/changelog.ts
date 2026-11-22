import fs from 'fs';
import path from 'path';
import type { LoadContext, Plugin } from '@docusaurus/types';

export type ChangelogOptions = {
  id: string;
  // Package CHANGELOG.md, relative to the site directory.
  source: string;
  // Generated page, relative to the site directory (ignored by Git).
  target: string;
  title: string;
  // Sidebar to show on the page (front matter displayed_sidebar).
  sidebar: string;
};

// Release notes come straight from each package's CHANGELOG.md (written by the
// release tooling), so they are never copied by hand. The page is regenerated
// on every build, before the docs plugins read their content.
export default function changelogPage(context: LoadContext, pluginOptions: unknown): Plugin {
  const options = pluginOptions as ChangelogOptions;
  const source = path.resolve(context.siteDir, options.source);
  const target = path.resolve(context.siteDir, options.target);

  // Demote every heading one level so the page has a single h1 (the title),
  // outside code blocks.
  let inFence = false;
  const body = fs
    .readFileSync(source, 'utf8')
    .split('\n')
    .map((line) => {
      if (line.startsWith('```')) inFence = !inFence;
      if (inFence) return line;
      // Old entries have links with no URL, e.g. "[0.1.2]()"; keep the text.
      const text = line.replace(/\[([^\]]*)\]\(\)/g, '$1');
      return /^#{1,5} /.test(text) ? `#${text}` : text;
    })
    .join('\n');

  const frontMatter = [
    '---',
    `title: ${JSON.stringify(options.title)}`,
    'sidebar_label: Release notes',
    `displayed_sidebar: ${options.sidebar}`,
    'toc_max_heading_level: 2',
    // Changelogs are plain Markdown, not MDX (text like `<base>` is not JSX).
    'mdx:',
    '  format: md',
    '---',
    '',
  ].join('\n');

  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, `${frontMatter}\n# ${options.title}\n\n${body}`);

  return { name: `changelog-page-${options.id}` };
}
