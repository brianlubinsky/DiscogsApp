import {LogLevel  } from "./logLevel";

export abstract class LoggingService
{
    abstract log (message:any, level:LogLevel) : void;
}
