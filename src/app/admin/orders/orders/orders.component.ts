import {
    Component,
    OnInit,
    inject
} from '@angular/core';

import {
    CommonModule
} from '@angular/common';

import {
    RouterLink
} from '@angular/router';

import {
    OrderService
} from '../../../core/services/order.service';

import {
    Order
} from '../../../core/models/order.model';

@Component({
    selector: 'app-orders',
    imports: [
        CommonModule,
        RouterLink
    ],
    templateUrl: './orders.component.html',
    styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
    private readonly orderService =
        inject(OrderService);


    orders: Order[] = [];


    loading = false;


    errorMessage = '';


    // =====================================================
    // INIT
    // =====================================================

    ngOnInit(): void {

        this.loadOrders();

    }


    // =====================================================
    // LOAD ORDERS
    // =====================================================

    loadOrders(): void {

        this.loading = true;

        this.errorMessage = '';


        this.orderService
            .getMyOrders()
            .subscribe({

                next: (response) => {

                    this.orders =
                        response.data || [];

                    this.loading = false;

                },


                error: (error) => {

                    console.error(
                        'Failed to load orders',
                        error
                    );

                    this.errorMessage =
                        error?.error?.message ||
                        'Unable to load your orders.';

                    this.loading = false;

                }

            });

    }


    // =====================================================
    // FORMAT DATE
    // =====================================================

    formatDate(
        date: string
    ): string {

        return new Date(date)
            .toLocaleDateString(
                'en-IN',
                {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                }
            );

    }


    // =====================================================
    // ORDER STATUS CLASS
    // =====================================================

    getStatusClass(
        status: string
    ): string {

        return `status-${status}`;

    }


    // =====================================================
    // PAYMENT STATUS CLASS
    // =====================================================

    getPaymentStatusClass(
        status: string
    ): string {

        return `payment-${status}`;

    }


    // =====================================================
    // TOTAL ITEMS
    // =====================================================

    getTotalItems(
        order: Order
    ): number {

        return order.items.reduce(
            (
                total,
                item
            ) => total + item.quantity,
            0
        );

    }
}
