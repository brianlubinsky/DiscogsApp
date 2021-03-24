import { IImage } from "../../SharedModels/IImage";
import { IAlbumArtist } from "./IAlbumArtist";
import { ITrack } from "./ITrack";

export interface IAlbum
{
   id:number;
   main_release:number;
   title:string;
   year:number;
   images:Array<IImage>;
   genres:Array<string>;
   styles:Array<string>;
   tracklist:Array<ITrack>;
   artists:Array<IAlbumArtist>;

}
