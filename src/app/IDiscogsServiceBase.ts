import { HttpClient } from "@angular/common/http";
import { IServiceBase  } from "./IServiceBase";
import { environment  } from "../environments/environment";
export abstract class IDiscogsServiceBase extends IServiceBase
{

  get baseUrl() {return environment.discogs_api_base_url;};

  constructor(http:HttpClient){
    super(http);
  }
}
