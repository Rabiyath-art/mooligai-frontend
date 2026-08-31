import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Wishlist } from '../models/wishlist.model';

@Injectable({
    providedIn: 'root'
})
export class WishlistService {

    private readonly http = inject(HttpClient);
    private readonly apiUrl = `${environment.apiUrl}/wishlist`;
    private readonly wishlistCountSubject = new BehaviorSubject<number>(0);
    readonly wishlistCount$ = this.wishlistCountSubject.asObservable();

    getWishlist(): Observable<{ success: boolean; data: Wishlist; }> {
        return this.http.get<{
            success: boolean;
            data: Wishlist;
        }>(
            this.apiUrl,
            {
                withCredentials: true
            }
        );

    }


    toggleWishlist(productId: string): Observable<{ success: boolean; data: Wishlist; }> {
        return this.http.post<{
            success: boolean;
            data: Wishlist;
        }>(
            `${this.apiUrl}/toggle`,
            {
                productId
            },
            {
                withCredentials: true
            }
        );
    }


    updateWishlistCount(wishlist: Wishlist): void {
        this.wishlistCountSubject.next(wishlist.products.length);
    }
}