import { IImage  } from "../SharedModels/IImage";
export class ImageHelper
{
  static getPrimaryImage (images:IImage[]) :IImage
  {
    var image =  images?.find(x=>x.type=== "primary");
    if (!image && images?.length > 0)
      image = images[0];
    return image;
  }
}
