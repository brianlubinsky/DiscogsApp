import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { concatMap, switchMap } from 'rxjs/operators';
import { IIdNamePair } from '../../SharedModels/IIdNamePair';
import { IImage } from '../../SharedModels/IImage';
import { IPageableCollection } from '../../SharedModels/IPageableCollection';
import { ImageHelper } from '../../Utilities/imageHelper';
import { IAlbumService } from '../IAlbumService';
import { IAlbum } from '../Models/IAlbum';
import { IAlbumArtist } from '../Models/IAlbumArtist';
import { IRelease } from '../Models/IRelease';
import { ITrack } from '../Models/ITrack';

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
  release$ : Observable<IRelease>;

  constructor(private route:ActivatedRoute, private albumService:IAlbumService) { }

  ngOnInit(): void {
    this.album$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.resetSubject.next();
        const id = Number(params.get('id'));
        return this.albumService.getAlbum(id);
      })
    );

    this.release$ = this.album$.pipe(
      concatMap(master=>{
        return this.albumService.getRelease(master.main_release);
      })
    );
  }

  getPrimaryImage (images:IImage[]) :IImage
  {
    return ImageHelper.getPrimaryImage(images);
  }

  toggleTrackDetail(trackIndex:number)
  {
     var arrayCopy = this.expandedTracksSubject.getValue();
     var index = arrayCopy.indexOf(trackIndex);
     if(index > -1)
        arrayCopy.splice(index,1);
     else
       arrayCopy.push(trackIndex);

     this.expandedTracksSubject.next(arrayCopy);
  }

  getDistinctLabels(labels:Array<IIdNamePair>)
  {
    var distinctArray = new Array<IIdNamePair>();
    labels.forEach(element => {
      if (!distinctArray.find(x=>x.id == element.id))
        distinctArray.push(element);
    });

    return distinctArray;
  }

  getSortedArtists(artists:Array<IAlbumArtist>)
  {
    return artists.sort((x,y)=>{return x.id > y.id ? -1 : (x.id == y.id ? 0 : 1); })
  }

  showExpandAllTracks(tracks:Array<ITrack>)
  {
    return tracks && tracks.filter(x=>x.extraartists?.length > 0).length > 0;
  }
  expandTrackCredits(trackCount:number, expand:boolean)
  {
     var trackArray = new Array<number>();

     if (expand)
     {
       for(let index = 0; index < trackCount; ++index)
         trackArray.push(index);
     }

     this.expandedTracksSubject.next(trackArray);
  }
}
