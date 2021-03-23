import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumSearchDisplayComponent } from './album-search-display.component';

describe('AlbumSearchDisplayComponent', () => {
  let component: AlbumSearchDisplayComponent;
  let fixture: ComponentFixture<AlbumSearchDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumSearchDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumSearchDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
