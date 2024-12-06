import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { __makeTemplateObject } from "tslib";
import { Category } from "../component/Admin/models/category";

const token = localStorage.getItem('token');

@Injectable ({
    providedIn : 'root'
})

export class CategoryService implements OnInit {

    headers: HttpHeaders;

    constructor(
        private store: Store ,
        private http: HttpClient ,
        private router: Router ,

    ) {
        const token = localStorage.getItem('token');
        this.headers = new HttpHeaders ({
            authorization: `Bearer ${token}`,
        });
    }

    ngOnInit(): void {
        if (!localStorage.getItem('token')) {
            this.router.navigateByUrl('/auth/login') ;
        }
    }

    addNewCategory(payload: any) : Observable<any> {
        return this.http.post('/api/category', payload , { headers: this.headers });
    }

    updateCategory(id: number , payload: any) : Observable<any> {
        return this.http.patch(`/api/category/${id}`, payload , { headers: this.headers })
    }

    getCategoryList() : Observable<any> {

        return this.http.get('/api/category', { headers: this.headers })
    }

    getCategoryById(id: number) : Observable<any> {
        return this.http.get<Category>(`/api/category/${id}`) ;
      }
    deleteCategory(id: number): Observable<any> {
        console.log('category-service deleteCategory')
        return this.http.delete(`/api/category/${id}`, { headers: this.headers });
    }
    transform(data: any) : Category {
        return {
          id: data.id ,
          name: data.name ,
        } ;
      }
    
}