import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabelRoutingModule  } from "./label.routing.module";
import { SharedModule  } from "../Shared/shared.module";
import { LabelService } from '../Label/label.service';
import { ILabelService } from '../Label/ILabelService';
import { LabelDetailComponent } from './label-detail/label-detail.component';
@NgModule({
  declarations:[LabelDetailComponent],
  imports: [
    CommonModule,
    LabelRoutingModule,
    SharedModule
  ],
  providers:[
    {provide:ILabelService,useClass:LabelService}
  ]
})
export class LabelModule { }
