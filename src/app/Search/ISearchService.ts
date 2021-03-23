import { Observable } from "rxjs";
import { ISearchResult } from "./ISearchResult";
import { IAlbumSearchResult } from "./IAlbumSearchResult";
import { ISearchFilter } from "./ISearchFilter";
import { IDiscogsServiceBase} from '../IDiscogsServiceBase'
import { HttpClient } from "@angular/common/http";
import { IPagingData } from "../SharedModels/IPagingData";
import { IPageableCollection } from "../SharedModels/IPageableCollection";

export abstract class ISearchService extends IDiscogsServiceBase {

  constructor(http:HttpClient)
  {
     super(http);
  }

  abstract filter$ : Observable<ISearchFilter>;

  abstract updateFilter(filter: ISearchFilter);

  abstract searchForArtist(): Observable<IPageableCollection<ISearchResult>>;

  abstract searchForAlbum(): Observable<IPageableCollection<IAlbumSearchResult>>;

  abstract searchForLabel(): Observable<IPageableCollection<ISearchResult>>;

  abstract artistAutocomplete(name:string) : Observable<Array<ISearchResult>>;

  abstract albumAutocomplete(name:string) : Observable<Array<ISearchResult>>;

  abstract labelAutocomplete(name:string) : Observable<Array<ISearchResult>>;

  //abstract searchForArtistAlbums(filter: ISearchFilter): Observable<Array<{pagination:IPagingData,results:Array< IAlbumSearchResult>}>>;

  //abstract searchForLabelAlbums(filter: ISearchFilter): Observable<Array<IAlbumSearchResult>>;
}
