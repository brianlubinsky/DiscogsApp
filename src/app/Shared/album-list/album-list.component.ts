import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IAlbumSearchResult } from '../../Search/IAlbumSearchResult';
import { IPageableCollection } from '../../SharedModels/IPageableCollection';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class AlbumListComponent implements OnInit {

  //retransmitting event from pager, which is not great ...
  @Output() pageSelected  = new EventEmitter<number>();

  @Input() albums: IPageableCollection<IAlbumSearchResult>;

  @ViewChild(MatSort) sort: MatSort;

  constructor() { }

  ngOnInit(): void {
  }

  onPageSelected(page:number)
  {
    this.pageSelected.emit(page);
  }

  getDataSource()
  {
    var dataSource =  new MatTableDataSource(this.albums.results);
    if (this.sort)
      dataSource.sort = this.sort;
    return dataSource;
  }
}
