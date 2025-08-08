import { Component, OnDestroy, OnInit } from '@angular/core';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { faSlidersH } from '@fortawesome/free-solid-svg-icons'
import { Ps_UtilObjectService } from 'src/app/p-lib';
import { MarketingService } from '../../shared/services/marketing.service';
import { LayoutService } from 'src/app/p-app/p-layout/services/layout.service';
import { LayoutAPIService } from 'src/app/p-app/p-layout/services/layout-api.service';
import { DTOUpdate } from 'src/app/p-app/p-ecommerce/shared/dto/DTOUpdate';
import DTOWebContent from '../../shared/dto/DTOWebContent.dto';
import { MarNewsProductAPIService } from '../../shared/services/marnewsproduct-api.service';
import { DTOEmbedVideo } from '../../shared/dto/DTOEmbedVideo.dto';
import { DTOCFFile } from 'src/app/p-app/p-layout/dto/DTOCFFolder.dto';
import { DTOActionPermission } from 'src/app/p-app/p-layout/dto/DTOActionPermission';
import { DTOPermission } from 'src/app/p-app/p-layout/dto/DTOPermission';
import { PS_HelperMenuService } from 'src/app/p-app/p-layout/services/p-menu.helper.service';
import { distinct } from '@progress/kendo-data-query';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-mar003-news-product-detail',
  templateUrl: './mar003-news-product-detail.component.html',
  styleUrls: ['./mar003-news-product-detail.component.scss']
})
export class Mar003NewsProductDetailComponent implements OnInit, OnDestroy {
  that = this
  loading = false
  isLockAll = false
  isAdd = true
  //dialog
  deleteDialogOpened = false
  importDialogOpened = false
  excelValid = true;
  //num
  curLanguage = 1
  curImgSetting = 0
  //date
  today = new Date()
  StartDate: Date = null
  EndDate: Date = null
  lastDate: Date = null
  //object
  webContent = new DTOWebContent()
  //icon
  faCheckCircle = faCheckCircle
  faSlidersH = faSlidersH
  //CALLBACK
  pickFileCallback: Function
  GetFolderCallback: Function
  //permision
  justLoadedChangePermissionAPI: boolean = true
  justLoaded = true
  actionPerm: DTOActionPermission[] = []

  isToanQuyen = false
  isAllowedToCreate = false
  isAllowedToVerify = false
  //
  unsub = new Subject()

  constructor(
    public service: MarketingService,
    public apiService: MarNewsProductAPIService,
    public layoutService: LayoutService,
    public layoutApiService: LayoutAPIService,
    public menuService: PS_HelperMenuService,
  ) { }

  ngOnInit(): void {
    let that = this
    //cache
    this.menuService.changePermission().pipe(takeUntil(this.unsub)).subscribe((res: DTOPermission) => {
      if (Ps_UtilObjectService.hasValue(res) && this.justLoaded) {
        that.justLoaded = false
        that.actionPerm = distinct(res.ActionPermission, "ActionType")

        that.isToanQuyen = that.actionPerm.findIndex(s => s.ActionType == 1) > -1 || false
        that.isAllowedToCreate = that.actionPerm.findIndex(s => s.ActionType == 2) > -1 || false
        that.isAllowedToVerify = that.actionPerm.findIndex(s => s.ActionType == 3) > -1 || false
      }
    })

    this.menuService.changePermissionAPI().pipe(takeUntil(this.unsub)).subscribe((res) => {
      if (Ps_UtilObjectService.hasValue(res) && this.justLoadedChangePermissionAPI) {
        this.justLoadedChangePermissionAPI = false
        this.getCache()
      }
    })
    //callback
    this.pickFileCallback = this.pickFile.bind(this)
    this.GetFolderCallback = this.GetFolderWithFile.bind(this)
  }
  //load  
  getCache() {
    this.service.getCacheNewsProductDetail().pipe(takeUntil(this.unsub)).subscribe(res => {
      if (Ps_UtilObjectService.hasValue(res)) {
        this.webContent = res
        this.isAdd = this.webContent.Code == 0
      }
      else {
        this.isAdd = this.service.isAdd
      }

      if (!this.isAdd || this.webContent.Code != 0) {
        this.GetWebContent()
      }
    })
  }
  //API  
  GetWebContent() {
    this.loading = true;
    let that = this

    this.apiService.GetWebContent(this.webContent.Code).pipe(takeUntil(this.unsub)).subscribe(res => {
      if (Ps_UtilObjectService.hasValue(res) && Ps_UtilObjectService.hasValue(res.ObjectReturn) && res.StatusCode == 0) {
        this.webContent = res.ObjectReturn;
        this.checkProp()

        var loaded = this.checkIframeLoaded(that)
        // If we are here, it is not loaded. Set things up so we check the status again in 100 milliseconds
        if (!loaded)
          window.setTimeout(() => this.checkIframeLoaded(that), 1000);
      }
      this.loading = false;
    }, () => {
      this.loading = false;
    });
  }
  GetWebContentByCode() {
    this.loading = true;
    let that = this
    var ctx = 'Tìm sản phẩm'

    this.apiService.GetWebContentByCode(this.webContent.Barcode).pipe(takeUntil(this.unsub)).subscribe(res => {
      if (Ps_UtilObjectService.hasValue(res) && Ps_UtilObjectService.hasValue(res.ObjectReturn) && res.StatusCode == 0) {
        this.layoutService.onSuccess(ctx + ' thành công')
        this.webContent = res.ObjectReturn;
        this.checkProp()

        var loaded = this.checkIframeLoaded(that)
        // If we are here, it is not loaded. Set things up so we check the status again in 100 milliseconds
        if (!loaded)
          window.setTimeout(() => this.checkIframeLoaded(that), 1000);
      }
      else
        this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${res.ErrorString}`)

      this.loading = false;
    }, (e) => {
      this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${e}`)
      this.loading = false;
    });
  }
  //update
  UpdateWebContent(properties: string[], webContent: DTOWebContent = this.webContent) {
    this.loading = true;
    var ctx = (this.isAdd ? "Tạo mới" : "Cập nhật") + " Bài Viết"

    if (properties.findIndex(s => s == "WebContentVN") == -1)
      properties.push('WebContentVN')

    if (properties.findIndex(s => s == "WebContentJP") == -1)
      properties.push('WebContentJP')

    if (properties.findIndex(s => s == "WebContentEN") == -1)
      properties.push('WebContentEN')

    if (this.isAdd)
      properties.push('Category')

    var updateDTO: DTOUpdate = {
      "DTO": webContent,
      "Properties": properties
    }

    this.apiService.UpdateWebContent(updateDTO).pipe(takeUntil(this.unsub)).subscribe(res => {
      if (Ps_UtilObjectService.hasValue(res) && Ps_UtilObjectService.hasValue(res.ObjectReturn) && res.StatusCode == 0) {
        this.webContent = res.ObjectReturn
        this.checkProp()
        this.isAdd = false
        this.layoutService.onSuccess(`${ctx} thành công`)
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${res.ErrorString}`)
      }
      this.loading = false;
    }, (e) => {
      this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${e}`)
      this.loading = false;
    });
  }
  UpdateWebContentStatus(statusID: number, webcontent: DTOWebContent = this.webContent) {
    this.loading = true;
    var ctx = "Cập nhật Trạng thái Bài viết"

    this.apiService.UpdateWebContentStatus(webcontent, statusID).pipe(takeUntil(this.unsub)).subscribe(res => {
      if (Ps_UtilObjectService.hasValue(res) && Ps_UtilObjectService.hasValue(res.ObjectReturn) && res.StatusCode == 0) {
        webcontent = res.ObjectReturn
        this.isAdd = false
        this.layoutService.onSuccess(`${ctx} thành công`)
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${res.ErrorString}`)
      }
      this.GetWebContent()
      this.loading = false;
    }, (e) => {
      this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${e}`)
      this.loading = false;
      this.GetWebContent()
    });
  }
  DeleteWebContent() {
    this.loading = true;
    var ctx = "Xóa Bài viết"

    this.apiService.DeleteWebContent(this.webContent.Code).pipe(takeUntil(this.unsub)).subscribe(res => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.deleteDialogOpened = false
        this.layoutService.onSuccess(`${ctx} thành công`)
        this.webContent = res.ObjectReturn
        this.createNewPromotion()
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${res.ErrorString}`)
      }
      this.loading = false;
    }, (e) => {
      this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${e}`)
      this.loading = false;
    });
  }
  //file  
  GetFolderWithFile(childPath) {
    if (this.layoutService.getFolderDialog())
      return this.apiService.GetFolderWithFile(childPath, 8)
  }
  //CLICK EVENT
  //header1
  saveWebContent() {
    this.UpdateWebContent([
      'WebContentVN', 'WebContentEN', 'WebContentJP'
    ])
  }
  onUpdateWebContentStatus(statusID: number) {
    var newPro = { ...this.webContent }
    newPro.StatusID = statusID
    //check trước khi áp dụng
    if (newPro.StatusID == 1 || newPro.StatusID == 2) {
      if (!Ps_UtilObjectService.hasValueString(newPro.WebContentVN))
        this.layoutService.onError('Vui lòng nhập Bài viết về sản phẩm')
      else
        this.UpdateWebContentStatus(statusID)
    }
    else
      this.UpdateWebContentStatus(statusID)
  }
  createNewPromotion() {
    //object
    this.webContent = new DTOWebContent()
    this.webContent.TypeData = 1
    //bool
    this.isLockAll = false
    this.isAdd = true
    //num
    this.curLanguage = 1
    this.curImgSetting = 0
    //date
    this.today = new Date()
    this.StartDate = null
    this.EndDate = null
    this.lastDate = null
  }
  //body
  changeLanguage(lang: number) {
    this.curLanguage = lang
  }
  onDeletePromotion() {
    this.deleteDialogOpened = true
  }
  //embed img  
  myVidNumber: number = 0

  onUploadImg() {
    this.layoutService.folderDialogOpened = true
  }
  pickFile(e: DTOCFFile, width, height) {
    this.layoutService.getEditor().embedImgURL(e, width, height)
    this.layoutService.setFolderDialog(false)
  }

  checkIframeLoaded(myClass) {
    // let that = this
    const iframe = (document.querySelector('.k-editor-content .k-iframe') as HTMLIFrameElement)
    const iframeDoc = Ps_UtilObjectService.hasValue(iframe) ? iframe.contentDocument || iframe.contentWindow.document : null;
    // Check if loading is complete
    if (Ps_UtilObjectService.hasValue(iframeDoc) && iframeDoc.readyState == 'complete') {
      const ifr = iframe.contentDocument.querySelectorAll(`.yt_embed_vid`)

      if (Ps_UtilObjectService.hasListValue(ifr)) {
        for (var i = 0; i < ifr.length; i++) {
          const ele = ifr[i]

          var id = ele.id
          var h = ele.clientHeight
          var w = ele.clientWidth
          var src = ele.getAttribute('src')
          var index = id.replace('vid_', '');

          var item = new DTOEmbedVideo()
          item.ID = parseInt(index)
          item.Height = h
          item.Width = w
          item.URL = src

          if (myClass.myVidNumber < item.ID)
            this.myVidNumber = item.ID + 1

          myClass.addVideoHoverListener(id, index, item)
        }

        return true;
      } else
        return false
    } else
      return false
  }
  //POPUP
  //DIALOG button
  closeDeleteDialog() {
    this.deleteDialogOpened = false
  }
  delete() {
    this.DeleteWebContent()
  }
  //AUTORUN
  checkProp() {
    this.isLockAll = (this.webContent.StatusID == 2 || this.webContent.StatusID == 3) || //khóa khi duyệt, ngưng
      (this.webContent.StatusID != 0 && this.webContent.StatusID != 4 && this.isAllowedToCreate && !this.isAllowedToVerify)//khóa khi gửi, duyệt, ngưng nếu ko có quyền duyệt
      || ((this.webContent.StatusID == 0 || this.webContent.StatusID == 4) && this.isAllowedToVerify && !this.isAllowedToCreate)//khóa khi tạo, trả nếu có quyền duyệt
  }
  onTextboxLoseFocus(prop: string) {
    if (Ps_UtilObjectService.hasValueString(prop)) {
      switch (prop) {
        case 'Barcode':
          this.GetWebContentByCode()
          break
        default:
          this.UpdateWebContent([prop])
          break
      }
    }
  }
  onEditorValueChange(val) {
    switch (this.curLanguage) {
      case 1:
        this.webContent.WebContentVN = val
        break;
      case 2:
        this.webContent.WebContentJP = val
        break;
      default:
        this.webContent.WebContentEN = val
        break;
    }
  }
  keydownEnter(e: KeyboardEvent) {
    //disable close drawer
    e.preventDefault();
    e.stopPropagation();
  }
  ngOnDestroy(): void {
    this.unsub.unsubscribe()
  }
}
