import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelSearchDisplayComponent } from './label-search-display.component';

describe('LabelSearchDisplayComponent', () => {
  let component: LabelSearchDisplayComponent;
  let fixture: ComponentFixture<LabelSearchDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelSearchDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelSearchDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
