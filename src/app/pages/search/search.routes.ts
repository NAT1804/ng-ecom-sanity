import { Routes } from '@angular/router';

export const searchRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import(
        '@pages/search/management-search-products/management-search-products.component'
      ).then((m) => m.ManagementSearchComponent),
  },
];
