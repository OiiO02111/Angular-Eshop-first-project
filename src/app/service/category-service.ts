import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { __makeTemplateObject } from "tslib";
import { Category } from "../component/Admin/models/category";

const token = localStorage.getItem('token');
const headers = new HttpHeaders ({
    authorization: `Bearer ${token}`,
});

@Injectable ({
    providedIn : 'root'
})

export class CategoryService implements OnInit {

    constructor(
        private store: Store ,
        private http: HttpClient ,
        private router: Router ,

    ) {}

    ngOnInit(): void {
        if (!localStorage.getItem('token')) {
            this.router.navigateByUrl('/auth/login') ;
        }
    }

    getCategoryList() : Observable<any> {
        const token = localStorage.getItem('token') ;
        const headers = new HttpHeaders ({
            authorization: `Bearer ${token}`,
        });
        return this.http.get('/api/category', { headers })
    }

    getCategoryById(id: number) : Observable<any> {
        return this.http.get<Category>(`/api/category/${id}`) ;
      }
    deleteCategory(id: number): Observable<any> {
        console.log('category-service deleteCategory')
        return this.http.delete(`/api/category/${id}`, { headers });
    }
    transform(data: any) : Category {
        return {
          id: data.id ,
          name: data.name ,
        } ;
      }
    
}