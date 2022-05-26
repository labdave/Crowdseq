import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AnnotationDialogComponent } from '../annotation-dialog/annotation-dialog.component';
import * as cloneDeep from 'lodash/cloneDeep';
import { DialogService } from 'src/app/shared/components/dialog/dialog.service';

@Component({
  selector: 'app-annotation-selector',
  templateUrl: './annotation-selector.component.html',
  styleUrls: ['./annotation-selector.component.scss']
})
export class AnnotationSelectorComponent implements OnChanges {
  @Input() annotations: any;
  @Input() index: number;
  @Input() permission: string;
  @Output() indexChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() listUpdated: EventEmitter<any> = new EventEmitter<any>();

  selectedAnnotation: any;

  constructor(public dialog: MatDialog, private dialogService: DialogService) {}

  ngOnChanges(): void {
    if ( this.annotations ) {
      this.selectedAnnotation = this.annotations[this.index];
    } else {
      this.selectedAnnotation = null;
    }
  }

  changeAnnotation(previous= false): void {
    this.index += previous ? -1 : 1;
    this.selectedAnnotation = this.annotations[this.index];
    this.indexChange.emit(this.index);
  }


  isPreviousAnnotationEnabled(): Boolean {
    return this.index > 0;
  }

  isNextAnnotationEnabled(): Boolean {
    return this.index < this.annotations.length - 1;
  }

  editAnnotation() {
    const dialogRef = this.dialog.open(AnnotationDialogComponent, {
      width: '700px',
      height: '380px',
      data: {
        annotation: cloneDeep(this.selectedAnnotation)
      }
    });

    dialogRef.afterClosed().subscribe(result => {
        if ( result ) {
          this.dialogService.showSnackbar(
            'Annotation Saved',
            DialogService.medium,
            DialogService.success
          );
          if ( this.annotations ) {
            this.annotations.push(result);
            this.annotations = this.annotations.sort((a, b) => a.score < b.score || b.creation_timestamp.localeCompare(a.creation_timestamp));
            this.selectedAnnotation = this.annotations[this.annotations.map(function(e) { return e.id; }).indexOf(result.id)];
          }
          this.listUpdated.emit(result);
        }
      }
    );
  }
  
}
