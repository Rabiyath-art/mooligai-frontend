import {
  Component,
  OnInit,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  Router,
  RouterLink
} from '@angular/router';

import {
  CartService
} from '../../core/services/cart.service';

import {
  AddressService
} from '../../core/services/address.service';

import {
  Cart
} from '../../core/models/cart.model';

import {
  Address
} from '../../core/models/address.model';

@Component({
  selector: 'app-checkout',
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  private readonly cartService =
    inject(CartService);

  private readonly addressService =
    inject(AddressService);

  private readonly router =
    inject(Router);


  cart: Cart | null = null;

  addresses: Address[] = [];

  selectedAddressId = '';

  loading = false;

  savingAddress = false;

  showAddressForm = false;

  errorMessage = '';

  successMessage = '';


  newAddress = {
    name: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    landmark: '',
    isDefault: false
  };


  ngOnInit(): void {

    this.loadCart();

    this.loadAddresses();

  }


  loadCart(): void {

    this.loading = true;

    this.cartService
      .getCart()
      .subscribe({

        next: (response) => {

          this.cart =
            response.data;

          this.loading = false;

          if (
            !this.cart ||
            this.cart.items.length === 0
          ) {

            this.router.navigate([
              '/cart'
            ]);

          }

        },

        error: (error) => {

          console.error(error);

          this.errorMessage =
            'Unable to load your cart.';

          this.loading = false;

        }

      });

  }


  loadAddresses(): void {

    this.addressService
      .getAddresses()
      .subscribe({

        next: (response) => {

          this.addresses =
            response.data;

          const defaultAddress =
            this.addresses.find(
              address =>
                address.isDefault
            );

          if (defaultAddress) {

            this.selectedAddressId =
              defaultAddress._id;

          } else if (
            this.addresses.length
          ) {

            this.selectedAddressId =
              this.addresses[0]._id;

          }

        },

        error: (error) => {

          console.error(error);

        }

      });

  }


  selectAddress(
    addressId: string
  ): void {

    this.selectedAddressId =
      addressId;

  }


  addAddress(): void {

    if (
      !this.newAddress.name ||
      !this.newAddress.phone ||
      !this.newAddress.addressLine1 ||
      !this.newAddress.city ||
      !this.newAddress.state ||
      !this.newAddress.pincode
    ) {

      this.errorMessage =
        'Please fill all required fields.';

      return;

    }


    this.savingAddress = true;

    this.errorMessage = '';


    this.addressService
      .addAddress(
        this.newAddress
      )
      .subscribe({

        next: (response) => {

          this.addresses = [
            ...this.addresses,
            response.data
          ];

          this.selectedAddressId =
            response.data._id;

          this.showAddressForm =
            false;

          this.savingAddress = false;

          this.resetAddressForm();

        },

        error: (error) => {

          console.error(error);

          this.errorMessage =
            'Unable to save address.';

          this.savingAddress = false;

        }

      });

  }


  resetAddressForm(): void {

    this.newAddress = {

      name: '',
      phone: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      pincode: '',
      landmark: '',
      isDefault: false

    };

  }


  proceedToPayment(): void {

    if (!this.selectedAddressId) {

      this.errorMessage =
        'Please select a delivery address.';

      return;

    }

    if (!this.cart) {

      return;

    }

    /*
      Razorpay integration will be
      connected in the next part.

      IMPORTANT:
      Angular should NOT calculate
      or trust the payment amount.
    */

    console.log(
      'Selected address:',
      this.selectedAddressId
    );

    console.log(
      'Proceeding with cart:',
      this.cart
    );

  }
}
