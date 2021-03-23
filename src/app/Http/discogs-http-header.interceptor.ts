import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment  } from "../../environments/environment";
@Injectable()
export class DiscogsHttpHeaderInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.toUpperCase().startsWith(environment.discogs_api_base_url.toUpperCase()))
    {
      var newHeaders = request.headers.append("Authorization","Discogs token=" + environment.discogs_api_token);

      request = request.clone({
        headers: newHeaders
      });
    }
    return next.handle(request);
  }
}
