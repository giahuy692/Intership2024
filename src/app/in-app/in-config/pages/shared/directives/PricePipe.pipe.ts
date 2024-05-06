import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceFormat'
})
export class PricePipe implements PipeTransform {

  transform(value: number): string {
    return value.toLocaleString('vi', { style: 'currency', currency: 'VND' });
  }
}
