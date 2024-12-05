import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Location } from '@angular/common';

import { ProductService } from '../../../../service/product-service';
import * as ProductActions from '../../../../store/product/product.action';
import { selectCreateProductError } from '../../../../store/product/product.selector'
import { Category } from '../../models/category';
import { CategoryService } from '../../../../service/category-service';

@Component({
  selector: 'app-product-create',
  standalone: false ,
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css'
})
export class ProductCreateComponent implements OnInit{
  name: string =''
  price: number = 0
  producer: string = ''
  country: string = ''
  category: string = ''
  validationErrors: any = []

  categories: Category[] = []
  selectedCategoryId: number = 1



  constructor(
    public productService: ProductService ,
    private categoryService: CategoryService ,
    private router: Router ,
    private store: Store ,
    private location: Location ,
  ) {

  }

  
  ngOnInit(): void {
    this.categoryService
      .getCategoryList()
      .subscribe({
        next: (data) => {
          console.log('product-create categorydata from server:', data)
          this.categories = data.result ;
        }
      })
  }



  sendAction() {

    let payload: { product: {name: string; producer: string; country: string; price: number; category: string} } = {
       product: { name: this.name ,
                  producer: this.producer ,
                  country: this.country ,
                  price: this.price ,
                  category: this.category }   
    };
    console.log(' Here is the sendAction function! ', payload) 

    this.store.dispatch(ProductActions.createProduct(payload));

    // this.store.select(selectCreateProductError).subscribe((error) => {
    //   console.log('this is the error from the server =>', error)
    // })
    

  }

  goBack(): void {
    this.location.back();
  }

  logoutAction(): void {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/');
  }
}
    // this.productService.createNewProject(payload).subscribe({
    //   next: (data) => {
    //     console.log('I received this data from server!' , data)
    //   } ,
    //   error: (error) => {
    //     console.log('There is a error like this: ', error)
    //   }
  
    // })
