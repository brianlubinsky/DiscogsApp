import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IImage } from '../../SharedModels/IImage';
import { IPageableCollection } from '../../SharedModels/IPageableCollection';
import { ImageHelper } from '../../Utilities/imageHelper';
import { IAlbumService } from '../IAlbumService';
import { IAlbum } from '../Models/IAlbum';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.scss']
})
export class AlbumDetailComponent implements OnInit {

  private resetSubject: Subject<void> = new Subject();
  reset$ = this.resetSubject.asObservable();

  album$ : Observable<IAlbum>;

  constructor(private route:ActivatedRoute, private albumService:IAlbumService) { }

  ngOnInit(): void {
    this.album$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.resetSubject.next();
        const id = Number(params.get('id'));
        return this.albumService.getAlbum(id);
      })
    );
  }

  getPrimaryImage (images:IImage[]) :IImage
  {
    return ImageHelper.getPrimaryImage(images);
  }
}
