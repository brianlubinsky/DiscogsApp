import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAlbumService  } from "./IAlbumService";
import { IAlbum } from './Models/IAlbum';
import { IRelease } from './Models/IRelease';

@Injectable()
export class AlbumService extends IAlbumService {

  get urlSegment(): string {
    return 'masters';
  }

  constructor(http:HttpClient) {super (http); }

  getAlbum(id: number): Observable<IAlbum> {
    return this.http.get<IAlbum>(this.getUrl(id.toString()));
  }

  //doesn't fit into the usual pattern, decided to roll releases into this service
  getRelease(id: number): Observable<IRelease> {
    return this.http.get<IRelease>(this.baseUrl + '/releases/' + id);
  }

}
