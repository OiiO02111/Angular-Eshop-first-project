import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { Product } from '../../models/product';
import { ProductService } from '../../../../service/product-service';
import * as ProductAction from '../../../../store/product/product.action'
import { selectProductList } from '../../../../store/product/product.selector';
import { Category } from '../../models/category';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ChangeDetectorRef } from '@angular/core';
import { CategoryService } from '../../../../service/category-service';
import { map } from 'rxjs';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  standalone: false ,
})
export class ProductListComponent implements OnInit{
  
  products$: Observable<Product[]> = new Observable<Product[]>();
  categories$: Observable<Category[]> = new Observable<Category[]>() ;
  selectedCategories$ = new BehaviorSubject<string[]>([]) ;
  searchKey$ = new BehaviorSubject<string>('') ;
  filteredProducts$ = new BehaviorSubject<Product[]>([])
  
  isDropdownOpen = false ;
  
  localSearchKey : string = '';


  constructor( 
    private router: Router ,
    private store: Store ,
    private productService: ProductService ,
    private categoryService: CategoryService ,
    private cdr: ChangeDetectorRef
  ) {

    // // this.categories$ = this.categoryService.getCategoryList()
    // // this.categories$.subscribe((categories) => {
    // //   console.log('----category', categories)
    // })
  }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategoryList().pipe(
      map((categories) => (categories.result)) 
    )
    this.categories$.subscribe((categories) => {
      console.log('categories emit', categories)
    }) ;

    this.products$ = this.store.select(selectProductList) ;
    this.products$.subscribe((products) => {
      console.log('products => ' , products)
      this.displayData$.next(products) ;
      this.totalItems$.next(products.length) ;
      this.updatePaginatedData();
      if(!products || products.length === 0) {
        this.getAllProducts() ;
      }
    }) ;

    combineLatest([this.products$, this.selectedCategories$, this.searchKey$ ])
      .pipe(
        map(([products , selectedCategories , searchKey]) => {
          console.log('selectedCategories => ', selectedCategories);
          const filteredProducts = products.filter((product) => {
            const categoryMatch : boolean =
              selectedCategories.length === 0 ||
              selectedCategories.includes(product.category);
            // check if the product name matches the search key
            const searchMatch : boolean = searchKey
              ? product.name.toLowerCase().includes(searchKey.toLowerCase())
              : true;
            return categoryMatch && searchMatch;
          }
          );
          console.log('filteredProducts => ', filteredProducts);
          return filteredProducts;
        })
      ) 
      .subscribe((filteredProducts) => {
        console.log('subscribe filteredProducts => ', filteredProducts);
        this.filteredProducts$.next(filteredProducts);

        this.totalItems$.next(filteredProducts.length);  // Total number of items

        this.updatePaginatedData();
      });
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

  isCategoryChecked(category : string) {
    return this.selectedCategories$.value.includes(category)
  }
  toggleCategory(selectcategory: string, isChecked: boolean) {
    const selectCategories = this.selectedCategories$.value ;
    if (isChecked) {
      this.selectedCategories$.next([...selectCategories, selectcategory]) ;
    } else {
      // Remove category from the selected categories
      this.selectedCategories$.next(
        selectCategories.filter((category) => category !== selectcategory)
      )
    }

  }
  onChangeSearchKey() {
    this.searchKey$.next(this.localSearchKey)
  }


  toggleDropdown() {

    this.isDropdownOpen = !this.isDropdownOpen ;
    console.log('isdropdown button value: ', this.isDropdownOpen)
  }
  //paginator 
  pageSize$ = new BehaviorSubject<number>(5); //Number of items per page
  currentPage$ = new BehaviorSubject<number>(0); //current page index 
  displayData$ = new BehaviorSubject<Product[]>([]) ;
  totalItems$ = new BehaviorSubject<number>(5) //to hold total number of items for pagination
  pageSizeOptions$ = new BehaviorSubject<number[]>([5,10,20]); //pagination options

  @ViewChild(MatPaginator) paginator!: MatPaginator ;
  
  // ngAfterViewInit() {
  //   this.updatePaginatedData() ;
  // }

  pageChanged(event: PageEvent) {
    this.currentPage$.next(event.pageIndex) ;
    this.pageSize$.next(event.pageSize) ;
    this.updatePaginatedData();  
  }

  updatePaginatedData() {
    const start = this.currentPage$.value * this.pageSize$.value ;
    const end = start + this.pageSize$.value;
    this.filteredProducts$.subscribe((products) => {
      this.displayData$.next(products.slice(start, end)) ;
      // this.cdr.detectChanges();  
    })
  }
}
