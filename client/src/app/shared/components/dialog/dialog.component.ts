import { AlertAction } from './model/alertAction';

import { MatDialogRef } from '@angular/material/dialog';
import { Component } from '@angular/core';

@Component({
  selector: 'seq-alert-dialog',
  templateUrl: 'dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  public title: string;
  public message: string;
  public buttons: AlertAction[];
  public type: string;

  constructor(public dialogRef: MatDialogRef<DialogComponent>) {
  }
}
