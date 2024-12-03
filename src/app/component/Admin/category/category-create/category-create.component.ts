import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { CategoryService } from '../../../../service/category-service';

@Component({
  selector: 'app-category-create',
  standalone: false,
  templateUrl: './category-create.component.html',
  styleUrl: './category-create.component.css'
})
export class CategoryCreateComponent {
  name: string = '' ;

  constructor(
    private location: Location ,
    private router: Router ,
    private categoryService: CategoryService ,
  ) { }

  sendAction () {
    const payload = {
      name: this.name ,
    }
    this.categoryService.addNewCategory(payload).subscribe({
      next: (data) => {
        console.log('Data from the categoryCreate', data)
      },
      error: (error) => {
        console.log('Error from the categoryCreate', error)
      }
    })
  }

  goBack(): void {
    this.location.back();
  }

  logoutAction(): void {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/');
  }

}
