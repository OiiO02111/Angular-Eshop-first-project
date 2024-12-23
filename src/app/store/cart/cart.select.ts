import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CartState } from "./cart.state";



export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCart = createSelector(
    selectCartState ,
    (state: CartState) => state.cart
) ;

export const selectCartItems = createSelector(
    selectCartState ,
    (state: CartState) => state.items
) ;

export const selectCartError = createSelector(
    selectCartState ,
    (state: CartState) => state.error
) ;