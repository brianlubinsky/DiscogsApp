import { Injectable } from '@angular/core';
import { LogLevel  } from "./logLevel";
import { LoggingService  } from "./loggingService";

@Injectable({
  providedIn: 'root'
})
export class ConsoleLoggingService extends LoggingService  {
  log(message: any, level: LogLevel): void {
    console.log(new Date().toISOString() + " " + level + ' : ' + message );
  }

  constructor() {
    super();
  }
}
