// product.selectors.ts
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ProductState } from './product.state';

export const selectProductState = createFeatureSelector<ProductState>('product');

export const selectIsLoading = createSelector(
  selectProductState,
  (state: ProductState) => state.isLoading
);

export const selectCreateProductError = createSelector(
  selectProductState,
  (state: ProductState) => state.createProductError
);
  