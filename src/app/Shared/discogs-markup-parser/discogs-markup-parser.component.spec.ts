import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscogsMarkupParserComponent } from './discogs-markup-parser.component';

describe('DiscogsMarkupParserComponent', () => {
  let component: DiscogsMarkupParserComponent;
  let fixture: ComponentFixture<DiscogsMarkupParserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscogsMarkupParserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscogsMarkupParserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
