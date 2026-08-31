import { Routes } from '@angular/router';
import { authGuard } from './core/guard/auth.guard';

export const routes: Routes = [

    {
        path: '',
        loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
    },

    {
        path: 'products',
        loadComponent: () => import('./features/products/products.component').then(m => m.ProductsComponent)
    },

    {
        path: 'products/:id',
        loadComponent: () => import('./features/products/product-details/product-details.component').then(m => m.ProductDetailsComponent)
    },

    {
        path: 'cart',
        canActivate: [authGuard],
        loadComponent: () => import('./features/cart/cart.component').then(m => m.CartComponent)
    },

    {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
    },

    {
        path: 'checkout',
        canActivate: [authGuard],
        loadComponent: () => import('./features/checkout/checkout.component').then(m => m.CheckoutComponent)
    },

    {
        path: '**',
        redirectTo: ''
    }

];
