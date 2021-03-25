import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabelRoutingModule  } from "./label.routing.module";
import { SharedModule  } from "../Shared/shared.module";
import { LabelDetailComponent } from './label-detail/label-detail.component';
@NgModule({
  declarations:[LabelDetailComponent],
  imports: [
    CommonModule,
    LabelRoutingModule,
    SharedModule
  ]
})
export class LabelModule { }
