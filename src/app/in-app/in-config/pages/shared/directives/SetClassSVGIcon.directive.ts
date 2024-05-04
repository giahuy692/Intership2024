import { AfterViewInit, Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[SetClassSVGIcon]',
})
export class SetClassSVGIcon implements OnInit, AfterViewInit {
  private className = 'k-font-icon'; // Customize the class name

  constructor(private element: ElementRef) {}
  ngAfterViewInit(): void {
    console.log(this.element.nativeElement);
    const icons = this.element.nativeElement.querySelectorAll('kendo-icon');
    if (icons) {
      icons.forEach((icon:HTMLElement)=>{
        icon.classList.add(this.className);
      })
    }
  }

  ngOnInit(): void {}
}
