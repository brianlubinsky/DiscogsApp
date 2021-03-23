import { IAlbumArtist  } from "./IAlbumArtist";
export interface ITrack
{
    position:string;
    title:string;
    duration: string;
    extraartists : Array<IAlbumArtist>;
}
