import { ChangeDetectionStrategy, Component, OnInit, Input,Output, EventEmitter } from '@angular/core';
import { IAlbumSearchResult } from '../IAlbumSearchResult';

@Component({
  selector: 'app-album-search-display',
  templateUrl: './album-search-display.component.html',
  styleUrls: ['./album-search-display.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class AlbumSearchDisplayComponent implements OnInit {

  @Input() albumSearchResult : IAlbumSearchResult;
  @Output() albumSelected : EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  getHoverText(searchResult:IAlbumSearchResult):string
  {
    let text =  searchResult.label?.length > 0 ? searchResult.label[0] + '-' + searchResult.year : searchResult.year ;

    if (searchResult.genre?.length > 0)
    {
      text = text + "\r\n" + searchResult.genre[0];
      if (searchResult.genre.length > 1)
        text = text + " / " + searchResult.genre[1];
    }

    return text;
  }
}
