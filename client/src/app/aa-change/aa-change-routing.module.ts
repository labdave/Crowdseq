import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AminoacidDetailComponent } from './components/aminoacid-detail/aminoacid-detail.component';

const routes: Routes = [
  { path: '',
    children: [
      { path: ':shortName', component: AminoacidDetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AaChangeRoutingModule { }

