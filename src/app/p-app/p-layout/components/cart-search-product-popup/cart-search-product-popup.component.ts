import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { State, FilterDescriptor } from '@progress/kendo-data-query';
import { Ps_UtilObjectService } from 'src/app/p-lib';
import { ComboBoxComponent } from '@progress/kendo-angular-dropdowns';
import { DTOProduct } from 'src/app/p-app/p-layout/dto/DTOProduct.dto';
import { LayoutService } from 'src/app/p-app/p-layout/services/layout.service';
import { LayoutAPIService } from 'src/app/p-app/p-layout/services/layout-api.service';
import { EcomService } from '../../../p-ecommerce/shared/services/ecom.service';
import { EcomAppCartAPIService } from '../../../p-ecommerce/shared/services/ecom-appcart-api.service';
import { DTOOrderDetail } from 'src/app/p-app/p-ecommerce/shared/dto/DTOOrderDetail';

@Component({
  selector: 'cart-search-product-popup',
  templateUrl: './cart-search-product-popup.component.html',
  styleUrls: ['./cart-search-product-popup.component.scss']
})
export class CartSearchProductPopupComponent implements OnInit {
  isOpen = false
  loading = false
  @Output() submit = new EventEmitter()
  //product
  productList: DTOProduct[] = []
  currentProduct: DTOProduct = new DTOProduct()
  productWebInCart: DTOProduct = new DTOProduct()
  warehouseStock: DTOOrderDetail = new DTOOrderDetail()
  //kendo
  gridDSState: State
  query: string = ''

  filterBarcode: FilterDescriptor = {
    field: "Barcode", operator: "contains", value: null
  }
  filterProductName: FilterDescriptor = {
    field: "ProductName", operator: "contains", value: null
  }
  //element
  @ViewChild("combobox", { static: true }) combobox: ComboBoxComponent;

  constructor(public layoutService: LayoutService,
    public ecomService: EcomService,
    public ecomCartAPIService: EcomAppCartAPIService,
    public apiService: LayoutAPIService) { }

  ngOnInit(): void {
  }
  //LOAD
  loadFilter() {
    this.gridDSState = JSON.parse(JSON.stringify(this.layoutService.gridDSState))
    this.gridDSState.sort = null
    this.gridDSState.take = 25
    this.gridDSState.filter.logic = 'or'
    this.gridDSState.filter.filters = []

    if (Ps_UtilObjectService.hasValueString(this.filterBarcode.value))
      this.gridDSState.filter.filters.push(this.filterBarcode)

    if (Ps_UtilObjectService.hasValueString(this.filterProductName.value))
      this.gridDSState.filter.filters.push(this.filterProductName)
  }
  getProductList(e) {//keydown.enter
    this.filterBarcode.value = this.query
    this.filterProductName.value = this.query
    this.loadFilter()
    this.p_GetListProduct();
  }
  getProductByCode(e: DTOProduct) {//selection change
    if (Ps_UtilObjectService.hasValue(e)) {
      this.currentProduct = e
      this.p_GetProductByCode()
      this.p_GetStockInWareHouse(9)//tồn Quang Trung
    }
  }
  //API
  p_GetListProduct() {
    this.loading = true
    this.ecomCartAPIService.GetListProduct(this.gridDSState).subscribe(res => {
      if (res != null && res.StatusCode == 0) {
        this.productList = res.ObjectReturn.Data

        if (res.ObjectReturn.Total == 0)
          this.layoutService.onError('Không tìm thấy sản phẩm')
      }
      this.loading = false
    }, () => {
      this.loading = false
    })
  }
  p_GetProductByCode() {
    this.loading = true
    var ctx = 'Lấy thông tin sản phẩm'

    this.ecomCartAPIService.GetProductByBarcode(this.currentProduct.Barcode).subscribe(res => {
      if (res != null && res.StatusCode == 0) {
        var img = this.currentProduct.ImageSetting
        this.currentProduct = res.ObjectReturn
        this.currentProduct.ImageSetting = img
        this.layoutService.onSuccess(`${ctx} thành công`)
      } else
        this.layoutService.onError(`${ctx} thất bại`)

      this.loading = false
    }, (e) => {
      this.loading = false
      this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${e}`)
    })
  }
  p_GetStockInWareHouse(warehouse: number) {
    this.loading = true

    this.apiService.GetStockInWareHouse(this.currentProduct.Barcode, warehouse).subscribe(res => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0 && Ps_UtilObjectService.hasValue(res.ObjectReturn[0])) {
        //nếu chưa có trong list thì add
        if (warehouse == res.ObjectReturn[0].Warehouse) {
          this.warehouseStock = (res.ObjectReturn[0] as DTOOrderDetail)
        }
      }
      this.loading = false
    }, () => {
      this.loading = false
    })
  }

  syncProd(quan: number = this.warehouseStock.Stock) {
    var ctx = 'Đồng bộ tồn'
    this.ecomCartAPIService.Run_ProductQuantity(this.currentProduct, quan).subscribe(res => {
      if (res != null) {
        this.layoutService.onSuccess(`${ctx} thành công`)
      } else
        this.layoutService.onError(`${ctx} thất bại`)

      this.loading = false
    }, (e) => {
      this.loading = false
      this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${e}`)
    })
  }
  //KENDO EVENT
  filterChange(e) {
    this.toggleCombobox(e)
  }
  valueChange(e: DTOProduct) {
    if (Ps_UtilObjectService.hasValue(e)) {
      this.query = e.Barcode
    }
  }
  //parse customValue thành object cho combobox dùng
  valueNormalizer = (text: Observable<string>) =>
    text.pipe(
      map((content: string) => {
        return {
          ProductID: 0,
          Barcode: content,
          ProductName: content,
        } as DTOProduct
      })
    );
  //CLICK EVENT
  toggleCombobox(e) {
    if (!this.combobox.isOpen)
      this.combobox.toggle(true)
  }
  closeDialog() {
    this.layoutService.setCartSearchProductDialog(false)
  }
  addProd() {
    this.submit.emit(this.currentProduct)
  }


  //AUTO RUN
  isDialogOpen() {
    var isopen = this.layoutService.getCartSearchProductDialog()

    // if (isopen)
    //   this.currentProduct = new DTOProduct()

    return isopen
  }
}
