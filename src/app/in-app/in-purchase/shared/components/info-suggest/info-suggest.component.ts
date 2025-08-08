import { Component } from '@angular/core';
import { DTOSupplier } from '../../dtos/DTOSupplier.dto';
import { PurchaseService } from '../../services/purchase.service';
import { DTOOrder } from '../../dtos/DTOOrder.dto';
import { downloadIcon, SVGIcon } from '@progress/kendo-svg-icons';

@Component({
  selector: 'app-info-suggest',
  templateUrl: './info-suggest.component.html',
  styleUrls: ['./info-suggest.component.scss']
})
export class InfoSuggestComponent {
  public downloadIcon: SVGIcon = downloadIcon;

  mergedRows: any[] = [];

  constructor(private supplierService: PurchaseService, private orderService: PurchaseService) {}

  ngOnInit(): void {
    let suppliers: DTOSupplier[] = [];
    let orders: DTOOrder[] = [];

    this.supplierService.getPurchases().subscribe(supData => {
      suppliers = supData;

      this.orderService.getOrders().subscribe(orderData => {
        orders = orderData;

        this.mergedRows = [];

        for (let supplier of suppliers) {
          for (let product of supplier.dtoProductSupplier) {
            // Tìm đơn hàng chứa product.code
            const matchedOrder = orders.find(order =>
              order.dtoProductSupplier.some(p => p.code === product.code)
            );

            const order = matchedOrder ?? new DTOOrder();

            this.mergedRows.push({
              // Supplier
              supplierName: supplier.name,
              supplierState: supplier.state,

              // ProductSupplier
              productImg: product.img,
              productName: product.name,
              barcode: product.barcode,
              code: product.code,
              priceBuy: product.priceBuy,
              priceRetail: product.priceRetail,
              classify: product.classify,

              // ĐOrder
              descript: order.descript,
              stateOrder: order.stateOrder,
            });
          }
        }

        console.log("Merged Rows:", this.mergedRows);
      });
    });
  }
}


