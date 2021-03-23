import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IDiscogsServiceBase  } from "../IDiscogsServiceBase";
import { ILabel } from "./Models/ILabel";
import { ILabelReleases } from "./Models/ILabelReleases";

export abstract class ILabelService extends IDiscogsServiceBase {

  constructor(http:HttpClient)
  {
     super(http);
  }

  abstract getLabel(id:number):Observable<ILabel>;

  //abstract getLabelReleases(id:number, page:number):Observable<ILabelReleases>;
}
