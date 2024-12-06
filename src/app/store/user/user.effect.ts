import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserAuthService } from "../../service/user-auth.service";
import * as UserAction from '../user/user.action'
import { catchError, mergeMap, map, of, tap, merge } from "rxjs";
import { Router } from "@angular/router";


@Injectable() 

export class UserEffect {

    constructor (
        private action$: Actions,
        private userService: UserAuthService ,
        private router: Router
    ) {}

    createUser$ = createEffect(() => {
        console.log('Here is the createUser$ of UserEffect!')
       return inject(Actions) 
        .pipe(
            ofType(UserAction.createNewUser),
            mergeMap(({ user }) => {
                console.log('mergeMap user:', user)
                return this.userService.createNewUser(user).pipe(
                    map((createdUser) => {
                        this.router.navigateByUrl('/admin/users/list');
                        return UserAction.createUserSuccess({user:{ ...createdUser.NewUserInfo, role:user.role}}) ;
                    }),
                    catchError((error) => {
                        console.log(error)
                        return of(UserAction.createUserFailure({error: error}))
                    } )
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
                    map((response) => UserAction.getUserListSuccess({ users: response.users})),
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

    changeRole$ = createEffect(() => {
        console.log('Here is the changeRole$ of userEffect!')
        return inject(Actions)
            .pipe(
                ofType(UserAction.changeRole) ,
                mergeMap(
                    (payload) => this.userService.changeRole(payload.id, payload.role).pipe(
                        map((res) => UserAction.changeRoleSuccess({user: res.Result, role: payload.role})),
                        catchError((error) => of(UserAction.changeRoleFailure(error))) ,
                    )
                )
            )
    })
}