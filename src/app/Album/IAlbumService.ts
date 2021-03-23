import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IDiscogsServiceBase  } from "../IDiscogsServiceBase";
import { IAlbum } from "./Models/IAlbum";

export abstract class IAlbumService extends IDiscogsServiceBase {

  constructor(http:HttpClient)
  {
     super(http);
  }

  abstract getAlbum(id:number):Observable<IAlbum>;
}
