import { Component } from '@angular/core';

@Component({
  selector: 'app-attribute-product',
  templateUrl: './attribute-product.component.html',
  styleUrls: ['./attribute-product.component.scss']
})
export class AttributeProductComponent {

  areaList = [
    { id: 1, name: 'Tổng hợp' },
    { id: 2, name: 'Nhà bếp' },
    { id: 3, name: 'SP nhà tắm-vệ sinh' },
    { id: 4, name: 'Lau chùi-quét dọn, giặt ủi' },
    { id: 5, name: 'Nội thất' },
    { id: 6, name: 'Ngoài trời, đi lại' },
    { id: 7, name: 'Đồ nghề-dụng cụ' },
    { id: 8, name: 'Dụng cụ VPP' },
    { id: 9, name: 'May mặc-phụ kiện' },
  ];

  selectedArea: number | null = null;

  filteredAreaList = [...this.areaList];

  onFilterChange(value: string): void {
    const keyword = value.toLowerCase();
    this.filteredAreaList = this.areaList.filter(item =>
      item.name.toLowerCase().includes(keyword)
    );
  }

}
