import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistRoutingModule  } from "./artist.routing.module";
import { ArtistDetailComponent } from './artist-detail/artist-detail.component';
import { SharedModule  } from "../Shared/shared.module";
@NgModule({
  declarations: [ArtistDetailComponent],
  imports: [
    CommonModule,
    ArtistRoutingModule,
    SharedModule
  ]
})
export class ArtistModule { }
