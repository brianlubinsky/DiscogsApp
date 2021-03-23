import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ISearchResult } from '../ISearchResult';
import { ISearchFilter  } from "../ISearchFilter";
import { IPagingData  } from "../../SharedModels/IPagingData";
import { ISearchService  } from "../ISearchService";
import { concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-artist-search-result',
  templateUrl: './artist-search-result.component.html',
  styleUrls: ['./artist-search-result.component.scss']
})
export class ArtistSearchResultComponent implements OnInit {

  artistSearchResult$ : Observable<ISearchResult[]>;
  artistSearchFilter$ : Observable<ISearchFilter>;
  paging$ : Observable<IPagingData>;
  constructor(private searchService:ISearchService) { }

  ngOnInit(): void {
    this.artistSearchFilter$ = this.searchService.filter$;
    this.paging$ = this.searchService.paging$;

    this.artistSearchResult$ = this.artistSearchFilter$.pipe(concatMap((value)=>{
      if (value?.title && value?.page)
        return this.searchService.searchForArtist();
      else
        return of (new Array<ISearchResult>())
    }));
  }

  onPageSelected(page:number, title:string)
  {
    this.searchService.updateFilter({title:title,page:page});
  }

}
