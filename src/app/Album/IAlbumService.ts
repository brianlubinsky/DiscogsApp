import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IDiscogsServiceBase  } from "../IDiscogsServiceBase";
import { IAlbum } from "./Models/IAlbum";
import { IRelease } from "./Models/IRelease";

export abstract class IAlbumService extends IDiscogsServiceBase {

  constructor(http:HttpClient)
  {
     super(http);
  }

  abstract getAlbum(id:number):Observable<IAlbum>;

  abstract getRelease(id:number):Observable<IRelease>;

  
}
