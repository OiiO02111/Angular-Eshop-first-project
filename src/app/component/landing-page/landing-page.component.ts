import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../Admin/models/product';
import { Category } from '../Admin/models/category';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { selectProductList } from '../../store/product/product.selector' ;
import * as ProductAction from '../../../app/store/product/product.action' ;
import { CategoryService } from '../../service/category-service';

@Component({
  selector: 'app-landing-page',
  standalone: false ,
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements OnInit{
  
  products$: Observable<Product[]> = new Observable<Product[]>() ;
  categories$: Observable<Category[]> = new Observable<Category[]>() ;

  constructor(
    private store: Store ,
    private router: Router ,
    private categoryService: CategoryService ,
    
  ) {}

  ngOnInit(): void {
    this.products$ = this.store.select(selectProductList) ;
    this.categories$ = this.categoryService.getCategoryList() ;
    
    this.products$.subscribe((products) => {
      if(!products || products.length === 0 ) {
        console.log('get products in landingPage!')
        this.store.dispatch(ProductAction.getProductList()) ;
      }
    }) ;


  }
  gotoProductDetail(product: Product): void {
    this.router.navigate([ '/auth/productdetail', product.id ]) ;
  }
  gotoLogin() {
    this.router.navigateByUrl('/auth/login') ;
  }
}
