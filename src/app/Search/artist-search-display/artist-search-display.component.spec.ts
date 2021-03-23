import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistSearchDisplayComponent } from './artist-search-display.component';

describe('ArtistSearchDisplayComponent', () => {
  let component: ArtistSearchDisplayComponent;
  let fixture: ComponentFixture<ArtistSearchDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistSearchDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistSearchDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
