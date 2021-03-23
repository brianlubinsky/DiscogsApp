import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IAlbumSearchResult } from '../IAlbumSearchResult';
import { ISearchFilter  } from "../ISearchFilter";
import { IPagingData  } from "../../SharedModels/IPagingData";
import { ISearchService  } from "../ISearchService";
import { concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-album-search-result',
  templateUrl: './album-search-result.component.html',
  styleUrls: ['./album-search-result.component.scss']
})
export class AlbumSearchResultComponent implements OnInit {

  albumSearchResult$ : Observable<IAlbumSearchResult[]>;
  albumSearchFilter$ : Observable<ISearchFilter>;
  paging$ : Observable<IPagingData>;
  constructor(private searchService:ISearchService) { }

  ngOnInit(): void {
    this.albumSearchFilter$ = this.searchService.filter$;
    this.paging$ = this.searchService.paging$;

    this.albumSearchResult$ = this.albumSearchFilter$.pipe(concatMap((value)=>{
      if (value?.title && value?.page)
        return this.searchService.searchForAlbum();
      else
        return of (new Array<IAlbumSearchResult>())
    }));

  }

  onPageSelected(page:number, title:string)
  {
    this.searchService.updateFilter({title:title,page:page});
  }

}
