import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const suppliers = [
      {
        code: 90044,
        name: 'NCCVN - Lê Mây',
        date: '2021-10-26T00:00:00',
        state: 'Đang soạn thảo',
        descrip:
          'Mùa Tết năm nay, Hachi Hachi ưu đãi hơn 200 mặt hàng thực phẩm với giá hấp dẫn để quý khách có thể tự thiết kế GIỎ QUÀ TẾT. Mùa Tết năm nay, Hachi Hachi ưu đãi hơn 200 mặt hàng thực phẩm với giá hấp dẫn để quý khách. Hachi Hachi ưu đãi hơn 200 mặt hàng thực phẩm với giá hấp dẫn để quý khách.',
        dtoProductSupplier: [
          {
            code: 4947316154347,
            barcode: 8934681615531,
            name: '531 Miếng lột mụn nữ Biore Pore Pack 4 miếng',
            nameJapan: 'アスザックフーズ えびわかめスープ',
            codeBill: 10000116,
            nameBill: 'Miếng lột mụn nữ 05',
            classify: 'Đổi nhà cung cấp, đổi tên khai quan',
            img: 'product.png',
            priceBuy: 123000,
            priceRetail: 180000,
            priceReference: 180000,
            dtoSupplierCode: 90044,
            dtoOrderCode: 101,
            dtoOrigin: [
              {
                code: 1,
                name: 'Nhật Bản',
                dtoProductSupplierCode: 4947316154347,
              },
            ],
            dtoCoin: [
              {
                code: 1,
                name: 'VND',
                dtoOrderCode: 101,
                dtoProductSupplierCode: 4947316154347,
              },
            ],
          },
        ],
      },
    ];

    const orders = [
      {
        code: 101,
        priceVat: 10,
        reserveQuantity: 12,
        quantitySold: 120,
        revenue: 100000000,
        minimumQuantity: 5,
        quantityFirst: 5,
        po: 'PO1201',
        vat: 10,
        timeBuyFirst: {
          dateFirst: '2023-10-26T00:00:00',
          dateEnd: '2023-11-26T00:00:00',
        },
        timeEstimatedDelivery: {
          dateFirst: '2023-10-26T00:00:00',
          dateEnd: '2023-11-26T00:00:00',
        },
        descript: 'Đổi nhà cung cấp mới vì nhà cung cấp',
        stateOrder: 'Đang mua',
        dtoCommercialConditions: [
          {
            code: 1,
            name: 'Thanh toán trước 50%',
            dtoOrderCode: 101,
          },
        ],
        dtoPurchasingUnit: [
          {
            code: 1,
            name: 'Hộp',
            dtoOrderCode: 101,
          },
        ],
        dtoCoin: [
          {
            code: 1,
            name: 'VND',
            dtoOrderCode: 101,
            dtoProductSupplierCode: 4947316154347,
          },
        ],
        dtoProductSupplier: [
          {
            code: 4947316154347,
            barcode: 8934681615531,
            name: '531 Miếng lột mụn nữ Biore Pore Pack 4 miếng',
            nameJapan: 'アスザックフーズ えびわかめスープ',
            codeBill: 10000116,
            nameBill: 'Miếng lột mụn nữ 05',
            classify: 'Đổi nhà cung cấp, đổi tên khai quan',
            img: 'product.png',
            priceBuy: 123000,
            priceRetail: 180000,
            priceReference: 180000,
            dtoSupplierCode: 90044,
            dtoOrderCode: 101,
            dtoOrigin: [
              {
                code: 1,
                name: 'Nhật Bản',
                dtoProductSupplierCode: 4947316154347,
              },
            ],
            dtoCoin: [
              {
                code: 1,
                name: 'VND',
                dtoOrderCode: 101,
                dtoProductSupplierCode: 4947316154347,
              },
            ],
          },
        ],
      },
    ];

    return { suppliers, orders };
  }
}
