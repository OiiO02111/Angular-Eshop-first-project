import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../service/product-service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Product } from '../../models/product';

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

  constructor( private productService: ProductService ,
               private router: Router ,
               private store: Store ,
               private location: Location , 
               private route: ActivatedRoute ,
            ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'] ;
    this.productService.getProductById(this.id).subscribe((data) => {
      console.log('Here is the getProductById and the data from server is:', data)
    this.product = this.productService.transform(data) ;
    }

    );
  }

  goBack() {
    this.location.back();
  }

  updateAction() {

  }



  
}
