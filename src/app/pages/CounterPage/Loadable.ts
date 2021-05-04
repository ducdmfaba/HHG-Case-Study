/**
 *
 * Asynchronously loads the component for CounterPage
 *
 */

import { lazyLoad } from 'utils/loadable';

export const CounterPage = lazyLoad(
  () => import('./index'),
  module => module.CounterPage,
);
