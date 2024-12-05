import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { Location } from '@angular/common';

import { Category } from '../../models/category';
import { CategoryService } from '../../../../service/category-service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css' ,
  standalone: false ,
})
export class CategoryListComponent implements OnInit {
  private categorySubject = new BehaviorSubject<Category[]>([]);
  category$ = this.categorySubject.asObservable();

  constructor (
      public router: Router ,
      private store: Store,
      private location: Location ,
      private categoryService: CategoryService
    ) { }
    
    ngOnInit(): void {
      this.getAllCategory() ;
    }

    getAllCategory() {
      console.log(' Here is the getAllProducts function! ')
      this.categoryService.getCategoryList().subscribe((data) => {
        console.log('This is the getAllproducts array from the server', data );
        this.categorySubject.next(
          data.result.map((item: Category) => {
            return this.categoryService.transform(item);
          })
        );
      })
    }
  

    addNewCategory() {
      console.log('Navigating to /admin/category/create');
      this.router.navigateByUrl('/admin/category/create');
    }
  
    updateCategory(id: number) {
      console.log('Here is the update function and the updatingId is: ', id )
      this.router.navigate(['/admin/category/update', id]);
    }
  
    logoutAction(): void {
      localStorage.removeItem('token');
      this.router.navigateByUrl('/');
    }
  
    productAction() {
      this.router.navigateByUrl('/admin/products/list') ;
    }
    categoryAction() {
      this.router.navigateByUrl('/admin/category/list') ;
    }
    userAction() {
      this.router.navigateByUrl('/admin/users/list') ;
    }
    deleteCategory(id: number) {
      this.categoryService.deleteCategory(id).subscribe({
        next: (data) => {
          console.log('data from response', data)
        },
        error: (error) => {
          console.log('error from response', error)
        }
      }
      ) ;
      this.getAllCategory() ;
    }
}
