import { HTTP_INTERCEPTORS } from '@angular/common/http';

import {RequestLogInterceptor} from './request-log.interceptor';
import {DiscogsHttpHeaderInterceptor  } from "./discogs-http-header.interceptor";
import {ProgressInterceptor  } from "./progress.interceptor";
import { ErrorInterceptor } from './error.interceptor';
/** Http interceptor providers in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: RequestLogInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: DiscogsHttpHeaderInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ProgressInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
];
