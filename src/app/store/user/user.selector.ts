import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./user.state";


export const selectUserstate = createFeatureSelector<UserState>('user') ;

export const selectUserList = createSelector(
    selectUserstate ,
    (state: UserState) => state.users ,
)