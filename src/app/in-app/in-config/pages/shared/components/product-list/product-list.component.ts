import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { DTOProduct } from '../../dtos/DTOProduct.dto';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductListComponent implements OnInit {
  @Input() products: DTOProduct[];
  productsDisplay: DTOProduct[];
  query: string = '';
  ngOnInit(): void {
    this.productsDisplay = this.products;
  }
  search(): void {
    this.productsDisplay = this.query
      ? this.products.filter((product) => this.filterProducts(product))
      : this.products;
  }

  private filterProducts(product: DTOProduct): boolean {
    const lowerQuery = this.query.toLowerCase();
    return (
      product.Name.toLowerCase().includes(lowerQuery) ||
      product.Barcode.toLowerCase().includes(lowerQuery)
    );
  }
}
