import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AminoacidDetailComponent } from './aminoacid-detail.component';

describe('AminoacidDetailComponent', () => {
  let component: AminoacidDetailComponent;
  let fixture: ComponentFixture<AminoacidDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AminoacidDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AminoacidDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
