import { TestBed } from '@angular/core/testing';

import { AppHeaderService } from './app-header.service';

describe('AppHeaderService', () => {
  let service: AppHeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppHeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
