import { initialUserState } from "./user.state";
import { createReducer,  on } from "@ngrx/store";

import * as UserAction from '../user/user.action'



export const userReducer = createReducer(
    initialUserState ,
    on(UserAction.createNewUser, (state) => ({
        ...state ,
        isLoading: true ,
        error: null ,
    })) ,

    on(UserAction.createUserSuccess, (state, {user}) => ({
        ...state ,
        isLoading: false ,
        users: [...state.users, user] ,
    })),

    on(UserAction.createUserFailure, (state, {error}) => ({
        ...state ,
        isLoading: false ,
        error: error ,
    })),

    on(UserAction.getUserList, (state) => ({
        ...state ,
        isLoading: true ,
        error: null ,
    })) ,
    
    on(UserAction.getUserListSuccess, (state, {users}) => ({
        ...state ,
        isLoading: false ,
        users ,
    })) ,

    on(UserAction.getUserListFailure , (state, {error}) => ({
        ...state ,
        isLoading: false ,
        error ,
    })),

    on(UserAction.deleteUser, (state, { id }) => ({
        ...state ,
        users: state.users.filter(user => user.id !== id) ,
    }))
    
)