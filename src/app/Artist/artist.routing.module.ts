import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ArtistDetailComponent } from "./artist-detail/artist-detail.component";

const routes: Routes = [
  { path:'ArtistDetail/:id', component:ArtistDetailComponent}
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArtistRoutingModule {}
