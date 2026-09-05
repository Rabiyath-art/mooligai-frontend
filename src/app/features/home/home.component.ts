import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

import { Product } from '../../core/models/product.model';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';
import { ProductService } from '../../core/services/product.service';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
    selector: 'app-home',
    imports: [CommonModule, MatIconModule, FormsModule, NavbarComponent, ProductCardComponent, RouterLink],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

    private readonly productService = inject(ProductService);
    private readonly authService = inject(AuthService);
    private readonly cartService = inject(CartService);
    private readonly wishlistService = inject(WishlistService);
    private readonly router = inject(Router);

    products: Product[] = [];
    loading = false;
    errorMessage = '';

    ngOnInit(): void {
        this.loadProducts();
    }

    loadProducts(): void {
        this.loading = true;
        this.productService.getProducts({ page: 1, limit: 8 }).subscribe({
            next: (response) => {
                this.products = response.data;
                console.log('this.products', this.products);
                this.loading = false;
            },

            error: (error) => {
                console.error(error);
                this.errorMessage = 'Unable to load products.';
                this.loading = false;
            }
        });
    }

    addToCart(product: Product): void {
        if (!this.authService.isLoggedIn) {
            console.log('User is not logged in. Redirecting to login...');
            this.router.navigate(['/login']);
            return;
        }

        console.log('product._id', product._id);
        this.cartService.addToCart(product._id);
    }

    toggleWishlist(product: Product): void {
        if (!this.authService.isLoggedIn) {
            this.router.navigate(['/login']);
            return;
        }
        this.wishlistService.toggleWishlist(product._id);
    }
}
