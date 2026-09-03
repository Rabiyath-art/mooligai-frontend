import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-admin-product-edit',
  imports: [],
  templateUrl: './admin-product-edit.component.html',
  styleUrl: './admin-product-edit.component.scss'
})
export class AdminProductEditComponent {
  @Input()
  product!: Product;


  @Output()
  close =
    new EventEmitter<void>();


  @Output()
  updated =
    new EventEmitter<Product>();
}
