import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILabelService  } from "./ILabelService";
import { ILabel } from './Models/ILabel';
import { ILabelReleases } from './Models/ILabelReleases';
import { environment  } from "../../environments/environment";

@Injectable()
export class LabelService extends ILabelService {

  get urlSegment(): string {
    return 'labels';
  }

  constructor(http:HttpClient) {super (http); }

  getLabel(id: number): Observable<ILabel> {
    return this.http.get<ILabel>(this.getUrl(id.toString()));
  }

  // getLabelReleases(id: number, page:number): Observable<ILabelReleases> {
  //   var params = new HttpParams();
  //   params = params.append('page',page.toString());
  //   params = params.append('per_page', environment.pageSize.toString());

  //   return this.http.get<ILabelReleases>(this.getUrl(id.toString() + '/releases'),{params:params});
  // }

}
