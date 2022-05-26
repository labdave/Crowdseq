import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { NavigationService } from '../services/navigation.service';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router, private navigation: NavigationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|boolean {
    // If user is not logged in we'll send them to the homepage
    return this.checkAuthentication(state);
  }

  canLoad(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // If user is not logged in we'll send them to the login screen
    return this.checkAuthentication(state);
  }

  checkAuthentication(state) {
    if (!this.auth.isLoggedIn()) {
      if ( state.url.indexOf('access_token') !== -1 ) {
        const token = state.url.substring(state.url.indexOf('?access_token=') + 14);
        this.auth.auth_access_token(token, state.url).toPromise()
        .then( data => {
          return of(true);
        })
        .catch( () => {
          return of(false);
        });
      } else {
        this.auth.redirectURL = state.url;
        this.router.navigateByUrl('/login');
        return false;
      }
    } else {
      if (this.auth.getUserAffiliation() === 'SH' && state.url.indexOf('home') > -1) {
        this.router.navigateByUrl('/cohort/SH-2021');
        return false;
      }
      return true;
    }
  }
}
