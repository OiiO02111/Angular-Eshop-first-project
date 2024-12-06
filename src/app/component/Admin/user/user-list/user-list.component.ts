import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Location } from '@angular/common';
import { UserAuthService } from '../../../../service/user-auth.service';
import * as UserAction from '../../../../store/user/user.action'
import { selectUserList } from '../../../../store/user/user.selector';
import { Observable } from 'rxjs';
import { User } from '../../../../user/user';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {

  users$!: Observable<any[]> ;

  constructor (
    private store: Store ,
    private router: Router ,
    private userService: UserAuthService ,
    private location: Location ,
  ) {}

  ngOnInit(): void {
    console.log('======>')
    this.users$ = this.store.select(selectUserList)
    this.users$.subscribe((users) => {
      if ( !users || users.length === 0) {
        this.store.dispatch(UserAction.getUserList()) ;
      }

    })

  }

  addNewUser() {
    this.router.navigateByUrl('/admin/users/create') ;
  }

  getAllUsers() {
    this.store.dispatch(UserAction.getUserList()) ;
  }

  changeRole(id: number) {
    this.router.navigate(['admin/users/change-role', id]) ;
  }
  deleteUser(id: number) {
    this.store.dispatch(UserAction.deleteUser({id}))
    // this.userService.deleteUser(id).subscribe({
    //   next: (data) => console.log('data', data),
    //   error: (error) => console.log('error', error)
    // })
    // this.store.dispatch(UserAction.getUserList()) ;
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
