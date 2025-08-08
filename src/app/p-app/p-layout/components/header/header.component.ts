import { Component, OnInit, OnDestroy, ViewChild, HostListener, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PS_HelperMenuService } from '../../services/p-menu.helper.service';
import { Ps_AuthService, Ps_UtilObjectService, DTOConfig, DTOStaff } from 'src/app/p-lib';
import { ModuleDataItem, MenuDataItem } from '../../dto/menu-data-item.dto';
import { DTOLSCompany } from '../../dto/DTOLSCompany.dto';
import { LayoutAPIService } from '../../services/layout-api.service';
import { UserDropdownData } from '../../p-sitemaps/user.dropdown.data';
import { LayoutService } from '../../services/layout.service';
import { Subject, Subscription } from 'rxjs';
import { EnumLayout } from 'src/app/p-lib/enum/layout.enum';
import { takeUntil } from 'rxjs/operators';
import { ModuleDataAdmin } from '../../p-sitemaps/menu.data-admin';
import { MessagingService } from '../../services/messaging.service';
import { DTOSYSNotification } from '../../dto/DTOSYSNotification';
import { State } from '@progress/kendo-data-query';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  showUser: boolean = false
  justLoadedChangePermissionAPI: boolean = true
  showCompany: boolean = false
  idCompany: number = 0;
  userInfo: DTOStaff = new DTOStaff()
  //object
  currentModule = new ModuleDataItem()
  // currentAPIModule = new DTOSYSModule()
  //list
  // moduleList: Array<ModuleDataItem> = []
  allowModuleList: Array<ModuleDataItem> = []
  // apiModuleList: Array<DTOSYSModule> = []

  companyDropdownList: Array<DTOLSCompany> = [];
  // allowCompanyDropdownList: Array<DTOLSCompany> = [];
  userDropdownList: Array<MenuDataItem> = []

  subscribe = new Subject<void>();
  //element
  @ViewChild('userAnchor') userAnchor;
  @ViewChild('anchorNotification') anchorNotificationViewChild;


  constructor(
    public router: Router,
    public menuService: PS_HelperMenuService,
    public activatedRoute: ActivatedRoute,
    public apiService: LayoutAPIService,
    public auth: Ps_AuthService,
    private messagingService: MessagingService,
    public layoutService: LayoutService,
    private layoutAPIService: LayoutAPIService,
    protected authen: Ps_AuthService,
    private sanitizer: DomSanitizer,) {
    // let that = this;

    // var sst = that.router.events.pipe(
    //   filter(event => event instanceof NavigationEnd),
    //   map(() => this.activatedRoute),
    //   map(route => {
    //     while (route.firstChild) {
    //       route = route.firstChild;
    //     }
    //     return route;
    //   }),
    //   filter(route => {
    //     return route.outlet === 'primary';
    //   }),
    // ).subscribe(route => {
    //   var sst2 = route.data.subscribe(
    //     () => {
    //       var company = route.snapshot.params.idCompany
    //       if (Ps_UtilObjectService.hasValue(company) && company > 0) {
    //         that.idCompany = route.snapshot.params.idCompany;

    //         // if (that.listMenu.length > 0) {
    //         // that.p_CheckActiveMenuParent();
    //         // }
    //       }
    //     }
    //   );
    //   that.subArr.push(sst2)
    // });
    // that.subArr.push(sst)
    menuService.subscribeToNavigationEvents();
  }

  ngOnInit(): void {
    this.userDropdownList = this.onLoadUserDropdown()
    let k = this.authen.getCacheUserInfo().subscribe(user => {
      this.userInfo = user
      this.filterStaffNotification.value = this.userInfo?.staffID;
      this.NotificationState.filter.filters.push(this.filterStaffNotification);
    })
    // this.moduleList = this.menuService.onLoadModule();
    // this.getLocalStorageCompanyList()
    let tempNoti = JSON.parse(localStorage.getItem('ListNotification')) as DTOSYSNotification[];
    this.menuService.getLocalStorageCompanyList();
    let a = this.menuService.idCompany$.subscribe(v => { this.idCompany = v })
    let b = this.menuService.companyDropdownList$.subscribe(v => this.companyDropdownList = v)
    let c = this.menuService.allowModuleList$.subscribe(v => this.allowModuleList = v);
    let d = this.menuService.currentModule$.subscribe(v => { this.currentModule = v });
    let g = this.menuService.changePermissionAPI().subscribe((res) => {
      if (Ps_UtilObjectService.hasValue(res) && this.justLoadedChangePermissionAPI) {
        this.justLoadedChangePermissionAPI = false
        this.messagingService.initializeFirebaseLogic();
        // let h = this.messagingService.currentMessage.subscribe(noti => {
        //   // (kích hoạt lần đầu là subcribe currentMessage, lần 2 trở lên là firebase gửi tính hiệu có thông báo mới)
        //   this.countFirebaseTriggered += 1; // Tăng biến đếm mỗi khi h được kích hoạt 
        //   console.log(`currentMessage triggered ${this.countFirebaseTriggered} times`); // Log số lần h được kích hoạt
        //   //#region firebase

        //   // Lắng nghe firebase gửi thông báo
        //   let tempNoti = JSON.parse(localStorage.getItem('ListNotification'))
        //   if (Ps_UtilObjectService.hasListValue(tempNoti) && this.countFirebaseTriggered == 1) {
        //     // Nếu có cache thì lấy lưu vào ListNotification
        //     this.ListNotification = tempNoti;
        //   }
        //   // Nếu kích hoạt lần 2 hoặc không có cache thì gọi API
        //   // else if (this.countFirebaseTriggered > 1 || !Ps_UtilObjectService.hasListValue(tempNoti)) {
        //   //   this.APIGetListNotification(this.NotificationState)
        //   // }
        //   else if (!Ps_UtilObjectService.hasListValue(tempNoti)) {
        //     this.APIGetListNotification(this.NotificationState)
        //   }
        // })

        // Lắng nghe firebase gửi thông báo
        if (!Ps_UtilObjectService.hasListValue(tempNoti)) {
          this.APIGetListNotification(this.NotificationState)
        }
      }
    });


    if (Ps_UtilObjectService.hasListValue(tempNoti)) {
      // Nếu có cache thì lấy lưu vào ListNotification
      this.ListNotification = tempNoti;
      this.groupNotificationsByDate();
    }

    let h = this.messagingService.currentMessage.subscribe((noti: DTOSYSNotification) => {
      // (kích hoạt lần đầu là subcribe currentMessage, lần 2 trở lên là firebase gửi tính hiệu có thông báo mới)
      this.countFirebaseTriggered += 1; // Tăng biến đếm mỗi khi h được kích hoạt 
      // console.log(`currentMessage triggered ${this.countFirebaseTriggered} times`); // Log số lần h được kích hoạt
      if (Ps_UtilObjectService.hasValue(noti) && this.countFirebaseTriggered > 1) {
        this.ListNotification.unshift(new DTOSYSNotification(noti));
        localStorage.setItem('ListNotification', JSON.stringify(this.ListNotification))
        this.totalAvailableNotifications += 1;
      }
      this.totalNotifications = this.ListNotification.length
      this.unreadNotifications = this.ListNotification.reduce(
        (count, item) => count + (item.Status === 1 ? 1 : 0),
        0
      );
      this.readNotifications = this.ListNotification.reduce(
        (count, item) => count + (item.Status === 2 ? 1 : 0),
        0
      );
      this.groupNotificationsByDate();
    });
  }
  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
    this.menuService.unsubscribe();
  }

  //load client-side data
  // getLocalStorageCompanyList() {
  //   var compList = localStorage.getItem('GetCompany')

  //   if (Ps_UtilObjectService.hasValueString(compList)) {
  //     this.companyDropdownList = JSON.parse(compList)
  //     this.getLocalStorageCompany()
  //   } else {
  //     this.p_GetCompany()
  //   }
  // }
  // getLocalStorageCompany() {
  //   var company = localStorage.getItem('Company');
  //   var companyInt = parseInt(company)

  //   if (Ps_UtilObjectService.hasValueString(company) && typeof (companyInt) === 'number' && companyInt > 0) {
  //     DTOConfig.cache.companyid = company
  //     this.idCompany = companyInt
  //   }
  //   else {
  //     DTOConfig.cache.companyid = this.companyDropdownList[0].Code.toString()
  //     this.idCompany = this.companyDropdownList[0].Code
  //   }
  //   localStorage.setItem('Company', DTOConfig.cache.companyid);
  //   //update url without refreshing
  //   var asd = this.router.url.split('/')
  //   asd.splice(asd.length - 1, 1, DTOConfig.cache.companyid)
  //   window.history.replaceState({ idCompany: this.idCompany }, '', '#' + asd.join('/'))
  //   //
  //   this.getLocalStorageModuleList()
  // }
  // getLocalStorageModuleList() {
  //   var molList = localStorage.getItem('GetModule')

  //   if (Ps_UtilObjectService.hasValueString(molList)) {
  //     this.apiModuleList = JSON.parse(molList)
  //     this.getAllowModule()
  //   } else {
  //     this.p_GetModule()
  //   }
  // }
  // getLocalStorageModule() {
  //   var module = localStorage.getItem('Module');
  //   //Dashboard làm module default
  //   var pur = this.allowModuleList.find(s => s.Code.includes('dashboard'))
  //   this.currentModule = Ps_UtilObjectService.hasValue(pur) ? pur : Ps_UtilObjectService.hasListValue(this.allowModuleList) ? this.allowModuleList[0] : this.currentModule

  //   if (Ps_UtilObjectService.hasValueString(module) && module != undefined) {
  //     var cacheModule = this.allowModuleList.findIndex(s => s.Code.includes(module))

  //     if (cacheModule > -1) {
  //       this.currentModule = this.allowModuleList[cacheModule]
  //     }
  //   }
  //   this.currentAPIModule = this.apiModuleList.find(s => s.ModuleID.includes(this.currentModule.Code))
  //   localStorage.setItem('Module', Ps_UtilObjectService.hasValueString(this.currentModule.Code) ? this.currentModule.Code : '')
  //   localStorage.setItem('ModuleAPI', JSON.stringify(Ps_UtilObjectService.hasValue(this.currentAPIModule) ? this.currentAPIModule : new DTOSYSModule()))
  // }
  // onLoadModule() {
  //   return ModuleDataAdmin;
  // }
  onLoadUserDropdown() {
    return UserDropdownData
  }
  //api
  // p_GetCompany() {
  //   let that = this

  //   let sst = that.apiService.GetCompany().subscribe(res => {
  //     if (res != null) {
  //       that.companyDropdownList = res;
  //       localStorage.setItem('GetCompany', JSON.stringify(that.companyDropdownList))
  //       that.getLocalStorageCompany()
  //     }
  //   });
  //   that.subArr.push(sst)
  // }
  // p_GetModule() {
  //   let that = this

  //   let sst = that.apiService.GetModule()//.pipe()
  //     .subscribe(res => {
  //       if (res != null) {
  //         that.apiModuleList = res;
  //         localStorage.setItem('GetModule', JSON.stringify(that.apiModuleList))
  //         that.getAllowModule()
  //       }
  //     })
  //   that.subArr.push(sst)
  // }
  // getAllowModule() {
  //   this.allowModuleList = [];

  //   orderBy(this.apiModuleList, [{ field: 'OrderBy', dir: 'asc' }]).forEach((a) => {
  //     this.moduleList.forEach((b) => {
  //       if (
  //         Ps_UtilObjectService.hasListValue(a.ListFunctions) ||
  //         Ps_UtilObjectService.hasListValue(a.ListGroup)
  //       )
  //         if (a.ModuleID == b.Code) {
  //           this.allowModuleList.push(b);
  //         }
  //     });
  //   });

  //   this.getLocalStorageModule()
  //   this.menuService.activeModule(this.currentModule)
  // }
  isLogoVisible() {
    return Ps_UtilObjectService.hasValue(this.getCompanyLogoSrc())
  }
  getCompanyLogoSrc() {
    var company = this.companyDropdownList.find(s => s.Code == this.idCompany)
    return company != undefined ? company.URLLogo : ''
  }
  //click event
  onClick(item: ModuleDataItem) {
    this.menuService.selectedModule(item);
  }
  toggleUserPopup() {
    this.showUser = !this.showUser
  }
  toggleCompanyPopup() {
    this.showCompany = !this.showCompany
  }
  openSearchProductPopup() {
    this.layoutService.setSearchProductDialog(true)
  }
  openChangePasswordPopup() {
    this.layoutService.setChangePasswordDialog(true)
  }
  onClickUserDropdown(e: MenuDataItem) {
    switch (e.Link) {
      case "gotoportal":
        // let module = this.allowModuleList.find(s => s.Code === "portal");
        // this.onClick(module);
        window.open(EnumLayout.URLPortal, '_blank');
        break
      case "changepassword":
        this.openChangePasswordPopup()
        break
      case "logout":
        this.auth.logout()
        break
      default:
        break
    }
    this.showUser = false
  }
  onClickCompanyDropdown(e: DTOLSCompany) {
    this.idCompany = e.Code
    DTOConfig.cache.companyid = this.idCompany.toString()
    localStorage.setItem('Company', DTOConfig.cache.companyid);
    localStorage.removeItem('GetModule')
    location.reload()
  }
  //AUTORUN
  isItemActive(item) {
    return Ps_UtilObjectService.hasValue(this.currentModule) && Ps_UtilObjectService.hasValue(item) ? this.currentModule.Code == item.Code : false
  }
  //giấu action list khi user click chỗ khác
  @HostListener('document:click', ['$event'])
  clickout(event) {

    if (!this.userAnchor.nativeElement.contains(event.target)
      && this.showUser == true) {
      this.showUser = false
    }
    if (!this.companyAnchor.nativeElement.contains(event.target)
      && this.showCompany == true) {
      this.showCompany = false
    }
    if (!this.anchorNotificationViewChild.nativeElement.contains(event.target)
      && this.isExpandNotifi == true) {
      this.isExpandNotifi = false
      this.updateNotificationsStatus(); // Gửi thông báo đã thay đổi trước khi tắt popup
    }
  }

  //#region firebase
  NotificationState: State = {
    skip: null,
    take: 15,
    filter: { filters: [], logic: 'and' },
    sort: [],
  };

  filterStatusNotification = {
    field: 'Status',
    operator: 'eq',
    value: 0,
    ignoreCase: true,
  };

  filterStaffNotification = {
    field: 'Staff',
    operator: 'eq',
    value: this.userInfo.staffID,
    ignoreCase: true,
  };


  ListNotification: DTOSYSNotification[] = []
  filter: number = -1; // 'all: -1', 'read: 1', 'unread: 0'
  totalAvailableNotifications: number = 0; // Tổng số thông báo có thể lấy từ API
  totalNotifications: number = 0;
  unreadNotifications: number = 0;
  readNotifications: number = 0;
  notiAnchor: ElementRef<any>
  @ViewChild('companyAnchor') companyAnchor;
  isExpandNotifi: boolean = false
  countFirebaseTriggered: number = 0;
  ArrayUpdateStatus: DTOSYSNotification[] = [];

  /**
   * Set giá trị cho filter
   * @param value status của thông báo
   */
  setFilter(value: number): void {
    let temp = JSON.parse(localStorage.getItem('ListNotification'))
    this.filter = value;
    if (Ps_UtilObjectService.hasValueString(this.ListNotification) && this.filter !== -1) {
      this.ListNotification = temp.filter(v => v.Status == value);
    }
    else {
      this.ListNotification = temp;
    }
    this.groupNotificationsByDate();
  }

  onOpenPopupNotification(anchor: ElementRef) {
    this.isExpandNotifi = !this.isExpandNotifi;
    this.notiAnchor = anchor;
    if (Ps_UtilObjectService.hasValueString(this.ListNotification)) {
      this.updateNotificationCounts()
      this.groupNotificationsByDate();
    }
  }

  markAsRead(notification: DTOSYSNotification) {
    // console.log('markAsRead')
    if (notification.Status === 1) {
      notification.Status = 2; // Đánh dấu đã đọc
      if (!this.ArrayUpdateStatus.some((n) => n.Code === notification.Code)) {
        this.ArrayUpdateStatus.push(notification);
      }
    }
    this.updateNotificationCounts()
    localStorage.setItem('ListNotification', JSON.stringify(this.ListNotification))
    if (this.unreadNotifications == 0 && this.filter == 1) {
      this.setFilter(1);
    }
  }

  // Phương thức để chuyển đổi trạng thái mở rộng của thông báo
  toggleExpand(notification: DTOSYSNotification) {
    notification.isExpanded = !notification.isExpanded;
  }

  // Phương thức cập nhật số lượng thông báo
  updateNotificationCounts() {
    this.totalNotifications = this.ListNotification.length;
    this.unreadNotifications = this.ListNotification.reduce(
      (count, item) => count + (item.Status === 1 ? 1 : 0),
      0
    );
    this.readNotifications = this.ListNotification.reduce(
      (count, item) => count + (item.Status === 2 ? 1 : 0),
      0
    );
  }

  // Hàm tải thông báo
  loadPreviousNotifications() {
    // Ngừng gọi API nếu đang tải hoặc đã tải đủ thông báo
    if (this.isLoading || this.ListNotification.length >= this.totalAvailableNotifications) {
      // console.log("No more notifications to load.");
      return;
    }
    this.updateNotificationsStatus(); // Gửi thông báo đã thay đổi trước khi tải thêm

    this.isLoading = true;

    // Tăng skip và gọi API
    this.NotificationState.take += 15;

    this.APIGetListNotification(this.NotificationState);
  }

  markAllAsRead() {
    // Kiểm tra xem có thông báo nào chưa đọc không
    if (this.ListNotification.some((notification) => notification.Status === 1)) {
      // Clone danh sách thông báo
      let temp = JSON.parse(JSON.stringify(this.ListNotification));

      // Cập nhật trạng thái cho các thông báo chưa đọc
      temp.forEach((notification) => {
        if (notification.Status === 1) {
          notification.Status = 2;

          // Thêm vào danh sách cập nhật nếu chưa có
          if (!this.ArrayUpdateStatus.some((n) => n.Code === notification.Code)) {
            this.ArrayUpdateStatus.push(notification);
          }
        }
      });

      // Cập nhật lại danh sách sau khi thay đổi trạng thái
      this.ListNotification = [...temp];

      // Tính toán lại số lượng thông báo đã đọc và chưa đọc
      this.totalNotifications = this.ListNotification.length;
      this.unreadNotifications = this.ListNotification.reduce(
        (count, item) => count + (item.Status === 1 ? 1 : 0),
        0
      );
      this.readNotifications = this.ListNotification.reduce(
        (count, item) => count + (item.Status === 2 ? 1 : 0),
        0
      );

      localStorage.setItem(
        "ListNotification",
        JSON.stringify(this.ListNotification)
      );

      if (this.filter == 1) {
        this.setFilter(1);
      }

      this.groupNotificationsByDate();
      // Cập nhật lại cache vào localStorage
    }
  }

  handleSafeContent(noti: DTOSYSNotification): SafeHtml {
    var htmlContent = Ps_UtilObjectService.hasValueString(noti.Body) ? noti.Body : noti.Title
    return this.sanitizer.bypassSecurityTrustHtml(htmlContent);
  }

  groupedNotifications: { dateLabel: string; notifications: DTOSYSNotification[] }[] = [];
  groupNotificationsByDate() {
    const grouped = this.ListNotification.reduce((acc, notification) => {
      const sentDate = new Date(notification.SentTime).toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });;

      const label = sentDate === new Date().toLocaleDateString('vi-VN') ? 'Hôm nay' : sentDate;

      if (!acc[label]) {
        acc[label] = [];
      }
      acc[label].push(notification);

      return acc;
    }, {} as { [key: string]: any[] });

    this.groupedNotifications = Object.keys(grouped).map(dateLabel => ({
      dateLabel,
      notifications: grouped[dateLabel]
    }));
    this.isLoading = false;
  }

  getPlainTextLength(noti: DTOSYSNotification): number {
    var html = Ps_UtilObjectService.hasValueString(noti.Body) ? noti.Body : noti.Title
    const div = document.createElement('div');
    div.innerHTML = html; // Chuyển chuỗi HTML thành node DOM

    return div.textContent?.trim().length || 0; // Trả về độ dài của nội dung văn bản
  }

  updateNotificationsStatus() {
    if (this.ArrayUpdateStatus.length > 0) {
      this.isLoading = true;
      this.APIUpdateNotificationStatus(this.ArrayUpdateStatus);
      this.ArrayUpdateStatus = []; // Xóa danh sách sau khi gửi
    }
  }

  /**
   * Lấy danh sách thông báo
   * @param state filter kendo
   */
  isLoading: boolean = true;

  APIGetListNotification(state: State) {
    this.isLoading = true;
    this.layoutAPIService.GetListNotification(state).subscribe(res => {
      this.isLoading = false;
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.ListNotification = res.ObjectReturn.Data
        localStorage.setItem('ListNotification', JSON.stringify(this.ListNotification))
        this.totalAvailableNotifications = res.ObjectReturn.Total
        this.totalNotifications = this.ListNotification.length
        this.unreadNotifications = this.ListNotification.reduce(
          (count, item) => count + (item.Status === 1 ? 1 : 0),
          0
        );
        this.readNotifications = this.ListNotification.reduce(
          (count, item) => count + (item.Status === 2 ? 1 : 0),
          0
        );
        this.groupNotificationsByDate();
      } else {
        // this.layoutService.onWarning(`Đã xảy ra lỗi khi lấy danh sách thông báo: ${res.ErrorString}`);
      }
    }, (e) => {
      this.isLoading = false;
      // this.layoutService.onWarning(`Đã xảy ra lỗi khi lấy danh sách thông báo: ${e}`);
    });
  }

  APIUpdateNotificationStatus(notification: DTOSYSNotification[]) { // Cập nhật trạng thái thông báo
    this.layoutAPIService.UpdateNotificationStatus(notification).subscribe(res => {
      this.isLoading = false;
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
      } else {
        this.isLoading = false;
        this.layoutService.onError(`Đã xảy ra lỗi khi cập nhật thông báo: ${res.ErrorString}`);
      }
    }, (e) => {
      this.isLoading = false;
      this.layoutService.onError(`Đã xảy ra lỗi khi cập nhật thông báo: ${e}`);
    });
  }

  //#endregion
}
