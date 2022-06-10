import { NgModule } from '@angular/core';

import { AaChangeRoutingModule } from './aa-change-routing.module';
import { AminoacidDetailComponent } from './components/aminoacid-detail/aminoacid-detail.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [AminoacidDetailComponent],
  imports: [
    SharedModule,
    AaChangeRoutingModule
  ]
})
export class AaChangeModule { }
