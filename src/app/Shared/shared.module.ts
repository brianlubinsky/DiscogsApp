import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowHideComponent  } from "./show-hide/show-hide.component";
import { PagingComponent  } from "./paging/paging.component";
import { MaterialModule } from "../material.module";
import { AlbumListComponent } from './album-list/album-list.component';
import { RouterModule  } from "@angular/router";
import { DiscogsMarkupParserComponent } from './discogs-markup-parser/discogs-markup-parser.component';
import { SafeHtmlPipe } from './safe-html.pipe';
import {IvyGalleryModule} from 'angular-gallery';
import { GalleryComponent } from './gallery/gallery.component';
import { ShowHideGroupComponent } from './show-hide-group/show-hide-group.component';

@NgModule({
  declarations: [ShowHideComponent, PagingComponent, AlbumListComponent, DiscogsMarkupParserComponent, SafeHtmlPipe, GalleryComponent, ShowHideGroupComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    IvyGalleryModule
  ],
  exports:[ShowHideComponent,PagingComponent, AlbumListComponent, DiscogsMarkupParserComponent, GalleryComponent, ShowHideGroupComponent]
})
export class SharedModule { }
