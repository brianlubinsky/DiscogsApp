import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LabelDetailComponent } from "./label-detail/label-detail.component";

const routes: Routes = [
 { path:'LabelDetail/:id', component:LabelDetailComponent}
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabelRoutingModule {}
