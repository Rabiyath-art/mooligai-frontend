import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-admin-layout',
    imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
    templateUrl: './admin-layout.component.html',
    styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {
    menuItems = [

        {
            label: 'Dashboard',
            icon: 'dashboard',
            route: '/admin/dashboard'
        },

        {
            label: 'Products',
            icon: 'inventory_2',
            route: '/admin/products'
        },

        {
            label: 'Categories',
            icon: 'category',
            route: '/admin/categories'
        },

        {
            label: 'Orders',
            icon: 'shopping_bag',
            route: '/admin/orders'
        },

        {
            label: 'Customers',
            icon: 'people',
            route: '/admin/customers'
        },

        {
            label: 'Settings',
            icon: 'settings',
            route: '/admin/settings'
        }

    ];
}
