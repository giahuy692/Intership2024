import { Component, OnInit, Input, ChangeDetectorRef, SimpleChanges, OnDestroy } from '@angular/core';
import { DTOMAWebPage } from '../../dto/DTOMAWebPage.dto';
import { DTOMABannerGroup } from '../../dto/DTOMABannerGroup.dto';
import { MarBannerAPIService } from '../../services/marbanner-api.service';
import { MarketingService } from '../../services/marketing.service';
import { Ps_UtilObjectService } from 'src/app/p-lib';
import { Subject, Subscription } from 'rxjs';
import { LayoutService } from 'src/app/p-app/p-layout/services/layout.service';
import { DTOMABanner } from '../../dto/DTOMABanner.dto';
import { DTOMABannerWebPage } from '../../dto/DTOMABannerWebPage.dto';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-mar-groupbanner-webpage',
  templateUrl: './mar-groupbanner-webpage.component.html',
  styleUrls: ['./mar-groupbanner-webpage.component.scss']
})
export class MarGroupbannerWebpageComponent implements OnInit, OnDestroy {
  isWebpageDialogOpened: boolean = false
  loading = false
  isLockAll = false
  @Input() groupBanner: DTOMABannerGroup = new DTOMABannerGroup()
  @Input() banner: DTOMABanner = new DTOMABanner()
  //
  listWebpage: DTOMAWebPage[] = []
  listWebpageBanner: DTOMABannerWebPage[] = []
  webpageBanner: DTOMABannerWebPage = new DTOMABannerWebPage()
  listWebpageCodeGroupBanner: number[] = []
  //
  sst = new Subject<void>()

  constructor(private cdr: ChangeDetectorRef,
    public marApiService: MarBannerAPIService,
    public marService: MarketingService,
    public layoutService: LayoutService,

  ) { }

  ngOnInit(): void {
    let a = this.marService.getWebpageDialogPopup().pipe(takeUntil(this.sst)).subscribe(res => {
      this.isWebpageDialogOpened = res

      if (this.isWebpageDialogOpened) {
        // this.p_GetListWebpage()
        this.p_GetBannerListWebpage()

        if (Ps_UtilObjectService.hasValue(this.groupBanner?.Code))
          this.p_GetGroupBanner()
      }
    })
    this.arrUnsubscribe.push(a);
  }

  ngOnChanges(changes: SimpleChanges) {
    // if (this.isWebpageDialogOpened) {
    //   this.p_GetListWebpage()

    //   if (Ps_UtilObjectService.hasValue(this.groupBanner?.Code))
    //     this.p_GetGroupBanner()
    // }
  }
  //API
  p_GetGroupBanner() {
    this.loading = true;
    var ctx = 'Lấy thông tin Chi tiết Phân nhóm Banner'

    let a = this.marApiService.GetGroupBanner(this.groupBanner.Code).pipe(takeUntil(this.sst)).subscribe(res => {
      if (Ps_UtilObjectService.hasValue(res) && Ps_UtilObjectService.hasValue(res.ObjectReturn) && res.StatusCode == 0) {
        this.layoutService.onSuccess(`${ctx} thành công`)
        this.groupBanner = res.ObjectReturn;
        this.listWebpageCodeGroupBanner = this.groupBanner.ListWebPage
        this.checkActiveWebpage()
      } else
        this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${res.ErrorString}`)

      this.loading = false;
    }, (e) => {
      this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${e}`)
      this.loading = false;
    });
    this.arrUnsubscribe.push(a);
  }

  p_GetListWebpage() {
    this.loading = true;
    var ctx = 'Lấy danh sách Webpage'

    let a = this.marApiService.GetListWebpage().pipe(takeUntil(this.sst)).subscribe(res => {
      if (Ps_UtilObjectService.hasValue(res) && Ps_UtilObjectService.hasValue(res.ObjectReturn) && res.StatusCode == 0) {
        this.listWebpage = res.ObjectReturn
      } else
        this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${res.ErrorString}`)

      this.loading = false;
    }, (e) => {
      this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${e}`)
      this.loading = false;
    });
    this.arrUnsubscribe.push(a);
  }

  p_GetBannerListWebpage() {
    this.loading = true;
    var ctx = 'Lấy danh sách Webpage hiển thị Banner'

    let a = this.marApiService.GetBannerListWebpage(this.banner).pipe(takeUntil(this.sst)).subscribe(res => {
      if (Ps_UtilObjectService.hasValue(res) && Ps_UtilObjectService.hasValue(res.ObjectReturn) && res.StatusCode == 0) {
        this.listWebpageBanner = res.ObjectReturn
      } else
        this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${res.ErrorString}`)

      this.loading = false;
    }, (e) => {
      this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${e}`)
      this.loading = false;
    });
    this.arrUnsubscribe.push(a);
  }

  UpdateBannerWebpage(webpageBanner = this.webpageBanner) {
    this.loading = true;
    var ctx = 'Chọn Webpage hiển thị Banner'

    let a = this.marApiService.UpdateBannerWebpage(webpageBanner).pipe(takeUntil(this.sst)).subscribe(res => {
      if (Ps_UtilObjectService.hasValue(res) && Ps_UtilObjectService.hasValue(res.ObjectReturn) && res.StatusCode == 0) {
        this.webpageBanner = res.ObjectReturn
        this.layoutService.onSuccess(`${ctx} thành công`)
      } else
        this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${res.ErrorString}`)

      this.loading = false;
    }, (e) => {
      this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${e}`)
      this.loading = false;
    });
    this.arrUnsubscribe.push(a);
  }

  DeleteBannerWebpage(webpageBanner = this.webpageBanner) {
    this.loading = true;
    var ctx = 'Bỏ Webpage hiển thị Banner'

    if (webpageBanner.Code > 0) {

      let c = this.marApiService.DeleteBannerWebpage(webpageBanner).pipe(takeUntil(this.sst)).subscribe(res => {
        if (Ps_UtilObjectService.hasValue(res) && Ps_UtilObjectService.hasValue(res.ObjectReturn) && res.StatusCode == 0) {
          this.listWebpageBanner = null;
          this.layoutService.onSuccess(`${ctx} thành công`)
        } else
          this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${res.ErrorString}`)

        this.loading = false;
      }, (e) => {
        this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${e}`)
        this.loading = false;
      });
      this.arrUnsubscribe.push(c);
    }

  }
  //CLICK
  closeWebpageDialog() {
    this.isWebpageDialogOpened = false
    this.marService.setWebpageDialogPopup(false)
  }

  clickCheckbox(ev, prop: string, item?) {
    switch (prop) {
      case 'Active':
        this.webpageBanner = item
        this.webpageBanner.Active = ev.target.checked

        if (this.webpageBanner.Active)
          this.UpdateBannerWebpage()
        else
          this.DeleteBannerWebpage()
        break
      default:
        break
    }
  }
  //AUTORUN
  webpageDialogDisplay() {
    return this.isWebpageDialogOpened ? 'flex' : "none"
  }
  checkActiveWebpage() {
    this.listWebpageCodeGroupBanner.forEach(i => {
      var wp = this.listWebpage.find(w => w.Code == i)

      if (wp != undefined) {
        wp.Active = true;
      }
    })
  }

  arrUnsubscribe: Subscription[] = [];
  ngOnDestroy(): void {
    this.sst.next();
    this.sst.complete()
    this.arrUnsubscribe.forEach((sub) => {
      if (sub && sub.unsubscribe) {
        sub?.unsubscribe();
      }
    })
  }
}
