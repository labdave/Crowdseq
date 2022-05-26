import { AfterViewInit, Component, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-variant-list',
  templateUrl: './variant-list.component.html',
  styleUrls: ['./variant-list.component.scss']
})
export class VariantListComponent implements AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() data: any;
  @Input() showTitle: boolean;

  resultsLength = 0;

  displayedColumns: string[] = ['chrom_pos_ref_alt', 'link'];
  dataSource: MatTableDataSource<any>;

  constructor() { }

  ngAfterViewInit(): void {
    if ( this.data ) {
        this.dataSource = new MatTableDataSource(this.data);
        this.resultsLength = this.data.length;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
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
