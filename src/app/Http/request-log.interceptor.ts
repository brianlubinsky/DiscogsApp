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
