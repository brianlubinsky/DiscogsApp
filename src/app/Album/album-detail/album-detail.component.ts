import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
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

  private expandedTracksSubject : BehaviorSubject<number[]> = new  BehaviorSubject<number[]>([]);
  expandedTracks$ = this.expandedTracksSubject.asObservable();

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

  toggleTrackDetail(trackIndex:number)
  {
    console.log('toggling ' + trackIndex );
     var arrayCopy = this.expandedTracksSubject.getValue();
     var index = arrayCopy.indexOf(trackIndex);
     if(index > -1)
        arrayCopy.splice(index,1);
     else
       arrayCopy.push(trackIndex);
     this.expandedTracksSubject.next(arrayCopy);
  }

}
