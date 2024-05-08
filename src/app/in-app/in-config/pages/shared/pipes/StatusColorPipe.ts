import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusColor'
})

/**
 * StatusColorPipe using for change style color base on text status
 * Using example: 
 * In file ts: Create variable status: string = 'Đang soạn thảo' or something else
 * In file html: <div [style.color]="status | statusColor">{{ status }}</div>
 */
export class StatusColorPipe implements PipeTransform {
  transform(status: string): string {
    switch (status) {
      case 'Đang soạn thảo':
        return '#26282E'; 
      case 'Gửi duyệt':
        return '#31ADFF'; 
      case 'Duyệt áp dụng':
        return '#008000'; 
      case 'Ngưng áp dụng':
        return '#FB311C';
      case 'Trả về':
        return '#B7B92F';
      default:
        return 'black';
    }
  }
}