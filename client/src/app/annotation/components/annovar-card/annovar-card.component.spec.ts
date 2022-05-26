import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnovarCardComponent } from './annovar-card.component';

describe('AnnovarCardComponent', () => {
  let component: AnnovarCardComponent;
  let fixture: ComponentFixture<AnnovarCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnovarCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnovarCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
