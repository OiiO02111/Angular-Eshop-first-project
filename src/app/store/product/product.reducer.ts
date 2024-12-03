import { createReducer , on} from "@ngrx/store";
import { initialProductState } from "./product.state";
import * as ProductActions from '../product/product.action'

export const productReducer = createReducer(
    initialProductState ,
    on(ProductActions.createProduct, (state) => ({
        ...state ,
        isLoading: true ,
        createProductError: null ,
    })) ,

    on(ProductActions.createProductSuccess, (state, {product}) => ({
        ...state ,
        isLoading: false ,
        products: [...state.products, product] ,
    })),

    on(ProductActions.createProductFailure, (state, {error}) => ({
        ...state ,
        isLoading: false ,
        createProductError: error ,
    }))
);