import { Injectable, NgZone } from '@angular/core';
import { auditTime } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

export interface ElementRulerRef {
  /** Emits element size when it changes */
  change: Observable<{ width: number; height: number, top: number }>;

  /** Stop watching element size */
  dispose(): void;
}

@Injectable()
export class ElementRuler {
  constructor(private zone: NgZone) {}

  /**
   * Creates an instance of ElementRulerRef to watch element size.
   */
  create(node: any, throttleTime = 100): ElementRulerRef {
    let width;
    let height;
    let top;
    let animationFrameId;

    const _change = new BehaviorSubject({ width: 0, height: 0, top: 0 });

    const watchOnFrame = () => {
      const rect = node.getBoundingClientRect();
      const currentWidth = node.clientWidth;
      const currentHeight = node.clientHeight;
      const currentTop  = rect.top;

      if (currentWidth !== width || currentHeight !== height || currentTop !== top) {
        width = currentWidth;
        height = currentHeight;
        top = rect.top;
        _change.next({ width, height, top });
      }

      animationFrameId = requestAnimationFrame(watchOnFrame);
    };

    this.zone.runOutsideAngular(watchOnFrame);

    const dispose = () => {
      cancelAnimationFrame(animationFrameId);
      _change.complete();
    };

    const obs = _change.asObservable();
    const change = throttleTime > 0 ? obs.pipe(auditTime(throttleTime)) : obs;

    return { dispose, change };
  }
}
