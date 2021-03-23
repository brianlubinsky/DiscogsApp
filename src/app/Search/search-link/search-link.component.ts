import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-link',
  templateUrl: './search-link.component.html',
  styleUrls: ['./search-link.component.scss']
})
export class SearchLinkComponent implements OnInit {

  @HostBinding('attr.search-term') searchTerm:string;
  @HostBinding('attr.search-type') searchType:string;

  constructor() { }

  ngOnInit(): void {
  }

  onClick()
  {
    alert('You searched on ' + this.searchTerm + ' Search type : ' + this.searchType);
  }
}
