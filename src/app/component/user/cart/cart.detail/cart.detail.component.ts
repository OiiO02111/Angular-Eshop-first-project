import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../../service/cart-service';
import { Observable, observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as CartActions from '../../../../store/cart/cart.action' ;
import { selectCart, selectCartItems } from '../../../../store/cart/cart.select';

@Component({
  selector: 'app-cart.detail',
  standalone: false,
  templateUrl: './cart.detail.component.html',
  styleUrl: './cart.detail.component.css'
})
export class CartDetailComponent implements OnInit {

  cartProducts$ : Observable<any> = new Observable<any>() ;
  cartItems : Array<any> = [] ;
  totalprice: number = 0 ;
  targetAmount: number = 0 ;
  amount: number = 1 ;

  constructor(
     private store: Store ,
     private router: Router ,
     private location: Location ,
     private cartService: CartService ,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(CartActions.getCart());
    this.store.select(selectCart).subscribe((cart) => {
      this.totalprice = cart.totalCost ;
    })
    this.store.select(selectCartItems).subscribe((items) => {
      this.cartItems = items ;
    })

  }


  setAmount( amount: number ) {
    console.log('setAmount', amount)

  }
  reduceItem(item: any) {
    console.log('para-item', item)
    const payload = {
      productId: item.productId,
      amount: this.amount ,
    }
    console.log('payload', payload)
    console.log('reduce', this.amount)
    this.store.dispatch(CartActions.reduceItem(payload)) ;
    this.store.select(selectCart).subscribe((cart) => {
      this.totalprice = cart.totalCost ;
    }) ;
    this.store.select(selectCartItems).subscribe((items) => {
      this.cartItems = items ;
    })
  }
  removeItem(item: any) {
    console.log('RemoveItem id', item)
    this.store.dispatch(CartActions.removeItem({productId: item.productId})) ;
    this.store.dispatch(CartActions.getCart())
    this.store.select(selectCart).subscribe((cart) => {
      this.totalprice = cart.totalCost ;
    }) ;
    this.store.select(selectCartItems).subscribe((items) => {
      this.cartItems = items ;
    })
  }
  increaseItem(item: any) {
    console.log('para-item', item)
    const payload = {
      productId: item.productId,
      quantity: this.amount ,
    }
    console.log('payload', payload)
    console.log('reduce', this.amount)
    this.store.dispatch(CartActions.addToCart(payload)) ;
    this.store.select(selectCart).subscribe((cart) => {
      this.totalprice = cart.totalCost ;
    }) ;
    this.store.select(selectCartItems).subscribe((items) => {
      this.cartItems = items ;
    })
  }

}
