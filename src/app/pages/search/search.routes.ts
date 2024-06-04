import { Routes } from '@angular/router';
import { managementSearchResolver } from '@resolve/management-search.resolver';

export const searchRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import(
        '@pages/search/management-search-products/management-search-products.component'
      ).then((m) => m.ManagementSearchComponent),
    // resolve: {
    //   searchProductsData: managementSearchResolver,
    // },
  },
];
