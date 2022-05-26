import { NgModule } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot, RouterState } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
const authService = jasmine.createSpyObj('AuthService', ['isLoggedIn']);

@NgModule({
  imports: [],
  declarations: [],
  providers: [
    AuthGuard,
    { provide: AuthService, useValue: authService },
    { provide: Router, useValue: routerSpy }
  ],
  schemas: []
})
class TestModule {}

/**
 * Complete
 */
describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let loggedInSpy: any;
  const routeMock: any = { snapshot: {}};
  const routeStateMock: any = { snapshot: {}, url: '/home'};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: []
    }).compileComponents();
  }));

  beforeEach(() => {
    authGuard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(authGuard).toBeDefined();
  });

  describe('#checkAuthentication', () => {
    it('should return false when not logged in', () => {
      loggedInSpy = authService.isLoggedIn.and.returnValue( false );
      const result = authGuard.checkAuthentication(routeStateMock);
      expect(result).toEqual(false);
    });

    it('should return true when logged in', () => {
      loggedInSpy = authService.isLoggedIn.and.returnValue( true );
      const result = authGuard.checkAuthentication(routeStateMock);
      expect(result).toEqual(true);
    });
  });

  describe('#canActivate', () => {
    it('should return false when not logged in', () => {
      loggedInSpy = authService.isLoggedIn.and.returnValue( false );
      const result = authGuard.canActivate(routeMock, routeStateMock);
      expect(result).toEqual(false);
    });

    it('should return true when logged in', () => {
      loggedInSpy = authService.isLoggedIn.and.returnValue( true );
      const result = authGuard.canActivate(routeMock, routeStateMock);
      expect(result).toEqual(true);
    });
  });

  describe('#canLoad', () => {
    it('should return false when not logged in', () => {
      loggedInSpy = authService.isLoggedIn.and.returnValue( false );
      const result = authGuard.canLoad(routeMock, routeStateMock);
      expect(result).toEqual(false);
    });

    it('should return true when logged in', () => {
      loggedInSpy = authService.isLoggedIn.and.returnValue( true );
      const result = authGuard.canLoad(routeMock, routeStateMock);
      expect(result).toEqual(true);
    });
  });
});
