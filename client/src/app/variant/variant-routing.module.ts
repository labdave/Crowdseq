import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VariantDetailComponent } from './components/variant-detail/variant-detail.component';

const routes: Routes = [
  { path: '',
    children: [
      { path: ':cpra', component: VariantDetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VariantRoutingModule { }
