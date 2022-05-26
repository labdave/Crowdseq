import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneDetailComponent } from './components/gene-detail/gene-detail.component';

const routes: Routes = [
  { path: '',
    children: [
      { path: ':symbol', component: GeneDetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneRoutingModule { }
