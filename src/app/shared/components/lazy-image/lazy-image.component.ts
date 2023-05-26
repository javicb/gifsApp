import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
  styleUrls: ['./lazy-image.component.css']
})
export class LazyImageComponent implements OnInit {

  @Input() url!: string;
  @Input() alt!: string;
  public _loaded = false;

  constructor() { }

  ngOnInit(): void {
    if (!this.url) {
      throw new Error('Attribute url is required');
    }
  }

  onLoad(): void {
    setTimeout(() => {
      this._loaded = true;
    }, 300);
  }

}
