import { createAction, props } from "@ngrx/store"
import { User } from "../../user/user"


export const createNewUser = createAction (
    '[User] create new user',
    props<{ user: { name:string, email:string, password:string, role:string }}>()
)

export const createUserSuccess = createAction (
    '[User] create user success',
    props<{ user: any }>()
)

export const createUserFailure = createAction (
    '[User] create user failure' ,
    props<{ error: string }>()
)

export const getUserList = createAction (
    '[User] get users list' ,
)

export const getUserListSuccess = createAction (
    '[User] get userlist success' ,
    props<{ users: User[] }>() ,
)

export const getUserListFailure = createAction (
    '[User] get userlist failure' ,
    props<{ error: string }>() ,
)

export const deleteUser = createAction (
    '[User] delete user',
    props<{ id: number }>() ,
)

