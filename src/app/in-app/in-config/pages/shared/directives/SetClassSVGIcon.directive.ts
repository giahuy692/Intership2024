import { AfterViewChecked, AfterViewInit, Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[SetClassSVGIcon]',
})
/**
 * Using for Kendo SVG Icon to add class k-font-icon to display icon 
 * Using default example <kendo-breadcrumb SetClassSVGIcon></kendo-breadcrumb>
 */
export class SetClassSVGIcon implements AfterViewChecked {
  private className = 'k-font-icon'; // Customize the class name

  constructor(private element: ElementRef) {}
  ngAfterViewChecked(): void {
    const icons = this.element.nativeElement.querySelectorAll('kendo-icon');
    if (icons) {
      icons.forEach((icon:HTMLElement)=>{
        icon.classList.add(this.className);
      })
    }
  }
}
