import { NgLocalization } from "@angular/common";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";


@Injectable(
    {
        providedIn: 'root'
    }
)

export class CartService implements OnInit{

    headers: HttpHeaders ;

    constructor(
        private store : Store ,
        private router: Router ,
        private http: HttpClient ,        
    ) {
        const token = localStorage.getItem('token');
        this.headers = new HttpHeaders ({
            authorization: `Bearer ${token}`,
        });
    }

    ngOnInit(): void {
        if(!localStorage.getItem('token')) {
            this.router.navigateByUrl('/auth/login') ;
        }
    }

    addToCart( productId : number , quantity: number ): Observable<any> {
        const payload = {
            productId ,
            quantity ,
        }
        return this.http.post('/api/cart', payload , { headers: this.headers })
    }
    getCartProducts() : Observable<any> {
        return this.http.get('/api/cart', { headers: this.headers })
    }

    removeCartItem(item: any, amount: number) : Observable<any> {
        console.log('Cartservice removecartItem')
        const payload = {
            productId : item.productId ,
            quantity: amount ,
        }
        console.log( 'payload', payload)
        return this.http.post('/api/cart/cartitem', payload , { headers: this.headers })
    }
}