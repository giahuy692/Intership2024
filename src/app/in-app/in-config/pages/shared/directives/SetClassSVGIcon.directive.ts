import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[SetClassSVGIcon]'
})
export class SetClassSVGIcon implements OnInit {
  private className = 'k-font-icon'; // Customize the class name

  constructor(private element: ElementRef) {}

  ngOnInit(): void {
    console.log(this.element.nativeElement)
    const icon = this.element.nativeElement.querySelector('.kendo-button-icon');
    if (icon) {
        console.log(icon)
      icon.classList.add(this.className);
    }
  }
}