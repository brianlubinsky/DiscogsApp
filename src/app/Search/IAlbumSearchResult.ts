import { ISearchResult } from "./ISearchResult";
export interface IAlbumSearchResult extends ISearchResult
{
  year:string;
  label : string[];
  genre : string[];
  //Not needed
  //main_release : number;
}
