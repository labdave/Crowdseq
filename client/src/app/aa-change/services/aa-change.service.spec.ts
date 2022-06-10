import { TestBed } from '@angular/core/testing';

import { AaChangeService } from './aa-change.service';

describe('AaChangeService', () => {
  let service: AaChangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AaChangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
