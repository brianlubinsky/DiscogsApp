import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IArtistService  } from "./IArtistService";
import { IArtist } from './Models/IArtist';
import { IArtistReleases } from './Models/IArtistReleases';
import { environment  } from "../../environments/environment";

@Injectable()
export class ArtistService extends IArtistService {

  get urlSegment(): string {
    return 'artists';
  }

  constructor(http:HttpClient) {super (http); }

  getArtist(id: number): Observable<IArtist> {
    return this.http.get<IArtist>(this.getUrl(id.toString()));
  }

  getArtistReleases(id: number, page:number): Observable<IArtistReleases> {
    var params = new HttpParams();
    params = params.append('sort','year');
    params = params.append('page',page.toString());
    params = params.append('per_page', environment.pageSize.toString());

    return this.http.get<IArtistReleases>(this.getUrl(id.toString() + '/releases'),{params:params});
  }

}
