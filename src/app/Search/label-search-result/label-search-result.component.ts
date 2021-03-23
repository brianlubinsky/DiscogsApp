import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ISearchResult } from '../ISearchResult';
import { ISearchFilter  } from "../ISearchFilter";
import { IPagingData  } from "../../SharedModels/IPagingData";
import { ISearchService  } from "../ISearchService";
import { concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-label-search-result',
  templateUrl: './label-search-result.component.html',
  styleUrls: ['./label-search-result.component.scss']
})
export class LabelSearchResultComponent implements OnInit {

  labelSearchResult$ : Observable<ISearchResult[]>;
  labelSearchFilter$ : Observable<ISearchFilter>;
  paging$ : Observable<IPagingData>;
  constructor(private searchService:ISearchService) { }

  ngOnInit(): void {
    this.labelSearchFilter$ = this.searchService.filter$;
    this.paging$ = this.searchService.paging$;

    this.labelSearchResult$ = this.labelSearchFilter$.pipe(concatMap((value)=>{
      if (value?.title && value?.page)
        return this.searchService.searchForLabel();
      else
        return of (new Array<ISearchResult>())
    }));
  }

  onPageSelected(page:number, title:string)
  {
    this.searchService.updateFilter({title:title,page:page});
  }

}
