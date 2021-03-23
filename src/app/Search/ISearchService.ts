import { Observable } from "rxjs";
import { ISearchResult } from "./ISearchResult";
import { IAlbumSearchResult } from "./IAlbumSearchResult";
import { ISearchFilter } from "./ISearchFilter";
import { IDiscogsServiceBase} from '../IDiscogsServiceBase'
import { HttpClient } from "@angular/common/http";
import { IPagingData } from "../SharedModels/IPagingData";

export abstract class ISearchService extends IDiscogsServiceBase {

  constructor(http:HttpClient)
  {
     super(http);
  }

  //TODO separating the paging and result observables is kind of terrible.
  //Create IPageableCollection
  abstract filter$ : Observable<ISearchFilter>;

  abstract paging$: Observable<IPagingData>;

  abstract updateFilter(filter: ISearchFilter);

  abstract searchForArtist(): Observable<Array<ISearchResult>>;

  abstract searchForAlbum(): Observable<Array<IAlbumSearchResult>>;

  abstract searchForLabel(): Observable<Array<ISearchResult>>;

  abstract artistAutocomplete(name:string) : Observable<Array<ISearchResult>>;

  abstract albumAutocomplete(name:string) : Observable<Array<ISearchResult>>;

  abstract labelAutocomplete(name:string) : Observable<Array<ISearchResult>>;

  //abstract searchForArtistAlbums(filter: ISearchFilter): Observable<Array<{pagination:IPagingData,results:Array< IAlbumSearchResult>}>>;

  //abstract searchForLabelAlbums(filter: ISearchFilter): Observable<Array<IAlbumSearchResult>>;
}
