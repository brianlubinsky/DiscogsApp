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
import { MessageService  } from "../Message/message.service";
import { Message  } from "../Message/message";
import { MessageType   } from "../Message/messageType";
import { catchError, tap } from 'rxjs/operators';
import { customParamKeys  } from "./customParamKeys";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private messageService:MessageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.params.has(customParamKeys.noErrorMessage))
    {
      request.params.delete(customParamKeys.noErrorMessage);
      return next.handle(request);
    }
    else{
      return next.handle(request).pipe(
        catchError(err=>{
          if (err instanceof HttpErrorResponse)
          {
            var response = (<HttpErrorResponse> err);
            this.messageService.addMessage({message:"Received a " + response.status + " response from server, please try again",type:MessageType.Info,messageData:{}});
          }
          else
            this.messageService.addMessage({message:"Received an unknown error contacting server, please try again",type:MessageType.Info,messageData:{}});

          return throwError(err);
        })
      );
    }
  }
}
