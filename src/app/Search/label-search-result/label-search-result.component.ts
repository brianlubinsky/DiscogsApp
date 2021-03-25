import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ISearchResult } from '../ISearchResult';
import { ISearchFilter  } from "../ISearchFilter";
import { IPagingData  } from "../../SharedModels/IPagingData";
import { ISearchService  } from "../ISearchService";
import { concatMap } from 'rxjs/operators';
import { IPageableCollection } from '../../SharedModels/IPageableCollection';

@Component({
  selector: 'app-label-search-result',
  templateUrl: './label-search-result.component.html',
  styleUrls: ['./label-search-result.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class LabelSearchResultComponent implements OnInit {

  labelSearchResult$ : Observable<IPageableCollection< ISearchResult> >;
  labelSearchFilter$ : Observable<ISearchFilter>;
  constructor(private searchService:ISearchService) { }

  ngOnInit(): void {
    this.labelSearchFilter$ = this.searchService.filter$;

    this.labelSearchResult$ = this.labelSearchFilter$.pipe(concatMap((value)=>{
      if (value?.title && value?.page)
        return this.searchService.searchForLabel();
      else
        return of (<IPageableCollection<ISearchResult>>{});
    }));
  }

  onPageSelected(page:number, title:string)
  {
    this.searchService.updateFilter({title:title,page:page});
  }

}
