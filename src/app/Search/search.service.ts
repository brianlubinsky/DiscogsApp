import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap  } from "rxjs/operators";
import { ISearchFilter } from './ISearchFilter';
import { ISearchResult } from './ISearchResult';
import { IAlbumSearchResult } from './IAlbumSearchResult';
import { IPagingData } from "../SharedModels/IPagingData";
import { ISearchService } from "./ISearchService";
import { HttpClient,  HttpParams } from "@angular/common/http";
import { environment } from "../../../src/environments/environment";
import { LoggingService  } from "../Logging/loggingService";
import { customParamKeys  } from "../Http/customParamKeys";
import { LogLevel } from '../Logging/logLevel';

@Injectable()
export class SearchService extends ISearchService
{

  private filterSubject : BehaviorSubject<ISearchFilter> = new BehaviorSubject<ISearchFilter>(<ISearchFilter>{});
  filter$ = this.filterSubject.asObservable();

  private pageSubject : BehaviorSubject<IPagingData> = new  BehaviorSubject<IPagingData>(<IPagingData>{});
  paging$ = this.pageSubject.asObservable();

  get baseUrl(): string {
    return environment.discogs_api_base_url;
  }

  get urlSegment():string{ return "database"}

  constructor(http:HttpClient, private logger : LoggingService) {
    super(http);
   }


  /* searchArtist(filter: ISearchFilter): void{
      var stonesthumb = "https://img.discogs.com/mWPgyjSFDUJVwZmUzDf4C3HZVwo=/150x150/smart/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-20991-1287509305.jpeg.jpg";
      var stubData = new Array<ISearchResult>();
      stubData.push({title:"This title is just wayyy too freakin long", id:1,type:'artist',thumb:stonesthumb,cover_image:""});
      stubData.push({title:"This title is just wayyy too freakin long and this one is even worse!", id:1,type:'artist',thumb:stonesthumb,cover_image:""});
      stubData.push({title:"Normal sized name", id:1,type:'artist',thumb:stonesthumb,cover_image:""})
      stubData.push({title:"This title is just wayyy too freakin long", id:1,type:'artist',thumb:stonesthumb,cover_image:""});
      stubData.push({title:"This title is just wayyy too freakin long and this one is even worse!", id:1,type:'artist',thumb:stonesthumb,cover_image:""});
      stubData.push({title:"Normal sized name", id:1,type:'artist',thumb:stonesthumb,cover_image:""})

      stubData.push({title:"This title is just wayyy too freakin long", id:1,type:'artist',thumb:stonesthumb,cover_image:""});
      stubData.push({title:"This title is just wayyy too freakin long and this one is even worse!", id:1,type:'artist',thumb:stonesthumb,cover_image:""});
      stubData.push({title:"Normal sized name", id:1,type:'artist',thumb:stonesthumb,cover_image:""})

      stubData.push({title:"This title is just wayyy too freakin long", id:1,type:'artist',thumb:stonesthumb,cover_image:""});
      stubData.push({title:"This title is just wayyy too freakin long and this one is even worse!", id:1,type:'artist',thumb:stonesthumb,cover_image:""});
      stubData.push({title:"Normal sized name", id:1,type:'artist',thumb:stonesthumb,cover_image:""})

      this.searchArtistSubject.next(stubData);
      this.pageSubject.next({page:1,pages:1,per_page:1,items:2});
      this.filterSubject.next(<ISearchFilter>{});
  } */

  updateFilter(filter: ISearchFilter): void{
    if (!(this.filterSubject.value?.title === filter.title && this.filterSubject.value?.page === filter.page))
    {
      this.filterSubject.next(filter);
    }
  }

  searchForArtist(): Observable<Array<ISearchResult>>{
      return this.search<ISearchResult>('artist',environment.pageSize,this.filterSubject.value,new HttpParams(),true)
  }

  searchForAlbum(): Observable<Array<IAlbumSearchResult>>{
    return this.search<IAlbumSearchResult>('master',environment.pageSize,this.filterSubject.value,new HttpParams(),true)
  }

  searchForLabel(): Observable<Array<ISearchResult>>{
    return this.search<ISearchResult>('label',environment.pageSize,this.filterSubject.value,new HttpParams(),true)
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

    return this.search<ISearchResult>(type,5,{title:name,page:1},params,false);
  }

  private search<T>(type:string,pageSize:number,filter:ISearchFilter, customParams:HttpParams, updatePagination:boolean) : Observable<Array<T>>
  {
    const url = this.getUrl('search');

    let params = customParams.append('q',filter.title);
    params = params.append('type',type);
    params = params.append('page',filter.page.toString());
    params = params.append('per_page', pageSize.toString());

    return this.http.get<T[]>(url, {params:params})
    .pipe(tap (result=>
      {
        if (updatePagination)
        {
          this.logger.log(JSON.stringify( result["pagination"]),LogLevel.Debug);
          this.pageSubject.next(result["pagination"]);
        }
      }
    ))
    .pipe(map(result=><T[]> result["results"] ))
  }



}


