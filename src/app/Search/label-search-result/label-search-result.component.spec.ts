import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelSearchResultComponent } from './label-search-result.component';

describe('LabelSearchResultComponent', () => {
  let component: LabelSearchResultComponent;
  let fixture: ComponentFixture<LabelSearchResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelSearchResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
