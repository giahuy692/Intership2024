import { ChangeDetectorRef, Component, ElementRef, HostListener, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DTOEmployeeSalary, DTOPayroll } from '../../dto/DTOPayroll.dto';
import { Subject, Subscription } from 'rxjs';
import { PS_HelperMenuService } from 'src/app/p-app/p-layout/services/p-menu.helper.service';
import { LayoutService } from 'src/app/p-app/p-layout/services/layout.service';
import { HriSalaryApiService } from '../../services/hri-salary-api.service';
import { Ps_AuthService, Ps_UtilObjectService } from 'src/app/p-lib';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ModuleDataItem } from 'src/app/p-app/p-layout/dto/menu-data-item.dto';
import { StaffApiService } from '../../services/staff-api.service';
import { DTOEmployee, DTOEmployeeDetail } from '../../dto/DTOEmployee.dto';
import { DTOElementSalary, DTOElementSalaryDetail } from '../../dto/DTOPayCheck.dto';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { envelopIcon, eyeIcon, lockIcon, userIcon } from '@progress/kendo-svg-icons';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/p-lib/services/local-storage.service';



@Component({
  selector: 'app-hr-paycheck-detail',
  templateUrl: './hr-paycheck-detail.component.html',
  styleUrls: ['./hr-paycheck-detail.component.scss']
})
export class HrPaycheckDetailComponent implements OnInit, OnDestroy{

  @ViewChild('GridLayout', { static: true }) GridLayout: ElementRef;
  //DIALOG
  dialogOpen: boolean = false;
  //form dialog
  loginForm: UntypedFormGroup;
  public icons = {
    envelopIcon: envelopIcon,
    lockIcon: lockIcon,
    eyeIcon: eyeIcon,
    user: userIcon,
  };


  widthSlider: number = 0
  justLoadedChangePermissionAPI:boolean = true
  loading = false;
  isOpentDrawer: boolean = false
  isMobile: boolean = false
  isFirstMobile: boolean = true
  isMinWWidth: boolean = false
  isMinWWidth2: boolean = false
  isMinWWidth3: boolean = false
  isFirstCall: boolean = false
  hasBank:boolean = false
  hasListWDDetail: boolean = false
  hasListWDOTDetail: boolean = false
  hasListAllowanceDetail: boolean = false
  hasListPlusExceptionDetail: boolean = false
  explanListWDDetail: boolean = false
  explanListWDOTDetail: boolean = false
  explanListAllowanceDetail: boolean = false
  explanListPlusExceptionDetail: boolean = false


  NocationTroCap: string = ''
  NocationPhuCap: string = ''

  // heightItem1: number = 0
  // heightItem1: number = 0
  // heightItem1: number = 0

  moduleName: string = ''; // lưu module đang dùng comp
  // filter kỳ lương ở portal
  ListPayroll: DTOPayroll[] = [];
  ListPayrollHasEmployee: DTOPayroll[] = [];
  ListPayrollFilter: DTOPayroll[] = [];
  ListDayOff: DTOElementSalaryDetail[] = []
  ListYearOff: DTOElementSalaryDetail[] = []

  SelectedPeriod = new DTOPayroll()
  StaffInfor: any
  Employees = new DTOEmployeeDetail()
  Paycheck = new DTOEmployeeSalary();
  ElementSalary:DTOElementSalaryDetail = new DTOElementSalaryDetail()
  SalaryInfo = new DTOElementSalary()

  //  Subscription
  Unsubscribe = new Subject<void>();
  


  

  //Thaydoikichthucmanhinh
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkScreenWidth();
  }

  constructor(
    private cdr: ChangeDetectorRef,
    public menuService: PS_HelperMenuService,
    public apiService: HriSalaryApiService,
    private layoutService: LayoutService,
    private apiServiceStaff: StaffApiService,
    private localStorageService: Ps_AuthService,
    protected authen: Ps_AuthService,
    private route: ActivatedRoute,
    protected router: Router,
    private formBuilder: UntypedFormBuilder,
    public localStorage: LocalStorageService
   
  ){
    this.checkScreenWidth()
  }

    
 
  ngOnInit(): void {
    this.menuService.changePermissionAPI().pipe(takeUntil(this.Unsubscribe)).subscribe((res) => {
			if (Ps_UtilObjectService.hasValue(res) && this.justLoadedChangePermissionAPI) {
        this.justLoadedChangePermissionAPI = false
        this.onGetLocalStorage();
        this.onSubcribeUserLocal()
			}
		})

    var module = localStorage.getItem('Module');
    if(module == 'portal'){
      this.onInitForm()
      setInterval(() => {
       this.checkAccess();
      }, 1000);
    }

  }
  

  
  ngAfterViewInit(): void {
    this.menuService.breadcrumbDataChanged.pipe(takeUntil(this.Unsubscribe)).subscribe(() => { // Lăng nghe sự kiện của loadData để get api
      if (this.moduleName == 'hri') {
        // this.APIGetListExamQuestion(this.ExamQuestion);
      } else if (this.moduleName == 'portal') { // Nếu như đang ở module portal 
      }
    });
    
    this.cdr.detectChanges();
    
  }

  ngDoCheck(): void{
  }
  

  checkScreenWidth() {
    this.isMobile = window.innerWidth <= 500; 
    
    this.isMinWWidth = window.innerWidth <= 360;
  }

  onGetLocalStorage() {
    this.moduleName = localStorage.getItem('Module');
    if(this.moduleName === 'hri'){
      const res = sessionStorage.getItem('Paycheck');
      if(Ps_UtilObjectService.hasValue(res)){
        this.Paycheck = JSON.parse(res)
        this.APIGetEmployee(this.Paycheck.Employee)
        this.APIGetPaycheck(this.Paycheck)
      }
    } else{
        this.localStorageService.getCacheUserInfo().pipe(takeUntil(this.Unsubscribe)).subscribe(res =>{
          if(Ps_UtilObjectService.hasValue(res)){
            this.StaffInfor = res
            this.checkAccess();
            if(this.hasHiddenPaycheck == false){
              this.layoutService.menuPortalReloadSuccess();
              this.APIGetEmployee(this.StaffInfor.staffID)
              this.APIGetListPeriodPortal()
            }
          }
        })
    }
  }

  APIGetListPeriodPortal(){
    this.loading = true;
    this.ListPayrollFilter = []
    this.apiService.GetListPeriodPortal().pipe(takeUntil(this.Unsubscribe)).subscribe((res: any) => {
      if ( Ps_UtilObjectService.hasValue(res) && Ps_UtilObjectService.hasValue(res.ObjectReturn) && res.StatusCode == 0 ) {
        this.ListPayrollFilter = res.ObjectReturn;
        this.ListPayrollHasEmployee = this.ListPayrollFilter
        // this.ListPayroll.forEach(Item =>{
        //   if(Ps_UtilObjectService.hasListValue(Item.ListEmployee)){
        //     Item.ListEmployee.forEach(Staff =>{
        //       if(Staff == this.StaffInfor.staffID){
        //         this.ListPayrollHasEmployee.push(Item)
        //       }
        //     })
        //   }
        // })
        this.ListPayrollFilter = this.ListPayrollHasEmployee
        if(Ps_UtilObjectService.hasListValue(this.ListPayrollHasEmployee)){
          this.findClosestToDate()
        }
      } else{
        this.layoutService.onError(`Đã xảy ra lỗi khi lấy danh sách khung năng lực: ${res.ErrorString}` );

      }
      this.loading = false;
    },(error) => {
      this.loading = false;
      this.layoutService.onError( `Đã xảy ra lỗi khi lấy danh sách khung năng lực: ${error}` );
    });
  }

  APIGetEmployee(Code: number) {
    this.apiServiceStaff.GetEmployeeInfo(Code).pipe(takeUntil(this.Unsubscribe)).subscribe(res => {
      if (Ps_UtilObjectService.hasValue(res) && Ps_UtilObjectService.hasValue(res.ObjectReturn) && res.StatusCode == 0) {
        this.Employees = res.ObjectReturn
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi lấy thông tin nhân sự:  ${res.ErrorString}`);
      }
    }, (error) => {
      this.layoutService.onError(`Đã xảy ra lỗi khi lấy thông tin nhân sự: ${error}`);
    })
  }

  APIGetPaycheck(item: DTOEmployeeSalary) {
    this.apiService.GetPaycheck(item).pipe(takeUntil(this.Unsubscribe)).subscribe(res => {
      if (Ps_UtilObjectService.hasValue(res) && Ps_UtilObjectService.hasValue(res.ObjectReturn) && res.StatusCode == 0) {
        this.SalaryInfo = res.ObjectReturn
        if(Ps_UtilObjectService.hasValue(this.SalaryInfo.BankNumber) || Ps_UtilObjectService.hasValue(this.SalaryInfo.BankName)){
          this.hasBank = true
        } else{
          this.hasBank = false
        }
        this.checkHasList()
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi lấy thông tin phiếu lương:  ${res.ErrorString}`);
        this.checkHasList()
      }
    }, (error) => {
      this.layoutService.onError(`Đã xảy ra lỗi khi lấy thông tin phiếu lương: ${error}`);
    })
  }

  checkHasList(){
    this.ListDayOff = []
    this.ListYearOff = []
    if(Ps_UtilObjectService.hasListValue(this.SalaryInfo.ListAllowanceDetail)){
      this.hasListAllowanceDetail = true
      this.NocationTroCap = this.concatenateNotation(this.SalaryInfo.ListAllowanceDetail)
    } else{
      
    }
    if(Ps_UtilObjectService.hasListValue(this.SalaryInfo.ListPlusExceptionDetail)){
      this.hasListPlusExceptionDetail = true
      this.NocationPhuCap = this.concatenateNotation(this.SalaryInfo.ListPlusExceptionDetail)
    } 
    if(Ps_UtilObjectService.hasListValue(this.SalaryInfo.ListWDDetail)){
      this.hasListWDDetail = true
      this.SalaryInfo.ListWDDetail.forEach(item =>{
        if(item.TypeOfElement ==1){
          this.ListDayOff.push(item)
        }
        if(item.TypeOfElement == 5){
          this.ListYearOff.push(item)
        }
      })
    } else{
      const newSalaryElementsDayOff: string[] = [
        "Số ngày nghỉ trong tháng",
        "Số ngày nghỉ trừ lương",
      ];
      const newSalaryElementsYearOff: string[] = [
        "Ngày phép còn lại đến tháng này",
        "Phép còn lại trong năm"
      ];
      const list = []


      newSalaryElementsDayOff.forEach((element) => {
        this.ListDayOff.push({
          Code: 0,
          SalaryElement: element,
          Notation:  "",
          Workday: 0,
          Rate: 0,
          WorkHour: 0,
          WDAmount: 0,
          TypeOfElement: 0          
        });
      });
      newSalaryElementsYearOff.forEach((element) => {
        this.ListYearOff.push({
          Code: 0,
          SalaryElement: element,
          Notation:  "",
          Workday: 0,
          Rate: 0,
          WorkHour: 0,
          WDAmount: 0,
          TypeOfElement: 0          
        });
      });
    }
    if(Ps_UtilObjectService.hasListValue(this.SalaryInfo.ListWDOTDetail)){
      this.hasListWDOTDetail = true
    } else{
      const newSalaryElementsDayOff: string[] = [
        "Ngày thường- 6h~trước 22h",
        "Ngày thường- 22h~trước 6h",
        "Ngày nghỉ- 6h~trước 22h",
        "Ngày nghỉ- 22h~trước 6h",
        "Lễ, Tết- 6h~trước 22h",
        "Lễ, Tết- 22h~trước 6h",
      ];
      const list = []

      newSalaryElementsDayOff.forEach((element) => {
        list.push({
          Code: 0,
          SalaryElement: element,
          Notation:  "",
          Workday: 0,
          Rate: 0,
          WorkHour: 0,
          WDAmount: 0,
          TypeOfElement: 0          
        });
      });
      this.SalaryInfo.ListWDOTDetail = list
    }
  }
  concatenateNotation(ListDetail: DTOElementSalaryDetail[]): string {
    const notations = ListDetail.map(item => item.Notation);
    return `${notations.join('+')}`;
  }

  APIGetPaycheckPortal(Period: number) {
    this.apiService.GetPaycheckPortal(Period).pipe(takeUntil(this.Unsubscribe)).subscribe(res => {
      if (Ps_UtilObjectService.hasValue(res) && Ps_UtilObjectService.hasValue(res.ObjectReturn) && res.StatusCode == 0) {
        this.SalaryInfo = res.ObjectReturn
        if(Ps_UtilObjectService.hasValue(this.SalaryInfo.BankNumber) || Ps_UtilObjectService.hasValue(this.SalaryInfo.BankName)){
          this.hasBank = true
        } else{
          this.hasBank = false
        }
        this.checkHasList()
      }
      else {
        this.SalaryInfo = new DTOElementSalary()
        this.layoutService.onError(`Đã xảy ra lỗi khi lấy thông tin phiếu lương ký ${this.SelectedPeriod.Period}:  ${res.ErrorString}`);
      }
    }, (error) => {
      this.layoutService.onError(`Đã xảy ra lỗi khi lấy thông tin phiếu lương: ${error}`);
    })
  }

  // tìm kỳ lương gần nhất
  findClosestToDate(){
    const currentDate = new Date();
    
    const closestDate = this.ListPayrollHasEmployee.reduce((closest, current) => {
      const currentDateDiff = Math.abs(currentDate.getTime() - new Date(current.FromDate).getTime());
      const closestDateDiff = Math.abs(currentDate.getTime() - new Date(closest.FromDate).getTime());

      return currentDateDiff < closestDateDiff ? current : closest;
    });
    this.SelectedPeriod = closestDate
    if(this.moduleName == 'portal'){
      this.APIGetPaycheckPortal(this.SelectedPeriod.Code)
    }
  }

  reloadData(){
    this.onGetLocalStorage()
  }

  onReturn(){
    let a = this.menuService.changeModuleData().pipe(takeUntil(this.Unsubscribe)).subscribe((item: ModuleDataItem) => {
      var parent = item.ListMenu.find(f => f.Code.includes('hriSal') || f.Link.includes('hri002-policysalary'))

      if (Ps_UtilObjectService.hasValue(parent) && Ps_UtilObjectService.hasListValue(parent.LstChild)) {
        var detail1 = parent.LstChild.find(f => f.Code.includes('hri019-payroll-list') || f.Link.includes('hri019-payroll-list'))

        if (Ps_UtilObjectService.hasValue(parent) && Ps_UtilObjectService.hasListValue(parent.LstChild)) {
          var detail = detail1.LstChild.find(f => f.Code.includes('hri019-payroll-detail') || f.Link.includes('hri019-payroll-detail'))

          this.menuService.activeMenu(detail)
        }
      }

    })
    this.arrSub.push(a)
  }

  onDropdownlistClick(item){
    this.APIGetPaycheckPortal(item.Code)
  }

  onOpenDrawer(){
    this.isOpentDrawer = !this.isOpentDrawer
    this.layoutService.drawerState.next(this.isOpentDrawer) 
  }

  Explan(ev){
   this[ev] = !this[ev]
  }

  handleFilterDropdownlist(value){
    this.ListPayrollFilter = this.ListPayrollHasEmployee

    if (value !== '') {
      this.ListPayrollFilter = this.ListPayrollHasEmployee.filter(
        (s) => s.Period.toLowerCase().indexOf(value.toLowerCase()) !== -1
      );
    } else{
      this.ListPayrollFilter = this.ListPayrollHasEmployee
    }
  }

  //dialog

 
  onInitForm(){
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
}

get f() { return this.loginForm.controls}
  // #region ĐĂNG NHẬP
  onSubmit() {
    let that = this
    // this.submitted = true;

    // reset alerts on submit
    // this.alertService.clear();

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    this.authen.getToken(this.f.username.value, this.f.password.value).pipe(takeUntil(this.Unsubscribe))
      .subscribe(res => {
        that.loading = false;
        that.layoutService.onSuccess('Đăng nhập thành công')
        //logic xử lí session
        this.hasHiddenPaycheck = false
        that.authen.getCacheToken().subscribe(v => {
          that.authen.getUserInfo(v.access_token).subscribe(i => {
                //dùng để kiểm tra thời gian khi vừa login
                const userInfoTime = {...i,accessTime: Date.now().toString()}
                that.authen.setCacheUserInfo(userInfoTime)
                this.onGetLocalStorage();
                this.localStorage.setItem("timeAccessPaycheck", !this.hasHiddenPaycheck)
            // that.router.navigate([that.returnUrl]);
          });
        });
      }, err => {
        that.loading = false;
        that.layoutService.onError('Đăng nhập thất bại')
      });
  }

  onSubcribeUserLocal(){
    this.localStorage.subscribeToLocalStorageChange('timeAccessPaycheck').subscribe((newValue: any) => {
      if (Ps_UtilObjectService.hasValue(newValue)) {
        this.onGetLocalStorage();
      }
    })
  }

  passwordHidden: boolean = true;
  @ViewChild('eyeIconPassword') eyeIconPassword;
  @ViewChild('inputPassword') inputPassword;

  togglePassword(inputref: string, iconref:  string) {
    this.passwordHidden = !this.passwordHidden

    if (this.passwordHidden == true) {
      this[inputref].nativeElement.type = 'password'
      this[iconref].element.nativeElement.firstElementChild.style.fill = '#e4e7ea';//$gray-200
    } else {
      this[inputref].nativeElement.type = 'text'
      this[iconref].element.nativeElement.firstElementChild.style.fill = '#959db3';//$light-blue-gray
    }
  }

  //session check time user
  hasHiddenPaycheck: boolean = false
  checkClear: boolean = false
  checkAccess(){
    this.hasHiddenPaycheck = false
    var currentTime = Date.now();
    // Tính thời gian đã trôi qua từ lần truy cập đến hiện tại
    var accessTime = this.StaffInfor.accessTime;
    var elapsedTime = (currentTime - accessTime) / 60000 ;
    // Kiểm tra xem thời gian đã trôi qua có lớn hơn 5 phút không
    if (elapsedTime >= 5) {
        this.hasHiddenPaycheck = true
        localStorage.removeItem('timeAccessPaycheck')
    }
  }

  arrSub: Subscription[] = [];
  ngOnDestroy(): void {
    this.Unsubscribe.next();
    this.Unsubscribe.complete();
    // clearInterval(this.timer);
    this.arrSub.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
