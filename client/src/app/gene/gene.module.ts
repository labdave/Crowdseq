import { NgModule } from '@angular/core';

import { GeneRoutingModule } from './gene-routing.module';
import { GeneDetailComponent } from './components/gene-detail/gene-detail.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [GeneDetailComponent],
  imports: [
    SharedModule,
    GeneRoutingModule
  ]
})
export class GeneModule { }
