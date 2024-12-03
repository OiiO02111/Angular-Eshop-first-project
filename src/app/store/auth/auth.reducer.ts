import { createReducer, on } from "@ngrx/store";
import *  as AuthActions from './auth.actions';
import { AuthState, initialAuthState } from "./auth.state";

export const authReducer = createReducer(
    initialAuthState ,
    on( AuthActions.loginSuccess , (state, { token , user }) => (
        {
            ...state ,
            token ,
            user ,
            error: null ,
        }
    ) ),  
    on(AuthActions.loginFailure , (state , { error }) => (
        {
            ...state ,
            error ,
        }
    )) ,
    on(AuthActions.logout , () => initialAuthState)
);