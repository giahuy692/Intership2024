import { Component, Input } from "@angular/core";
import { SVGIcon } from "@progress/kendo-svg-icons";

@Component({
  selector: "app-button-kendo-component",
  template: `
    <button kendoButton [svgIcon]="icon" [ngClass]="colorClass">
      {{ text }}
    </button>
  `,
  styles: [`
    .k-button {
      margin: 0 3px;
      font-weight: 600;
    }

    .btn-white {
      background-color: #ffffffff;
      color: #008000;
    }

    .btn-green {
      background-color: #008000;
      color: #ffffffff;
    }

    .btn-gray {
      background-color: #fff;
      padding: 6.4px;
      color: #959DB3;
    }
  `]
})
export class ButtonKendoComponent {
  @Input() icon?: SVGIcon;
  @Input() text?: string;
  @Input() color: 'white' | 'green' | 'gray' = 'white';
    
  get colorClass(): string {
    return {
      white: 'btn-white',
      green: 'btn-green',
      gray: 'btn-gray',
    }[this.color] || 'btn-green';
  }
}
