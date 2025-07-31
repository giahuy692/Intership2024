import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { DTOSupplier } from '../dtos/DTOSupplier.dto';
import { DTOItemSupplier, DTOOrigin } from '../dtos/DTOItemSupplier.dto';
import { DTOProperty, DTOG1, DTOG2, DTOG3, DTOG4, DTOG5, BaseUnit } from '../dtos/DTOProperty.dto';
import { DTOSale } from '../dtos/DTOSale.dto';
import { DTOCoin, DTOCommercialConditions, DTOItemOrder, DTOPurchasingUnit } from '../dtos/DTOItemOrder.dto';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const suppliers: DTOSupplier[] = [
      new DTOSupplier(
        'SUP001',
        'Công ty TNHH ABC',
        new Date('2024-01-01'),
        'Đang oạn thảo',
        'Mùa Tết năm nay, Hachi Hachi ưu đãi hơn 200 mặt hàng thực phẩm với giá hấp dẫn để quý khách có thể tự thiết kế GIỎ QUÀ TẾT',
        [
          new DTOItemSupplier(
            'ITEM001',
            'Nước tương Nhật',
            [new DTOOrigin('OR001', 'Nhật Bản')],
            '醤油',
            'BILL001',
            'Bill Nước Tương',
            'Gia vị',
            'Loại thượng hạng',
            'img/sauce.png',
            [
              new DTOProperty(
                [new DTOG1('G1A', 'Loại 1')],
                [new DTOG2('G2A', 'Vị đậm')],
                [new DTOG3('G3A', 'Không đường')],
                [new DTOG4('G4A', 'Đóng chai')],
                [new DTOG5('G5A', '500ml')],
                'Nippon Express',
                'Nội địa Nhật',
                [new BaseUnit('U1', 'chai')],
                { size1: 5, size2: 5, size3: 20 },
                { size1: 5, size2: 5, size3: 20 },
                { size1: 10, size2: 10, size3: 30 },
                { size1: 50, size2: 50, size3: 100 },
                { size1: 5, size2: 5, size3: 10 },
                { inner: 12, carton: 24, pallet: 48 },
                new Date('2026-01-01'),
                'Không phẩm màu, dùng được cho người ăn chay',
                new Date('2024-01-10')
              )
            ],
            [
              new DTOSale('S001', true, {
                all: false,
                cH1: true,
                cH2: false,
                cH3: true,
                cH4: false,
                cH5: true,
                cH6: false
              })
            ]
          )
        ]
      )
    ];

    const orders: DTOItemOrder[] = [
        new DTOItemOrder(
            10000, // priceBuy
            15000, // priceRetail
            14000, // priceReference
            200,   // reserveQuantity
            50,    // quantitySold
            750000, // revenue
            [new DTOCommercialConditions('C001', 'Chiết khấu 10%')], // commercialConditions
            10, // MinimumQuantity
            100, // QuantityFirst
            [new DTOPurchasingUnit('PU001', 'Thùng')], // purchasingUnit
            'PO001', // po
            10, // VAT
            [new DTOCoin('VND', 'Việt Nam Đồng')], // coin
            new Date('2024-01-15'), // timeBuyFirst
            new Date('2024-01-20'), // timeEstimatedDelivery
            'Mô tả đơn hàng số 1', // descript
            suppliers[0].itemList
        )
        ];

    return { suppliers, orders };
  }
}
