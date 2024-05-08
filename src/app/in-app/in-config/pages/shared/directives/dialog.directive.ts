import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[primary], [delete]',
})
export class DialogDirective implements OnInit {
  constructor(private el: ElementRef) {}

  // khai báo
  isPrimary: boolean = false;
  isError: boolean = false;
  backgroundColor: string = 'white';

  // kiểm tra trạng thái của dialog (primary,delete) và set màu sắc
  ngOnInit(): void {
    if (this.el.nativeElement.hasAttribute('primary')) {
      this.isPrimary = true;
      this.isError = false;
      this.backgroundColor = '#16a34a';
    } else if (this.el.nativeElement.hasAttribute('delete')) {
      this.isPrimary = false;
      this.isError = true;
      this.backgroundColor = '#fd7676';
    }
    // console.log('isPrimary:', this.isPrimary);
    // console.log('isError:', this.isError);
    // console.log('backgroundColor:', this.backgroundColor);
  }
}
