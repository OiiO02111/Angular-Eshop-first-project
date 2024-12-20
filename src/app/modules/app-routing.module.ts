import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../component/login/login.component';
import { RegisterComponent } from '../component/register/register.component';
import { LandingPageComponent } from '../component/landing-page/landing-page.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { CartDetailComponent } from '../component/user/cart/cart.detail/cart.detail.component';

 
const routes: Routes = [

  { path: '', redirectTo: 'auth/landing', pathMatch: 'full'} ,
  { path: 'auth/login', component: LoginComponent } ,
  { path: 'auth/register', component: RegisterComponent } ,
  { path: 'auth/landing', component: LandingPageComponent } ,
  { path: 'auth/productdetail/:id', component: ProductDetailComponent } ,
  
  { path: 'user/cart/cartdetail' , component: CartDetailComponent } ,
  

];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)] ,
  exports: [RouterModule] ,
})

export class AppRoutingModule { }