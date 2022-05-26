import { TestBed } from '@angular/core/testing';

import { AnnotationService } from './annotation.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DialogService } from 'src/app/shared/components/dialog/dialog.service';

describe('AnnotationService', () => {

  const dialogSpy = jasmine.createSpyObj('DialogService', ['alert']);

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AnnotationService,
        { provide: DialogService, useValue: dialogSpy }
      ]
    })
  );

  it('should be created', () => {
    const service: AnnotationService = TestBed.inject(AnnotationService);
    expect(service).toBeTruthy();
  });
});
