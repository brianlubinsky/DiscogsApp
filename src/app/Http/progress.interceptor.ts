import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { RequestProgressService  } from "./Service/request-progress.service";
import { Guid  } from "../Utilities/guid";
import { catchError, tap } from 'rxjs/operators';
import { customParamKeys } from "./customParamKeys";

@Injectable()
export class ProgressInterceptor implements HttpInterceptor {

  constructor(private requestProgressService:RequestProgressService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.params.has(customParamKeys.noProgress))
    {
      request.params.delete(customParamKeys.noProgress);
      return next.handle(request);
    }
    else
    {
      var requestGuid =Guid.newGuid();
      this.requestProgressService.startRequest(requestGuid);
      return next.handle(request)
      .pipe(
        tap(event=>{
          if (event instanceof HttpResponse) {
            this.requestProgressService.completeRequest(requestGuid);
          }
        }),
        catchError(err=>{
          this.requestProgressService.completeRequest(requestGuid);
          return throwError(err);
        })
      );
    }

  }
}
