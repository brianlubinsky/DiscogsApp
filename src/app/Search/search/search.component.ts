import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ISearchService  } from "../ISearchService";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable, of } from 'rxjs';
import { distinctUntilChanged, debounceTime, switchMap,tap } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { ISearchResult } from '../ISearchResult';
import { JsonpClientBackend } from '@angular/common/http';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchForm : FormGroup;

  autocompleteTerms: Observable<Array<ISearchResult>>;

  constructor(private formBuilder:FormBuilder, private searchService:ISearchService, private router:Router) { }

  ngOnInit(): void {
    this.searchForm =this.formBuilder.group({
      searchTerm: ['',Validators.required],
      searchType: ['artist', Validators.required]
    });

    this.autocompleteTerms = environment.autocompleteEnabled? this.searchForm.valueChanges
    .pipe(debounceTime(300))
    .pipe(distinctUntilChanged())
    .pipe(switchMap
      (result=>
        {
          if (this.searchForm.value.searchTerm.length < 3)
            return of(new Array<ISearchResult>()) ;
          else if (this.searchForm.value.searchType === 'artist')
            return this.searchService.artistAutocomplete(this.searchForm.value.searchTerm);
          else if (this.searchForm.value.searchType === 'master')
            return this.searchService.albumAutocomplete(this.searchForm.value.searchTerm);
          else
            return this.searchService.labelAutocomplete(this.searchForm.value.searchTerm);
        }
      )
     )
    : of (new Array<ISearchResult>());
  }

  search()
  {
    if (this.searchForm.valid)
    {
      this.searchService.updateFilter({title:this.searchForm.value.searchTerm, page:1});
      if (this.searchForm.value.searchType === 'artist' && this.router.url != '/ArtistSearchResult')
          this.router.navigateByUrl('/ArtistSearchResult');
      else if (this.searchForm.value.searchType === 'master' && this.router.url != '/AlbumSearchResult')
          this.router.navigateByUrl('/AlbumSearchResult');
      else if (this.searchForm.value.searchType === 'label' && this.router.url != '/LabelSearchResult')
          this.router.navigateByUrl('/LabelSearchResult');
    }
  }

  autoCompleteDisplay(option:ISearchResult) : string
  {
    return option.title;
  }

  onAutocompleteSelected(event:MatAutocompleteSelectedEvent)
  {
    if (this.searchForm.value.searchType === 'artist')
      this.router.navigate(['Artists/ArtistDetail',event.option.value.id]);
    else if (this.searchForm.value.searchType === 'label')
      this.router.navigate(['Labels/LabelDetail',event.option.value.id]);
  }
}
