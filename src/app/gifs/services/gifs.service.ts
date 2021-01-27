import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private historial: string[] = [];

  get historico(): string[] {
    return [...this.historial];
  }

  constructor() { }

  buscarGifs(busqueda: string): void {
    this.historial.unshift(busqueda);
    console.log(this.historial);
  }

}
