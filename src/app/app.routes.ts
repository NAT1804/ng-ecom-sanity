import { Routes } from '@angular/router';
import { MainLayoutComponent } from '@components/layouts/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: () =>
          import('@pages/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('@pages/products/products.routes').then((m) => m.productRoutes),
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('@pages/categories/categories.routes').then((m) => m.categoryRoutes),
      },
    ],
  },
];
