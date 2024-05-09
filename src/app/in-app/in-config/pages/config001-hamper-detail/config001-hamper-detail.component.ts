import { Component, ViewEncapsulation } from '@angular/core';
import { BreadCrumbCollapseMode, BreadCrumbItem } from '@progress/kendo-angular-navigation';
import { DTOHamper } from '../shared/dtos/DTOHamper.dto';
import { HamperService } from '../shared/services/hamper.service';
import { Subscription } from 'rxjs';
import { checkOutlineIcon, minusCircleIcon, plusIcon, redoIcon, SVGIcon, trashIcon, undoIcon } from '@progress/kendo-svg-icons';
import { FormGroup, FormControl } from '@angular/forms';
import { dataMadeHameper } from '../config004-hamper-detail/dataMadeOfHamper';
import { DataUnitProduct } from '../config004-hamper-detail/dataUnitProduct';

class Button {
  svgClassIcon: SVGIcon
  nameButton: string
  typeButton: string
}

class InforHamper {
  originBarcode: string
  origin: string
  nameVN: string
  materialVN: string
  nameENG: string
  materialENG: string
  nameJP: string
  materialJP: string
}

@Component({
  selector: 'app-config001-hamper-detail',
  templateUrl: './config001-hamper-detail.component.html',
  styleUrls: ['./config001-hamper-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class Config001HamperDetailComponent {
  constructor(private hamperService: HamperService) { }
  public hamperCrr: DTOHamper;
  public status: string = "Ngưng áp dụng";
  public defaultItems: BreadCrumbItem[] = [
    {
      text: "Quản lý sản phẩm",
    },
    {
      text: "Tạo hamper",
    },
    {
      text: "Chi tiết hamper",
    }
  ];
  public items: BreadCrumbItem[] = [...this.defaultItems];
  public collapseMode: BreadCrumbCollapseMode = 'none';
  private subscriptions: Subscription[] = [];
  public listButtonAvailable: Button[] = [];
  public buttonXoa: Button = {
    svgClassIcon: trashIcon,
    nameButton: 'Xóa',
    typeButton: 'danger'
  };
  public buttonNgungHienThi: Button = {
    svgClassIcon: minusCircleIcon,
    nameButton: 'Ngưng hiển thị',
    typeButton: 'danger'
  };
  public buttonTraVe: Button = {
    svgClassIcon: undoIcon,
    nameButton: 'Trả về',
    typeButton: 'return'
  };
  public buttonPheDuyet: Button = {
    svgClassIcon: checkOutlineIcon,
    nameButton: 'Phê duyệt',
    typeButton: 'success'
  };
  public buttonGuiDuyet: Button = {
    svgClassIcon: redoIcon,
    nameButton: 'Gửi duyệt',
    typeButton: 'success'
  };
  public buttonThemMoi: Button = {
    svgClassIcon: redoIcon,
    nameButton: 'Thêm mới',
    typeButton: 'success'
  };
  public inforHamper = new FormGroup({
    originBarcode: new FormControl(''),
    origin: new FormControl(''),
    nameVN: new FormControl(''),
    materialVN: new FormControl(''),
    nameENG: new FormControl(''),
    materialENG: new FormControl(''),
    nameJP: new FormControl(''),
    materialJP: new FormControl('')
  })
  public dataOrigin = {dataMadeHameper};  
  public productUnit = {DataUnitProduct};  

  ngOnInit(): void {
    this.subscriptions.push(this.hamperService.hamberSubject$.subscribe(data => {
      this.hamperCrr = data
    }))
    this.setListButtonAvailable(this.status, null);
  }

  ngOnDestroy(): void {
    if (this.subscriptions.length > 0) {
      this.subscriptions.forEach((sb) => sb.unsubscribe());
    }
  }

  public setListButtonAvailable(status: string, statusForOtherFunc: string) {
    if (!(!!statusForOtherFunc)) {
      if (status) {
        if (status === 'Đang soạn thảo') {
          this.listButtonAvailable.push(this.buttonXoa);
          this.listButtonAvailable.push(this.buttonGuiDuyet);
        }
        if (status === 'Gửi duyệt') {
          this.listButtonAvailable.push(this.buttonTraVe);
          this.listButtonAvailable.push(this.buttonPheDuyet);
        }
        if (status === 'Áp dụng' || status === 'Duyệt áp dụng' || status === 'Phê duyệt') {
          this.listButtonAvailable.push(this.buttonNgungHienThi);
        }
        if (status === 'Ngừng áp dụng' || status === 'Ngưng áp dụng' || status === 'Ngưng hiển thị') {
          this.listButtonAvailable.push(this.buttonTraVe);
          this.listButtonAvailable.push(this.buttonPheDuyet);
        }
        if (status === 'Trả về') {
          this.listButtonAvailable.push(this.buttonGuiDuyet);
        }
        this.listButtonAvailable.push(this.buttonThemMoi);
      }
    }
  }
}
