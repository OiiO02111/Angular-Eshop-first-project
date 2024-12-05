import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../models/product';
import { ProductService } from '../../../../service/product-service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  standalone: false ,
})
export class ProductListComponent implements OnInit{
  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();
  

  constructor( 
    private router: Router ,
    private store: Store ,
    private productService: ProductService ,
  ) {}

  ngOnInit(): void {
    this.getAllProducts()
  }
  
  getAllProducts() {
    console.log(' Here is the getAllProducts function! ')
    this.productService.getProductList().subscribe((data) => {
      console.log('This is the getAllproducts array from the server', data );
      this.productsSubject.next(
        data.result.map((item: Product) => {
          return this.productService.transform(item);
        })
      );
    })
  }

  addNewProduct() {
    console.log('Navigating to /admin/products/create');
    this.router.navigateByUrl('/admin/products/create');
  }

  updateProduct(id: number) {
    console.log('Here is the update function and the updatingId is: ', id )
    this.router.navigate(['/admin/products/update', id]);
  }

  logoutAction(): void {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/');
  }
  userAction() {
    this.router.navigateByUrl('/admin/users/list') ;
  }
  productAction() {
    this.router.navigateByUrl('/admin/products/list') ;
  }

  categoryAction() {
    this.router.navigateByUrl('/admin/category/list') ;
  }
  deleteProduct(id: number) {
    this.productService.deleteCurrentProduct(id)
      .subscribe({
        next: (data) => {
          console.log('Data from deleting backend:', data)
        },
        error: (error) => {
          console.log('Error from deleting backend:', error)
        }
      });
      this.getAllProducts();
  }
}
