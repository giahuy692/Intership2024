import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-date-component',
  template: `
    <div class="row example-wrapper">
      <div class="col-12 example-col">
        <kendo-label
          class="k-display-block"
          [for]="datepicker"
          [text]="label"
          [style.padding-top.px]="8"
          [style.padding-bottom.px]="8"
          [style.font-weight]="600"
          [style.color]="'#7a7f8dff'"
        ></kendo-label>
        <kendo-datepicker
          #datepicker
          calendarType="classic"
          [style.width.%]="100"
          [style.padding.px]="1"
          [style.border]="'2px solid #ccc'"
          [animateCalendarNavigation]="true"
          [value]="value"
          (valueChange)="onValueChange($event)"
        >
        </kendo-datepicker>
      </div>
    </div>
  `,
  styles: [`
    kendo-datepicker {
      width: 170px;
    }
  `]
})
export class DateKendoComponent {
  private _value!: Date;

  @Input() label!: string;

  @Input() set value(val: any) {
    this._value = val instanceof Date ? val : new Date(val);
  }

  get value(): Date {
    return this._value;
  }

  @Output() valueChange = new EventEmitter<Date>();

  onValueChange(newValue: Date): void {
    console.log('Ngày thay đổi: ', newValue)
    this._value = newValue;
    this.valueChange.emit(newValue);
  }
}

