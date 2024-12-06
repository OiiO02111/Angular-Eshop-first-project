import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { CategoryService } from '../../../../service/category-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrl: './category-update.component.css',
  standalone: false ,
})
export class CategoryUpdateComponent {

 name : string = ''

  constructor (
    private location: Location ,
    private categoryService: CategoryService ,
    private router: Router ,
    private route: ActivatedRoute ,
  ) {}
  
  sendAction() {
    const id = this.route.snapshot.params['id'] ;
    console.log('this.name', this.name)
    const payload = { name: this.name }
    this.categoryService.updateCategory(id, payload).subscribe({
      next: (res) => {console.log('res ->' , res)},
      error: (err) => {console.log('err ->', err)}
    }) ;
    this.categoryService.getCategoryList() ;
    this.router.navigateByUrl('/admin/category/list')
  }

  goBack(): void {
    this.location.back();
  }

  logoutAction(): void {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/');
  }

}
