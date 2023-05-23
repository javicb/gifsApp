import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _tagsHistory: string[] = [];

  constructor() { }

  get tagsHistory(): string[] {
    return [...this._tagsHistory];
  }

  /**
   * organizeHistory
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
   * * Add a tag to the history
   * @param tag param to add to the history
   */
  searchTag( tag: string ) {
    if ( tag.trim().length === 0 ) {
      return;
    }

    this.organizeHistory(tag);
  }
}
