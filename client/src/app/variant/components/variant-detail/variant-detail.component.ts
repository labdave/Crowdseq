import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'src/app/shared/components/dialog/dialog.service';
import { Variant } from '../../models/variant';
import { Gene } from '../../../gene/models/gene';
import { Transcript } from '../../../transcript/models/transcript';
import { VariantService } from '../../services/variant.service';

@Component({
  selector: 'app-variant-detail',
  templateUrl: './variant-detail.component.html',
  styleUrls: ['./variant-detail.component.scss']
})
export class VariantDetailComponent implements OnInit {

  chromPosRefAlt: string;
  isLoading = false;
  
  geneData: Gene;
  variantData: Variant;
  transcriptData: Transcript[];

  constructor(private activatedRoute: ActivatedRoute,
              private service: VariantService,
              private dialogService: DialogService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.chromPosRefAlt = params['cpra'];
    });

    this.loadVariantData(this.chromPosRefAlt);
  }

  loadVariantData(cpra: string) {
    this.isLoading = true;
    this.service.getVariantCPRA(cpra).subscribe(
      data => {
        this.isLoading = false;
        this.variantData = data;
        if ( data && data.gene ) {
          this.geneData = data.gene;
        } else {
          this.geneData = new Gene();
        }
        if ( data && data.transcripts ) {
          this.transcriptData = data.transcripts;
        } else {
          this.transcriptData = [];
        }
        
      }, error => {
        this.isLoading = false;
        this.dialogService.alert('Error', 'There was an issue with retrieving the variant information.', null, DialogService.error);
      }
    );
  }

}
