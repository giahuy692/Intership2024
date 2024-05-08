import { Injectable } from '@angular/core';
import { NotificationService } from '@progress/kendo-angular-notification';

@Injectable({
  providedIn: 'root',
})
export class NotifiService {
  constructor(private notificationService: NotificationService) {}

  public message(
    content: string,
    type: 'none' | 'success' | 'warning' | 'error' | 'info'
  ): void {
    this.notificationService.show({
      content: content,
      cssClass: 'button-notification',
      animation: { type: 'slide', duration: 400 },
      position: { horizontal: 'left', vertical: 'bottom' },
      type: { style: type, icon: true },
      hideAfter: 2000,
    });
  }
}
