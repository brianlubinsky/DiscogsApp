import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistRoutingModule  } from "./artist.routing.module";
import { IArtistService  } from "./IArtistService";
import { ArtistService  } from "./artist.service";
import { ArtistDetailComponent } from './artist-detail/artist-detail.component';
import { SharedModule  } from "../Shared/shared.module";
@NgModule({
  declarations: [ArtistDetailComponent],
  imports: [
    CommonModule,
    ArtistRoutingModule,
    SharedModule
  ],
  providers:[
    {provide:IArtistService,useClass:ArtistService}
  ]
})
export class ArtistModule { }
