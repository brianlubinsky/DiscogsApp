import { IImage } from "../../SharedModels/IImage";
import { IIdNamePair  } from "../../SharedModels/IIdNamePair";
export interface ILabel
{
  id : number;
  profile : string;//
  name : string;//
  contact_info : string;
  sublabels: IIdNamePair[];//
  urls : string[];//
  images : IImage[];//
}
