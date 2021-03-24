import { IIdNamePair } from "../../SharedModels/IIdNamePair";
import { IImage } from "../../SharedModels/IImage";
import { IAlbumArtist } from "./IAlbumArtist";
import { ICommunity } from "./ICommunity";
import { ITrack } from "./ITrack";

export interface IRelease
{
   id:number;
   title:string;
   year:number;
   images:Array<IImage>;
   genres:Array<string>;
   styles:Array<string>;
   tracklist:Array<ITrack>;
   artists:Array<IAlbumArtist>;
   extraartists:Array<IAlbumArtist>;
   labels:Array<IIdNamePair>;
   community:ICommunity;
}
