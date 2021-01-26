import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GifsPageComponent } from './gifsPage.component';

describe('GifsPageComponent', () => {
  let component: GifsPageComponent;
  let fixture: ComponentFixture<GifsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GifsPageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GifsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
