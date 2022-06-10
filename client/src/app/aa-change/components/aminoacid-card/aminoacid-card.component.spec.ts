import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AminoacidCardComponent } from './aminoacid-card.component';

describe('AminoacidCardComponent', () => {
  let component: AminoacidCardComponent;
  let fixture: ComponentFixture<AminoacidCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AminoacidCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AminoacidCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
