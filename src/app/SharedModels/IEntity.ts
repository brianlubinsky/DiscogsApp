import { IIdNamePair  } from "./IIdNamePair";
export interface IEntity extends IIdNamePair
{
  //resource_url:string; not needed, link to discogs site
  active:boolean;
  thumbnail_url : string;
}
