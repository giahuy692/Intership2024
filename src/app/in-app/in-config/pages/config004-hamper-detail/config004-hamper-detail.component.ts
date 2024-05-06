import { Component } from '@angular/core';
import { companyVietHaTri, companyMotThanhVien, company3PS } from './data-test';
import { Company } from '../shared/dtos/company';

@Component({
  selector: 'app-config004-hamper-detail',
  templateUrl: './config004-hamper-detail.component.html',
  styleUrls: ['./config004-hamper-detail.component.scss']
})
export class Config004HamperDetailComponent {
  vietHaCom: Array<Company> = companyVietHaTri
  motThanhCom: Array<Company> = companyMotThanhVien
  PSCom: Array<Company> = companyMotThanhVien

  receivedCPN1: any;
  receivedCPN2: any;
  receivedCPN3: any;


  getValueCompany1($event: any) {
    this.receivedCPN1 = $event;
  }

  getValueCompany2($event: any) {
    this.receivedCPN2 = $event;
  }
  getValueCompany3($event: any) {
    this.receivedCPN3 = $event;
  }

  log(){
    console.log(this.receivedCPN1);
    console.log(this.receivedCPN2);
    console.log(this.receivedCPN3);
  }

}
