import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute  } from "@angular/router";
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IAlbumSearchResult } from '../../Search/IAlbumSearchResult';
import { ISearchService } from '../../Search/ISearchService';
import { IImage } from '../../SharedModels/IImage';
import { IPageableCollection } from '../../SharedModels/IPageableCollection';
import { ImageHelper } from '../../Utilities/imageHelper';
import { ILabelService  } from "../ILabelService";
import { ILabel } from '../Models/ILabel';

@Component({
  selector: 'app-label-detail',
  templateUrl: './label-detail.component.html',
  styleUrls: ['./label-detail.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class LabelDetailComponent implements OnInit {

  label$:Observable<ILabel>;
  labelName : string;

  private resetSubject: Subject<void> = new Subject();
  reset$ = this.resetSubject.asObservable();

  private albumsPageSubject = new BehaviorSubject<number>(0);
  albumsPage$ = this.albumsPageSubject.asObservable();

  albums$ : Observable<IPageableCollection<IAlbumSearchResult>>;


  constructor(private route:ActivatedRoute, private labelService:ILabelService, private searchService:ISearchService) { }

  ngOnInit(): void {
    this.label$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.resetSubject.next();
        this.albumsPageSubject.next(0);
        const id = Number(params.get('id'));
        return this.labelService.getLabel(id);
      })
    );

    this.albums$ = this.albumsPage$.pipe(switchMap((page)=>{
      if (page > 0 && this.labelName)
        return this.searchService.searchForLabelAlbums({page:page, title:this.labelName})
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
     this.labelName = artistName;
     this.albumsPageSubject.next(page);
  }

  onAlbumsOpen(artistName:string)
  {
    if (this.albumsPageSubject.value < 1)
      this.onAlbumsPageSelected(1,artistName);
  }


}
