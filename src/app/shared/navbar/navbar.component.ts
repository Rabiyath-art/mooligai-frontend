import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-navbar',
    imports: [RouterLink, RouterLinkActive],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

    private readonly cartService = inject(CartService);
    private readonly wishlistService = inject(WishlistService);
    private readonly authService = inject(AuthService);

    cartCount = 0;
    wishlistCount = 0;
    isLoggedIn = false;

    ngOnInit(): void {

        this.authService.isLoggedIn$.subscribe(loggedIn => {
            this.isLoggedIn = loggedIn;
        });

        this.cartService.cartCount$.subscribe(count => {
            this.cartCount = count;
        });

        this.wishlistService.wishlistCount$.subscribe(count => {
            this.wishlistCount = count;
        });

        this.loadCartCount();
        this.loadWishlistCount();
    }

    private loadCartCount(): void {
        this.cartService.getCart().subscribe({
            next: (response) => {
                this.cartService.updateCartCount(response.data);
            },

            error: () => {
                // User may not be logged in.
                this.cartCount = 0;
            }
        });
    }

    private loadWishlistCount(): void {
        this.wishlistService.getWishlist().subscribe({
            next: (response) => {
                this.wishlistService.updateWishlistCount(response.data);
            },

            error: () => {
                this.wishlistCount = 0;
            }
        });
    }

    logout(): void {

        this.authService
            .handleLogout();

    }
}
