import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

// Docusaurus's own sidebar item type (one entry of a sidebar's item list).
export type SidebarItem = Extract<SidebarsConfig[string], unknown[]>[number];
type GeneratedCategory = { label: string; items: SidebarItem[] };

// TypeDoc writes one sidebar per package (packages/<id>/api/typedoc-sidebar.cjs),
// grouped by the @category tags in the source. Untagged symbols land in
// "Unlisted" (each package's typedoc.json defaultCategory): their pages are
// still built and linkable, just not listed. Item ids are relative to the
// package instance, e.g. "api/classes/StateService".
export function typedocCategories(pkg: string): Record<string, SidebarItem[]> {
  const generated: GeneratedCategory[] = require(`../packages/${pkg}/api/typedoc-sidebar.cjs`);
  return Object.fromEntries(generated.map((c) => [c.label, c.items]));
}

export function listedCategories(categories: Record<string, SidebarItem[]>): SidebarItem[] {
  return Object.entries(categories)
    .filter(([label]) => label !== 'Unlisted')
    .map(([label, items]) => category(label, items));
}

export function page(id: string, label: string): SidebarItem {
  return { type: 'doc', id, label };
}

export function category(label: string, items: SidebarItem[]): SidebarItem {
  return { type: 'category', label, items };
}

export function apiSection(label: string, items: SidebarItem[]): SidebarItem {
  return { type: 'category', label, link: { type: 'doc', id: 'api/index' }, items };
}

export function hasId(item: SidebarItem, id: string): boolean {
  return typeof item === 'object' && 'id' in item && item.id === id;
}
