import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home/home-page.component';
import { SearchBoxComponent } from './components/search-box/search-box/search-box.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { GifsService } from './services/gifs.service';



@NgModule({
  declarations: [
    CardListComponent,
    HomePageComponent,
    SearchBoxComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HomePageComponent,
    SearchBoxComponent
  ]
})
export class GifsModule { }