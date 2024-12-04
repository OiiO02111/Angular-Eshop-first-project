import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../service/product-service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Product } from '../../models/product';
import { Category } from '../../models/category';
import { CategoryService } from '../../../../service/category-service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrl: './product-update.component.css',
  standalone: false ,
})
export class ProductUpdateComponent implements OnInit {
  name: string =''
  price: number = 0
  producer: string = ''
  country: string = ''
  category: string = ''
  validationErrors: any = []

  id: number = 0 
  product: Product = new Product

  categories: Category[] = []
  selectedCategoryId: number | null = null;

  constructor( private productService: ProductService ,
               private categoryService: CategoryService,
               private router: Router ,
               private store: Store ,
               private location: Location , 
               private route: ActivatedRoute ,
            ) { }

  ngOnInit(): void {
    this.categoryService
    .getCategoryList()
    .subscribe({
      next: (data) => {
        console.log('product-create categorydata from server:', data)
        this.categories = data.result ;
      }
    })

    this.id = this.route.snapshot.params['id'] ;
    this.productService.getProductById(this.id).subscribe({
       next: (data) => {console.log('Here is the getProductById and the data from server is:', data)
       this.product = this.productService.transform(data.result) ;
       console.log('converted data-product:', this.product)},
       error: (error) => {
        console.log('The error of the current product state:' , error)
       }
    }

    );
  }

  onCategoryChange(event: any) {
    this.selectedCategoryId = Number(event.target.value) ;

    const selectedCategory = this.categories.find(
      (category) => category.id === this.selectedCategoryId
    );
    if(selectedCategory) {
      this.category = selectedCategory.name ;
    }
  }

  goBack() {
    this.location.back();
  }

  updateAction() {
    const currentId = this.route.snapshot.params['id'] ;
    const payload = this.product ;
    this.productService.update(currentId, payload).subscribe({
      next: (data) => {
        console.log('update res: ', data)
      },
      error: (error) => {
        console.log('update err: ', error)
      }
    }) ;
  }



  
}
