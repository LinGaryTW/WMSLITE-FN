import { Directive, OnChanges, Input, ElementRef } from "@angular/core";

@Directive({
  selector: '[focus]'
})
export class FocusDirective implements OnChanges {
  @Input('focus') focus: boolean | undefined;

  constructor(private elementRef: ElementRef) { }

  ngOnChanges() {
    if (this.focus) {
      setTimeout(() => { this.elementRef.nativeElement.focus(); }, 0);
    }
  }
}
