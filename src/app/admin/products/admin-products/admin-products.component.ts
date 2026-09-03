import {
    Component,
    OnInit,
    inject
} from '@angular/core';

import {
    CommonModule
} from '@angular/common';

import {
    AdminProductService
} from '../../../core/services/admin-product.service';

import {
    Product
} from '../../../core/models/product.model';

import {
    AdminProductDetailComponent
} from '../admin-product-detail/admin-product-detail.component';

import {
    AdminProductCreateComponent
} from '../admin-product-create/admin-product-create.component';

import {
    AdminProductEditComponent
} from '../admin-product-edit/admin-product-edit.component';


@Component({
    selector: 'app-admin-products',

    imports: [
        CommonModule,
        AdminProductDetailComponent,
        AdminProductCreateComponent,
        AdminProductEditComponent
    ],

    templateUrl:
        './admin-products.component.html',

    styleUrl:
        './admin-products.component.scss'
})
export class AdminProductsComponent
    implements OnInit {


    // =====================================================
    // SERVICE
    // =====================================================

    private readonly productService =
        inject(AdminProductService);



    // =====================================================
    // PRODUCTS
    // =====================================================

    products: Product[] = [];


    loading = false;

    errorMessage = '';



    // =====================================================
    // PAGINATION
    // =====================================================

    currentPage = 1;

    limit = 10;

    total = 0;

    totalPages = 0;



    // =====================================================
    // POPUPS
    // =====================================================

    showDetailModal = false;

    showCreateModal = false;

    showEditModal = false;

    showDeleteModal = false;



    // =====================================================
    // SELECTED PRODUCT
    // =====================================================

    selectedProduct:
        Product | null = null;



    // =====================================================
    // LOADING STATES
    // =====================================================

    updatingProductId:
        string | null = null;

    deleting = false;



    // =====================================================
    // INIT
    // =====================================================

    ngOnInit(): void {

        this.loadProducts();

    }



    // =====================================================
    // LOAD PRODUCTS
    // =====================================================

    loadProducts(): void {

        this.loading = true;

        this.errorMessage = '';


        this.productService
            .getProducts({
                page: this.currentPage,
                limit: this.limit
            })
            .subscribe({

                next: (response) => {

                    console.log(
                        'Admin products response:',
                        response
                    );


                    this.products =
                        response.data || [];


                    if (response.pagination) {

                        this.total =
                            response.pagination.total;

                        this.currentPage =
                            response.pagination.page;

                        this.limit =
                            response.pagination.limit;

                        this.totalPages =
                            response.pagination.totalPages;

                    }


                    this.loading = false;

                },


                error: (error) => {

                    console.error(
                        'Admin products error:',
                        error
                    );


                    this.errorMessage =
                        error.error?.message ||
                        'Failed to load products';


                    this.loading = false;

                }

            });

    }



    // =====================================================
    // OPEN DETAIL
    // =====================================================

    openDetail(
        product: Product
    ): void {

        console.log(
            'Opening detail popup:',
            product
        );


        this.closeAllPopups();


        this.selectedProduct =
            product;


        this.showDetailModal =
            true;

    }



    // =====================================================
    // CLOSE DETAIL
    // =====================================================

    closeDetail(): void {

        this.showDetailModal =
            false;

        this.selectedProduct =
            null;

    }



    // =====================================================
    // OPEN CREATE
    // =====================================================

    openCreate(): void {

        console.log(
            'Opening create popup'
        );


        this.closeAllPopups();


        this.selectedProduct =
            null;


        this.showCreateModal =
            true;

    }



    // =====================================================
    // CLOSE CREATE
    // =====================================================

    closeCreate(): void {

        this.showCreateModal =
            false;

    }



    // =====================================================
    // PRODUCT CREATED
    // =====================================================

    onProductCreated(
        createdProduct?: Product
    ): void {

        console.log(
            'Product created:',
            createdProduct
        );


        this.showCreateModal =
            false;


        this.selectedProduct =
            null;


        this.currentPage =
            1;


        this.loadProducts();

    }



    // =====================================================
    // OPEN EDIT
    // =====================================================

    openEdit(
        product: Product
    ): void {

        console.log(
            'Opening edit popup:',
            product
        );


        /*
         * IMPORTANT:
         *
         * We DO NOT use router.navigate()
         * here.
         *
         * We DO NOT use routerLink.
         *
         * We only switch popup state.
         */


        this.showDetailModal =
            false;


        this.showCreateModal =
            false;


        this.selectedProduct =
            product;


        this.showEditModal =
            true;

    }



    // =====================================================
    // CLOSE EDIT
    // =====================================================

    closeEdit(): void {

        this.showEditModal =
            false;

        this.selectedProduct =
            null;

    }



    // =====================================================
    // PRODUCT UPDATED
    // =====================================================

    onProductUpdated(
        updatedProduct: Product
    ): void {

        console.log(
            'Product updated:',
            updatedProduct
        );


        /*
         * Find product in table.
         */

        const index =
            this.products.findIndex(
                item =>
                    item._id ===
                    updatedProduct._id
            );


        /*
         * Update table.
         */

        if (index !== -1) {

            this.products[index] =
                updatedProduct;

        }


        /*
         * Close edit popup.
         */

        this.showEditModal =
            false;


        this.selectedProduct =
            null;

    }



    // =====================================================
    // PRODUCT STATUS CHANGED FROM DETAIL
    // =====================================================

    onProductStatusChanged(
        updatedProduct: Product
    ): void {

        console.log(
            'Product status changed:',
            updatedProduct
        );


        const index =
            this.products.findIndex(
                item =>
                    item._id ===
                    updatedProduct._id
            );


        if (index !== -1) {

            this.products[index] =
                updatedProduct;

        }


        /*
         * Keep detail popup open.
         */

        this.selectedProduct =
            updatedProduct;

    }



    // =====================================================
    // OPEN DELETE
    // =====================================================

    openDelete(
        product: Product
    ): void {

        console.log(
            'Opening delete popup:',
            product
        );


        this.closeAllPopups();


        this.selectedProduct =
            product;


        this.showDeleteModal =
            true;

    }



    // =====================================================
    // CLOSE DELETE
    // =====================================================

    closeDelete(): void {

        this.showDeleteModal =
            false;

        this.selectedProduct =
            null;

    }



    // =====================================================
    // CONFIRM DELETE
    // =====================================================

    confirmDelete(): void {

        if (
            !this.selectedProduct ||
            this.deleting
        ) {

            return;

        }


        const product =
            this.selectedProduct;


        this.deleting =
            true;


        this.productService
            .deleteProduct(
                product._id
            )
            .subscribe({

                next: () => {

                    console.log(
                        'Product deleted successfully'
                    );


                    this.deleting =
                        false;


                    this.showDeleteModal =
                        false;


                    this.selectedProduct =
                        null;


                    /*
                     * Reload products.
                     */

                    this.loadProducts();

                },


                error: (error) => {

                    console.error(
                        'Delete product error:',
                        error
                    );


                    this.deleting =
                        false;


                    alert(
                        error.error?.message ||
                        'Failed to delete product'
                    );

                }

            });

    }



    // =====================================================
    // TOGGLE STATUS
    // =====================================================

    toggleStatus(
        product: Product
    ): void {

        if (
            this.updatingProductId ===
            product._id
        ) {

            return;

        }


        const newStatus =
            !product.isActive;


        this.updatingProductId =
            product._id;


        this.productService
            .updateProductStatus(
                product._id,
                newStatus
            )
            .subscribe({

                next: (response) => {

                    console.log(
                        'Status updated:',
                        response
                    );


                    if (response.data) {

                        const index =
                            this.products.findIndex(
                                item =>
                                    item._id ===
                                    product._id
                            );


                        if (index !== -1) {

                            this.products[index] =
                                response.data;

                        }


                        /*
                         * If detail popup is open
                         * for this product, update it.
                         */

                        if (
                            this.selectedProduct?._id ===
                            product._id
                        ) {

                            this.selectedProduct =
                                response.data;

                        }

                    }


                    this.updatingProductId =
                        null;

                },


                error: (error) => {

                    console.error(
                        'Status update error:',
                        error
                    );


                    this.updatingProductId =
                        null;


                    alert(
                        error.error?.message ||
                        'Failed to update status'
                    );

                }

            });

    }



    // =====================================================
    // CLOSE ALL POPUPS
    // =====================================================

    private closeAllPopups(): void {

        this.showDetailModal =
            false;

        this.showCreateModal =
            false;

        this.showEditModal =
            false;

        this.showDeleteModal =
            false;

    }



    // =====================================================
    // NEXT PAGE
    // =====================================================

    nextPage(): void {

        if (
            this.currentPage <
            this.totalPages
        ) {

            this.currentPage++;

            this.loadProducts();

        }

    }



    // =====================================================
    // PREVIOUS PAGE
    // =====================================================

    previousPage(): void {

        if (
            this.currentPage >
            1
        ) {

            this.currentPage--;

            this.loadProducts();

        }

    }

}