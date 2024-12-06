import { createAction, props } from '@ngrx/store' ;
import { Product } from '../../component/Admin/models/product';

export const createProduct = createAction (
    '[Product Page] create product' ,
    props<{ product: { name: string ; producer: string ; country: string ; price: number ; category: string }}>()
)

export const createProductSuccess = createAction (
    '[Product API] create product success' ,
    props<{ product: any }>()
);

export const createProductFailure = createAction (
    '[Product API] create product failure' ,
    props<{ error: string  }>()
)

export const getProductList = createAction (
    '[product] get product list' ,
)

export const getProductListSuccess = createAction (
    '[product] get product list success' ,
    props<{ products: Product[] }>() ,
) 

export const getProductListFailure = createAction (
    '[product] get product list failure' ,
    props<{ error: string }>() ,
)

export const deleteProduct = createAction (
    '[product] delete product' ,
    props<{ id: number }>() ,
) 

export const deleteProductSuccess = createAction (
    '[product] delete product success' ,
    props<{ id: number }>() ,
)

export const deleteProductFailure = createAction (
    '[product] delete product failure' ,
    props<{ error: string }>() ,
)

export const updateProduct = createAction (
    '[product] update product' ,
    props<{ 
        id: number, 
        name: string,
        producer: string,
        price:number, 
        country: string, 
        category:string 
    }>()
) 

export const updateProductSuccess = createAction (
    '[product] update product success' ,
    props<{ product: any }>() ,
) 

export const updateProductFailure = createAction (
    '[product] update product failure' ,
    props<{ error: string }>() ,
)