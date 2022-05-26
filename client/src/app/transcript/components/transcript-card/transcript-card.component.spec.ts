import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranscriptCardComponent } from './transcript-card.component';

describe('TranscriptCardComponent', () => {
  let component: TranscriptCardComponent;
  let fixture: ComponentFixture<TranscriptCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranscriptCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranscriptCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
