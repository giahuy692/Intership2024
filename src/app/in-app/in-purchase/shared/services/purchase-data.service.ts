import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { DTOSupplier } from '../dtos/DTOSupplier.dto';
import { DTOItemOrder } from '../dtos/DTOItemOrder.dto';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
  const suppliers: DTOSupplier[] = [
    {
      code: 90044,
      name: 'NCCVN - Lê Mây',
      date: new Date('2021-10-26'),
      state: 'Đang soạn thảo',
      descrip: 'Mùa Tết năm nay, Hachi Hachi ưu đãi hơn 200 mặt hàng thực phẩm với giá hấp dẫn để quý khách có thể tự thiết kế GIỎ QUÀ TẾT. Mùa Tết năm nay, Hachi Hachi ưu đãi hơn 200 mặt hàng thực phẩm với giá hấp dẫn để quý khách. Hachi Hachi ưu đãi hơn 200 mặt hàng thực phẩm với giá hấp dẫn để quý khách.',
      itemList: [
        {
          code: 4947316154347,
          barcode: 8934681615531,
          name: '531 Miếng lột mụn nữ Biore Pore Pack 4 miếng',
          nameJapan: 'アスザックフーズ えびわかめスープ',
          codeBill: 100000166,
          nameBill: 'Miếng lột mụn nữ 05',
          classify: 'Đổi nhà cung cấp, đổi tên khai quan',
          info: 'Bút bi xanh',
          img: 'img.jpg',
          origin: [{ name: 'Nhật bản' }],
          property: [{
            g1: [{ name: 'Thực phẩm' }],
            market: 'Nội địa',
            shipper: 'Giao hàng nhanh',
            unit: [{ name: 'Cái' }],
            productSize: { size1: 10, size2: 1, size3: 1 },
            expiry: new Date('2026-01-01'),
            specifications: 'Đầu bi 0.5mm',
            dateUse: new Date('2024-08-01')
          }],
          sale: [{
            businessOnline: { label: 'Không kinh doanh Online', state: true },
            businessStore: {
              all: { label: 'Tất cả', state: true },
              cH1: { label: 'CH Hachi Hachi Pastuer', state: false },
              cH2: { label: 'CH Hachi Hachi Ba Tháng Hai', state: true },
              cH3: { label: 'CH Hachi Hachi Quang Trung', state: false },
              cH4: { label: 'CH Hachi Hachi Nguyễn Văn Trỗi', state: true },
              cH5: { label: 'CH Hachi Hachi Phú Mỹ Hưng', state: true },
              cH6: { label: 'CH Hachi Hachi Đỗ Xuân Hợp', state: false },
            }
          }]
        }
      ]
    }
  ];

  const orders: DTOItemOrder[] = [
    {
      priceBuy: 123000,
      priceRetail: 180000,
      priceReference: 180000,
      reserveQuantity: 15,
      quantitySold: 20,
      revenue: 1600000,
      commercialConditions: [{ name: 'DD' }],
      MinimumQuantity: 10,
      QuantityFirst: 100,
      purchasingUnit: [{ name: 'Inner' }],
      po: 'PO1201',
      Vat: 10,
      coin: [{ name: 'VND' }],
      timeBuyFirst: new Date('2025-08-01'),
      timeEstimatedDelivery: new Date('2025-08-10'),
      descript: 'Đổi nhà cung cấp mới vì nhà cung cấp',
      product: suppliers[0].itemList,
      stateOrder: 'Đang mua'
    }
  ];

  return { suppliers, orders };
}

}
