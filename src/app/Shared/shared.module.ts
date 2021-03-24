import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowHideComponent  } from "./show-hide/show-hide.component";
import { PagingComponent  } from "./paging/paging.component";
import { MaterialModule } from "../material.module";
import { AlbumListComponent } from './album-list/album-list.component';
import { RouterModule  } from "@angular/router";
import { DiscogsMarkupParserComponent } from './discogs-markup-parser/discogs-markup-parser.component';
import { SafeHtmlPipe } from './safe-html.pipe';

@NgModule({
  declarations: [ShowHideComponent, PagingComponent, AlbumListComponent, DiscogsMarkupParserComponent, SafeHtmlPipe],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports:[ShowHideComponent,PagingComponent, AlbumListComponent, DiscogsMarkupParserComponent]
})
export class SharedModule { }
