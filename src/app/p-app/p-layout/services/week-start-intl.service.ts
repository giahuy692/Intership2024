// custom-intl.service.ts
import { Injectable } from '@angular/core';
import { CldrIntlService } from '@progress/kendo-angular-intl';

@Injectable()
export class CustomIntlService extends CldrIntlService {
  // Thay đổi ngày đầu tuần ở đây (0: Chủ Nhật, 1: Thứ Hai, ...)
  public firstDay(value: any): number {
    return 1; // Thứ Hai
  }
}
