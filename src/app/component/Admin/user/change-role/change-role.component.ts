import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserAuthService } from '../../../../service/user-auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as UserAction from '../../../../store/user/user.action';

@Component({
  selector: 'app-change-role',
  standalone: false ,
  templateUrl: './change-role.component.html',
  styleUrl: './change-role.component.css'
})
export class ChangeRoleComponent {

  role: string = '' ;
  id: number = 0 ;

  constructor(
    private location: Location ,
    private store: Store ,
    private userService: UserAuthService ,
    private router: Router ,
    private route: ActivatedRoute
  ) {}

  sendAction() {
    this.id = this.route.snapshot.params['id'] ;
    const payload = { 
        id: this.id ,
        role: this.role ,
     };
    this.store.dispatch(UserAction.changeRole(payload))
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
