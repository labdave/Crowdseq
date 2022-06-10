import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AminoacidListComponent } from './aminoacid-list.component';

describe('AminoacidListComponent', () => {
  let component: AminoacidListComponent;
  let fixture: ComponentFixture<AminoacidListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AminoacidListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AminoacidListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
