import { Injectable } from '@angular/core';
import { LogLevel  } from "./logLevel";
import { LoggingService  } from "./loggingService";
import { environment  } from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class ConsoleLoggingService extends LoggingService  {
  log(message: any, level: LogLevel): void {
    if (level !== LogLevel.Debug || environment.enableDebugMessages)
    console.log(new Date().toISOString() + " " + level + ' : ' + message );
  }

  constructor() {
    super();
  }
}
