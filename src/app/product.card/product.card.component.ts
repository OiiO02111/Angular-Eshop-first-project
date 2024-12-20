import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, } from '@angular/core';
import { Product } from '../component/Admin/models/product';

@Component({
  selector: 'app-product-card-component',
  imports: [CommonModule ],
  standalone: true, 
  templateUrl: './product.card.component.html',
  styleUrl: './product.card.component.css'
})
export class ProductCardComponent {

  @Input() product: Product = {} as Product ;
  @Output() gotoProductDetailEvent = new EventEmitter<Product>() ;

  constructor() {}

  gotoProductDetail() : void {
    this.gotoProductDetailEvent.emit(this.product) ;
  }
}

