import { Directive, Output, EventEmitter, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[seqCapsLock]'
})
export class CapsLockDirective {
  @Output() capsLock: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const capsOn = event.getModifierState && event.getModifierState('CapsLock');
    this.capsLock.emit(capsOn);
  }

  @HostListener('window:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent): void {
    const capsOn = event.getModifierState && event.getModifierState('CapsLock');
    this.capsLock.emit(capsOn);
  }

}
