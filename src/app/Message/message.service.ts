import { Injectable } from '@angular/core';
import { Message, GuidMessage } from "./message";
import { Guid  } from "../Utilities/guid";
import { Observable,BehaviorSubject  } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messages : Array<GuidMessage> = [];
  private messageSubject : BehaviorSubject<Array<GuidMessage>> = new BehaviorSubject<Array<GuidMessage>>([]);
  messages$ = this.messageSubject.asObservable();

  constructor() { }

  addMessage(message:Message)
  {
    const guidMessage : GuidMessage = {...message,guid:Guid.newGuid()};
    this.messages.push(guidMessage);
    this.messageSubject.next(this.messages);
  }

  clearMessage(messageGuid:string)
  {
    this.messages = this.messages.filter(x=>x.guid != messageGuid);
    this.messageSubject.next(this.messages);
  }
}
