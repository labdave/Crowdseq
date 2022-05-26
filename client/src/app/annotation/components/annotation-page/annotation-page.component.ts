import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/shared/components/dialog/dialog.service';
import { PermissionService } from 'src/app/shared/services/permission.service';
import { AnnotationService } from '../../services/annotation.service';

@Component({
  selector: 'app-annotation-page',
  templateUrl: './annotation-page.component.html',
  styleUrls: ['./annotation-page.component.scss']
})
export class AnnotationPageComponent implements OnInit {

  annotationList = [];

  constructor(public service: AnnotationService,
              public dialogService: DialogService,
              public permissionService: PermissionService) {
                service.getAnnotations(100,0,[],'').subscribe(
                  data => {
                    this.annotationList = data;
                  },
                  error => {
                    this.dialogService.alert(
                      'Error',
                      'Failed to retrieve the annotation list.',
                      null,
                      DialogService.error
                    );
                  }
                );
   }

  ngOnInit(): void {
  }

  updateVariantAnnotationList(event: any) {
    // this.selectedAAChange.annotations.push(event);
    // this.variantAnnotationList = this.selectedAAChange.annotations.sort((a, b) => a.score < b.score || b.creation_timestamp.localeCompare(a.creation_timestamp));
    // this.variantAnnotationIndex = 0;
    // this.showAminoAcidAnnotations = this.variantAnnotationList.length > 0;
  }

  updateGeneAnnotationList(event: any) {
    // this.geneAnnotationList.push(event);
    // this.geneAnnotationIndex = 0;
  }


}
