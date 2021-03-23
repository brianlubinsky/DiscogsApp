import { MessageType  } from "./messageType";
export class Message{
  type:MessageType;
  message:string;
  messageData: any;
}

export class GuidMessage extends Message
{
  guid:string;
}
