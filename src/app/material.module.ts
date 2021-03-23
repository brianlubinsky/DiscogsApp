import { NgModule } from '@angular/core';
import { CommonModule} from "@angular/common";
import { MatInputModule  } from "@angular/material/input";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatRadioModule } from "@angular/material/radio";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule  } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule  } from "@angular/material/table";
import { MatSortModule  } from "@angular/material/sort";
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatSortModule
  ],
  exports:[
    MatInputModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatSortModule
  ]
})
export class MaterialModule { }
