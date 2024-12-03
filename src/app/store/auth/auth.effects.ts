import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { compose } from '@ngrx/store';
import { Action } from 'rxjs/internal/scheduler/Action';


import { UserAuthService } from '../../service/user-auth.service';
import * as AuthActions from './auth.actions';




@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private userAuthService: UserAuthService
  ) {}

  
  login$ = createEffect(() =>  
    // console.log('------>>', inject(Actions));
    inject(Actions).pipe(
        ofType(AuthActions.login),
        tap(()=> console.log("hello!")),
        mergeMap(({ email, password }) => {
          console.log('*****')
          return this.userAuthService.login({ email, password }).pipe(
              map((response) => {
                console.log('This is response of the login effect.', response)
                
               return AuthActions.loginSuccess({
                  token: response.token,
                  user: response.user,
                })
              }
              ),
              catchError((error) => {
                console.log ('effect.error -----', error)
                return of(AuthActions.loginFailure({ error: error.error.message }))
              }

              )
            )
        }
        
        )
      )
  
     
   
  );
}
