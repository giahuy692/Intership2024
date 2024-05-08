import { Component } from '@angular/core';
import { NotifiService } from '../shared/services/notifi.service';

@Component({
  selector: 'app-config005-hamper-detail',
  templateUrl: './config005-hamper-detail.component.html',
  styleUrls: ['./config005-hamper-detail.component.scss'],
})
export class Config005HamperDetailComponent {
  data = [1, 2, 3, 4];
  constructor(private notification: NotifiService) {}

  confirmDelete() {
    this.notification.message('Thêm tành công', 'success');
    this.data.forEach((item) => {
      console.log(item);
    });
  }
}
