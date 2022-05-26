import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthPublicGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // If user is not logged in we'll send them to the homepage
    return this.checkAuthentication(state);
  }

  canLoad(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // If user is not logged in we'll send them to the login screen
    return this.checkAuthentication(state);
  }

  checkAuthentication(state) {
    this.auth.isLoggedIn();
    return true;
  }
}
