import { Component, OnInit, OnDestroy } from '@angular/core';
import { StaffApiService } from '../../services/staff-api.service';
import { DTOConfig, Ps_UtilObjectService } from 'src/app/p-lib';
import { DTOEmployeeDetail } from '../../dto/DTOEmployee.dto';
import { Subject, Subscription } from 'rxjs';
import { PS_HelperMenuService } from 'src/app/p-app/p-layout/services/p-menu.helper.service';
import { ModuleDataItem } from 'src/app/p-app/p-layout/dto/menu-data-item.dto';
import { LayoutService } from 'src/app/p-app/p-layout/services/layout.service';
import { PayslipService } from '../../services/payslip.service';
import { DTOCFFile } from 'src/app/p-app/p-layout/dto/DTOCFFolder.dto';
import { Router } from '@angular/router';
import { EnumDialogType } from 'src/app/p-app/p-layout/enum/EnumDialogType';
import { MarNewsProductAPIService } from 'src/app/p-app/p-marketing/shared/services/marnewsproduct-api.service';
import { ModuleDataAdmin } from 'src/app/p-app/p-layout/p-sitemaps/menu.data-admin';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-hr-menu-staff-info',
  templateUrl: './hr-menu-staff-info.component.html',
  styleUrls: ['./hr-menu-staff-info.component.scss']
})
export class HRMenuStaffInfoComponent implements OnInit, OnDestroy {
  employee = new DTOEmployeeDetail();
  //function
  Unsubscribe = new Subject()

  arrUnsubcribe: Subscription[] = [];

  pickFileCallback: Function
  GetFolderCallback: Function

  deleteDialogOpened = false
  dataLoaded = false;
  dialogOpen: boolean = false;
  confirm = EnumDialogType.Confirm
  justLoadedChangePermissionAPI: boolean = true

  constructor(
    private apiServiceStaff: StaffApiService,
    private apiServiceMar: MarNewsProductAPIService,
    private menuService: PS_HelperMenuService,
    private layoutService: LayoutService,
    private StaffService: PayslipService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    let a = this.menuService.changePermissionAPI().pipe(takeUntil(this.Unsubscribe)).subscribe((res) => {
      if (Ps_UtilObjectService.hasValue(res) && this.justLoadedChangePermissionAPI) {
        this.justLoadedChangePermissionAPI = false
        this.pickFileCallback = this.pickFile.bind(this)
        this.GetFolderCallback = this.GetFolderWithFile.bind(this)
        this.menuService.idCompany$.pipe(takeUntil(this.Unsubscribe)).subscribe(v => { this.idCompany = v })

        this.getLocalStorage();
        this.loadEmployeeFrom();
        this.reloadDataFrom();
        this.onGetMenu()
      }
    })

    this.arrUnsubcribe.push(a);
  }

  /**
   * Hàm lấy danh sách menu
   */
  Menu: Array<any> = []
  onGetMenu() {
    this.Menu = ModuleDataAdmin.find(v => v.Code == 'hri').ListMenu.find(v => v.Code == "hriStaff").LstChild.find(v => v.Code == "hr001-staff-list").LstChild
  }

  reloadDataFrom() {
    let a = this.StaffService.reloadSuccess$.pipe(takeUntil(this.Unsubscribe)).subscribe(() => {
      this.dataLoaded = true;
      const res = JSON.parse(localStorage.getItem('Staff'))
      if (res.Code == 0) {
        this.employee = res
      }
      else {
        this.getEmployee();
      }
    });
    this.arrUnsubcribe.push(a);
  }

  openDialog() {
    this.dialogOpen = true
  }

  // Đóng dialog
  closeDialog() {
    this.dialogOpen = false
  }

  loadEmployeeFrom() {
    let a = this.StaffService.getEmployee().pipe(takeUntil(this.Unsubscribe)).subscribe((employee: DTOEmployeeDetail) => {
      this.employee = employee;
    });
    this.arrUnsubcribe.push(a);
  }

  getLocalStorage() {
    const res = JSON.parse(localStorage.getItem('Staff'))
    if (Ps_UtilObjectService.hasValue(res)) {
      this.employee = res
      if (this.employee.Code > 0) {
        this.getEmployee();
      }
    }
  }

  /*EMPLOYEE */
  // get EmployeeInfo
  getEmployee() {
    if (this.employee.Code > 0) {
      let a = this.apiServiceStaff.GetEmployeeInfo(this.employee.Code).pipe(takeUntil(this.Unsubscribe)).subscribe(res => {
        if (Ps_UtilObjectService.hasValue(res) && Ps_UtilObjectService.hasValue(res.ObjectReturn) && res.StatusCode == 0) {
          this.employee = res.ObjectReturn
          if (this.employee.ListOfRoles !== null) {
            this.employee.ListOfRoles = JSON.parse(Array.from(this.employee.ListOfRoles).join(""));
          }
          if (Ps_UtilObjectService.isValidDate2(this.employee.JoinDate)) {
            // this.employee.JoinDate = new Date(this.employee.JoinDate);        
          }
          this.StaffService.activeEmployee(this.employee);
        }
        else {
          this.layoutService.onError(`Đã xảy ra lỗi khi lấy thông tin nhân sự:  ${res.ErrorString}`);
        }
      }, (error) => {
        this.layoutService.onError(`Đã xảy ra lỗi khi lấy thông tin nhân sự: ${error}`);
      })
      this.arrUnsubcribe.push(a);
    }
  }

  changeMenu(linkMenu: string) {
    let a = this.menuService.changeModuleData().pipe(takeUntil(this.Unsubscribe)).subscribe((item: ModuleDataItem) => {
      //staff
      var parent = item.ListMenu.find(f => f.Code.includes('hriStaff')
        || f.Link.includes('hriStaff'))
      //
      if (Ps_UtilObjectService.hasValue(parent) && Ps_UtilObjectService.hasListValue(parent.LstChild)) {
        var detail = parent.LstChild.find(f => f.Code.includes('staff-list')
          || f.Link.includes('staff-list'))

        if (Ps_UtilObjectService.hasValue(detail) && Ps_UtilObjectService.hasListValue(detail.LstChild)) {
          var detail2 = detail.LstChild.find(f => f.Code.includes(linkMenu)
            || f.Link.includes(linkMenu))
        }
        this.menuService.activeMenu(detail2);

      }
    })
    this.arrUnsubcribe.push(a);
  }

  idCompany: number = 0;
  isActiveMenu(link: string): boolean {
    let URL = link + '/' + this.idCompany;
    return this.router.url === URL;
  }

  deleteEmployee(prop: string[], prod = this.employee) {
    prod.ImageThumb = null;
      let b = this.apiServiceStaff.UpdateEmployeeInfo(prod, prop).pipe(takeUntil(this.Unsubscribe)).subscribe(res => {
        if (Ps_UtilObjectService.hasValue(res) && Ps_UtilObjectService.hasValue(res.ObjectReturn) && res.StatusCode == 0) {
          this.employee.ImageThumb = prod.ImageThumb;
          this.closeDialog();
          this.layoutService.onSuccess("Xóa thành công hình ảnh");
        } else
          this.layoutService.onError(`Đã xảy ra lỗi khi xóa hình ảnh: ${res.ErrorString}`);
      }, (e) => {
        this.layoutService.onError(`Đã xảy ra lỗi khi xóa hình ảnh: ${e}`);
      });
      this.arrUnsubcribe.push(b);
  }

  updateEmployee(prop: string[], prod = this.employee) {
    let a = this.apiServiceStaff.UpdateEmployeeInfo(prod, prop).pipe(takeUntil(this.Unsubscribe)).subscribe(res => {
      if (Ps_UtilObjectService.hasValue(res) && Ps_UtilObjectService.hasValue(res.ObjectReturn) && res.StatusCode == 0) {
        this.closeDialog();
        this.layoutService.onSuccess("Cập nhật thành công hình ảnh");
      } else
        this.layoutService.onError(`Đã xảy ra lỗi khi cập nhật hình ảnh: ${res.ErrorString}`);
    }, (e) => {
      this.layoutService.onError(`Đã xảy ra lỗi khi cập nhật hình ảnh: ${e}`);
    });
    this.arrUnsubcribe.push(a);
  }

  //Xóa hình ảnh
  delImage(prop: string) {
    if (Ps_UtilObjectService.hasValueString(prop)) {
      this.deleteEmployee([prop])
      this.deleteDialogOpened = false;
    }
  }

  // validImg(str) {
  //   return Ps_UtilObjectService.hasValueString(Ps_UtilObjectService.removeImgRes(str))
  // }

  pickFile(e: DTOCFFile, width, height) {
    this.employee.ImageThumb = e?.PathFile.replace('~', '')
    this.updateEmployee(['ImageThumb'])
    this.layoutService.setFolderDialog(false)
  }

  GetFolderWithFile(childPath) {
    if (this.layoutService.getFolderDialog())
      return this.apiServiceMar.GetFolderWithFile(childPath, DTOConfig.cache.companyid == '2' ? 18 : 14);
    //14 = folder cocautochuc
    //18 = folder LS_cocautochuc
  }

  onUploadImg() {
    this.layoutService.folderDialogOpened = true
  }

  getImgRes(str: string) {
    return Ps_UtilObjectService.hasValueString(str) ? Ps_UtilObjectService.getImgRes(str) : 'assets/img/icon/icon-nonImageThumb.svg'
  }

  ngOnDestroy(): void {
    this.Unsubscribe?.next();
    this.Unsubscribe?.complete();

    this.arrUnsubcribe.forEach((sub) => {
      if (sub && sub.unsubscribe) {
        sub?.unsubscribe();
      }
    })
  }
}
