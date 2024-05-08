import { AfterViewChecked, Directive, ElementRef } from '@angular/core';
/**HamperBreadcrumb
 * - Using for css hamber breadcrumb
 * - Using default example  ~kendo-breadcrumb HamberBreadcrumb++/kendo-breadcrumb
 * - Using with modified css example ~kendo-breadcrumb HamberBreadcrumb data-active-color='#3A7B50' data-disabled-color='#3A7B50'~~/kendo-breadcrumb~
 **/
@Directive({
  selector: '[HamperBreadcrumb]',
})

export class HamperBreadcrumb implements AfterViewChecked {
  constructor(private element: ElementRef) {}
  ngAfterViewChecked(): void {
    let breadcrumb = this.element.nativeElement;
    let activeColor =
      this.element.nativeElement.dataset.activeColor || '#1A6634';
    let disabledColor =
      this.element.nativeElement.dataset.disabledColor || '#959DB3';
    if (breadcrumb) {
      let kDisabled = breadcrumb.querySelector('.k-disabled') as HTMLElement;
      breadcrumb.style.background = 'none';
      if (kDisabled) {
        kDisabled.classList.remove('k-disabled');
        
        let lis = breadcrumb.querySelectorAll('li');
        if (lis) {
          lis.forEach((li: HTMLElement) => {
            li.style.color = activeColor;
            let kText = li.querySelector(
              '.k-breadcrumb-item-text'
            ) as HTMLElement;
            let icon = li.querySelector(
              '.k-icon'
            ) as HTMLElement;
            let iconFontSize = li.querySelector(
              '.k-icon-xs'
            ) as HTMLElement;
            if(iconFontSize){
              iconFontSize.style.fontSize = '20px'
            }
            if(icon){
              icon.style.opacity = '1'
            }
            
            if (kText) {
              kText.style.color = activeColor;
              kText.style.textTransform = 'uppercase'
              kText.style.fontWeight = '600'
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
          if(bsLastLI){
            let kIcon = bsLastLI.querySelector('kendo-icon') as HTMLElement;
            if (kIcon) {
              kIcon.style.color = disabledColor;
            }
          }
          lis.forEach((li:HTMLElement)=>{
            if(li.dataset?.['kendoBreadcrumbIndex'] == '0'){
              let kText = li.querySelector(
                '.k-breadcrumb-item-text'
              ) as HTMLElement;
              if (kText) {
                kText.style.color = activeColor;
              }
            }
          })
        }
      }
    }
    
  }
}
