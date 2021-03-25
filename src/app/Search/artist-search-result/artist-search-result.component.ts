import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ISearchResult } from '../ISearchResult';
import { ISearchFilter  } from "../ISearchFilter";
import { IPagingData  } from "../../SharedModels/IPagingData";
import { ISearchService  } from "../ISearchService";
import { concatMap } from 'rxjs/operators';
import { IPageableCollection } from '../../SharedModels/IPageableCollection';

@Component({
  selector: 'app-artist-search-result',
  templateUrl: './artist-search-result.component.html',
  styleUrls: ['./artist-search-result.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ArtistSearchResultComponent implements OnInit {

  artistSearchResult$ : Observable<IPageableCollection< ISearchResult>>;
  artistSearchFilter$ : Observable<ISearchFilter>;
  constructor(private searchService:ISearchService) { }

  ngOnInit(): void {
    this.artistSearchFilter$ = this.searchService.filter$;

    this.artistSearchResult$ = this.artistSearchFilter$.pipe(concatMap((value)=>{
      if (value?.title && value?.page)
        return this.searchService.searchForArtist();
      else
        return of (<IPageableCollection<ISearchResult>>{});
    }));
  }

  onPageSelected(page:number, title:string)
  {
    this.searchService.updateFilter({title:title,page:page});
  }

}
