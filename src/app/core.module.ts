import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule} from "@angular/common";
import { NgxSpinnerModule } from "ngx-spinner";
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from "@angular/common/http";
import { FlexModule } from "@angular/flex-layout";
import { LoggingService  } from "./Logging/loggingService";
import { ConsoleLoggingService  } from "./Logging/console-logging.service";
import { httpInterceptorProviders  } from "./Http/httpInterceptorProviders";
import { IArtistService  } from "../app/Artist/IArtistService";
import { ArtistService  } from "../app/Artist/artist.service";
import { ILabelService } from './Label/ILabelService';
import { LabelService } from './Label/label.service';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FlexModule,
    NgxSpinnerModule,
  ],
  exports: [
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FlexModule,
    NgxSpinnerModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {provide:LoggingService, useClass:ConsoleLoggingService},
    {provide:IArtistService,useClass:ArtistService},
    {provide:ILabelService,useClass:LabelService},
    httpInterceptorProviders
   ]
})
export class CoreModule { }
