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
        '@pages/categories/managemnet-categories/managemnet-categories.component'
      ).then((m) => m.ManagemnetCategoriesComponent),
    resolve: {
      categoryData: managementCategoryResolver,
    },
  },
];
