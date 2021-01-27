import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  // api key from https://developers.giphy.com/
  private apiKey = 'ac1TI4lIS51rWFGCOQVEz7nsqsCbKkgD';
  private serviceUrl = 'https://api.giphy.com/v1/gifs';
  private historial: string[] = [];
  public resultados: Gif[] = [];

  get historico(): string[] {
    return [...this.historial];
  }

  constructor(private http: HttpClient) {
    this.historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

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

      // localstorage
      localStorage.setItem('historial', JSON.stringify(this.historial));
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', busqueda);

    this.http.get<SearchGifsResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe(response => {
        this.resultados = response.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });
  }

}
