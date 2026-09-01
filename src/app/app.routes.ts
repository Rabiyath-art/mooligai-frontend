import { Routes } from '@angular/router';
import { authGuard } from './core/guard/auth.guard';
import { adminGuard } from './core/guard/admin.guard';

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
        path: 'admin',
        canActivate: [authGuard, adminGuard],
        loadComponent: () => import('./admin/layout/admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent),

        children: [

            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },

            {
                path: 'dashboard',

                loadComponent: () => import('./admin/dashboard/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
            },

            {
                path: 'products',
                loadComponent: () => import('./admin/products/admin-products/admin-products.component').then(m => m.AdminProductsComponent)
            },

            {
                path: 'categories',
                loadComponent: () => import('./admin/categories/admin-categories/admin-categories.component').then(m => m.AdminCategoriesComponent)
            },

            {
                path: 'orders',
                loadComponent: () => import('./admin/orders/admin-orders/admin-orders.component').then(m => m.AdminOrdersComponent)
            },

            {
                path: 'customers',
                loadComponent: () => import('./admin/customers/admin-customers/admin-customers.component').then(m => m.AdminCustomersComponent)
            }

        ]
    },

    {
        path: '**',
        redirectTo: ''
    }

];
