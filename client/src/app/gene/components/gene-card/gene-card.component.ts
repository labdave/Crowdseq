import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GeneAnnotation } from '../../../annotation/models/gene-annotation';

@Component({
  selector: 'app-gene-card',
  templateUrl: './gene-card.component.html',
  styleUrls: ['./gene-card.component.scss']
})
export class GeneCardComponent implements OnInit {
  @Input() data: any;
  @Input() aminoAcidId: number;
  @Output() geneChanged: EventEmitter<number> = new EventEmitter();

  geneList: any[];
  selectedGeneId: number;
  currentGene: any;

  annotationList: GeneAnnotation[];
  annotationIndex = 0;

  constructor() { }

  ngOnInit(): void {
    if ( this.data ) {
      // list of genes in data, set current gene to first in list
      if ( Array.isArray(this.data) ) {
        this.geneList = this.data;
        this.selectedGeneId = this.geneList[0].id;
        this.currentGene = this.geneList[0];
        this.selectedGeneChanged();
      } else{
        this.currentGene = this.data;
        this.selectedGeneChanged();
      }
    }
  }

  geneListSelectionChange(event) {
    const list = this.geneList.reduce((a, o) => (o.id === this.selectedGeneId && a.push(o), a), []);
    this.currentGene = list.length > 0 ? list[0] : null;
    this.selectedGeneChanged();
  }

  selectedGeneChanged() {
    if ( this.currentGene ) {
      // single gene in data, pull the annotation list
      this.annotationIndex = 0;
      if ( this.currentGene.annotations ) {
        this.annotationList = this.currentGene.annotations;
      } else {
        this.annotationList = [];
      }
      this.geneChanged.emit(this.selectedGeneId);
    } else {
      this.annotationIndex = 0;
      this.annotationList = [];
    }
  }

}
