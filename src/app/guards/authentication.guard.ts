import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationGuard implements CanActivate {
  //16-Injection des services :
  constructor(private authService : AuthenticationService,
              private router : Router) {

  }

  //17-Protection des routes
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Activation de la route
    let authenticated = this.authService.isAuthenticated();
    // Retour user non authentifié
    if(authenticated==false){
      this.router.navigateByUrl("/login");
        return false;
    } else{
      // Retour user authentifié
      return true;
    }

    // canActivate(
    //   route: ActivatedRouteSnapshot,
    //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //   // Activation de la route
    //   if(this.authService.isAuthenticated()){
    //     // Retour user authentifié
    //     return true;
    //   }else{
    //     this.router.navigateByUrl("/login");
    //     // Retour user non authentifié
    //     return false;
    //   }

  }

}
