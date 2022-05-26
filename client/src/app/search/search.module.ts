import { NgModule } from '@angular/core';
import { SharedModule as SeqSharedModule } from '../shared/shared.module';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './components/search/search.component';


@NgModule({
  declarations: [SearchComponent],
  imports: [
    SeqSharedModule,
    SearchRoutingModule
  ]
})
export class SearchModule { }
