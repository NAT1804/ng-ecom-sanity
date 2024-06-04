import { Routes } from '@angular/router';
import { managementCategoryResolver } from '@resolve/management-category.resolver';

export const categoryRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },
  {
    path: ':slug',
    loadComponent: () =>
      import(
        '@pages/categories/management-categories/management-categories.component'
      ).then((m) => m.ManagementCategoriesComponent),
    resolve: {
      categoryData: managementCategoryResolver,
    },
  },
];
