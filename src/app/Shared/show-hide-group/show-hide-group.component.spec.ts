import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowHideGroupComponent } from './show-hide-group.component';

describe('ShowHideGroupComponent', () => {
  let component: ShowHideGroupComponent;
  let fixture: ComponentFixture<ShowHideGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowHideGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowHideGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
