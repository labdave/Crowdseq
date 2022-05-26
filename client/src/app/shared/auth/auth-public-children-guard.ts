import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NavigationService } from '../services/navigation.service';
import { AuthService } from './auth.service';

@Injectable()
export class AuthPublicChildrenGuard implements CanActivate {
    constructor(private auth: AuthService, private router: Router, public navigation: NavigationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // If user is not logged in we'll send them to the homepage
        if ( (state.url.match(/\//g) || []).length > 1) {
            this.navigation.showNavBar(true);
            return true;
        } else {
            return this.checkAuthentication(state);
        }
    }

    canLoad(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // If user is not logged in we'll send them to the login screen
        return this.checkAuthentication(state);
    }

    checkAuthentication(state) {
        if (!this.auth.isLoggedIn()) {
        this.auth.redirectURL = state.url;
        this.router.navigateByUrl('/login');
        return false;
        }
        return true;
    }
}
