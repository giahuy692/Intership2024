import { Directive, ElementRef, OnInit } from '@angular/core';

/** Necessary
 * - Using for input that is necessary type
 * - Example (<span Necessary> </span>)
 **/

@Directive({
    selector: '[Necessary]',
})

export class Necessary implements OnInit {
    constructor(private element: ElementRef) { }
    ngOnInit(): void {
        let element = this.element.nativeElement as HTMLElement;
        if(element){
            element.innerHTML = '(*)';
            let eStyle = element.style;
            eStyle.color = '#EB273A';
            eStyle.fontWeight = '600';
            eStyle.display = 'flex';
            eStyle.flexDirection = 'column';
            eStyle.justifyContent = 'center';
        }
    }
}