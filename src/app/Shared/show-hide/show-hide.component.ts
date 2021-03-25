import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { IImage } from '../../SharedModels/IImage';
import { Guid  } from "../../Utilities/guid";

@Component({
  selector: 'app-show-hide',
  templateUrl: './show-hide.component.html',
  styleUrls: ['./show-hide.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ShowHideComponent implements OnInit, OnDestroy {

  @Output() close :EventEmitter<void> = new  EventEmitter<void>();
  @Output() open :EventEmitter<void> = new  EventEmitter<void>();

  @Input() title:string;
  @Input() subtitle:string;
  @Input() image:IImage;
  @Input() maxImageWidth: number;
  @Input() maxImageHeight: number;

  @Input()  defaultOpenState :boolean;

  guid : string;

  private resetSubscription : Subscription;
  @Input()  set resetObservable (value:Observable<void>)   {
      this.resetSubscription = value.subscribe(()=>this.isOpenSubject.next(this.defaultOpenState) );
  };

  private isOpenSubject :  BehaviorSubject<boolean>;//
  isOpen$ : Observable<boolean> ;

  private fullsizeImageSubject = new BehaviorSubject<boolean>(false);
  fullsizeImage$ = this.fullsizeImageSubject.asObservable();

  constructor() {
    this.guid =Guid.newGuid();
  }

  ngOnInit(): void {
    this.isOpenSubject = new BehaviorSubject<boolean>(this.defaultOpenState);
    this.isOpen$= this.isOpenSubject.asObservable();
  }

  ngOnDestroy(): void {
    if (this.resetSubscription)
      this.resetSubscription.unsubscribe();
  }

  onOpen(){
    this.isOpenSubject.next(true);
    this.open.emit();
  }

  onClose(){
    this.isOpenSubject.next(false);
    this.close.emit();
  }

  forceOpen(open:boolean)
  {
    if (open && !this.isOpenSubject.value)
      this.onOpen();
    else if (!open && this.isOpenSubject.value)
      this.onClose()
  }

  getSizedImage(image:IImage, fullSize:boolean)
  {
    if ( image && !fullSize && this.maxImageHeight && this.maxImageWidth && (image.width > this.maxImageWidth  || image.height > this.maxImageWidth) )
    {
       let newWidth : number = image.width;
       let newHeight: number = image.height;

       if (image.width > this.maxImageWidth)
       {
          newWidth = this.maxImageWidth;
          newHeight = (this.maxImageWidth/image.width) * image.height;
       }

       if (newHeight > this.maxImageHeight)
       {
          newWidth = (this.maxImageHeight/newHeight) * newWidth;
          newHeight = this.maxImageHeight;
       }

       return <IImage>{...image, height:newHeight, width:newWidth };
    }
    else
      return image;
  }

  onImageClick()
  {
    this.fullsizeImageSubject.next(!this.fullsizeImageSubject.value);
    if (window.scrollY> 250 )
      window.scrollTo(0,250);
  }
}
