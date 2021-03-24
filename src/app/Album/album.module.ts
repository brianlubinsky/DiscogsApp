import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IAlbumService  } from "./IAlbumService";
import { AlbumService } from "./album.service";
import { AlbumDetailComponent } from './album-detail/album-detail.component';
import { SharedModule  } from "../Shared/shared.module";
import { AlbumRoutingModule  } from "./album-routing.module";
import { MaterialModule } from "../material.module";
@NgModule({
  declarations: [AlbumDetailComponent],
  imports: [
    CommonModule,
    SharedModule,
    AlbumRoutingModule,
    MaterialModule
  ],
  providers:[
    {provide:IAlbumService,useClass:AlbumService}
  ]
})
export class AlbumModule { }
