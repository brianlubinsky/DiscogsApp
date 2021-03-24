import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowHideComponent  } from "./show-hide/show-hide.component";
import { PagingComponent  } from "./paging/paging.component";
import { MaterialModule } from "../material.module";
import { AlbumListComponent } from './album-list/album-list.component';
import { RouterModule  } from "@angular/router";

@NgModule({
  declarations: [ShowHideComponent, PagingComponent, AlbumListComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports:[ShowHideComponent,PagingComponent, AlbumListComponent]
})
export class SharedModule { }
