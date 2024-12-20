import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-product-card',
  imports: [CommonModule],
  standalone: true ,
  templateUrl: './cart.product-card.component.html',
  styleUrl: './cart.product-card.component.css' ,
})

export class CartProductCardComponent {
  
  @Input() item : any = {} ;
  @Output() increaseCartItemEvent = new EventEmitter<any>() ;
  @Output() reduceCartItemEvent = new EventEmitter<any>() ;
  @Output() removeItemCartEvent = new EventEmitter<any>() ;
  @Output() listenAmountEvent = new EventEmitter<any>() ;
  
  constructor () {

  }
  amount: number = 0 ;
  
  increase(amount: string) {
    this.increaseCartItemEvent.emit(this.item)
    this.listenAmountEvent.emit(this.amount)
    console.log(this.item)
    console.log(amount)

  } ;
  reduce(amount: string) {
    this.amount = Number(amount) ;
    console.log('dfdf', this.amount)
    this.reduceCartItemEvent.emit(this.item) 
    this.listenAmountEvent.emit(this.amount) 

  } ;
  remove() {
    this.removeItemCartEvent.emit(this.item)
  } ;

}
