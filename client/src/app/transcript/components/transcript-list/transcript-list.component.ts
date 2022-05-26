import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-transcript-list',
  templateUrl: './transcript-list.component.html',
  styleUrls: ['./transcript-list.component.scss']
})
export class TranscriptListComponent implements AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  @Input() data: any;
  @Input() showTitle: boolean;

  resultsLength = 0;

  displayedColumns: string[] = ['transcript_id', 'canonical', 'aa_change', 'transcript_length'];
  dataSource: MatTableDataSource<any>;

  constructor() { }

  ngAfterViewInit(): void {
    if ( this.data ) {
        this.dataSource = new MatTableDataSource(this.data);
        this.resultsLength = this.data.length;
        this.dataSource.sort = this.sort;
    } else {
      this.resultsLength = 0;
      this.dataSource = new MatTableDataSource();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
