import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArtistSearchResultComponent  } from "./Search/artist-search-result/artist-search-result.component";
import { AlbumSearchResultComponent  } from "./Search/album-search-result/album-search-result.component";
import { LabelSearchResultComponent  } from "./Search/label-search-result/label-search-result.component";
const routes: Routes = [
  { path:'ArtistSearchResult', component:ArtistSearchResultComponent},
  { path:'AlbumSearchResult', component:AlbumSearchResultComponent},
  { path:'LabelSearchResult', component:LabelSearchResultComponent},
  {
    path: 'Artists',
    loadChildren: () => import('./Artist/artist.module').then(m => m.ArtistModule)
  },
  {
    path:'Labels',
    loadChildren: () => import('./Label/label.module').then(m => m.LabelModule)
  },
  {
    path:'Albums',
    loadChildren: () => import('./Album/album.module').then(m => m.AlbumModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
