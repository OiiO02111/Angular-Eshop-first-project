import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: false ,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-login-register';
  private usernameSubject = new BehaviorSubject<string | null>(null);
  username$ = this.usernameSubject.asObservable();

  constructor(private router: Router) {
    // Initialize with token from localStorage
    const token = localStorage.getItem('token');
    if (token) {
      this.updateUsernameFromToken(token);
    }
  }

  updateUsernameFromToken(token: string) {
    try {
      const decoded: any = jwtDecode(token);
      this.usernameSubject.next(decoded.name); // Assuming 'name' is in the token
    } catch (error) {
      console.error('Error decoding token:', error);
      this.usernameSubject.next(null);
    }
  }

  gotoLogin() {
    this.router.navigateByUrl('/auth/login');
  }

  gotoCart() {
    this.router.navigateByUrl('/user/cart/cartdetail');
  }
}
