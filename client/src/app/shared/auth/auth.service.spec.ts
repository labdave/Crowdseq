import { HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { environment } from '../../../environments/environment';
import { AuthResponse } from './auth-response';
import { AuthService } from './auth.service';
import { DialogService } from '../components/dialog/dialog.service';
import { PermissionService } from '../services/permission.service';
import { NavigationService } from '../services/navigation.service';
import { MatDialog } from '@angular/material/dialog';

const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
const navigationSpy = jasmine.createSpyObj('NavigationService', ['showNavBar']);
const permissionSpy = jasmine.createSpyObj('PermissionService', ['userHasPermission']);
const dialogSpy = {
  dialog: jasmine.createSpyObj({closeAll: jasmine.createSpy()}),
  alert: jasmine.createSpy()
};

// mock responses

const mockAuthResponse: AuthResponse = new AuthResponse(
  '583a448fdd3ebed868a40dc79d1c7cc6dfbb55cf23f632ce1dbb6c678de0709b',
  {
    id: 1,
    first_name: 'Mock',
    last_name: 'User',
    email: 'mock.user@ddb.bio',
    affiliation_id: 'DDB',
    full_name: 'Mock User'
  }
);

describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: Router, useValue: routerSpy },
        { provide: DialogService, useValue: dialogSpy },
        { provide: NavigationService, useValue: navigationSpy },
        { provide: PermissionService, useValue: permissionSpy }
      ]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
  });

  beforeEach(() => {
    let store = {};
    const mockSessionStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };

    spyOn(sessionStorage, 'getItem').and.callFake(mockSessionStorage.getItem);
    spyOn(sessionStorage, 'setItem').and.callFake(mockSessionStorage.setItem);
    spyOn(sessionStorage, 'removeItem').and.callFake(
      mockSessionStorage.removeItem
    );
    spyOn(sessionStorage, 'clear').and.callFake(mockSessionStorage.clear);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(authService).toBeDefined();
  });

  /** common test for invalidateUser() */
  function invalidateUserCalled() {
    expect(sessionStorage.removeItem).toHaveBeenCalledWith('access_token');
    expect(navigationSpy.showNavBar).toHaveBeenCalledWith(false);
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/login');
  }

  /** test for seeing if session data is set */
  function sessionDataSet() {
    expect(sessionStorage.getItem('access_token')).not.toEqual(null);
  }

  describe('#login', () => {
    it('should fail if invalid credentials', () => {
      const eMsg = 'No active account found with the given credentials';

      authService.login('', '').subscribe(
        data => fail('should have failed with invalid credentials'),
        (error: HttpErrorResponse) => {
          expect(error.error.message).toEqual(eMsg, 'message');
        }
      ); // need to subscribe so the call gets triggered

      const mockError = new ErrorEvent('Network Error', { message: eMsg });

      const req = httpTestingController.expectOne(
        environment.apiBase + '/api/knx/login/'
      );
      expect(req.request.method).toEqual('POST');
      req.error(mockError);

      httpTestingController.verify();
    });

    it('should return AuthResponse and setup session information', () => {
      authService
        .login('', '')
        .subscribe(data => expect(data).toEqual(mockAuthResponse), fail); // need to subscribe so the call gets triggered

      const req = httpTestingController.expectOne(
        environment.apiBase + '/api/knx/login/'
      );
      expect(req.request.method).toEqual('POST');
      req.flush(mockAuthResponse);

      expect(sessionStorage.setItem).toHaveBeenCalled();
      sessionDataSet();

      httpTestingController.verify();
    });
  });

  describe('#isLoggedIn', () => {
    it('should return false if token is null', () => {
      expect(authService.isLoggedIn()).toBeFalsy();
      expect(sessionStorage.removeItem).toHaveBeenCalled();
      invalidateUserCalled();
    });

    it('should return false if token is expired', () => {
      // const expiresAt = moment.unix(0); // very old date
      // sessionStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
      // expect(authService.isLoggedIn()).toBeFalsy();
      // invalidateUserCalled();
    });

    // it('should return true if token has not expired', () => {
    //   const expiresAt = moment.unix(2145916800); // future date
    //   sessionStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    //   expect(authService.isLoggedIn()).toBeTruthy();
    // });
  });

  // describe('#refreshToken', () => {
  //   it('should not make a call if the refresh token is not stored', () => {
  //     // should not call the refresh api endpoint
  //     httpTestingController.expectNone(environment.apiBase + '/api/token/refresh/');

  //     authService.refreshToken();
  //     expect(sessionStorage.getItem).toHaveBeenCalledWith('refresh_token');
  //     httpTestingController.verify();
  //     invalidateUserCalled();
  //   });

  //   it('should not make a call if the refresh token is expired', () => {
  //     // should not call the refresh api endpoint
  //     httpTestingController.expectNone(environment.apiBase + '/api/token/refresh/');
  //     const expiresAt = moment.unix(0); // very old date
  //     sessionStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  //     authService.refreshToken();
  //     expect(sessionStorage.getItem).toHaveBeenCalledWith('refresh_token');
  //     httpTestingController.verify();
  //     invalidateUserCalled();
  //   });

  //   it('should attempt to refresh token if token is set and unexpired ', () => {
  //     const expiresAt = moment.unix(2145916800); // future date
  //     sessionStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  //     sessionStorage.setItem('refresh_token', 'test'); // mock refresh token

  //     authService.refreshToken().subscribe(
  //       data => expect(data).toEqual(mockAuthResponse),
  //       fail
  //     ); // need to subscribe so the call gets triggered

  //     const req = httpTestingController.expectOne(environment.apiBase + '/api/token/refresh/');
  //     expect(req.request.method).toEqual('POST');
  //     req.flush(mockAuthResponse);

  //     expect(sessionStorage.getItem).toHaveBeenCalledWith('refresh_token');
  //     httpTestingController.verify();
  //   });
  // });

  describe('#logout', () => {
    it('should call invalidateUser', () => {
      authService.logout();
      const req = httpTestingController.expectOne(
        environment.apiBase + '/api/knx/logout/'
      );
      expect(req.request.method).toEqual('POST');
      req.flush({});

      httpTestingController.verify();

      invalidateUserCalled();
    });
  });

  // describe('#getExpiration', () => {
  //   it('should return null if token is not set', () => {
  //     expect(authService.getExpiration()).toEqual(null);
  //   });

  //   it('should return null if token is not a valid date', () => {
  //     const expiresAt =  JSON.stringify('test'); // bogus json ( not a date )
  //     sessionStorage.setItem('expires_at', expiresAt);
  //     expect(authService.getExpiration()).toEqual(null);
  //   });

  //   it('should return moment date if token is set properly', () => {
  //     const expiresAt =  JSON.stringify(moment.unix(2145916800).valueOf()); // future date
  //     sessionStorage.setItem('expires_at', expiresAt);
  //     expect(moment().isBefore(authService.getExpiration())).toBeTruthy();
  //   });
  // });
});
