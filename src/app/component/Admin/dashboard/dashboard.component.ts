import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../../service/user-auth.service';
import { Router } from '@angular/router';
import { User } from '../../../user/user';
import { Store } from '@ngrx/store';
import { selectAuthToken, selectAuthUser } from '../../../store/auth/auth.selectors';
import { logout } from '../../../store/auth/auth.actions';
import * as AuthActions from '../../../store/auth/auth.actions' ;

@Component({
  selector: 'app-dashboard',
  standalone: false ,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user!: User;

  constructor(
    public userAuthService: UserAuthService,
    private router: Router ,
    private store: Store ,
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
      console.log('token ==>', token);
  
      if (!token) {
        this.router.navigateByUrl('/'); // Redirect to login if token is missing
      } else {
        this.userAuthService.getUser().subscribe({
          next: (data) => {
            console.log('------>>>', data);
            this.user = data.user; // Store user data
            this.router.navigateByUrl('/auth/dashboard');
          },
          error: () => {
            this.router.navigateByUrl('/'); // Redirect if fetching user fails
          },
        });
      }
  }

  productAction() {
    this.router.navigateByUrl('/admin/products/list') ;
  }
  
  categoryAction() {
    this.router.navigateByUrl('/admin/category/list') ;
  }
  
  logoutAction(): void {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/');
  }
  userAction() {
    this.router.navigateByUrl('/admin/users/list') ;
  }


 


}
