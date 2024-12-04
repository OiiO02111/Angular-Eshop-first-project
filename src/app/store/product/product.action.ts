import { createAction, props } from '@ngrx/store' ;

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
