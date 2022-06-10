import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MissingPageComponent } from './missing-page/missing-page.component';


const routes: Routes = [
  { path: '', redirectTo: '/search', pathMatch: 'full' },
  { path: '404', component: MissingPageComponent, data: { title: 'Page Not Found' } },
  { path: 'search', loadChildren: () => import('./search/search.module').then(m => m.SearchModule), data: { preload: false } },
  { path: 'annotation', loadChildren: () => import('./annotation/annotation.module').then(m => m.AnnotationModule), data: { preload: false } },
  { path: 'variant', loadChildren: () => import('./variant/variant.module').then(m => m.VariantModule), data: { preload: false } },
  { path: 'gene', loadChildren: () => import('./gene/gene.module').then(m => m.GeneModule), data: { preload: false } },
  { path: 'aa', loadChildren: () => import('./aa-change/aa-change.module').then(m => m.AaChangeModule), data: { preload: false } },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
