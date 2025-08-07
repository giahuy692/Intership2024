import { Component, OnInit } from '@angular/core';
import { PurchaseService } from '../../services/purchase.service';
import { DTOSupplier } from '../../dtos/DTOSupplier.dto';

@Component({
  selector: 'app-info-quote',
  templateUrl: './info-price-request.component.html',
  styleUrls: ['./info-price-request.component.scss']
})

export class InfoPriceRequestComponent implements OnInit {
  supplier!: DTOSupplier;

  constructor(private purchaseService: PurchaseService) {}

  ngOnInit(): void {
    this.purchaseService.getPurchases().subscribe((suppliers) => {
      this.supplier = suppliers[0];
      console.log('Lấy dữ liệu thành công:', this.supplier);
    });
  }
}
