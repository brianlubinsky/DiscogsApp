import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAlbumService  } from "./IAlbumService";
import { IAlbum } from './Models/IAlbum';

@Injectable()
export class AlbumService extends IAlbumService {

  get urlSegment(): string {
    return 'masters';
  }

  constructor(http:HttpClient) {super (http); }

  getAlbum(id: number): Observable<IAlbum> {
    return this.http.get<IAlbum>(this.getUrl(id.toString()));
  }

}
