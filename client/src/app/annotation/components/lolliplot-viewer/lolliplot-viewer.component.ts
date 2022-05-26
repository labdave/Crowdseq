import { Component,Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-lolliplot-viewer',
  templateUrl: './lolliplot-viewer.component.html',
  styleUrls: ['./lolliplot-viewer.component.scss']
})
export class LolliplotViewerComponent implements OnChanges {
  @Input() data: any;
  lolliplotUrl: string;

  constructor(private sanitizer: DomSanitizer ) {}

  ngOnChanges() {
    this.lolliplotUrl = this.data;
  }

  cleanURL(oldURL: string): SafeResourceUrl {
    this.lolliplotUrl = this.data;
    return this.sanitizer.bypassSecurityTrustResourceUrl(oldURL);
  }

}
