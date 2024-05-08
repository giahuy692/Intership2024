import { Component, ViewEncapsulation } from '@angular/core';
import { companyVietHaTri, companyMotThanhVien, company3PS } from './data-test';
import { DTOCompany } from '../shared/dtos/DTOCompany.dto';
import { FormControl, FormGroup } from '@angular/forms';
import { dataMadeHameper } from './dataMadeOfHamper';
import { DataUnitProduct } from './dataUnitProduct';
import { BreadCrumbItem } from '@progress/kendo-angular-navigation';
import { DataButtonStatus } from './dataButtonStatus';
import {
  SVGIcon,
  cartIcon,
  anchorIcon,
  codeIcon,
} from "@progress/kendo-svg-icons";
import { DTOHamper } from '../shared/dtos/DTOHamper.dto';
@Component({
  selector: 'app-config004-hamper-detail',
  templateUrl: './config004-hamper-detail.component.html',
  styleUrls: ['./config004-hamper-detail.component.scss'], 
  encapsulation: ViewEncapsulation.None 
})
export class Config004HamperDetailComponent {
  vietHaCom: Array<DTOCompany> = companyVietHaTri
  motThanhCom: Array<DTOCompany> = companyMotThanhVien
  PSCom: Array<DTOCompany> = companyMotThanhVien

  receivedCPN1: any;
  receivedCPN2: any;
  receivedCPN3: any;

  public svgCart: SVGIcon = cartIcon;
  public svgAnchor: SVGIcon = anchorIcon;
  public svgCode: SVGIcon = codeIcon;

  dataButtonStatus: any = DataButtonStatus
  isOpenDrawer: boolean = false

  itemHamber: DTOHamper

  onButtonClick(): void {
    console.log("click");
  }

  dataMadeHameper: any = dataMadeHameper
  itemBreadCrumb: BreadCrumbItem[] = [
    {
        text: 'QUẢN LÝ SẢN PHẨM'
    },
    {
        text: 'TẠO HAMPER'
    },
    {
        text: 'CHI TIẾT HAMPER'
    }  
  ];

  
  openDrawer():any{
    this.isOpenDrawer = true
  }

  closeDrawer():any{
    this.isOpenDrawer = false
  }

  getValueCompany1($event: any) {
    this.receivedCPN1 = $event;
  }

  getValueCompany2($event: any) {
    this.receivedCPN2 = $event;
  }
  getValueCompany3($event: any) {
    this.receivedCPN3 = $event;
  }

  log(){
    console.log(this.receivedCPN1);
    console.log(this.receivedCPN2);
    console.log(this.receivedCPN3);

    // console.log(this.formHamper);
  }

  formHamper = new FormGroup({
    status: new FormControl,
    barcode: new FormControl,
    nameVietNames: new FormControl,
    nameEnglish: new FormControl,
    nameJapan: new FormControl,
    made: new FormControl,
    materialVietnames: new FormControl,
    materialEnglish: new FormControl,
    materialJapan: new FormControl,
    unit: new FormControl,
    sizeProduct: new FormGroup({
      lenght: new FormControl,
      width: new FormControl,
      height: new FormControl,
      weight: new FormControl
    }),
    sizeInner:  new FormGroup({
      lenght: new FormControl,
      width: new FormControl,
      height: new FormControl,
      weight: new FormControl
    }),
    sizeCartoon:  new FormGroup({
      lenght: new FormControl,
      width: new FormControl,
      height: new FormControl,
      weight: new FormControl
    }),
    sizePallet:  new FormGroup({
      lenght: new FormControl,
      width: new FormControl,
      height: new FormControl,
      weight: new FormControl
    }),
    changeInner: new FormControl,
    changeCarton: new FormControl,
    changePallet: new FormControl
  })
  

}
