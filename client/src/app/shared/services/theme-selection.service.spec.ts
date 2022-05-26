import { TestBed, inject } from '@angular/core/testing';

import { ThemeSelectionService } from './theme-selection.service';
import { AuthService } from '../auth/auth.service';
import { MockData } from 'src/app/tests/mock-data';

describe('ThemeSelectionService', () => {

  const authSpy = {
    userInfo: MockData.MOCK_USER_INFO,
    isLoggedIn: jasmine.createSpy(),
    login: jasmine.createSpy()
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ThemeSelectionService,
        { provide: AuthService, useValue: authSpy }
      ]
    });
  });

  it('should be created', inject([ThemeSelectionService], (service: ThemeSelectionService) => {
    expect(service).toBeTruthy();
  }));
});
