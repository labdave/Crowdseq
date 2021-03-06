import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranscriptListComponent } from './transcript-list.component';

describe('TranscriptListComponent', () => {
  let component: TranscriptListComponent;
  let fixture: ComponentFixture<TranscriptListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranscriptListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranscriptListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
