import { NgModule } from '@angular/core';
import { SharedModule as SeqSharedModule } from '../shared/shared.module';

import { AnnotationRoutingModule } from './annotation-routing.module';
import { AnnotationPageComponent } from './components/annotation-page/annotation-page.component';


@NgModule({
  declarations: [AnnotationPageComponent],
  imports: [
    SeqSharedModule,
    AnnotationRoutingModule
  ]
})
export class AnnotationModule { }
