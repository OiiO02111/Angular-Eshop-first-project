import { createAction, props } from "@ngrx/store";



export const addToCart = createAction (
    '[Cart] add to cart' ,
    props<{ productId: number , quantity: number }>()
)
export const addToCartSuccess = createAction (
    '[Cart] add to cart success' ,
    props<{ cart: any , items: any }>()
)
export const addToCartFailure = createAction (
    '[Cart] add to cart failure' ,
    props<{ error: string }>()
)
export const reduceItem = createAction (
    '[cart] reduce cart item' ,
    props<{ productId: number , amount: number }>()
)
export const reduceItemSuccess = createAction (
    '[cart] reduce cart item success' ,
    props<{ cart: any , items: any }>() 
)
export const reduceItemsFailure = createAction (
    '[cart] reduce cart item falure' ,
    props<{ error: string }>()
)
export const removeItem = createAction (
    '[cart] remove cart item' ,
    props<{ productId: number }>()
)
export const removeItemSuccess = createAction (
    '[cart] remove cart item success' ,
    props<{ deletedItem: any }>()
)
export const removeItemFailure = createAction (
    '[cart] remove cart item failure' ,
    props<{ error: string }>()
)
export const getCart = createAction (
    '[cart] get cart' ,
)
export const getCartSuccess = createAction (
    '[cart] get cart success' ,
    props<{ cart: any , items: any[] }>() ,
)
export const getCartFailure = createAction (
    '[cart] get cart failure' ,
    props<{ error: string }>() ,
)