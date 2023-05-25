import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _tagsHistory: string[] = [];
  private apiKey = environment.giphy_api;

  constructor(private http: HttpClient) { }

  get tagsHistory(): string[] {
    return [...this._tagsHistory];
  }

  /**
   * organizeHistory
   * * Organize the search history of tags
   * @param tag param to add to the history
   */
  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag) ) {
      this._tagsHistory = this._tagsHistory.filter( oldTag => oldTag !== tag );
    }

    this._tagsHistory.unshift( tag );
    this._tagsHistory = this._tagsHistory.splice(0, 10);
  }

  /**
   * searchTag
   * * Search for GIFs based on the provided tag
   * @param tag param to add to the history
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

    this.http.get(`${environment.baseUrl}/search`, { params })
      .subscribe( (resp: any) => {
        console.log(resp.data);
      }
    );
  }
}
