import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { UserAuthService } from '../../service/user-auth.service';
import * as AuthActions from '../../store/auth/auth.actions' ;
import { selectAuthError, selectAuthToken } from '../../store/auth/auth.selectors';


@Component({
selector: 'app-login',
  standalone:false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  email:string = ''
  password:string = ''
  isSubmitting:boolean = false
  validationErrors: string | null = null
 
  constructor(
        public userAuthService: UserAuthService, 
        private router: Router ,
        private store: Store ,   
      ) { }
 
  ngOnInit(): void {
    // if(localStorage.getItem('token') != "" && localStorage.getItem('token') != null){
    //   this.router.navigateByUrl('/auth/dashboard')
    // }
  }
 
  loginAction() {
    this.isSubmitting = true;
    const payload = {
      email: this.email,
      password: this.password,
     }
     console.log(' Here is the loginAction frontend function! ')
    //  console.log('type of selectauthtoken', this.store.select(selectAuthToken))
    //  this.store.dispatch(AuthActions.login( payload )) 
     
    //  this.store.select(selectAuthError).subscribe(
    //   (error) => {
        
    //     this.validationErrors = error ;
    //     this.isSubmitting = false
    //     console.log('validation error ==>', this.validationErrors)
    //     if (!error) {
    //       // Navigate to the dashboard if login is successful
    //       this.router.navigateByUrl('/auth/dashboard');
    //     }
    //   }
    //  );
    this.userAuthService.login(payload).subscribe({
      next: ((data) => {
        console.log('data ==> ' , data)
        localStorage.setItem('token', data.token);
        this.router.navigateByUrl('/auth/dashboard');
        return data;
      }),
      error: (error => {
        console.log('catched error ==>',error)
        this.isSubmitting = false;
        if (error.error.message != undefined) {
          this.validationErrors = error.error.message;
        }
        return error
      })
    });
    
  }
}