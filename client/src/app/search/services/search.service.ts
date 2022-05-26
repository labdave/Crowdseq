import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DialogService } from 'src/app/shared/components/dialog/dialog.service';
import { environment } from '../../../environments/environment';
import { of, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SearchResult } from '../models/search-result';

@Injectable()
export class SearchService {

  queryResults: SearchResult;
  queryResultsChange: Subject<SearchResult | null> = new Subject<SearchResult | null>();


  constructor(
    private _http: HttpClient,
    private dialogService: DialogService
  ) { }

  public setQueryResults(queryResults: SearchResult) {
    this.queryResultsChange.next(queryResults);
  }

  search(searchTerm: string) {
    if (searchTerm != '' ) {
      const href = environment.apiBase + '/api/search/';
      let requestUrl = `${href}?query=${searchTerm}`;
      return this._http.get<any>(requestUrl).pipe(
        tap(
          data => {
            this.setQueryResults(data.results); // reset the query result list
          }
        )
      );
    } else {
      return of(new SearchResult());
    }
  }
}
