import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifs: Gif[] = [];
  private _tagsHistory: string[] = [];
  private apiKey = environment.giphy_api;

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
  }

  get tagsHistory(): string[] {
    return [...this._tagsHistory];
  }

  /**
   * organizeHistory
   * * Organize the search history of tags
   * @param tag param to add to the history
   * @returns void
   */
  private organizeHistory(tag: string) : void {
    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag) ) {
      this._tagsHistory = this._tagsHistory.filter( oldTag => oldTag !== tag );
    }

    this._tagsHistory.unshift( tag );
    this._tagsHistory = this._tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  /**
   * searchTag
   * * Search for GIFs based on the provided tag
   * @param tag param to add to the history
   * @returns void
   */
  searchTag( tag: string ) : void {
    if ( tag.trim().length === 0 ) {
      return;
    }

    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', tag)
      .set('limit', '10');

    this.http.get<SearchResponse>(`${environment.baseUrl}/search`, { params })
      .subscribe(resp => {
        this.gifs = resp.data;
      }
    );
  }

  /**
   * saveLocalStorage
   * * Save the search history of tags in the local storage
   * @returns void
   */
  private saveLocalStorage(): void {
    localStorage.setItem('tagsHistory', JSON.stringify(this._tagsHistory));
  }

  /**
   * loadLocalStorage
   * * Load the search history of tags from the local storage
   * * If there is no history, it will not load anything
   * * If there is history, it will load the first tag
   * @returns void
   */
  private loadLocalStorage(): void {
    if (localStorage.getItem('tagsHistory')) {
      this._tagsHistory = JSON.parse(localStorage.getItem('tagsHistory')!);
      this.searchTag(this._tagsHistory[0]);
    }
  }

}
