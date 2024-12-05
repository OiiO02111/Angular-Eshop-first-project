import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserAuthService } from "../../service/user-auth.service";
import * as UserAction from '../user/user.action'
import { catchError, mergeMap, map, of, tap, merge } from "rxjs";


@Injectable() 

export class UserEffect {

    constructor (
        private action$: Actions,
        private userService: UserAuthService ,
    ) {}

    createUser$ = createEffect(() => {
        console.log('Here is the createUser$ of UserEffect!')
       return inject(Actions) 
        .pipe(
            ofType(UserAction.createNewUser),
            mergeMap(({ user }) => {
                console.log('mergeMap user:', user)
                return this.userService.createNewUser(user).pipe(
                    map((createdUser) => UserAction.createUserSuccess({user:createdUser})),
                    catchError((error) => of(UserAction.createUserFailure({error: error})))
                )
            })
        )
    })

    getUserList$ = createEffect(() => {
        console.log('Here is the getUserList$ of UserEffect!')
        return inject(Actions) 
          .pipe(
            ofType(UserAction.getUserList) ,
            mergeMap(() => 
                this.userService.getUserList().pipe (
                    map((users) => UserAction.getUserListSuccess({ users: users.users})),
                    catchError((error) => of(UserAction.getUserListFailure({ error })))
                )
            )
          )
    })

    deleteUser$ = createEffect(() => {
        console.log('Here is the deleteUser$ of Usereffect!')
        return inject(Actions)
            .pipe(
                ofType(UserAction.deleteUser) ,
                mergeMap(({id}) => 
                    this.userService.deleteUser(id)
                )
            )
    })
}