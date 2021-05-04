/**
 *
 * Asynchronously loads the component for EmployeesPage
 *
 */

import { lazyLoad } from 'utils/loadable';

export const EmployeesPage = lazyLoad(
  () => import('./index'),
  module => module.EmployeesPage,
);
