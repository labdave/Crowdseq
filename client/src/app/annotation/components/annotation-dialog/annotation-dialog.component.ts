import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnnotationService } from '../../services/annotation.service';
import { DialogService } from 'src/app/shared/components/dialog/dialog.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AAAnnotation } from '../../models/aa-annotation';

@Component({
  selector: 'app-annotation-dialog',
  templateUrl: './annotation-dialog.component.html',
  styleUrls: ['./annotation-dialog.component.scss']
})
export class AnnotationDialogComponent {
  dialogTitle = 'Edit Annotation';
  isSaving = false;

  annotationForm: FormGroup;

  aminoAcidChange = null;
  currentAnnotation = null;


  constructor(
    public dialogRef: MatDialogRef<AnnotationDialogComponent>,
    private service: AnnotationService,
    private dialogService: DialogService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.annotationForm = this.fb.group({
      annotation: ['', Validators.required]
    });

    if ( data ) {

      if ( data.aminoAcidChange ) {
        this.aminoAcidChange = data.aminoAcidChange;
        this.dialogTitle = 'Edit Variant Annotation';
        this.annotationForm.controls.annotation.setValue('This variant is of unknown biological significance.');
      }

      if ( data.annotation ) {
        this.currentAnnotation = data.annotation;
        this.annotationForm.controls.annotation.setValue(this.currentAnnotation.annotation);
        if ( this.currentAnnotation.hasOwnProperty('gene') ) {
          // editing gene annotation
          this.dialogTitle = 'Edit Gene Annotation';
        } else {
          // editing gene annotation
          this.dialogTitle = 'Edit Variant Annotation';
        }
      }
    }
  }


  saveAnnotation() {
    if ( this.annotationForm.valid ) {

      let newAnnotation = this.currentAnnotation ? this.currentAnnotation : new AAAnnotation();
      newAnnotation.annotation = this.annotationForm.value.annotation;
      newAnnotation.id = null;
      newAnnotation.creation_timestamp = null;
      newAnnotation.user = null;
      if ( this.aminoAcidChange ) {
        newAnnotation.score = 50;
        newAnnotation.priority = 50;
        newAnnotation.aa_change = [this.aminoAcidChange.id];
      }

      this.isSaving = true;
      this.service.saveAnnotation(newAnnotation).subscribe(
        data => {
          this.isSaving = false;
          if (data) {
            this.dialogRef.close(data);
          } else {
            this.dialogService.alert(
              'Save Error',
              'There was an issue saving the annotation.',
              null,
              DialogService.error
            );
            this.isSaving = false;
          }
        },
        error => {
          this.dialogService.alert(
            'Save Error',
            'There was an issue saving the annotation.',
            null,
            DialogService.error
          );
          this.isSaving = false;
        }
      );
    }
  }
}
