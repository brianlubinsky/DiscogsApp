import { IImage  } from "../SharedModels/IImage";
export class ImageHelper
{
  static getPrimaryImage (images:IImage[]) :IImage
  {
    return images?.find(x=>x.type=== "primary");
  }
}
