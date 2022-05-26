import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotationSelectorComponent } from './annotation-selector.component';

describe('AnnotationSelectorComponent', () => {
  let component: AnnotationSelectorComponent;
  let fixture: ComponentFixture<AnnotationSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnotationSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnotationSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
