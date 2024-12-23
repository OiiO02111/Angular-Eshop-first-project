import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CartService } from "../../service/cart-service";
import { Injectable, inject, providePlatformInitializer } from "@angular/core";
import * as CartActions from '../cart/cart.action'
import { mergeMap , map , catchError, of, merge } from "rxjs";


@Injectable()
export class CartEffect {

    constructor(
        private action$: Actions ,
        private cartService: CartService ,
    ) {}

    addToCart$ = createEffect(() => {

        console.log('Here is the addTocart effect funtion!')
        return inject(Actions)
            .pipe(
                ofType(CartActions.addToCart) ,
                mergeMap(( payload ) => {
                    console.log('effect cart->', payload)
                    return this.cartService.addToCart(payload.productId, payload.quantity).pipe(
                        map((res) => CartActions.addToCartSuccess({ cart: res.cart , items: res.items })) ,
                        catchError((error) => of(CartActions.addToCartFailure({error}))) ,
                    )
                })
            )
    })

    reduceItem$ = createEffect(() => {
        console.log('Here is teh reduceCartItem effect!')
        return inject(Actions)
            .pipe(
                ofType(CartActions.reduceItem) ,
                mergeMap(( payload ) => {
                    return this.cartService.reduceCartItem( payload.productId, payload.amount )
                        .pipe(
                            map((res) => CartActions.reduceItemSuccess({cart: res.cartstate , items: res.CartItemState})) ,
                            catchError((error) => of(CartActions.reduceItemsFailure({error}))) ,
                        )
                })
            )
    })

    removeItem$ = createEffect(() => {
        console.log('Here is the remove cartitem effect!')
        return inject(Actions)
            .pipe(
                ofType(CartActions.removeItem) ,
                mergeMap(( { productId } ) => {
                    console.log('productIdddd =>', productId)
                    return this.cartService.removeCartItem( productId )
                        .pipe(
                           map((res) => CartActions.removeItemSuccess({ deletedItem: res.deletedItem })) ,
                           catchError((error) => of(CartActions.removeItemFailure({ error })))
                            )
                   
                })
            )
    })

    getCart$ = createEffect(() => {
        console.log('Here is the get Cart effect function')
        return inject(Actions).pipe(
            ofType(CartActions.getCart) ,
            mergeMap(() => {
                return this.cartService.getCartProducts().pipe(
                    map((res) => CartActions.getCartSuccess({ cart: res.cart, items: res.cartItems })) ,
                    catchError((error) => of(CartActions.getCartFailure({ error })) ) ,
                )
            })
        )
           
    })
}