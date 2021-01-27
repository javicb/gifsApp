import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  // api key from https://developers.giphy.com/
  private apiKey = 'ac1TI4lIS51rWFGCOQVEz7nsqsCbKkgD';
  private historial: string[] = [];
  public resultados: Gif[] = [];

  get historico(): string[] {
    return [...this.historial];
  }

  constructor(private http: HttpClient) { }

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

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}=${busqueda}&limit=10`)
      .subscribe(response => {
        console.log(response.data);
        this.resultados = response.data;
      });
  }

}
