import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AlbumDetailComponent } from "./album-detail/album-detail.component";

const routes: Routes = [
  { path:'AlbumDetail/:id', component:AlbumDetailComponent}
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlbumRoutingModule {}
