import { Directive, ElementRef, AfterViewChecked } from '@angular/core';

@Directive({
    selector: '[FileSelected]',
})

/**
 * Using for css a input select file image
 * Add icon import image and delete all original text
 * Hide list selected image
 * Using example: <kendo-fileselect FileSelected></kendo-fileselectictions>
 */

export class FileSelected implements AfterViewChecked {
    constructor(private element: ElementRef) { }
    ngAfterViewChecked(): void {
        let fileselected = this.element.nativeElement as HTMLElement;
        if (fileselected.querySelector('ul')) {
            fileselected.querySelector('ul').style.display = "none";
        }
        if (fileselected.querySelector('button')) {
            let buttonElement = fileselected.querySelector('button');
            buttonElement.querySelector('span').innerHTML = '';
            buttonElement.querySelector('span').className = 'k-icon k-font-icon k-i-export'
        }
    }
}