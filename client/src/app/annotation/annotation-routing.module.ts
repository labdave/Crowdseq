import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnnotationPageComponent } from './components/annotation-page/annotation-page.component';

const routes: Routes = [
  { path: '', children: [{ path: '', component: AnnotationPageComponent }] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnnotationRoutingModule { }
