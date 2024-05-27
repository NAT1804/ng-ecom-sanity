import { Routes } from '@angular/router';
// import { ProductDetailComponent } from '@pages/products/product-detail/product-detail.component';
import { productDetailResolver } from '@resolve/product-detail.resolver';

export const productRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@pages/products/product-detail/product-detail.component').then(
        (m) => m.ProductDetailComponent
      ),
    resolve: {
      productDetail: productDetailResolver
    }
  },
];
