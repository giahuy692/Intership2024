import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { DTOProduct } from '../../dtos/DTOProduct.dto';
import { downloadIcon, eyeIcon, pencilIcon, plusIcon, searchIcon, trashIcon, uploadIcon } from '@progress/kendo-svg-icons';
/** ProductListComponent
 * - Using with default <app-product-list [products]="hamperCrr.ProductList" [stateHamper]="hamperCrr.State"></app-product-list>
 * - hamperCrr: DTOHamper
 **/ 
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class ProductListComponent implements OnInit, OnChanges {
  @Input() products: DTOProduct[];
  @Input() stateHamper: string; 
  @Output() sendDataOpenDrawer = new EventEmitter(); //send data to open Drawer
  actions: string[];
  productsDisplay: DTOProduct[];
  query: string = '';
  selectedProduct?: string;
  icons = {pencilIcon,eyeIcon,trashIcon,uploadIcon,downloadIcon,plusIcon,searchIcon}
  constructor(private element: ElementRef) {}
  
  @HostListener('document:click', ['$event'])
  onClose(event: any) {
    const btnActions =
      this.element.nativeElement.querySelectorAll('.action-content');
    if (btnActions) {
      let isFlag = false;
      for (let i = 0; i < btnActions.length; i++) {
        if (btnActions[i] === event.target) {
          isFlag = true;
        }
      }
      if (!isFlag) {
        this.selectProduct('');
      }
    }
  }
  ngOnInit(): void {
    this.productsDisplay = this.products;
    this.updateActions();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['stateHamper'] || changes['products']){
      this.updateActions();
    }
  }
  updateActions(){
    if (this.stateHamper == 'Đang soạn thảo') {
      this.actions = ['Chỉnh sửa', 'Xóa'];
    } else if (
      this.stateHamper == 'Gửi duyệt' ||
      this.stateHamper == 'Trả về'
    ) {
      this.actions = ['Chỉnh sửa'];
    } else {
      this.actions = ['Xem chi tiết'];
    }
  }
  search(): void {
    this.productsDisplay = this.query
      ? this.products.filter((product) => this.filterProducts(product))
      : this.products;
  }
  searchOnEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.search();
    }
    if((event.key === 'Backspace' && this.query.length == 1)){
      this.query = ''
      this.search();
    }
  }

  private filterProducts(product: DTOProduct): boolean {
    const lowerQuery = this.query.toLowerCase();
    return (
      product.Name.toLowerCase().includes(lowerQuery) ||
      product.Barcode.toLowerCase().includes(lowerQuery)
    );
  }
  openDrawer(obj: {}) {
    this.selectedProduct = '';
    this.sendDataOpenDrawer.emit(obj);
  }
  selectProduct(barcode: string) {
    if (this.selectedProduct != barcode) {
      this.selectedProduct = barcode;
    } else {
      this.selectedProduct = '';
    }
  }
}
