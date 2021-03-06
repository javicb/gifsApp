import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  get historial(): string[] {
    return this.gifsService.historico;
  }

  constructor(private gifsService: GifsService) { }

  buscar(busqueda: string): void {
    this.gifsService.buscarGifs(busqueda);
  }
}
