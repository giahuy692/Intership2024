import { Component, EventEmitter, Input, Output, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "app-input-area-component",
  template: `
    <kendo-label
      class="k-display-block"
      [for]="textarea"
      [text]="label"
      [style.padding-bottom.px]="8"
      [style.padding-top.px]="8"
      [style.color]="'#7a7f8dff'"
      [style.font-weight]="600"
    ></kendo-label>
    <textarea 
      #textarea 
      [style.width.%]="100" 
      [style.border]="'2px solid #ccc'"
      [style.padding.px]="5"
      [style.height.px]="100"
      [style.font-size.rem]="1.1" 
      [ngModel]="value"
      (ngModelChange)="onValueChange($event)"
      kendoTextArea>
    </textarea>
  `,
})
export class InputAreaKendoComponent {
  @Input() label!: string;
  @Input() value!: string;
  
  @Output() valueChange = new EventEmitter<string>();

  onValueChange(newValue: string): void{
    console.log('Giá trị mới: ', newValue);
    this.valueChange.emit(newValue);
  }
}
