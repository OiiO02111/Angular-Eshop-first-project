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
  
  const token = localStorage.getItem('token')
  const headers = new HttpHeaders({
        authorization: `Bearer ${token}`, // Add token in Authorization header
      });

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

              const headers = new HttpHeaders({
                authorization: `Bearer ${token}`,
              });
              return this.http.get('/api/auth/myinfo', { headers });

      }
      
    createNewUser(data: any): Observable<any> {
      console.log("Here is the createNewUser of userAuthService", data)
      return this.http.post('/api/users', data, { headers });
    }
    
    getUserList() : Observable<any> {
      console.log('Here is the getUserList of userAuthService')
      return this.http.get('/api/users', { headers });
    }

    deleteUser(id: number) : Observable<any> {
      console.log('Here is the deleteUser of service')
      return this.http.delete(`/api/users/${id}`, { headers })
    }
    changeRole(id: number, payload: string) : Observable<any> {
      return this.http.patch(`/api/users/${id}`, payload, { headers })
    }
}