import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../service/user-auth.service';
import { Router } from '@angular/router';
 

@Component({
  selector: 'app-register',
  standalone: false ,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  name:string = ''
  email:string = ''
  password:string = ''
  confirmPassword:string = ''
  isSubmitting:boolean = false
  validationErrors:any = []
 
  constructor(public userAuthService: UserAuthService, private router: Router) {}
 
  ngOnInit(): void {
    // if(localStorage.getItem('token') != "" && localStorage.getItem('token') != null){
    //   this.router.navigateByUrl('/admin/dashboard')
    // }
  }
 
  registerAction() {
    this.isSubmitting = true;
    let payload = {
      name:this.name ,
      email:this.email ,
      password:this.password ,
      confirmPassword:this.confirmPassword ,
    }
    console.log('Here is registerAction function')
    this.userAuthService.register(payload).subscribe({
      next: ({data}) => {
        console.log('Then ------------------------', data)
        this.router.navigateByUrl('/auth/login')
        console.log(data.token)
        // localStorage.setItem('token', data.token)
        return data
      },
      error: error => {

        console.log('console error ==>', error) 
        this.isSubmitting = false;
        if (error.error.message != undefined) {
          this.validationErrors = error.error.message;
        }
        
        return error
      }
    });
   
  }
}