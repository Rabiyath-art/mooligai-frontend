import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../core/models/product.model';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';
import { ProductService } from '../../core/services/product.service';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-home',
    imports: [CommonModule, ProductCardComponent, RouterLink],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

    private readonly productService = inject(ProductService);
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

        console.log(
            'Add to cart:',
            product
        );

    }

    toggleWishlist(product: Product): void {

        console.log(
            'Wishlist:',
            product
        );

    }

}
