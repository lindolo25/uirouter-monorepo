import { BuilderFunction, StateObject } from '@uirouter/core';
import { loadComponent, loadNgModule } from '../lazyLoad/lazyLoadNgModule';

/**
 * This is a {@link StateBuilder.builder} function for ngModule lazy loading in Angular.
 *
 * When the {@link StateBuilder} builds a {@link StateObject} object from a raw {@link StateDeclaration}, this builder
 * decorates the `lazyLoad` property for states that have a {@link Ng2StateDeclaration.loadChildren} declaration.
 *
 * If the state has a {@link Ng2StateDeclaration.loadChildren}, it will create a `lazyLoad` function
 * that in turn calls `loadNgModule(loadNgModuleFn)`.
 *
 * #### Example:
 * A state that has a `ngModule`
 * ```js
 * var decl = {
 *   ngModule: () => import('./childModule.ts')
 * }
 * ```
 * would build a state with a `lazyLoad` function like:
 * ```js
 * import { loadNgModule } from "@uirouter/angular";
 * var decl = {
 *   lazyLoad: loadNgModule(() => import('./childModule.ts')
 * }
 * ```
 *
 * If the state has both a `ngModule:` *and* a `lazyLoad`, then the `lazyLoad` is run first.
 *
 * #### Example:
 * ```js
 * var decl = {
 *   lazyLoad: () => import('third-party-library'),
 *   ngModule: () => import('./childModule.ts')
 * }
 * ```
 * would build a state with a `lazyLoad` function like:
 * ```js
 * import { loadNgModule } from "@uirouter/angular";
 * var decl = {
 *   lazyLoad: () => import('third-party-library')
 *       .then(() => loadNgModule(() => import('./childModule.ts'))
 * }
 * ```
 *
 */
export function ng2LazyLoadBuilder(state: StateObject, _parent: BuilderFunction) {
  const loadComponentFn = state['loadComponent'];
  const loadNgModuleFn = state['loadChildren'];
  return loadComponentFn
    ? loadComponent(loadComponentFn)
    : loadNgModuleFn
      ? loadNgModule(loadNgModuleFn)
      : state.lazyLoad;
}
