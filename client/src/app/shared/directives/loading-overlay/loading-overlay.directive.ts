import { LoadingOverlayComponent } from './loading-overlay.component';
import { Directive, ElementRef, Input, OnChanges, ViewContainerRef, OnDestroy } from '@angular/core';
import { OverlayRef, OverlayConfig, Overlay, PositionStrategy } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ElementRuler } from './element-ruler';
@Directive({
  selector: '[seqLoadingOverlay]'
})
export class LoadingOverlayDirective implements OnDestroy, OnChanges {
  // tslint:disable-next-line:no-input-rename
  @Input('seqLoadingOverlay') trigger: boolean;

  private overlayRef: OverlayRef;
  private _portal: ComponentPortal<LoadingOverlayComponent>;

  overlayConfig: OverlayConfig;

  constructor(private overlay: Overlay,
    private elementRef: ElementRef,
    private viewContainerRef: ViewContainerRef,
    private ruler: ElementRuler) {
  }

  ngOnDestroy(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }
  }

  ngOnChanges() {
    if (this.trigger) {
      this.showLoader();
    } else {
      this.hideLoader();
    }
  }

  showLoader() {
      const overlayRef = this.createOverlay();
      if (overlayRef.hasAttached()) {
        this.hideLoader();
      }

      this._portal = this._portal || new ComponentPortal(LoadingOverlayComponent, this.viewContainerRef);

      const loaderInstance = overlayRef.attach(this._portal).instance;

      overlayRef.updatePosition();
      loaderInstance.detect();
  }

  hideLoader() {
      if (this.overlayRef) {
        this.overlayRef.detach();
      }
  }

  createOverlay() {
    if (this.overlayRef) {
      return this.overlayRef;
    }

    const rect = this.elementRef.nativeElement.getBoundingClientRect();
    this.overlayConfig = {
      hasBackdrop: false,
      width: rect.width,
      height: rect.height,
      positionStrategy: this.getPositionStrategy()

    };
    this.overlayRef = this.overlay.create(this.overlayConfig);

    const rulerRef = this.ruler.create( this.elementRef.nativeElement, 0);
    rulerRef.change.subscribe(({ width, height }) => {
      if ( this.overlayRef.overlayElement) {
        this.overlayRef.updateSize({ width, height });
        this.overlayRef.updatePositionStrategy(this.getPositionStrategy());
        this.overlayRef.updatePosition();
      }
    });

    return this.overlayRef;
  }

  private getPositionStrategy(): PositionStrategy {
    const rect = this.elementRef.nativeElement.getBoundingClientRect();
    const top = rect.top < 0 ? -20 : rect.top;
    return this.overlay.position().global().top(top + 'px').right(rect.right + 'px').left(rect.left + 'px');
  }

}
