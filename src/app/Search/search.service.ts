import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap  } from "rxjs/operators";
import { ISearchFilter } from './ISearchFilter';
import { ISearchResult } from './ISearchResult';
import { IAlbumSearchResult } from './IAlbumSearchResult';
import { ISearchService } from "./ISearchService";
import { HttpClient,  HttpParams } from "@angular/common/http";
import { environment } from "../../../src/environments/environment";
import { LoggingService  } from "../Logging/loggingService";
import { customParamKeys  } from "../Http/customParamKeys";
import { IPageableCollection } from '../SharedModels/IPageableCollection';

@Injectable()
export class SearchService extends ISearchService
{

  private filterSubject : BehaviorSubject<ISearchFilter> = new BehaviorSubject<ISearchFilter>(<ISearchFilter>{});
  filter$ = this.filterSubject.asObservable();

  get baseUrl(): string {
    return environment.discogs_api_base_url;
  }

  get urlSegment():string{ return "database"}

  constructor(http:HttpClient, private logger : LoggingService) {
    super(http);
   }

  updateFilter(filter: ISearchFilter): void{
    if (!(this.filterSubject.value?.title === filter.title && this.filterSubject.value?.page === filter.page))
    {
      this.filterSubject.next(filter);
    }
  }

  searchForArtist(): Observable<IPageableCollection<ISearchResult>>{
      return this.search<ISearchResult>('artist',environment.pageSize,this.filterSubject.value,new HttpParams())
  }

  searchForAlbum(): Observable<IPageableCollection<IAlbumSearchResult>>{
    return this.search<IAlbumSearchResult>('master',environment.pageSize,this.filterSubject.value,new HttpParams())
  }

  searchForLabel(): Observable<IPageableCollection<ISearchResult>>{
    return this.search<ISearchResult>('label',environment.pageSize,this.filterSubject.value,new HttpParams())
  }

  searchForArtistAlbums(filter:ISearchFilter): Observable<IPageableCollection<IAlbumSearchResult>>{
    const adaptedFilter = {title:"",page:filter.page};
    let params = new HttpParams();
    params = params.append('artist',filter.title);
    params = params.append('format','Album|Compilation|EP');

    return this.search<IAlbumSearchResult>('master',100,adaptedFilter,params);
  }

  searchForLabelAlbums(filter:ISearchFilter): Observable<IPageableCollection<IAlbumSearchResult>>{
    const adaptedFilter = {title:"",page:filter.page};
    let params = new HttpParams();
    params = params.append('label',encodeURI(filter.title));
    params = params.append('format','Album|Compilation|EP');

    return this.search<IAlbumSearchResult>('master',100,adaptedFilter,params);
  }

  artistAutocomplete(name:string) : Observable<Array<ISearchResult>>
  {
    return this.autoComplete('artist',name);
  }

  albumAutocomplete(name:string) : Observable<Array<ISearchResult>>
  {
    return this.autoComplete('master',name);
  }

  labelAutocomplete(name:string) : Observable<Array<ISearchResult>>
  {
    return this.autoComplete('label',name);
  }

  private autoComplete(type:string, name:string) : Observable<Array<ISearchResult>>
  {

    let params = new HttpParams();
    params = params.append(customParamKeys.noErrorMessage,'');
    params = params.append(customParamKeys.noProgress,'');

    return this.search<ISearchResult>(type,5,{title:name,page:1},params)
    .pipe(map(x=>x.results ));
  }

  private search<T>(type:string,pageSize:number,filter:ISearchFilter, customParams:HttpParams) : Observable<IPageableCollection<T>>
  {
    const url = this.getUrl('search');

    let params = customParams.append('type',type);
    params = params.append('page',filter.page.toString());
    params = params.append('per_page', pageSize.toString());

    if (filter.title)
      params = params.append('q',filter.title);

    return this.http.get<IPageableCollection<T>>(url, {params:params});
  }

}


