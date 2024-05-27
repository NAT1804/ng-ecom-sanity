import { Routes } from '@angular/router';
import { managementCategoryResolver } from '@resolve/management-category.resolver';
import { productDetailResolver } from '@resolve/product-detail.resolver';

export const categoryRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import(
        '@pages/categories/managemnet-categories/managemnet-categories.component'
      ).then((m) => m.ManagemnetCategoriesComponent),
    resolve: {
      categoryData: managementCategoryResolver,
    },
  },
];
