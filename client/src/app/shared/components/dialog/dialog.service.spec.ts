import { OverlayContainer } from '@angular/cdk/overlay';
import { HttpClientModule } from '@angular/common/http';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Directive, NgModule, ViewChild, ViewContainerRef } from '@angular/core';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { DialogService } from './dialog.service';
import { AlertAction } from './model/alertAction';
import { DialogComponent } from './dialog.component';

const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
const configSpy = jasmine.createSpyObj('AppConfig', ['getConfig']);

// Taken from Material Dialog testing spec: https://github.com/angular/material2/blob/master/src/lib/dialog/dialog.spec.ts
@Directive({ selector: 'dir-with-view-container' })

class DirectiveWithViewContainer {
  constructor(public viewContainerRef: ViewContainerRef) { }
}

@Component({
  selector: 'seq-arbitrary-component',
  template: `<dir-with-view-container></dir-with-view-container>`,
})

class ComponentWithChildViewContainer {
  @ViewChild(DirectiveWithViewContainer, /* TODO: add static flag */ {}) childWithViewContainer: DirectiveWithViewContainer;

  get childViewContainer() {
    return this.childWithViewContainer.viewContainerRef;
  }
}


@NgModule({
  imports: [
    HttpClientModule,
    NoopAnimationsModule,
    // material modules
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  declarations: [
    DialogComponent,
    ComponentWithChildViewContainer,
    DirectiveWithViewContainer
  ],
  providers: [
    DialogService,
    { provide: Router, useValue: routerSpy },
    MatDialog,
    MatSnackBar
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
class TestModule { }


/**
 * Complete
 */
describe('DialogService', () => {
  let dialogService: DialogService;

  let dialog: MatDialog;
  let matSnackBar: MatSnackBar;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;
  let testViewContainerRef: ViewContainerRef;
  let viewContainerFixture: ComponentFixture<ComponentWithChildViewContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: []
    })
      .compileComponents();
  }));

  beforeEach((() => {
    dialogService = TestBed.inject(DialogService);
    viewContainerFixture = TestBed.createComponent(ComponentWithChildViewContainer);

    matSnackBar = TestBed.inject(MatSnackBar);
    viewContainerFixture.detectChanges();
    testViewContainerRef = viewContainerFixture.componentInstance.childViewContainer;
  }));

  beforeEach(inject([MatDialog, OverlayContainer],
    (d: MatDialog, oc: OverlayContainer) => {
      dialog = d;
      overlayContainer = oc;
      overlayContainerElement = oc.getContainerElement();
    }));


  it('should be created', () => {
    expect(dialogService).toBeDefined();
  });

  describe('#alert', () => {
    it('should add a MatDialogRef<DialogComponent> to an array of dialogs', () => {
      dialogService.alert('test dialog', 'test message', testViewContainerRef);
      expect(dialogService.refs.length).toEqual(1);
    });

    it('should open a DialogComponent', () => {
      const spy = spyOn(dialog, 'open').and.callThrough();
      dialogService.alert('test dialog', 'test message', testViewContainerRef);
      expect(spy).toHaveBeenCalled();
    });

    it('should assign expected defaults and values to a MatDialogRef<DialogComponent>', () => {
      const newDialog = dialogService.alert('test dialog', 'test message', testViewContainerRef);
      expect(newDialog.componentInstance.title).toEqual('test dialog');
      expect(newDialog.componentInstance.message).toEqual('test message');
      expect(newDialog.componentInstance.type).toEqual(DialogService.normal);
      const buttonAction = new AlertAction('OK', 'ok', '#fafafa', '#000000'); // mimic default button
      expect(newDialog.componentInstance.buttons).toEqual([buttonAction]);
    });

    it('should assign error type to a MatDialogRef<DialogComponent>', () => {
      const newDialog = dialogService.alert('test dialog', 'test message', testViewContainerRef, 'error');
      expect(newDialog.componentInstance.type).toEqual('error');
    });

    it('should assign normal type to a MatDialogRef<DialogComponent>', () => {
      const newDialog = dialogService.alert('test dialog', 'test message', testViewContainerRef, DialogService.normal);
      expect(newDialog.componentInstance.type).toEqual(DialogService.normal);
    });

    it('should assign warning type to a MatDialogRef<DialogComponent>', () => {
      const newDialog = dialogService.alert('test dialog', 'test message', testViewContainerRef, 'warning');
      expect(newDialog.componentInstance.type).toEqual('warning');
    });

    it('should assign success type to a MatDialogRef<DialogComponent>', () => {
      const newDialog = dialogService.alert('test dialog', 'test message', testViewContainerRef, 'success');
      expect(newDialog.componentInstance.type).toEqual('success');
    });

    it('should assign buttons as expected to a MatDialogRef<DialogComponent>', () => {
      const okButton = new AlertAction('OK', 'ok', '#fafafa', '#000000');
      const cancelButton = new AlertAction('CANCEL', 'cancel', '#fafafa', '#000000');
      const confirmButton = new AlertAction('YES', 'yes', '#00c853', '#fafafa');
      const denyButton = new AlertAction('NO', 'no', '#e64a19', '#fafafa');
      const newDialog = dialogService.alert(
        'test dialog', 'test message', testViewContainerRef, DialogService.normal, [okButton, cancelButton, confirmButton, denyButton]
      );
      expect(newDialog.componentInstance.buttons).toEqual([okButton, cancelButton, confirmButton, denyButton]);
    });
  });

  describe('#confirmationAlert', () => {
    it('should assign buttons as expected to a MatDialogRef<DialogComponent>', () => {
      const confirmButton = new AlertAction('YES', 'yes', '#00c853', '#fafafa');
      const denyButton = new AlertAction('NO', 'no', '#e64a19', '#fafafa');
      const newDialog = dialogService.confirmationAlert('test dialog', 'test message', testViewContainerRef);
      expect(newDialog.componentInstance.buttons).toEqual([confirmButton, denyButton]);
    });

    it('should assign type as expected to a MatDialogRef<DialogComponent>', () => {
      const newDialog = dialogService.confirmationAlert('test dialog', 'test message', testViewContainerRef);
      expect(newDialog.componentInstance.type).toEqual('warning');
    });
  });

  describe('#showSnackbar', () => {
    it('should add a snackbar reference to an array of references', () => {
      const newSnackbar = dialogService.showSnackbar('test snackbar', DialogService.medium, DialogService.normal, '', testViewContainerRef);
      expect(dialogService.snackBarRefs.length).toEqual(1);
    });

    it('should open a SimpleSnackBar', () => {
      const spy = spyOn(matSnackBar, 'open').and.callThrough();
      dialogService.showSnackbar('test snackbar', DialogService.medium, DialogService.normal, '', testViewContainerRef);
      expect(spy).toHaveBeenCalled();
    });

    it('should open a snackbar with duration of medium', () => {
      dialogService.showSnackbar('test snackbar', DialogService.medium, DialogService.normal, '', testViewContainerRef);
      const snackBarRef = dialogService.snackBarRefs[0];
      expect(snackBarRef.containerInstance.snackBarConfig.duration).toEqual(DialogService.medium);
    });

    it('should open a snackbar with politeness = assertive (default)', () => {
      dialogService.showSnackbar('test snackbar', DialogService.medium, DialogService.normal, '', testViewContainerRef);
      const snackBarRef = dialogService.snackBarRefs[0];
      expect(snackBarRef.containerInstance.snackBarConfig.politeness).toEqual('assertive');
    });

    it('should open a snackbar with type = normal', () => {
      dialogService.showSnackbar('test snackbar', DialogService.medium, DialogService.normal, '', testViewContainerRef);
      const snackBarRef = dialogService.snackBarRefs[0];
      expect(snackBarRef.containerInstance.snackBarConfig.panelClass).toEqual([DialogService.normal + '-sb']);
    });
  });
});
