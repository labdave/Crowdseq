import { NgModule } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { NavigationService } from './navigation.service';

@NgModule({
  providers: [NavigationService]
})
class TestModule { }


/**
 * Complete
 */
describe('NavigationService', () => {
  let service: NavigationService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule]
    })
      .compileComponents();
  }));

  beforeEach((() => {
    service = new NavigationService();
  }));


  it('should be created', () => {
    expect(service).toBeDefined();
  });

  it('Should emit an Observable for true', () => {
    service.showNavBar(true);
    let mockResponse: boolean;
    service.showNavBarEmitter.subscribe((mode) => {
      mockResponse = mode;
    });
    expect(mockResponse).toEqual(true);
  });

  it('Should emit an Observable for false', () => {
    service.showNavBar(false);
    let mockResponse: boolean;
    service.showNavBarEmitter.subscribe((mode) => {
      mockResponse = mode;
    });
    expect(mockResponse).toEqual(false);
  });

});
