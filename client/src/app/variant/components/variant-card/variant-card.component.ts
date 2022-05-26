import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-variant-card',
  templateUrl: './variant-card.component.html',
  styleUrls: ['./variant-card.component.scss']
})
export class VariantCardComponent implements OnInit {
  @Input() data: any;

  constructor() { }

  ngOnInit(): void {
  }

}
