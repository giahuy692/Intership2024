import { Component } from '@angular/core';
import { DTOSale } from '../../dtos/DTOSale.dto';

@Component({
  selector: 'app-sale-restriction',
  templateUrl: './sale-restriction.component.html',
  styleUrls: ['./sale-restriction.component.scss']
})
export class SaleRestrictionComponent {
  dtoSales: DTOSale[] = [
    {
      code: 1,
      title: 'Không kinh doanh online',
      isChecked: false,
      listChild: []
    },
    {
      code: 2,
      title: 'Không kinh doanh cửa hàng',
      isChecked: false,
      listChild: [
        { code: 21, title: 'CH Hachi Hachi Pasteur', isChecked: false, listChild: [] },
        { code: 22, title: 'CH Hachi Hachi Ba Tháng Hai', isChecked: false, listChild: [] },
        { code: 23, title: 'CH Hachi Hachi Nguyễn Văn Trỗi', isChecked: false, listChild: [] },
        { code: 24, title: 'CH Hachi Hachi Quang Trung', isChecked: false, listChild: [] },
        { code: 25, title: 'CH Hachi Hachi Phú Mỹ Hưng', isChecked: false, listChild: [] },
        { code: 26, title: 'CH Hachi Hachi Đỗ Xuân Hợp', isChecked: false, listChild: [] }
      ]
    }
  ];

  // Trả về true nếu tất cả store con đều được check
  isAllStoresChecked(): boolean {
    return this.dtoSales[1].listChild.every(store => store.isChecked);
  }

  // Chọn/bỏ chọn tất cả cửa hàng con khi click "Tất cả"
  toggleAllStores(): void {
    const parent = this.dtoSales[1];
    const newValue = !this.isAllStoresChecked();
    parent.listChild.forEach(store => (store.isChecked = newValue));
  }

}
