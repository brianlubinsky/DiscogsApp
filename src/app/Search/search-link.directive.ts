import { Directive, Renderer2, OnInit, ElementRef, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'a[search-link]'
})
export class SearchLinkDirective implements OnInit {

  @HostListener('click') searchClick(){
    alert('search on ' + this.elementRef.nativeElement.attributes['search-term'].value);
    alert('search type ' + this.elementRef.nativeElement.attributes['search-type'].value);
  }

  constructor(private renderer:Renderer2, private elementRef:ElementRef) { }

  ngOnInit(): void {

  }

}
