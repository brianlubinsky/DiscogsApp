import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap,catchError  } from "rxjs/operators";
import { LogLevel  } from "../Logging/logLevel";
import { LoggingService  } from "../Logging/loggingService";

@Injectable()
export class RequestLogInterceptor implements HttpInterceptor {

  constructor(private logger : LoggingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.logger.log(request.method + " URL:" + request.url, LogLevel.Info);

    return next.handle(request).pipe(tap((event)=>
      {
        if (event instanceof HttpResponse) {
          var response = (<HttpResponse<any>> event);
          this.logger.log(request.method + " Complete URL:" + request.url + " Status : " + response.status, LogLevel.Info);

          //Not going to work
          //access-control-expose-headers is set to Location, so these are not exposed
          // response.headers.append("access-control-expose-headers","*");
          // response.headers.keys();
          // let rateLimitMessage  = "";
          // if (response.headers.has("X-Discogs-Ratelimit"))
          //   rateLimitMessage = "Rate Limit : " + response.headers["X-Discogs-Ratelimit"];
          // if (response.headers.has("X-Discogs-Ratelimit-Used"))
          //   rateLimitMessage = rateLimitMessage +  " Used : " + response.headers["X-Discogs-Ratelimit-Used"];
          // if (response.headers.has("X-Discogs-Ratelimit-Remaining"))
          //   rateLimitMessage = rateLimitMessage +  "Remaining : " + response.headers["X-Discogs-Ratelimit-Remaining"];

          //if (rateLimitMessage)
           // this.logger.log( rateLimitMessage, LogLevel.Debug);
        }
      }
    ))
    .pipe(catchError( err=>{
      if (err instanceof HttpErrorResponse)
      {
        var response = (<HttpErrorResponse> err);
        this.logger.log(request.method + " Complete URL:" + request.url + " Status : " + response.status, LogLevel.Error);
        if (response.message)
          this.logger.log( response.message, LogLevel.Error);
        if (response.error)
          this.logger.log("Complete error : " + JSON.stringify(response.error), LogLevel.Error);
      }
      return throwError(err);
    }));
  }
}
