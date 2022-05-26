import { AlertAction } from './model/alertAction';
import { DialogComponent } from './dialog.component';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Injectable, ViewContainerRef, OnDestroy } from '@angular/core';

@Injectable()
export class DialogService implements OnDestroy {

  public static readonly error: string = 'error';
  public static readonly normal: string = 'normal';
  public static readonly warning: string = 'warning';
  public static readonly success: string = 'success';

  public static readonly short: number = 1500;
  public static readonly medium: number = 3000;
  public static readonly long: number = 6000;

  public static readonly okButton: AlertAction = new AlertAction('OK', 'ok', '#fafafa', '#000000');
  public static readonly cancelButton: AlertAction = new AlertAction('CANCEL', 'cancel', '#fafafa', '#000000');

  public static readonly confirmButton: AlertAction = new AlertAction('YES', 'yes', '#00c853', '#fafafa');
  public static readonly denyButton: AlertAction = new AlertAction('NO', 'no', '#e64a19', '#fafafa');

  public refs: MatDialogRef<any>[] = [];
  public snackBarRefs: MatSnackBarRef<any>[] = [];

  constructor(public dialog: MatDialog, public snackBar: MatSnackBar) {}

  /** Generates an alert modal with the parameters that are provided.
   * Can be subscribed to in order to perform actions on close or with the return of one of the Action button values that are passed in*/
  public alert(
    title: string,
    message: string,
    viewContainerRef: ViewContainerRef,
    type: string = DialogService.normal,
    buttons: AlertAction[] = [DialogService.okButton]
  ): MatDialogRef<DialogComponent> {
    let dialogRef: MatDialogRef<DialogComponent>;
    const config = new MatDialogConfig();
    config.viewContainerRef = viewContainerRef;

    dialogRef = this.dialog.open(DialogComponent, config);

    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;
    dialogRef.componentInstance.type = type;
    dialogRef.componentInstance.buttons = buttons;
    this.refs.push(dialogRef);
    return dialogRef;
  }

  /** Generates and returns an alert confirmation that can be subscribed to in order to perform actions based on user response */
  public confirmationAlert(title: string, message: string, viewContinerRef: ViewContainerRef, type = DialogService.warning) {
    return this.alert(title, message, viewContinerRef, type, [DialogService.confirmButton, DialogService.denyButton]);
  }

  /** Generates a Material Snackbar with the customizations provided via the parameters. */
  public showSnackbar(
    message: string,
    duration = DialogService.medium,
    type?: string,
    action?: string,
    viewContainerRef?: ViewContainerRef
  ) {
    const sbConfig: MatSnackBarConfig = new MatSnackBarConfig();
    sbConfig.duration = duration;
    sbConfig.politeness = 'assertive';
    sbConfig.panelClass = [type + '-sb'];

    this.snackBarRefs.push(this.snackBar.open(message, action, sbConfig));
  }

  ngOnDestroy(): void {
    this.refs.forEach((ref: MatDialogRef<any>) => {
      ref.close();
    });
    this.snackBarRefs.forEach((ref: MatSnackBarRef<any>) => {
      ref.dismiss();
    });
  }
}
