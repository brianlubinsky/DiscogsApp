import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IDiscogsServiceBase  } from "../IDiscogsServiceBase";
import { IArtist } from "./Models/IArtist";
import { IArtistReleases } from "./Models/IArtistReleases";

export abstract class IArtistService extends IDiscogsServiceBase {

  constructor(http:HttpClient)
  {
     super(http);
  }

  abstract getArtist(id:number):Observable<IArtist>;

  //abstract getArtistReleases(id:number, page:number):Observable<IArtistReleases>;
}
