import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariantCardComponent } from './variant-card.component';

describe('VariantCardComponent', () => {
  let component: VariantCardComponent;
  let fixture: ComponentFixture<VariantCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VariantCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariantCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
