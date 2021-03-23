import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { Subscription } from 'rxjs';
import { RequestProgressService } from "./Http/Service/request-progress.service";
import { LoggingService } from './Logging/loggingService';
import { LogLevel } from './Logging/logLevel';
import { MessageService  } from "./Message/message.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Discogs';
  private progressSubscription:Subscription;

  constructor(
    public requestProgressService : RequestProgressService,
    private spinnerService:NgxSpinnerService,
    public messageService:MessageService,
    private router: Router,
    private loggingService: LoggingService)
   {}

  ngOnInit(): void {

    this.initializeSpinner();

    this.initializeRouteLogging();
  }

  onClearMessage(messageGuid:string)
  {
    this.messageService.clearMessage(messageGuid);
  }

  private initializeSpinner() {
    this.progressSubscription = this.requestProgressService.requestInProgress$.subscribe(value => {
      if (value)
        this.spinnerService.show();

      else
        this.spinnerService.hide();
    });
  }

  private initializeRouteLogging() {
    this.router.events.subscribe(

      event => {
        if (event instanceof NavigationEnd)
          this.loggingService.log("Navigation to " + event.urlAfterRedirects + ' complete', LogLevel.Info);
        else if (event instanceof NavigationStart)
          this.loggingService.log("Navigation to " + (<NavigationStart>event).url + ' started', LogLevel.Info);
        else if (event instanceof NavigationError)
          this.loggingService.log("Navigation to " + (<NavigationError>event).url + ' errored : ' + JSON.stringify((<NavigationError>event).error), LogLevel.Error);
      }
    ),
      error => { }, () => { };
  }


}

