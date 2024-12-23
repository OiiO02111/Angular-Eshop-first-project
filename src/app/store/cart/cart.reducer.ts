import { createReducer, on } from "@ngrx/store";
import { initialCartState } from "./cart.state";
import * as CartActions from './cart.action';



export const cartReducer = createReducer(
    initialCartState ,
    on(CartActions.addToCart , (state) => ({
        ...state ,
        error: null ,
    })) ,

    on(CartActions.addToCartSuccess, (state, {cart, items}) => ({
        ...state ,
        items ,
        cart ,
    })) ,

    on(CartActions.addToCartFailure, (state, {error}) => ({
        ...state ,
        error ,
    })) ,

    on(CartActions.reduceItem , ( state ) => ({
        ...state ,
        error: null ,
    })) ,

    on(CartActions.reduceItemSuccess , ( state, {cart, items}) => ({
        ...state ,
        cart ,
        items ,
    })) ,

    on(CartActions.reduceItemsFailure, (state, {error}) => ({
        ...state ,
        error ,
    })) ,
    
    on(CartActions.removeItem, (state) => ({
        ...state ,
        error: null ,
    })) ,

    on(CartActions.removeItemSuccess, (state, { deletedItem }) => {
        console.log('deletedItem', deletedItem);

        const newItems = state.items.filter((item) => item.productId !== deletedItem.productId);
    
        const updatedCart = {
            ...state.cart,
            totalCost: state.cart.totalCost - deletedItem.price * deletedItem.quantity,
        };
    
        console.log('reducer totalcost', state.cart.totalCost);
        console.log(deletedItem.price, deletedItem.quantity);
        console.log('reducer totalcost1', updatedCart.totalCost);
    
        return {
            ...state,
            items: newItems,
            cart: updatedCart, // Ensure the new cart object is part of the returned state
        };
        
    }) ,
    on(CartActions.removeItemFailure, (state, { error }) => ({
        ...state ,
        error ,
    })) ,
    
    on(CartActions.getCart, (state) => ({
        ...state ,
        error: null ,
    })) ,

    on(CartActions.getCartSuccess, (state, { cart, items }) => ({
        ...state ,
        cart ,
        items ,
    })) ,

    on(CartActions.getCartFailure , (state, { error }) => ({
        ...state ,
        error
    }))
)