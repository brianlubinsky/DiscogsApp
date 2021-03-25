import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import {  Gallery} from 'angular-gallery';
import { IImage } from '../../SharedModels/IImage';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class GalleryComponent implements OnInit {

  @Input() images : IImage[];

  constructor(private gallery:Gallery) { }

  ngOnInit(): void {
  }

  showGallery(index: number) {
    let galleryConfig = {images: [],index};
    this.images.forEach(image=>{galleryConfig.images.push({path:image.uri})});
    this.gallery.load(galleryConfig);
  }
}
