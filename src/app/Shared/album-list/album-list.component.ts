import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IAlbumSearchResult } from '../../Search/IAlbumSearchResult';
import { IPageableCollection } from '../../SharedModels/IPageableCollection';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class AlbumListComponent implements OnInit {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.loadingSubject.asObservable();

  //retransmitting event from pager, which is not great ...
  @Output() pageSelected  = new EventEmitter<number>();

  private _albums: IPageableCollection<IAlbumSearchResult>;
  @Input() set albums(value: IPageableCollection<IAlbumSearchResult>) {
    this.loadingSubject.next(false);
    this._albums = value;
  }
  get albums():IPageableCollection<IAlbumSearchResult> {
    return this._albums;
  }

  constructor() { }

  ngOnInit(): void {
    //this.onPageSelected(1);
  }

  onPageSelected(page:number)
  {
    this.pageSelected.emit(page);
    this.loadingSubject.next(true);
  }

}
