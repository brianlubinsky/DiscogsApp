import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute  } from "@angular/router";
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { IImage } from '../../SharedModels/IImage';
import { IArtistService  } from "../IArtistService";
import { IArtist } from '../Models/IArtist';
import { ImageHelper  } from "../../Utilities/imageHelper";
import { ISearchService } from '../../Search/ISearchService';
import { IPageableCollection } from '../../SharedModels/IPageableCollection';
import { IAlbumSearchResult } from '../../Search/IAlbumSearchResult';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ArtistDetailComponent implements OnInit {

  artist$:Observable<IArtist>;
  artistName : string;

  private resetSubject: Subject<void> = new Subject();
  reset$ = this.resetSubject.asObservable();

  private albumsPageSubject = new BehaviorSubject<number>(0);
  albumsPage$ = this.albumsPageSubject.asObservable();

  albums$ : Observable<IPageableCollection<IAlbumSearchResult>>;

  constructor(private route:ActivatedRoute, private artistService:IArtistService, private searchService:ISearchService) { }

  ngOnInit(): void {
    this.artist$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.resetSubject.next();
        this.albumsPageSubject.next(0);
        const id = Number(params.get('id'));
        return this.artistService.getArtist(id);
      })
    );

    this.albums$ = this.albumsPage$.pipe(switchMap((page)=>{
      if (page > 0 && this.artistName)
        return this.searchService.searchForArtistAlbums({page:page, title:this.artistName})
      else
        return of (<IPageableCollection<IAlbumSearchResult>>{});
    }));
  }

  getPrimaryImage (images:IImage[]) :IImage
  {
    return ImageHelper.getPrimaryImage(images);
  }

  onAlbumsPageSelected(page:number, artistName:string)
  {
     this.artistName = artistName;
     this.albumsPageSubject.next(page);
  }

  onAlbumsOpen(artistName:string)
  {
    if (this.albumsPageSubject.value < 1)
      this.onAlbumsPageSelected(1,artistName);
  }

}
