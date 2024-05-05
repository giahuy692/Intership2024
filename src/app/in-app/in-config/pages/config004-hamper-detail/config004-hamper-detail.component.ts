import { Component } from '@angular/core';
import { companyData } from './data-test';
import { Company } from '../shared/dtos/company';

@Component({
  selector: 'app-config004-hamper-detail',
  templateUrl: './config004-hamper-detail.component.html',
  styleUrls: ['./config004-hamper-detail.component.scss']
})
export class Config004HamperDetailComponent {
  // companyData: Array<Company> = company

  handleItemCompanySelected(selectedItems: any[]) {
    // Xử lý dữ liệu được gửi từ ItemCompanyComponent
    console.log(selectedItems);
  }
}
