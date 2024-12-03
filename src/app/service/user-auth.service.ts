import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpClient,HttpHeaders } from '@angular/common/http';
// import axios from "axios";
import { environment } from "../../environments/environment.development";
import { Observable } from "rxjs";
import { Store } from '@ngrx/store';
import { selectAuthToken } from '../store/auth/auth.selectors'; // Adjust the path if necessary
import { switchMap, take } from 'rxjs/operators';



const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true,
  };
  


@Injectable({
    providedIn: 'root'
})



export class UserAuthService {

    constructor(private http: HttpClient ,
                private store: Store   ) {} 

    login (data: any) : Observable<any> {
        let payload = {
            email: data.email,
            password: data.password
        }

        return this.http.post( `/api/auth/login`, payload);
    }

    register (data: any): Observable<any>{
        console.log(environment.apiurl)
        let payload = {
            name: data.name ,
            email: data.email ,
            password: data.password ,
            confirmPassword: data.confirmPassword ,
        }

        console.log("payload +>",payload);

        return this.http
          .post(  `/api/auth/register`, payload, httpOptions);
    }

    getUser(): Observable<any> {
      const token = localStorage.getItem('token');
        // Access the token from the NgRx store
        // return this.store.select(selectAuthToken).pipe(
        //   take(1), // Take the token value once
        //   switchMap((token) => {
        //     if (token) {
              const headers = new HttpHeaders({
                authorization: `Bearer ${token}`,
              });
              return this.http.get('/api/auth/myinfo', { headers });
        //     } else {
        //       // Handle the case when there is no token in the store
        //       throw new Error('No token found');
        //     }
        //   })
        // );
      }
      

    // logout(): Observable<any> {

    //     return this.http.post(  `/api/auth/logout` , {} , { headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}})
    // }
}