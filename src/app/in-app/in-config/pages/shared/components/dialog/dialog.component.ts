import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { DialogDirective } from '../../directives/dialog.directive';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnChanges {
  public opened = true;
  @Input() width: number = 400;
  @Input() title: string = 'Dialog';
  @Input() titleIcon: string = 'k-i-delete';
  @Input() mainContent: string = 'Main Content';
  @Input() cancelButton: string = 'Cancel';
  @Input() confirmButton: string = 'Xoá';
  @Input() buttonIcon: string = 'k-i-delete';
  defaultColor: string = 'white';

  constructor(public directiveDialog: DialogDirective) {}

  @Output() confirmDialog: EventEmitter<any> = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {
    this.checkTypeDialog();
  }

  // chuyển đổi màu sắc , lấy màu sắc từ directive truyền qua
  public checkTypeDialog(): void {
    if (this.directiveDialog) {
      // console.log('directive oke');
      this.defaultColor = this.directiveDialog.backgroundColor;
      // console.log('background:', this.defaultColor);
    } else {
      // console.log('directive not oke');
    }
  }
  public close(): void {
    this.opened = false;
  }
  public confirm(): void {
    this.confirmDialog.emit();
    this.opened = false;
  }

  public open(): void {
    this.opened = true;
  }
}
