import { Component, OnInit } from '@angular/core';
import { ActivatedRoute  } from "@angular/router";
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IImage } from '../../SharedModels/IImage';
import { ImageHelper } from '../../Utilities/imageHelper';
import { ILabelService  } from "../ILabelService";
import { ILabel } from '../Models/ILabel';

@Component({
  selector: 'app-label-detail',
  templateUrl: './label-detail.component.html',
  styleUrls: ['./label-detail.component.scss']
})
export class LabelDetailComponent implements OnInit {

  label$:Observable<ILabel>;
  private resetSubject: Subject<void> = new Subject();
  reset$ = this.resetSubject.asObservable();

  constructor(private route:ActivatedRoute, private labelService:ILabelService) { }

  ngOnInit(): void {
    this.label$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.resetSubject.next();
        const id = Number(params.get('id'));
        return this.labelService.getLabel(id);
      })
    );
  }

  getPrimaryImage (images:IImage[]) :IImage
  {
    return ImageHelper.getPrimaryImage(images);
  }

}
