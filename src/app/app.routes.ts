import { Routes } from '@angular/router';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
import { MainPageComponent } from './shared/main-page/main-page.component';
import { CartPageComponent } from './shared/cart-page/cart-page.component';
import { ProductPageComponent } from './shared/product-page/product-page.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: MainPageComponent, pathMatch: 'full' },
      { path: 'product/:id', component: ProductPageComponent },
      { path: 'cart', component: CartPageComponent },
    ],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/shared/admin.module').then((m) => m.AdminModule),
  },
];
