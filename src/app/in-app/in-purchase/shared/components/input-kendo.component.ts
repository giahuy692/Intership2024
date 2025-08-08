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

  <div class="input-container">
    <input
      #input
      class="input-box"
      kendoTextBox
      [style.width.%]="100"
      [style.padding-right.px]="showSearchIcon ? 30 : 8"
      [style.padding-left.px]="8"
      [style.height.px]="34"
      [style.border]="isActiveView ? '2px solid white' : '2px solid #ccc'"
      [style.color]="isActiveColor ? '#1A6634' : '#000'"
      [disabled]="isDisabled"
      [readOnly]="isReadOnly"
      [ngModel]="value"
      (ngModelChange)="onValueChange($event)"
    />
    <i
      *ngIf="showSearchIcon"
      class="fa-solid fa-magnifying-glass search-icon"
      (click)="onSearchClick()"
    ></i>

  </div>
  `,
  styles: [`
      .input-container {
    position: relative;
    width: 100%;
  }

  .input-box {
    width: 100%;
    padding-right: 30px;
    box-sizing: border-box;
    font-size: 14px;
    height: 34px;
  }

  .search-icon {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    color: #a2a9bbff;
    cursor: pointer;
    font-size: 14px;
  }

  `]
})
export class InputKendoComponent {
  @Input() label?: string;
  @Input() value!: any;
  @Input() isDisabled = false;
  @Input() isReadOnly = false; 
  @Input() isActiveView = false;
  @Input() isActiveColor = false;
  @Input() showSearchIcon = false;
  @Output() valueChange = new EventEmitter<any>();
  @Output() searchClick = new EventEmitter<any>();

  onValueChange(newValue: any): void {
    console.log('Giá trị thay đổi:', newValue);
    this.valueChange.emit(newValue);
  }

  onSearchClick(): void {
    console.log("Tìm kiếm với:", this.value);
    this.searchClick.emit(this.value);
  }
}
