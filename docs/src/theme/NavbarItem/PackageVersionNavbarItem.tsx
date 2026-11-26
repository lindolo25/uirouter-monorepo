import type { ReactNode } from 'react';
import { useActivePlugin } from '@docusaurus/plugin-content-docs/client';
import DocsVersionDropdownNavbarItem from '@theme/NavbarItem/DocsVersionDropdownNavbarItem';
import type { Props } from '@theme/NavbarItem/DocsVersionDropdownNavbarItem';

// Version picker for the package being read. Each package is its own docs
// instance with its own version line, so the built-in dropdown (tied to one
// instance) is rendered for whichever package instance the page belongs to.
// The default instance (general, unversioned pages) and non-docs pages show
// nothing.
export default function PackageVersionNavbarItem({
  // Custom navbar types skip Docusaurus's config validation, so the defaults
  // it would add for a built-in `docsVersionDropdown` item are set here.
  dropdownItemsBefore = [],
  dropdownItemsAfter = [],
  dropdownActiveClassDisabled = false,
  ...props
}: Omit<Props, 'docsPluginId'>): ReactNode {
  const activePlugin = useActivePlugin();
  if (!activePlugin || activePlugin.pluginId === 'default') {
    return null;
  }
  return (
    <DocsVersionDropdownNavbarItem
      {...props}
      dropdownItemsBefore={dropdownItemsBefore}
      dropdownItemsAfter={dropdownItemsAfter}
      dropdownActiveClassDisabled={dropdownActiveClassDisabled}
      docsPluginId={activePlugin.pluginId}
    />
  );
}
