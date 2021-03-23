import { IArtistRelease  } from "./IArtistRelease";
import { IPagingData  } from "../../SharedModels/IPagingData";
export interface IArtistReleases{
  paging:IPagingData;
  releases: IArtistRelease[];
}
