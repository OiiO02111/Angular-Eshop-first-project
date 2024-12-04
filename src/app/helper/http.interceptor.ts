import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment.development';

@Injectable() 

export class BaseUrlInterceptor implements HttpInterceptor {
    intercept( 
            req: HttpRequest<any>, 
            next: HttpHandler ,
        ): Observable<HttpEvent<any>> {
        const apiReq = req.clone(
            {
                url: `${environment.apiurl}${req.url}` ,
            }
        );
        return next.handle(apiReq) ;
    }
}

