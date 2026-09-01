import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-admin-dashboard',
    imports: [RouterLink, CommonModule],
    templateUrl: './admin-dashboard.component.html',
    styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
    stats = [

        {
            title: 'Total Sales',
            value: '₹1,25,500',
            icon: 'payments'
        },

        {
            title: 'Total Orders',
            value: '148',
            icon: 'shopping_bag'
        },

        {
            title: 'Products',
            value: '32',
            icon: 'inventory_2'
        },

        {
            title: 'Customers',
            value: '96',
            icon: 'people'
        }

    ];


    recentOrders = [

        {
            id: '#1001',
            customer: 'Selva Sree',
            amount: '₹899',
            status: 'Paid'
        },

        {
            id: '#1002',
            customer: 'Priya',
            amount: '₹499',
            status: 'Pending'
        },

        {
            id: '#1003',
            customer: 'Kavitha',
            amount: '₹1,299',
            status: 'Shipped'
        },

        {
            id: '#1004',
            customer: 'Rahul',
            amount: '₹699',
            status: 'Delivered'
        }
    ];
}
