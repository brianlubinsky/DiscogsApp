import { Component, OnInit } from '@angular/core';
import { ActivatedRoute  } from "@angular/router";
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { IImage } from '../../SharedModels/IImage';
import { IArtistService  } from "../IArtistService";
import { IArtist } from '../Models/IArtist';
import { ImageHelper  } from "../../Utilities/imageHelper";

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.scss']
})
export class ArtistDetailComponent implements OnInit {

  artist$:Observable<IArtist>;
  private resetSubject: Subject<void> = new Subject();
  reset$ = this.resetSubject.asObservable();

  constructor(private route:ActivatedRoute, private artistService:IArtistService) { }

  ngOnInit(): void {
    this.artist$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.resetSubject.next();
        const id = Number(params.get('id'));
        return this.artistService.getArtist(id);
      })
    );
  }

  getPrimaryImage (images:IImage[]) :IImage
  {
    return ImageHelper.getPrimaryImage(images);
  }

}
