import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { DialogService } from '../components/dialog/dialog.service';
import { UserInfo } from '../models/user-info';
import { PermissionService } from '../services/permission.service';
import { AuthResponse } from './auth-response';
import { NavigationService } from '../services/navigation.service';



@Injectable()
export class AuthService {
  private _loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  public loggedInEmitter: Observable<boolean> = this._loggedIn.asObservable();

  private _startTour: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  public startTourEmitter: Observable<boolean> = this._startTour.asObservable();

  public redirectURL = '';
  public showHelp = false;

  public socialUsed = false;
  public userInfo: UserInfo;
  userInfoChange: Subject<UserInfo | null> = new Subject<UserInfo | null>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private navigation: NavigationService,
    private dialogService: DialogService,
    private permissionService: PermissionService
  ) {
    this.userInfoChange.subscribe(value => {
      this.userInfo = value;
    });
  }

  public setUserInfo(userInfo: UserInfo) {
    this.userInfoChange.next(userInfo);
  }

  isLoggedIn() {
    // const exp = this.getExpiration();

    // if (exp != null && moment().isBefore(exp)) {
    //   this._loggedIn.next(true);
    //   return true;
    // } else {
    //   this.invalidateUser();
    //   this._loggedIn.next(false);
    //   return false;
    // }

    const token = sessionStorage.getItem('access_token');

    if (token != null) {
      this._loggedIn.next(true);
      return true;
    } else {
      this.invalidateUser();
      this._loggedIn.next(false);
      return false;
    }
  }

  auth_access_token(access_token: string, redirect = '') {
    return this.http
      .post<AuthResponse>(environment.apiBase + '/api/knx/login/', {
        access_token: access_token
      })
      .pipe(tap(res => {
        this.userInfo = res.user;
        if (res && res.user.permissions && res.user.permissions.length > 0) {
          this.permissionService.setUserPermissionList(res.user.permissions);
          this.setSession(res);
          this.isLoggedIn();
          redirect = redirect.substring(0, redirect.indexOf('?'));
          this.router.navigateByUrl(redirect);
        } else {
          this.logout();
        }
      })
      );
  }

  login(username: string, password: string) {
    return this.http
      .post<AuthResponse>(environment.apiBase + '/api/knx/login/', {
        username: username,
        password: password
      })
      .pipe(tap(res => {
        this.setUserInfo(res.user);
        if (res && res.user.permissions && res.user.permissions.length > 0) {
          this.permissionService.setUserPermissionList(res.user.permissions);
          this.setSession(res);
        } else {
          this.logout();
        }
      }));
  }

  // refreshToken() {
  //   const token = sessionStorage.getItem('refresh_token');
  //   if (token && this.getExpiration() != null) { // if token is set and not expired
  //     return this.http.post<AuthResponse>(environment.apiBase + '/api/token/refresh/', { 'refresh': token }).pipe(
  //       tap(res => this.setSession(res, true)));
  //   } else {
  //     this.invalidateUser();
  //   }
  // }

  logout(saveCurrentRoute = false) {
    this.dialogService.dialog.closeAll(); // make sure all open dialogs have been closed
    // request to logout to api, don't care what happens but have to subscribe
    this.http
      .post(environment.apiBase + '/api/knx/logout/', {})
      .subscribe(data => {}, error => {});
    this.invalidateUser(saveCurrentRoute);
  }

  getUserInfo(forceRefresh = false) {
    if (this.userInfo && !forceRefresh) {
      return of(this.userInfo); // return cached user info
    } else {
      return this.http
        .get<UserInfo>(environment.apiBase + '/user-info/')
        .pipe(tap(res => this.handleUserInfoResponse(res)));
    }
  }

  submitFeedback(data: any) {
    return this.http.post<any>(
      environment.apiBase + '/feedback/',
      data
    );
  }

  startTour(start = true) {
    this._startTour.next(start);
  }

  tourCompleted(tourName: string) {
    const data = {};
    data[tourName] = true;
    return this.http
      .patch<UserInfo>(environment.apiBase + '/user-info/', data)
      .pipe(tap(res => this.handleUserInfoResponse(res)));

  }

  checkTourStatus(tourName: string) {
    return this.userInfo.hasOwnProperty(tourName) && this.userInfo[tourName];
  }

  private handleUserInfoResponse(response) {
    this.setUserInfo(response);
    if (response && response.permissions) {
      this.permissionService.setUserPermissionList(response.permissions);
    }
  }

  private setSession(authResult, refreshing = false) {
    sessionStorage.setItem('access_token', authResult.token);
  }

  private invalidateUser(saveCurrentRoute = false) {
    // remove user from local storage to log user out
    this.setUserInfo(null);
    this.navigation.showNavBar(false);
    this.permissionService.setUserPermissionList([]);
    sessionStorage.removeItem('access_token');
    if (saveCurrentRoute && this.router.url !== '/home') {
      this.redirectURL = this.router.url;
      this.router.navigateByUrl('/login');
    } else {
      // navigate to the login page
      this.router.navigateByUrl('/login');
    }
  }

  changePassword(
    oldPassword: string,
    newPassword: string,
    newPassword2: string
  ) {
    return this.http.post<any>(environment.apiBase + '/api/password-change/', {
      old_password: oldPassword,
      new_password1: newPassword,
      new_password2: newPassword2
    });
  }

  passwordReset(email: string) {
    return this.http.post<any>(environment.apiBase + '/api/password-reset/', {
      email: email
    });
  }

  passwordResetConfirm(uid: string, token: string) {
    const url = environment.apiBase + '/api/reset/' + uid + '/' + token + '/';
    return this.http
      .get<any>(environment.apiBase + '/api/reset/' + uid + '/' + token + '/')
      .pipe(tap(res => this.setSession(res)));
  }

  setPasswordAfterReset(newPassword: string, newPassword2: string) {
    return this.http.post<any>(
      environment.apiBase + '/api/set-password-reset/',
      { new_password1: newPassword, new_password2: newPassword2 }
    );
  }

  getUserAffiliation() {
    if ( this.userInfo ) {
      return this.userInfo.affiliation_id.abbr;
    }
    return '';
  }
}
