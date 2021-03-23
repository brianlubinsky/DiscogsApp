import { ILabelRelease  } from "./ILabelRelease";
import { IPagingData  } from "../../SharedModels/IPagingData";
export interface ILabelReleases{
  paging:IPagingData;
  releases: ILabelRelease[];
}
