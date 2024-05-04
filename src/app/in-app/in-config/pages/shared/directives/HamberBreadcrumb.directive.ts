import { AfterViewChecked, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[HamberBreadcrumb]',
})
/**
 * Using for css hamber breadcrumb
 * Using default example <kendo-breadcrumb HamberBreadcrumb></kendo-breadcrumb>
 * Using with modified css example <kendo-breadcrumb HamberBreadcrumb data-active-color='#3A7B50' data-disabled-color='#3A7B50'></kendo-breadcrumb>
 */
export class HamberBreadcrumb implements AfterViewChecked {
  constructor(private element: ElementRef) {}
  ngAfterViewChecked(): void {
    let breadcrumb = this.element.nativeElement;
    let activeColor =
      this.element.nativeElement.dataset.activeColor || '#3A7B50';
    let disabledColor =
      this.element.nativeElement.dataset.disabledColor || '#959DB3';
    if (breadcrumb) {
      let kDisabled = breadcrumb.querySelector('.k-disabled');
      if (kDisabled) {
        kDisabled.style.opacity = '1';
        let lis = breadcrumb.querySelectorAll('li');
        if (lis) {
          lis.forEach((li: HTMLElement) => {
            li.style.color = activeColor;
            let kText = li.querySelector(
              '.k-breadcrumb-item-text'
            ) as HTMLElement;
            if (kText) {
              kText.style.color = activeColor;
            }
          });
          let lastLI = breadcrumb.querySelector(
            'li:last-of-type'
          ) as HTMLElement;
          let kText = lastLI.querySelector(
            '.k-breadcrumb-item-text'
          ) as HTMLElement;
          if (kText) {
            kText.style.color = disabledColor;
          }
          let bsLastLI = breadcrumb.querySelector(
            'li:nth-last-child(2)'
          ) as HTMLElement;
          let kIcon = bsLastLI.querySelector('kendo-icon') as HTMLElement;
          if (kIcon) {
            kIcon.style.color = disabledColor;
          }
        }
      }
    }
  }
}
