import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CapsLockDirective } from './caps-lock.directive';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';


/** Need to create a test component to test the directive */
@Component({
  template: `<input type="text" seqCapsLock>`
})
class TestCapsLockComponent {
}

describe('CapsLockDirective', () => {
  let component: TestCapsLockComponent;
  let fixture: ComponentFixture<TestCapsLockComponent>;
  let directiveEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestCapsLockComponent, CapsLockDirective]
    });
    fixture = TestBed.createComponent(TestCapsLockComponent);
    component = fixture.componentInstance;
    directiveEl = fixture.debugElement.query(By.directive(CapsLockDirective));
  });

  it('should create an instance', () => {
    const directive = new CapsLockDirective();
    expect(directive).toBeTruthy();
  });

  it('should emit true if CAPSLOCK is turned on', () => {
    expect(directiveEl).not.toBeNull();
    const directiveInstance = directiveEl.injector.get(CapsLockDirective);
    expect(directiveInstance.capsLock).not.toBeNull();
    const event = new KeyboardEvent('keydown', {
        bubbles: true,
        modifierCapsLock: true
    });
    spyOn(directiveInstance.capsLock, 'emit');
    spyOn(directiveInstance, 'onKeyDown').and.callThrough();

    window.dispatchEvent(event);
    fixture.detectChanges();
    expect(event.getModifierState('CapsLock')).toEqual(true);
    expect(directiveInstance.onKeyDown).toHaveBeenCalled();
    expect(directiveInstance.capsLock.emit).toHaveBeenCalled();
    expect(directiveInstance.capsLock.emit).toHaveBeenCalledWith(true);
  });

  it('should emit false if CAPSLOCK is turned off', () => {
    expect(directiveEl).not.toBeNull();
    const directiveInstance = directiveEl.injector.get(CapsLockDirective);
    const event = new KeyboardEvent('keydown', {
        bubbles: true,
        modifierCapsLock: false
    });
    spyOn(directiveInstance.capsLock, 'emit');
    spyOn(directiveInstance, 'onKeyDown').and.callThrough();

    window.dispatchEvent(event);
    fixture.detectChanges();
    expect(event.getModifierState('CapsLock')).toEqual(false);
    expect(directiveInstance.onKeyDown).toHaveBeenCalled();
    expect(directiveInstance.capsLock.emit).toHaveBeenCalled();
    expect(directiveInstance.capsLock.emit).toHaveBeenCalledWith(false);
  });
});
