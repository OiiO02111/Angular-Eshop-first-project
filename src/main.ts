import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/modules/app.module' ;
// import axios from 'axios';
import { environment } from './environments/environment.development';
import { CategoryListComponent } from './app/component/Admin/category/category-list/category-list.component';



// axios.interceptors.request.use(function (config) {
//   config.headers['X-Binarybox-Api-Key'] = environment.apiKey;
//   return config ;
// });

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.error(err));


      