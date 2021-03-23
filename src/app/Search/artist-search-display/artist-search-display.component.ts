import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ISearchResult } from "../ISearchResult";

@Component({
  selector: 'app-artist-search-display',
  templateUrl: './artist-search-display.component.html',
  styleUrls: ['./artist-search-display.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ArtistSearchDisplayComponent implements OnInit {

  @Input() artistSearchResult : ISearchResult;
  @Output() artistSelected : EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }


}
