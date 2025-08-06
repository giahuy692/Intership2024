import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { DTOSupplier } from '../dtos/DTOSupplier.dto';
import { DTOItemOrder } from '../dtos/DTOItemOrder.dto';
import { DTOSale } from '../dtos/DTOSale.dto';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const saleRestrictions: DTOSale[] = [
      {
        code: 1,
        title: 'Không kinh doanh online',
        isChecked: true,
        listChild: []
      },
      {
        code: 2,
        title: 'Không kinh doanh cửa hàng',
        isChecked: true,
        listChild: [
          { code: 21, title: 'Tất cả', isChecked: false, listChild: [] },
          { code: 22, title: 'CH Hachi Hachi Pasteur', isChecked: false, listChild: [] },
          { code: 23, title: 'CH Hachi Hachi Nguyễn Văn Trỗi', isChecked: false, listChild: [] },
          { code: 24, title: 'CH Hachi Hachi Ba Tháng Hai', isChecked: false, listChild: [] },
          { code: 25, title: 'CH Hachi Hachi Phú Mỹ Hưng', isChecked: true, listChild: [] },
          { code: 26, title: 'CH Hachi Hachi Quang Trung', isChecked: false, listChild: [] },
          { code: 27, title: 'CH Hachi Hachi Đỗ Xuân Hợp', isChecked: true, listChild: [] }
        ]
      }
    ];

    const suppliers: DTOSupplier[] = [
      {
        code: 90044,
        name: 'NCCVN - Lê Mây',
        date: new Date('2021-10-26'),
        state: 'Đang soạn thảo',
        descrip:
          'Mùa Tết năm nay, Hachi Hachi ưu đãi hơn 200 mặt hàng thực phẩm với giá hấp dẫn...',
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
                code: 1,
                code1Dropdown: 1,
                label1Dropdown: 'Thực phẩm',
                code2Dropdown: 2,
                label2Dropdown: 'Thức uống',
                code3Dropdown: 3,
                label3Dropdown: 'Thức uống không ga',
                code4Dropdown: 4,
                label4Dropdown: 'Nước sữa chua',
                code5Dropdown: 5,
                label5Dropdown: 'Nước sữa chua 1',
                code6Dropdown: 0,
                label6Dropdown: '',
                code7Dropdown: 0,
                label7Dropdown: '',

                shipper: 'Giao hàng nhanh',
                unit: 'Cái',
                maker: 'Nhật bản',

                productSize: { size1: 10, size2: 1, size3: 1, weight: 120 },
                productInner: { size1: 5, size2: 2, size3: 1, weight: 100 },
                productCarton: { size1: 12, size2: 6, size3: 3, weight: 150 },
                productPallet: { size1: 100, size2: 80, size3: 60, weight: 500 },
                productPacking: { size1: 3, size2: 3, size3: 3, weight: 90 },

                productSpecificationConversion: {
                  inner: 12,
                  carton: 6,
                  pallet: 3
                },

                expiry: new Date('2026-01-01'),
                expiryWarningDays: 30,
                isManageExpiry: true,
                daysFromManufacture: 0,
                specifications: 'Đầu bi 0.5mm'
              }
            ],
            sale: saleRestrictions
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
