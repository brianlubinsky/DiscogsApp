import { HttpClient } from "@angular/common/http";

export abstract class IServiceBase
{
  http:HttpClient;

  abstract get baseUrl() : string;
  abstract get urlSegment():string;

  getUrl(urlExtension:string){return this.baseUrl + '/' + this.urlSegment +  '/' + urlExtension;}

  constructor(http:HttpClient){
    this.http = http;
  }
}
