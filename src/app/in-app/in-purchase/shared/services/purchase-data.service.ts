import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { DTOSupplier } from '../dtos/DTOSupplier.dto';
import { DTOProductSupplier } from '../dtos/DTOProductSupplier.dto';
import { DTOOrigin } from '../dtos/DTOOrigin.dto';
import { DTOOrder } from '../dtos/DTOOrder.dto';
import { DTOCommercialConditions } from '../dtos/DTOCommercialConditions.dto';
import { DTOPurchasingUnit } from '../dtos/DTOPurchasingUnit.dto';
import { DTOCoin } from '../dtos/DTOCoin.dto';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {

    // Order mock
    const itemOrder1 = new DTOOrder(1);
    itemOrder1.reserveQuantity = 12;
    itemOrder1.quantitySold = 120;
    itemOrder1.revenue = 100000000;
    itemOrder1.minimumQuantity = 5;
    itemOrder1.quantityFirst = 5;
    itemOrder1.po = 'PO1201';
    itemOrder1.descript = 'Đổi nhà cung cấp mới vì nhà cung cấp';
    itemOrder1.stateOrder = 'Đang mua';
    itemOrder1.timeBuyFirst = {
      dateFirst: new Date('2023-10-026'),
      dateEnd: new Date('2023-11-026')
    };
    itemOrder1.timeEstimatedDelivery = {
      dateFirst: new Date('2023-10-026'),
      dateEnd: new Date('2023-11-026')
    };

    // CommercialConditions mock 
    const cc1 = new DTOCommercialConditions(1);
    cc1.name = 'DD';

    // Khóa ngoại của DTOCommercialConditions tham chiếu tới DTOOrder
    cc1.dtoOrderCode = itemOrder1.code;
    cc1.dtoOrder = itemOrder1;

    // DTOPurchasingUnit mock
    const purchasingUnit1 = new DTOPurchasingUnit(1);
    purchasingUnit1.name = 'Inner';

    // Khóa ngoại của DTOPurchasingUnit tham chiếu tới DTOOrder
    purchasingUnit1.dtoOrderCode = itemOrder1.code;
    purchasingUnit1.dtoOrder = itemOrder1;

    // Product mock
    const product1 = new DTOProductSupplier(4947316154347);
    product1.barcode = 8934681615531;
    product1.name = "531 Miếng lột mụn nữ Biore Pore Pack 4 miếng";
    product1.nameJapan = 'アスザックフーズ えびわかめスープ';
    product1.codeBill = 10000116;
    product1.nameBill = 'Miếng lột mụn nữ 05';
    product1.classify = 'Đổi nhà cung cấp, đổi tên khai quan'
    product1.img = 'product.png'
    product1.priceBuy = 123000;
    product1.priceRetail = 180000;
    product1.priceReference = 180000;

    // Origin mock
    const origin1 = new DTOOrigin(1);
    origin1.name = "Nhật Bản";

    // Khóa ngoại của DTOOrigin tham chiếu tới DTOProductSupplier
    origin1.dtoProductSupplierCode = product1.code;
    origin1.dtoProductSupplier = product1;

    // DTOCoin mock
    const coin1 = new DTOCoin(1);
    coin1.name = 'VND';

    // Khóa ngoại của DTOCoin tham chiếu tới DTOOrder
    coin1.dtoOrderCode = itemOrder1.code;
    coin1.dtoOrder = itemOrder1;

    // Khóa ngoại của DTOCoin tham chiếu tới DTOProductSupplier
    coin1.dtoProductSupplierCode = product1.code;
    coin1.dtoProductSupplier = product1;

    // 
    product1.dtoOrigin = [origin1];
    product1.dtoCoin = [coin1]
    itemOrder1.dtoCommercialConditions = [cc1];
    itemOrder1.dtoPurchasingUnit = [purchasingUnit1];
    itemOrder1.dtoCoin = [coin1]
    itemOrder1.dtoProductSupplier = [product1];

    // Supplier mock
    const supplier1 = new DTOSupplier(90044);
    supplier1.name = "NCCVN - Lê Mây";
    supplier1.date = new Date('2021-10-26');
    supplier1.state = "Đang soạn thảo";
    supplier1.descrip = "Mùa Tết năm nay, Hachi Hachi ưu đãi hơn 200 mặt hàng thực phẩm với giá hấp dẫn để quý khách có thể tự thiết kế GIỎ QUÀ TẾT. Mùa Tết năm nay, Hachi Hachi ưu đãi hơn 200 mặt hàng thực phẩm với giá hấp dẫn để quý khách. Hachi Hachi ưu đãi hơn 200 mặt hàng thực phẩm với giá hấp dẫn để quý khách.";
    supplier1.dtoProductSupplier = [product1];

    // Khóa ngoại của DTOProductSupplier tham chiếu DTOSupplier
    product1.dtoSupplierCode = supplier1.code;
    product1.dtoSupplier = supplier1;

    // Khóa ngoại của DTOProductSupplier tham chiếu DTOOrder
    product1.dtoOrderCode = itemOrder1.code;
    product1.dtoOrder = itemOrder1;

    //
    const suppliers = [supplier1];
    const orders = [itemOrder1];

    return {
      suppliers,
      orders
    };


  }
}
