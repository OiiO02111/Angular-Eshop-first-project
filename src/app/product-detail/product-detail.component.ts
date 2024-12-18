import { Component, OnInit } from '@angular/core';
import { Product } from '../component/Admin/models/product';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectProductList } from '../store/product/product.selector';

@Component({
  selector: 'app-product-detail',
  standalone: false ,
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit{

  product : any = {} as Product;
  id: number  = 0 ;

  constructor(
    private route: ActivatedRoute ,
    private location: Location ,
    private store: Store
  ) {}

    ngOnInit(): void {
      this.id = this.route.snapshot.params['id'] ;
      console.log(this.id)
      this.store.select(selectProductList).subscribe((products) => {
        console.log('products in product details', products)
        this.product = products.filter((item) => {
          // console.log(item.id)
          return item.id == this.id
        })[0];
        console.log('Current Product => ', this.product)
      })
    }


    goback() {
      this.location.back();
    }
}
