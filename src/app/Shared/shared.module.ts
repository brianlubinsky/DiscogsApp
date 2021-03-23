import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowHideComponent  } from "./show-hide/show-hide.component";
import { PagingComponent  } from "./paging/paging.component";
import { MaterialModule } from "../material.module";
import { AlbumListComponent } from './album-list/album-list.component';

@NgModule({
  declarations: [ShowHideComponent, PagingComponent, AlbumListComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[ShowHideComponent,PagingComponent, AlbumListComponent]
})
export class SharedModule { }
