import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../../auth/auth.service';
import { DialogService } from '../dialog/dialog.service';

@Component({
  selector: 'seq-feedback-dialog',
  templateUrl: './feedback-dialog.component.html',
  styleUrls: ['./feedback-dialog.component.scss']
})
export class FeedbackDialogComponent {
  isSaving = false;
  feedbackForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<FeedbackDialogComponent>,
    private dialogService: DialogService,
    private fb: FormBuilder,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.feedbackForm = this.fb.group({
      feedback: ['', Validators.required],
    });
  }

  submitFeedback() {
    if (this.feedbackForm.valid) {
      this.isSaving = true;
      const feedback = {feedback: this.feedbackForm.controls.feedback.value};
      this.authService.submitFeedback(feedback).subscribe(
        data => {
          this.isSaving = false;
          this.dialogRef.close();
        },
        error => {
          this.dialogService.alert(
            'Submission Error',
            'There was an issue submitting the data.',
            null,
            DialogService.error
          );
          this.isSaving = false;
        }
      );
    }
  }
}
