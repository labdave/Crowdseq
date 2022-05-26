import { NgModule } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { SecondsToTimePipe } from './seconds-to-time.pipe';

@NgModule({
  imports: [],
  declarations: [SecondsToTimePipe],
  providers: [],
  schemas: []
})
class TestModule {}

/**
 * Complete
 */
describe('SecondsToTimePipe', () => {
  let pipe: SecondsToTimePipe;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    pipe = new SecondsToTimePipe();
  });

  it('should be created', () => {
    expect(pipe).toBeDefined();
  });

  it('should transform 900 seconds to 15:00', () => {
    expect(pipe.transform(900)).toBe('15:00');
  });

  it('should transform 666 seconds to 11:06', () => {
    expect(pipe.transform(666)).toBe('11:06');
  });

  it('should not transform 900 to 5', () => {
    expect(pipe.transform(900)).not.toBe('5');
  });
});
