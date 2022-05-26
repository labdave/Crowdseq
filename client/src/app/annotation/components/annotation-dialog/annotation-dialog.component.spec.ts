import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotationDialogComponent } from './annotation-dialog.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DialogService } from 'src/app/shared/components/dialog/dialog.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnnotationService } from '../../services/annotation.service';

describe('AnnotationDialogComponent', () => {
  let component: AnnotationDialogComponent;
  let fixture: ComponentFixture<AnnotationDialogComponent>;

  const dialogSpy = jasmine.createSpyObj('DialogService', ['alert']);
  const annotationSpy = jasmine.createSpyObj('AnnotationService', ['getAnnotations']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        SharedModule
      ],
      providers: [
        { provide: AnnotationService, useValue: annotationSpy },
        { provide: DialogService, useValue: dialogSpy },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnotationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
