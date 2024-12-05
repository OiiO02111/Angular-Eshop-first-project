import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserAuthService } from '../../../../service/user-auth.service';
import * as UserAction from '../../../../store/user/user.action';
import { User } from '../../../../user/user';

@Component({
  selector: 'app-user-create',
  standalone: false ,
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css'
})
export class UserCreateComponent {
  id: number | null = null ;
  name: string = '';
  email: string = '';
  role: string = '' ;
  password: string = '';

  constructor(
    private router: Router ,
    private location: Location ,
    private store: Store ,
    private userService: UserAuthService ,
  ) {}

  sendAction() {
    const payload = {
      user: {
        name: this.name ,
        email: this.email ,
        password: this.password ,
        role: this.role ,
      }
    }
    this.store.dispatch(UserAction.createNewUser(payload))
  }

  goBack(): void {
    this.location.back();
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
}
