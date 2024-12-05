import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { DashboardComponent } from './component/Admin/dashboard/dashboard.component';
import { ProductListComponent } from './component/Admin/products/product-list/product.component';
import { ProductCreateComponent } from './component/Admin/products/product-create/product-create.component';
import { ProductUpdateComponent } from './component/Admin/products/product-update/product-update.component';
import { CategoryListComponent } from './component/Admin/category/category-list/category-list.component';
import { CategoryCreateComponent } from './component/Admin/category/category-create/category-create.component';
import { CategoryUpdateComponent } from './component/Admin/category/category-update/category-update.component';
import { UserListComponent } from './component/Admin/user/user-list/user-list.component';
import { UserCreateComponent } from './component/Admin/user/user-create/user-create.component';
import { ChangeRoleComponent } from './component/Admin/user/change-role/change-role.component';

 
const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full'},
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'auth/dashboard', component: DashboardComponent },
  
// ADMIN functionality
  { path: 'admin/products/list', component: ProductListComponent },
  { path: 'admin/products/create', component: ProductCreateComponent },
  { path: 'admin/products/update/:id', component: ProductUpdateComponent },
  { path: 'admin/category/list', component: CategoryListComponent } ,
  { path: 'admin/category/create', component: CategoryCreateComponent } ,
  { path: 'admin/category/update/:id', component: CategoryUpdateComponent } ,
  { path: 'admin/users/list' , component: UserListComponent },
  { path: 'admin/users/create', component: UserCreateComponent } ,
  { path: 'admin/users/change-role/:id', component: ChangeRoleComponent } ,
  

];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }