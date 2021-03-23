import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, ReplaySubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RequestProgressService {

  private currentRequests : Array<string> = [];
  private requestInProgressSubject : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  requestInProgress$ : Observable<boolean> = this.requestInProgressSubject.asObservable();

  constructor() { }

  startRequest(requestGuid:string){
    this.currentRequests.push(requestGuid);
    this.requestInProgressSubject.next(this.currentRequests.length > 0);
  }
  completeRequest(requestGuid:string){
    this.currentRequests = this.currentRequests.filter(x=>x !== requestGuid);
    this.requestInProgressSubject.next(this.currentRequests.length > 0);
  }
}
