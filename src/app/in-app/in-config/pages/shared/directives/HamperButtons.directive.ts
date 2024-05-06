import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[HamperButtons]',
})
/**
 * Using for css button in hamber-page
 * Type button : danger, success, cancel, return
 * Using default example <button type='button' HamberButtons data-type='danger'>Content <kendo-svg-icon [icon]="rotateIcon"></kendo-svg-icon></button>
 * Using with modified css example <button type='button' HamberButtons data-type='danger' data-css='paddig: 10px'>Content <kendo-svg-icon [icon]="rotateIcon"></kendo-svg-icon></button>
 */
export class HamperButtons implements OnInit {
  csStyle =
    'border: 1px solid transparent; border-radius: 5px; color: white; display: flex; justify-content: center; gap: 7px; align-items: center; fill: white; font-weight: 700; cursor: pointer; box-shadow: rgba(3, 102, 214, 0.3) 0px 3px 5px 0px;';
  constructor(private element: ElementRef) {}
  ngOnInit(): void {
    this.element.nativeElement.style = this.csStyle;
    let svgIcons =
      this.element.nativeElement.querySelectorAll('kendo-svg-icon svg');
    let type = this.element.nativeElement.dataset.type;
    if (type) {
      if (type == 'danger') {
        this.element.nativeElement.style.backgroundColor = '#EB273A';
        if (svgIcons) {
          svgIcons.forEach((icon: HTMLElement) => {
            icon.style.fill = 'white';
          });
        }
      } else if (type == 'return') {
        this.element.nativeElement.style.backgroundColor = 'white';
        this.element.nativeElement.style.borderColor = '#EB273A';
        this.element.nativeElement.style.color = '#EB273A';
        if (svgIcons) {
          svgIcons.forEach((icon: HTMLElement) => {
            icon.style.fill = '#EB273A';
          });
        }
      } else if (type == 'success') {
        this.element.nativeElement.style.backgroundColor = '#008000';
        if (svgIcons) {
          svgIcons.forEach((icon: HTMLElement) => {
            icon.style.fill = '#EB273A';
          });
        }
      } else if (type == 'cancel') {
        this.element.nativeElement.style.backgroundColor = 'white';
        this.element.nativeElement.style.color = '#008000';
        if (svgIcons) {
          svgIcons.forEach((icon: HTMLElement) => {
            icon.style.fill = '#008000';
          });
        }
      }
    }
    let css = this.element.nativeElement.dataset.css;
    if (css) {
      this.element.nativeElement.style = css;
    }
  }
}
