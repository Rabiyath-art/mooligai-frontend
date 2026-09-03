import { Component, EventEmitter, Output } from '@angular/core';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-admin-product-create',
  imports: [],
  templateUrl: './admin-product-create.component.html',
  styleUrl: './admin-product-create.component.scss'
})
export class AdminProductCreateComponent {
  @Output()
  close =
    new EventEmitter<void>();


  @Output()
  created =
    new EventEmitter<Product>();
}
