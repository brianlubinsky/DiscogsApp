import { AfterContentInit, Component, ContentChildren, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShowHideComponent } from '../show-hide/show-hide.component';

@Component({
  selector: 'app-show-hide-group',
  templateUrl: './show-hide-group.component.html',
  styleUrls: ['./show-hide-group.component.scss']
})
export class ShowHideGroupComponent implements OnInit, AfterContentInit, OnDestroy {

  @ContentChildren(ShowHideComponent) showHideComponents : QueryList<ShowHideComponent>;
  private subscriptions = new Array<Subscription>();

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    this.showHideComponents.forEach(x=>{
      this.subscriptions.push (x.open.subscribe(()=>{
        this.showHideComponents.forEach(y=>{
          if (x.guid !== y.guid)
            y.forceOpen(false);
        });
      }));
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(x=>x.unsubscribe());
  }
}
