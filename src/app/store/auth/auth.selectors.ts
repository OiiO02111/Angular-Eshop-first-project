import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.state";

export const selectAuthState = createFeatureSelector<AuthState>('auth');


export const selectAuthToken = createSelector(
    selectAuthState ,
    (state) => state.token ,
);

export const selectAuthUser = createSelector(
    selectAuthState ,
    (state) => state.user ,
);

export const selectAuthError = createSelector(
    selectAuthState ,
    (state) => state.error ,

);