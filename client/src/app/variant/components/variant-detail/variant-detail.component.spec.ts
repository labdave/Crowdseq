import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariantDetailComponent } from './variant-detail.component';

describe('VariantDetailComponent', () => {
  let component: VariantDetailComponent;
  let fixture: ComponentFixture<VariantDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VariantDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariantDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
