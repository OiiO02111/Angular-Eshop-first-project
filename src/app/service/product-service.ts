import { Injectable, OnInit } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpClient,HttpHeaders } from '@angular/common/http';
// import axios from "axios";
import { switchMap, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Observable, observable } from "rxjs";
import { pipe } from "rxjs";
import { environment } from "../../environments/environment.development";
import { selectAuthToken } from '../store/auth/auth.selectors'; // Adjust the path if necessary
import { Product } from "../component/Admin/models/product";
import { Router } from "@angular/router";

const token = localStorage.getItem('token')
const headers = new HttpHeaders({
      authorization: `Bearer ${token}`, // Add token in Authorization header
    });

@Injectable({
    providedIn: 'root'
})

export class ProductService implements OnInit{

    constructor (
        private http: HttpClient ,
        private store: Store ,
        private router: Router
    ) {}

    ngOnInit(): void {
      if (!localStorage.getItem('token')) {
        this.router.navigateByUrl('/auth/login');
      }
    }

    createNewProduct(data: any) : Observable<any> {
        console.log('Here is the createNewproject of the Productservice')
        // let payload = {
        //     name: data.name ,
        //     producer: data.producer ,
        //     country: data.country ,
        //     price: data.price ,
        // }

       // console.log('Payload-->' , payload ) 
       console.log('data', data)

        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
              authorization: `Bearer ${token}`, // Add token in Authorization header
            });
         return this.http.post('/api/products', data, { headers });
      } 
      
    
    getProductList() : Observable<any> {

      return this.http.get('/api/products', { headers });
     
    }

    getProductById(id: number) : Observable<any> {
      return this.http.get<Product>(`/api/products/${id}`, {headers}) ;
    }

    deleteCurrentProduct(id: number): Observable<any> {
      return this.http.delete(`/api/products/${id}`, { headers }) ;
    }

    update(id: number, payload: any) {
      console.log('Update payload:', payload)
      return this.http.patch(`/api/products/${id}`, payload, { headers } );
    }

    transform(data: any) : Product {
      return {
        id: data.id ,
        name: data.name ,
        price: data.price ,
        producer: data.producer ,
        country: data.country ,
        category: data.category ,
      } ;
    }
}

