import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AAAnnotation } from 'src/app/annotation/models/aa-annotation';

@Component({
  selector: 'app-aminoacid-card',
  templateUrl: './aminoacid-card.component.html',
  styleUrls: ['./aminoacid-card.component.scss']
})
export class AminoacidCardComponent implements OnInit, OnChanges {
  @Input() data: any;
  @Input() geneId: number;
  @Output() aaChanged: EventEmitter<number> = new EventEmitter();

  aaList: any[];
  selectedAminoAcidId: number;
  currentAA: any;

  annotationList: AAAnnotation[];
  annotationIndex = 0;

  constructor() { }

  ngOnInit(): void {
    if ( this.data ) {
      // list of genes in data, set current gene to first in list
      if ( Array.isArray(this.data) ) {
        this.aaList = this.data;
        this.selectedAminoAcidId = this.aaList[0].id;
        this.currentAA = this.aaList[0];
        this.selectedAminoAcidChanged();
      } else{
        this.currentAA = this.data;
        this.selectedAminoAcidChanged();
      }
    }
  }

  ngOnChanges(): void {
    if ( this.geneId && this.currentAA && this.currentAA.annotations ) {
      this.annotationIndex = 0;
      this.annotationList = this.currentAA.annotations.reduce((a, o) => (o.gene_id === this.geneId && a.push(o), a), []);
    }
  }

  aaListSelectionChange(event) {
    const list = this.aaList.reduce((a, o) => (o.id === this.selectedAminoAcidId && a.push(o), a), []);
    this.currentAA = list.length > 0 ? list[0] : null;
    this.aaChanged.emit(this.selectedAminoAcidId);
    this.selectedAminoAcidChanged();
  }

  selectedAminoAcidChanged() {
    if ( this.currentAA ) {
      // single gene in data, pull the annotation list
      this.annotationIndex = 0;
      if ( this.currentAA.annotations ) {
        this.annotationList = this.currentAA.annotations;
      } else {
        this.annotationList = [];
      }
    } else {
      this.annotationIndex = 0;
      this.annotationList = [];
    }
  }


}
