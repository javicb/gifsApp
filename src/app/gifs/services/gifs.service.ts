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

    busqueda = busqueda.trim().toLowerCase();

    if (busqueda.trim().length === 0) {
      return;
    }

    // No incluimos repetidos
    if (!this.historial.includes(busqueda)) {
      this.historial.unshift(busqueda);
      // Solo mostramos 10 resultados
      this.historial = this.historial.splice(0, 10);
    }

    console.log(this.historial);
  }

}
