import { NgModule } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { StringFormatPipe } from './string-format.pipe';

@NgModule({
  imports: [],
  declarations: [StringFormatPipe],
  providers: [],
  schemas: []
})
class TestModule {}

/**
 * Complete
 */
describe('StringFormatPipe', () => {
  let pipe: StringFormatPipe;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    pipe = new StringFormatPipe();
  });

  it('should be created', () => {
    expect(pipe).toBeDefined();
  });

  it('should transform &amp;to &', () => {
    expect(pipe.transform('&amp;')).toBe('&');
  });

  it('should transform &lt;to &', () => {
    expect(pipe.transform('&lt;')).toBe('<');
  });

  it('should transform &gt;to &', () => {
    expect(pipe.transform('&gt;')).toBe('>');
  });

  it(`should transform &apos;to '`, () => {
    expect(pipe.transform('&apos;')).toBe(`'`);
  });

  it(`should not transform &apos;to *`, () => {
    expect(pipe.transform('&apos;')).not.toBe(`*`);
  });

  it(`should change nothing`, () => {
    expect(pipe.transform('Testing')).toBe('Testing');
  });
});
