import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
// import { Action } from "rxjs/internal/scheduler/Action";

import { ProductService } from "../../service/product-service";
import * as ProductAction from '../product/product.action'
import { mergeMap, map , catchError, of } from "rxjs";

@Injectable() 

export class ProductEffect {
    constructor(
        private action$: Actions ,
        private productService: ProductService ,
    ) {}

    createProduct$ = createEffect(() => {

        console.log('Here is the createOne function of the productEffect!')
        return inject(Actions)
            .pipe(
              ofType(ProductAction.createProduct) ,
              mergeMap(({ product }) => {
                console.log('Mergemap product', product)
                return this.productService.createNewProduct(product).pipe(

                    map((createdProduct) => ProductAction.createProductSuccess({product: createdProduct})),
                    catchError((error) => of(ProductAction.createProductFailure({error: error}))),
                  )
                } 
              )  
            )
    })
}