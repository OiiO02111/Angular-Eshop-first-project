import { createReducer , on} from "@ngrx/store";
import { initialProductState } from "./product.state";
import * as ProductActions from '../product/product.action'

export const productReducer = createReducer(
    initialProductState ,
    on(ProductActions.createProduct, (state) => ({
        ...state ,
        isLoading: true ,
        error: null ,
    })) ,

    on(ProductActions.createProductSuccess, (state, {product}) => ({
        ...state ,
        isLoading: false ,
        products: [...state.products, product] ,
    })),

    on(ProductActions.createProductFailure, (state, {error}) => ({
        ...state ,
        isLoading: false ,
        error: error ,
    })) ,

    on(ProductActions.getProductList , (state) => ({
        ...state ,
        isLoading: true ,
        error: null , 
    })) ,

    on(ProductActions.getProductListSuccess , (state, { products }) => ({
        ...state ,
        isLoading: false ,
        products
    })) ,

    on(ProductActions.getProductListFailure, (state, { error }) => ({
        ...state, 
        isLoading: false ,
        error
    })) ,

    on(ProductActions.deleteProduct, (state) => ({
        ...state ,
        isLoading: true ,
        error: null ,
    })) ,

    on(ProductActions.deleteProductSuccess , (state, { id }) => ({
        ...state ,
        products: state.products.filter((product) => product.id !== id) ,
        isLoading: false ,
    })) ,

    on(ProductActions.deleteProductFailure, (state, {error}) => ({
        ...state ,
        isLoading: false ,
        error ,
    })) ,

    on(ProductActions.updateProduct, (state) => ({
        ...state ,
        isLoading: true , 
        error: null ,
    })) ,

    on(ProductActions.updateProductSuccess, (state, { product }) => {
        const products = state.products.map((item) => (item.id === product.id) ? product : item ) ;
        return {
            ...state ,
            products ,
            isLoading: false ,
        }
    }) ,

    on(ProductActions.updateProductFailure, (state, { error }) => ({
        ...state ,
        isLoading: false ,
        error ,
    }))
);