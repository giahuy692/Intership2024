import { Component, OnInit } from '@angular/core';
import { BreadCrumbItem } from '@progress/kendo-angular-navigation';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb-kendo-component',
  template: ` 
    <kendo-breadcrumb 
      [items]="items"
      class="custom-breadcrumb"
      [style.background-color]="'transparent'"
      (itemClick)="onItemClick($event)">>
    </kendo-breadcrumb>
  `,
  styles: [`
    ::ng-deep .k-breadcrumb-root-link {
      color: #1A6634;
      font-weight: bold;
    }

    ::ng-deep .custom-breadcrumb .k-breadcrumb-link {
      color: #1A6634;
      font-weight: bold;
    }

    ::ng-deep .custom-breadcrumb .k-breadcrumb-item:last-child .k-breadcrumb-link {
      color: #959DB3;
      font-weight: bold;
    }
  `]
})
export class BreadcrumbKendoComponent implements OnInit {
  public items: BreadCrumbItem[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const url = this.router.url;
      this.updateBreadcrumb(url);
    });

    this.updateBreadcrumb(this.router.url);
  }

  updateBreadcrumb(url: string): void {
    const items: BreadCrumbItem[] = [
      { text: 'MUA HÀNG' },
      { text: 'ĐỀ NGHỊ BÁO GIÁ' },
      { text: 'CHI TIẾT BÁO GIÁ' }
    ];

    if (url.includes('product-price-request-detail')) {
      items.push({ text: 'CHI TIẾT SẢN PHẨM BÁO GIÁ' });
    }

    this.items = items;
  }

  onItemClick(item: BreadCrumbItem): void {
  switch (item.text) {
    case 'MUA HÀNG':
      this.router.navigate(['']);
      break;

    case 'ĐỀ NGHỊ BÁO GIÁ':
      this.router.navigate(['']);
      break;

    case 'CHI TIẾT BÁO GIÁ':
      this.router.navigate(['/purchase']);
      break;

    case 'CHI TIẾT SẢN PHẨM BÁO GIÁ':
      this.router.navigate(['/purchase/pur001-product-price-request-detail']);
      break;

    default:
      break;
  }
}

}
