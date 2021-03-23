import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowHideComponent  } from "./show-hide/show-hide.component";
import { PagingComponent  } from "./paging/paging.component";
import { MaterialModule } from "../material.module";

@NgModule({
  declarations: [ShowHideComponent, PagingComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[ShowHideComponent,PagingComponent]
})
export class SharedModule { }
