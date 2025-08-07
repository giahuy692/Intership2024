import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-input-text-kendo",
  template: `
    <kendo-label
      class="k-display-block"
      [text]="label"
      [for]="input"
      [style.padding-top.px]="10"
      [style.padding-bottom.px]="6"
      [style.font-weight]="600"
      [style.color]="'#7a7f8dff'"
    ></kendo-label>
    <input
      #input
      kendoTextBox
      [style.width.%]="100"
      [style.padding.px]="4.5"
      [style.border]="isActiveView ? '2px solid white' : '2px solid #ccc'"
      [style.color]="isActiveColor ? '#1A6634' : '#000'"
      [disabled]="isDisabled"
      [readOnly]="isReadOnly"
      [ngModel]="value"
      (ngModelChange)="onValueChange($event)"
    />
  `,
})
export class InputKendoComponent {
  @Input() label?: string;
  @Input() value!: any;
  @Input() isDisabled = false;
  @Input() isReadOnly = false; 
  @Input() isActiveView = false;
  @Input() isActiveColor = false;
  @Output() valueChange = new EventEmitter<any>();

  onValueChange(newValue: any): void {
    console.log('Giá trị thay đổi:', newValue);
    this.valueChange.emit(newValue);
  }

}
