import { NgModule } from '@angular/core';

import { VariantRoutingModule } from './variant-routing.module';
import { VariantDetailComponent } from './components/variant-detail/variant-detail.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [VariantDetailComponent],
  imports: [
    SharedModule,
    VariantRoutingModule
  ]
})
export class VariantModule { }
