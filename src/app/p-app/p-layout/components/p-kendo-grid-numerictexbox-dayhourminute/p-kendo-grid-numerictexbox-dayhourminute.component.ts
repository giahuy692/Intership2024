import { Component, Input, Output, Optional, EventEmitter } from '@angular/core';
import { BaseFilterCellComponent, FilterService } from '@progress/kendo-angular-grid';
import { Ps_UtilObjectService } from 'src/app/p-lib';

@Component({
  selector: 'p-kendo-grid-numerictexbox-dayhourminute',
  templateUrl: './p-kendo-grid-numerictexbox-dayhourminute.component.html',
  styleUrls: ['./p-kendo-grid-numerictexbox-dayhourminute.component.scss']
})

export class PKendoGridNumericTextboxDayHourMinuteComponent extends BaseFilterCellComponent {
  @Input() day: number = null
  @Input() hour: number = null
  @Input() minute: number = null

  @Output() dayChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() hourChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() minuteChange: EventEmitter<number> = new EventEmitter<number>();

  arrOperator: any[] = [
    {
      text: 'Nhỏ hơn hoặc bằng',
      value: -1,
      operator: 'lte'
    },
    {
      text: 'Bằng',
      value: 0,
      operator: 'eq'
    },
    {
      text: 'Lớn hơn hoặc bằng',
      value: 1,
      operator: 'gte'
    },
  ]

  @Input() curOperator: any = this.arrOperator[0]
  @Output() curOperatorChange: EventEmitter<any> = new EventEmitter<any>();
  //
  @Input() public filter: any;
  @Input() public valueField: string;
  @Input() onFilterChangeCallback: Function
  @Input() public filterService: FilterService;

  constructor(@Optional() filterService: FilterService) {
    super(filterService);
  }

  public onChange(value: any, prop: string): void {
    this[prop] = value
    this[prop + 'Change'].emit(this[prop])

    if (this.day > 0 || this.hour > 0 || this.minute > 0) {
      this.filterService.filter({
        filters: [
          {
            field: this.valueField,
            operator: this.curOperator.operator,
            value: (this.day ?? 0) * 24 * 60
              + (this.hour ?? 0) * 60 + (this.minute ?? 0)
          }
        ],
        logic: "and",
      });
    }
  }
}