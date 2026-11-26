import { LocationConfig, LocationServices } from '../common/coreservices';
import { UIRouterPlugin } from '../interface';
import { $InjectorLike, $QLike } from '../common/index';

/** A plugin that provides the router's location service and location configuration. */
export interface LocationPlugin extends UIRouterPlugin {
  service: LocationServices;
  configuration: LocationConfig;
}

/** A plugin that provides the `$q` and `$injector` services used by the router. */
export interface ServicesPlugin extends UIRouterPlugin {
  $q: $QLike;
  $injector: $InjectorLike;
}

export interface LocationLike {
  hash: string;
  pathname: string;
  search: string;
}

export interface HistoryLike {
  back(distance?: any): void;
  forward(distance?: any): void;
  pushState(statedata: any, title?: string, url?: string): void;
  replaceState(statedata: any, title?: string, url?: string): void;
}
