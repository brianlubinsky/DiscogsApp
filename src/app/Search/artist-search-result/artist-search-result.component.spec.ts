import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistSearchResultComponent } from './artist-search-result.component';

describe('ArtistSearchResultComponent', () => {
  let component: ArtistSearchResultComponent;
  let fixture: ComponentFixture<ArtistSearchResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistSearchResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
