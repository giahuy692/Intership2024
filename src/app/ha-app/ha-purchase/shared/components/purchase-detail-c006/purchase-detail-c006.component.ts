import { Component } from '@angular/core';
import { DTOSale } from '../../dtos/DTOSale.dto';

@Component({
  selector: 'app-purchase-detail-c006',
  templateUrl: './purchase-detail-c006.component.html',
  styleUrls: ['./purchase-detail-c006.component.scss']
})
export class PurchaseDetailC006Component {
  dtoSale: DTOSale = {
    id: 'abc123',
    businessOnline: false,
    businessStore: {
      all: false,
      cH1: false,
      cH2: false,
      cH3: false,
      cH4: false,
      cH5: false,
      cH6: false,
    }
  };

  noBusinessStore = false;

  storeKeys = Object.keys(this.dtoSale.businessStore as { [key: string]: boolean }).filter(key => key !== 'all');


  storeLabels: { [key: string]: string } = {
  cH1: 'CH Hachi Hachi Pasteur',
  cH2: 'CH Hachi Hachi Ba Tháng Hai',
  cH3: 'CH Hachi Hachi Nguyễn Văn Trỗi',
  cH4: 'CH Hachi Hachi Quang Trung',
  cH5: 'CH Hachi Hachi Phú Mỹ Hưng',
  cH6: 'CH Hachi Hachi Đỗ Xuân Hợp'
  };

  toggleAllStores(): void {
  const value = this.dtoSale.businessStore.all;
  const store = this.dtoSale.businessStore as { [key: string]: boolean };

  this.storeKeys.forEach(key => {
      store[key] = value;
  });
}

onStoreItemChange(): void {
  const store = this.dtoSale.businessStore as { [key: string]: boolean };
  const allChecked = this.storeKeys.every(key => store[key] === true);
  this.dtoSale.businessStore.all = allChecked;
}

get businessStoreMap(): { [key: string]: boolean } {
  return this.dtoSale.businessStore as { [key: string]: boolean };
}


}
