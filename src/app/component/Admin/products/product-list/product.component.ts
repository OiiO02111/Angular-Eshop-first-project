import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../models/product';
import { ProductService } from '../../../../service/product-service';
import * as ProductAction from '../../../../store/product/product.action'
import { selectProductList } from '../../../../store/product/product.selector';
import { Category } from '../../models/category';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ChangeDetectorRef } from '@angular/core';

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
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
   this.products$ = this.store.select(selectProductList);
   this.products$.subscribe((products) => {
    if(!products || products.length === 0) {
      this.getAllProducts() ;
    }

      this.displayData$.next(products) ;
      this.totalItems$.next(products.length) ;
      console.log('totalItems', products)
      this.updatePaginatedData();
    }
   )
  }

  
  getAllProducts() {
    this.store.dispatch(ProductAction.getProductList())
  }
  // getAllProducts() {
  //   console.log(' Here is the getAllProducts function! ')
  //   this.productService.getProductList().subscribe((data) => {
  //     console.log('This is the getAllproducts array from the server', data );
  //     this.productsSubject.next(
  //       data.result.map((item: Product) => {
  //         return this.productService.transform(item);
  //       })
  //     );
  //   })
  // }

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
    this.store.dispatch(ProductAction.deleteProduct({id}))
  }

  //paginator 
  pageSize$ = new BehaviorSubject<number>(5); //Number of items per page
  currentPage$ = new BehaviorSubject<number>(0); //current page index 
  displayData$ = new BehaviorSubject<Product[]>([]) ;
  totalItems$ = new BehaviorSubject<number>(5) //to hold total number of items for pagination
  pageSizeOptions$ = new BehaviorSubject<number[]>([5,10,20]); //pagination options

  @ViewChild(MatPaginator) paginator!: MatPaginator ;
  
  ngAfterViewInit() {
    this.updatePaginatedData() ;
  }

  pageChanged(event: PageEvent) {
    this.currentPage$.next(event.pageIndex) ;
    this.pageSize$.next(event.pageSize) ;
    this.updatePaginatedData();
  }

  updatePaginatedData() {
    const start = this.currentPage$.value * this.pageSize$.value ;
    const end = start + this.pageSize$.value;
    this.products$.subscribe((products) => {
      this.displayData$.next(products.slice(start, end)) ;
      this.cdr.detectChanges();  
    })
  }
}
