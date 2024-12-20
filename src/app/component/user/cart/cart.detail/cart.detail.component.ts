import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../../service/cart-service';
import { Observable, observable } from 'rxjs';

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
     private router: Router ,
     private location: Location ,
     private cartService: CartService ,
  ) {}

  ngOnInit(): void {
    this.cartProducts$ = this.cartService.getCartProducts() ;
    this.cartProducts$.subscribe(
      ( response ) => {
        console.log( 'cart response => ', response )
        this.cartItems = response.cartItems ;
        this.totalprice = response.cart.totalCost ;
        console.log(this.cartItems)
      }
    )

  }


  setAmount( amount: number ) {
    console.log('setAmount', amount)

  }
  reduceItem(item: any) {
    console.log('reduce', this.amount)
    this.cartService.removeCartItem(item , this.amount).subscribe((response) => {

      this.cartItems = response.CartItemState ;
      this.totalprice = response.cartstate.totalCost ;
      console.log('response', response.CartItemState)
    }) ;
  }

}
