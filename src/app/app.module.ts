import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoggingService  } from "./Logging/loggingService";
import { ConsoleLoggingService  } from "./Logging/console-logging.service";
import { httpInterceptorProviders  } from "./Http/httpInterceptorProviders";
import { MessageDisplayComponent } from './Message/message-display/message-display.component';
import { MaterialModule  } from "./material.module";
import { SearchModule  } from "./Search/search.module";
import { CoreModule  } from "./core.module";
import { SharedModule  } from "./Shared/shared.module";

@NgModule({
  declarations: [
    AppComponent,
    MessageDisplayComponent,
    //PagingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    MaterialModule,
    SearchModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {provide:LoggingService, useClass:ConsoleLoggingService},
    httpInterceptorProviders
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
