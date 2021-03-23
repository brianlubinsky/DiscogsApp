import { IEntity  } from "../../SharedModels/IEntity";
import { IImage  } from "../../SharedModels/IImage";

export interface IArtist{
  id:number;
  name:string;
  realname:string;
  profile:string;
  urls:Array<string>;
  namevariations : Array<string>;
  images:Array<IImage>;
  members:Array<IEntity>;
  aliases:Array<IEntity>;
  groups:Array<IEntity>;
}
