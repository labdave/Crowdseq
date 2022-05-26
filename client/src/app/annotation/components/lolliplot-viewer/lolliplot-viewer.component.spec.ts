import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LolliplotViewerComponent } from './lolliplot-viewer.component';

describe('LolliplotViewerComponent', () => {
  let component: LolliplotViewerComponent;
  let fixture: ComponentFixture<LolliplotViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LolliplotViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LolliplotViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
