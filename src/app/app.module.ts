import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { registerAppScopedDispatcher } from "@angular/core/primitives/event-dispatch";
import { FormsModule, ReactiveFormsModule } from "@angular/forms"; 
import { HttpClientModule } from "@angular/common/http";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { MatPaginatorModule } from '@angular/material/paginator'
// import { Location } from "@angular/common
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module' ;
import { BaseUrlInterceptor } from "./helper/http.interceptor";
import { Reducer } from "@reduxjs/toolkit";
//components
import { AppComponent } from "./app.component";
import { UserListComponent } from "./component/Admin/user/user-list/user-list.component";
import { LoginComponent } from "./component/login/login.component";
import { RegisterComponent } from "./component/register/register.component";
import { DashboardComponent } from "./component/Admin/dashboard/dashboard.component";
import { ProductCreateComponent } from "./component/Admin/products/product-create/product-create.component";
import { ProductListComponent } from "./component/Admin/products/product-list/product.component";
import { ProductUpdateComponent } from "./component/Admin/products/product-update/product-update.component";
import { CategoryListComponent } from "./component/Admin/category/category-list/category-list.component";
import { CategoryCreateComponent } from "./component/Admin/category/category-create/category-create.component";
import { CategoryUpdateComponent } from "./component/Admin/category/category-update/category-update.component";
//store
import { authReducer } from "./store/auth/auth.reducer";
import { AuthEffects } from "./store/auth/auth.effects";
import { ProductEffect } from "./store/product/product.effect";
import { productReducer } from "./store/product/product.reducer";
import { UserEffect } from './store/user/user.effect';
import { userReducer } from "./store/user/user.reducer";
import { UserCreateComponent } from "./component/Admin/user/user-create/user-create.component";
import { ChangeRoleComponent } from "./component/Admin/user/change-role/change-role.component";

@NgModule ({
    declarations: [
        AppComponent ,
        LoginComponent ,
        RegisterComponent ,
        DashboardComponent ,
        ProductListComponent ,
        ProductCreateComponent ,
        ProductUpdateComponent ,
        CategoryListComponent ,
        CategoryCreateComponent ,
        CategoryUpdateComponent ,
        UserListComponent ,
        UserCreateComponent ,
        ChangeRoleComponent ,
    ] ,
    imports: [
        BrowserModule ,
        StoreModule.forRoot(),
        EffectsModule.forRoot(),
        // This would normally contain the root state, e.g., `StoreModule.forRoot({ app: appReducer })`
        // StoreModule.forRoot({ auth: authReducer }),
        EffectsModule.forFeature([AuthEffects]) ,
        StoreModule.forFeature('auth', authReducer) ,// Registering 'auth' feature
        EffectsModule.forFeature([ProductEffect]),
        StoreModule.forFeature('product', productReducer ),
        EffectsModule.forFeature([UserEffect]) ,
        StoreModule.forFeature('user', userReducer ) ,
        // EffectsModule.forFeature([AuthEffects]),
        StoreDevtoolsModule.instrument({ maxAge: 25 }),
        BrowserAnimationsModule,
        MatPaginatorModule ,
        AppRoutingModule ,
        FormsModule ,
        ReactiveFormsModule ,
        HttpClientModule
    ] ,
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true },
        Location ,
      ],
    bootstrap: [AppComponent] ,

})

export class AppModule { }