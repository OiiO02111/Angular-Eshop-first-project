import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthStorageService } from "./auth.storage.service";


@Injectable ({
    providedIn: 'root' ,
})

export class AuthGuard implements CanActivate {
    constructor(
        private router: Router ,
        private authStorageService: AuthStorageService ,
    ) {}

    canActivate(
        next: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        const userRole = this.authStorageService.getUserRole() ;
        
        console.log('Here is the canActivate function')
        if( !userRole ) {
            this.router.navigate(['']);
            return false ;
        }
        
        try {
            const requireRole = next.data['role'] ;
            if( requireRole && userRole !== requireRole ) {
                this.router.navigate(['']) ;
                return false ;
            }

            return true ;
        } catch (error) {
            alert(error) ;
            // if the token is invalid , redirect to landing page
            this.router.navigate(['']) ;
            return false;
        }
        
    }
}