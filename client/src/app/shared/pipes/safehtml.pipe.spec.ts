import { NgModule, SecurityContext, Injectable } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeScript, SafeStyle, SafeUrl, SafeValue } from '@angular/platform-browser';
import { SafeHtmlPipe } from './safehtml.pipe';

@Injectable()
class RealDomSanitizer extends DomSanitizer {
  sanitize(
    context: SecurityContext,
    value: SafeValue | string | null
  ): string | null {
    return null;
  }
  bypassSecurityTrustHtml(value: string): SafeHtml {
    return null;
  }
  bypassSecurityTrustStyle(value: string): SafeStyle {
    return null;
  }
  bypassSecurityTrustScript(value: string): SafeScript {
    return null;
  }
  bypassSecurityTrustUrl(value: string): SafeUrl {
    return null;
  }
  bypassSecurityTrustResourceUrl(value: string): SafeResourceUrl {
    return <SafeResourceUrl>value;
  }
}

@NgModule({
  imports: [],
  declarations: [SafeHtmlPipe],
  providers: [{ provide: DomSanitizer, useClass: RealDomSanitizer }],
  schemas: []
})
class TestModule {}

const testUrl = 'http://www.google.com';

/**
 * HACK
 */
describe('SafeHtmlPipe', () => {
  let pipe: SafeHtmlPipe;
  // let domSanitizer = DomSanitizer;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    pipe = new SafeHtmlPipe(new RealDomSanitizer());
  });

  it('should be created', () => {
    expect(pipe).toBeDefined();
  });

  it('should return string as SafeResourceUrl', () => {
    expect(pipe.transform(testUrl)).toBe(<SafeResourceUrl>testUrl);
  });
});
