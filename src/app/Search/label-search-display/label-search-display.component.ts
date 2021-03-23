import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ISearchResult } from "../ISearchResult";

@Component({
  selector: 'app-label-search-display',
  templateUrl: './label-search-display.component.html',
  styleUrls: ['./label-search-display.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class LabelSearchDisplayComponent implements OnInit {

  @Input() labelSearchResult : ISearchResult;
  @Output() labelSelected : EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }


}
