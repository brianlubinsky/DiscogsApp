import { Component, OnInit,Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { IPagingData  } from "../../SharedModels/IPagingData";

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class PagingComponent implements OnInit {

  @Input() pagingData:IPagingData;
  @Output() pageSelected : EventEmitter<number> = new EventEmitter<number>();
  get statusMessage(): string {
    if (this.pagingData)
    {
      const startItem = 1 + (this.pagingData.page-1)*this.pagingData.per_page;
      const endItem = startItem + this.pagingData.per_page - 1 > this.pagingData.items ? this.pagingData.items : startItem + this.pagingData.per_page - 1;
      return startItem.toString() + ' - ' + endItem.toString() + ' of ' + this.pagingData.items.toString();
    }
    else
      return null;
  }

  constructor() { }

  ngOnInit(): void {
  }

  onPrevClick()
  {
    this.pageSelected.emit(this.pagingData.page-1);
  }

  onNextClick()
  {
    this.pageSelected.emit(this.pagingData.page + 1);
  }

  onBeginningClick()
  {
    this.pageSelected.emit(1);
  }

  onEndClick()
  {
    this.pageSelected.emit(this.pagingData.pages);
  }
}
