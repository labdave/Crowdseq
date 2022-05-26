import { Component, Input, OnInit } from '@angular/core';
import { GeneAnnotation } from '../../../annotation/models/gene-annotation';

@Component({
  selector: 'app-gene-card',
  templateUrl: './gene-card.component.html',
  styleUrls: ['./gene-card.component.scss']
})
export class GeneCardComponent implements OnInit {
  @Input() data: any;

  annotationList: GeneAnnotation[];
  annotationIndex = 0;

  constructor() { }

  ngOnInit(): void {
    if (this.data && this.data.annotations ) {
      this.annotationList = this.data.annotations;
    } else {
      this.annotationList = [];
    }
  }

}
