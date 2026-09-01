import {
    Injectable,
    inject
} from '@angular/core';

import {
    HttpClient
} from '@angular/common/http';

import {
    Observable
} from 'rxjs';

import {
    environment
} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    private readonly http =
        inject(HttpClient);

    private readonly apiUrl =
        `${environment.apiUrl}/orders`;


    createOrder(
        addressId: string
    ): Observable<any> {

        return this.http.post(
            this.apiUrl,
            {
                addressId
            },
            {
                withCredentials: true
            }
        );

    }


    getMyOrders(): Observable<any> {

        return this.http.get(
            this.apiUrl,
            {
                withCredentials: true
            }
        );

    }


    getOrderById(
        orderId: string
    ): Observable<any> {

        return this.http.get(
            `${this.apiUrl}/${orderId}`,
            {
                withCredentials: true
            }
        );

    }

}