import { AfterViewInit, Component, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap, debounceTime, delay } from 'rxjs/operators';
import { DialogService } from 'src/app/shared/components/dialog/dialog.service';
import { SearchService } from '../../services/search.service';
import { SearchResult } from '../../models/search-result';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements AfterViewInit {

  searchForm: FormGroup;
  formChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  queryResult: SearchResult = new SearchResult();

  isLoading = false;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public service: SearchService,
    private dialogService: DialogService,
    private router: Router
  ) {

    this.searchForm = this.fb.group({
      searchTerm: ['', Validators.minLength(3)]
    });

    this.searchForm.controls.searchTerm.valueChanges
    .pipe(
      debounceTime(500),
    )
    .subscribe(data => {
      if (data && data.indexOf('/') == -1 && this.searchForm.valid ) {
        this.formChange.next(true);
      }
    });

   }

  ngAfterViewInit() {
    // make the api call for annotations every time the paginator size, page or filter option changes
    merge(this.formChange)
      .pipe(
        startWith({}),
        delay(0),
        switchMap(() => {
          this.isLoading = true;
          return this.service.search(
            this.searchForm.controls.searchTerm.value);
        }),
        map(data => {
          this.isLoading = false;
          return data;
        }),
        catchError(() => {
          this.isLoading = false;
          return observableOf(new SearchResult());
        })
      ).subscribe(data => {
        this.queryResult = data;
      }, error => {
        this.queryResult = new SearchResult();
      });
  }

  navigateTo(event){
    this.router.navigate([event.option.value]);
  }

  onKeydownEvent(event: KeyboardEvent) {
    if ( event.key === 'Enter' ) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  clearSearch() {
    this.searchForm.controls.searchTerm.setValue('');
    this.formChange.next(true);
  }

}
