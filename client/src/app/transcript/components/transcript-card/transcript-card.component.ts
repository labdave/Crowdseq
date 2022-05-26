import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AAAnnotation } from 'src/app/annotation/models/aa-annotation';

@Component({
  selector: 'app-transcript-card',
  templateUrl: './transcript-card.component.html',
  styleUrls: ['./transcript-card.component.scss']
})
export class TranscriptCardComponent implements OnInit {
  @Input() data: any;

  annotationList: AAAnnotation[];
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
