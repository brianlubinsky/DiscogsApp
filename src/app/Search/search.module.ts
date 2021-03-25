import { NgModule } from '@angular/core';
import { CommonModule} from "@angular/common";
import { FlexModule } from "@angular/flex-layout";
import { SearchComponent } from './search/search.component';
import { ArtistSearchResultComponent } from './artist-search-result/artist-search-result.component';
import { ArtistSearchDisplayComponent } from './artist-search-display/artist-search-display.component';
import { FormsModule, ReactiveFormsModule  } from "@angular/forms";
import { MaterialModule  } from "../material.module";
import { ISearchService  } from "./ISearchService";
import { SearchService  } from "./search.service";
import { AlbumSearchResultComponent } from './album-search-result/album-search-result.component';
import { AlbumSearchDisplayComponent } from './album-search-display/album-search-display.component';
import { LabelSearchDisplayComponent } from './label-search-display/label-search-display.component';
import { LabelSearchResultComponent } from './label-search-result/label-search-result.component';
import { SharedModule  } from "../Shared/shared.module";
import { SearchLinkDirective } from './search-link.directive';
import { SearchLinkComponent } from './search-link/search-link.component';
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    SearchComponent,
    ArtistSearchResultComponent,
    ArtistSearchDisplayComponent,
    AlbumSearchResultComponent,
    AlbumSearchDisplayComponent,
    LabelSearchDisplayComponent,
    LabelSearchResultComponent,
    SearchLinkDirective,
    SearchLinkComponent
  ],
  providers:[{provide:ISearchService,useClass:SearchService}],
  imports: [
    FlexModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    RouterModule
  ],
  exports:[
    SearchComponent,
    SearchLinkDirective //TODO Remove these from project
    //PagingComponent
    //ArtistSearchResultComponent,
    //ArtistSearchDisplayComponent,
    //FormsModule, don't need these other than search
    //ReactiveFormsModule
  ]
})
export class SearchModule { }
