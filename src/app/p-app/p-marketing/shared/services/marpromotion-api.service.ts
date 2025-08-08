import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PS_CommonService, Ps_UtilObjectService, DTOResponse, DTOConfig } from "src/app/p-lib";
import { MarketingApiConfigService } from "./marketing-api-config.service";
import { State, toDataSourceRequest } from '@progress/kendo-data-query';
import { LayoutApiConfigService } from 'src/app/p-app/p-layout/services/layout-api-config.service';
import { DTOUpdate } from 'src/app/p-app/p-ecommerce/shared/dto/DTOUpdate';
import { DTOWarehouse } from 'src/app/p-app/p-ecommerce/shared/dto/DTOWarehouse';
import DTOPromotionProduct, { DTOCOLPromotionGiftCus, DTOCOPOLPromotionRangeCus, DTODayOfWeek, DTOGroupOfCard, DTOPromotionDetail, DTOPromotionInvDetail } from '../dto/DTOPromotionProduct.dto';
import { DTOCFFolder } from 'src/app/p-app/p-layout/dto/DTOCFFolder.dto';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MarPromotionAPIService {

  constructor(
    public api: PS_CommonService,
    public config: MarketingApiConfigService,
    public layoutConfig: LayoutApiConfigService,
  ) { }

  GetListPromotion(gridState: State, donviCode?: number, channelCode?: number) {
    let that = this;
    var param = {
      WHCode: donviCode,
      ChannelCode: channelCode,
      Filter: toDataSourceRequest(gridState)
    }
    return new Observable<DTOResponse>(obs => {
      that.api.connect(that.config.getAPIList().GetListPromotion.method,
        that.config.getAPIList().GetListPromotion.url, JSON.stringify(param))
        .subscribe(
          (res: any) => {
            obs.next(res);
            obs.complete();
          }, errors => {
            obs.error(errors);
            obs.complete();
          })
    });
  }
  GetPromotionByCode(code: number) {
    let that = this;
    var param = { Code: code }
    return new Observable<DTOResponse>(obs => {
      that.api.connect(that.config.getAPIList().GetPromotionByCode.method,
        that.config.getAPIList().GetPromotionByCode.url, JSON.stringify(param)).subscribe(
          (res: any) => {
            obs.next(res);
            obs.complete();
          }, errors => {
            obs.error(errors);
            obs.complete();
          })
    });
  }
  
  GetPromotion(code: number) {
    let that = this;
    var param = { Code: code }
    return new Observable<DTOResponse>(obs => {
      that.api.connect(that.config.getAPIList().GetPromotion.method,
        that.config.getAPIList().GetPromotion.url, JSON.stringify(param)).subscribe(
          (res: any) => {
            obs.next(res);
            obs.complete();
          }, errors => {
            obs.error(errors);
            obs.complete();
          })
    });
  }
  GetListPromotionType() {
    let that = this;
    return new Observable<DTOResponse>(obs => {
      that.api.connect(that.config.getAPIList().GetListPromotionType.method,
        that.config.getAPIList().GetListPromotionType.url, null).subscribe(
          (res: any) => {
            obs.next(res);
            obs.complete();
          }, errors => {
            obs.error(errors);
            obs.complete();
          })
    });
  }
  GetPromotionDayOfWeek(promotion: number) {
    let that = this;
    return new Observable<DTOResponse>(obs => {
      that.api.connect(that.config.getAPIList().GetPromotionDayOfWeek.method,
        that.config.getAPIList().GetPromotionDayOfWeek.url, JSON.stringify({ "Promotion": promotion })).subscribe(
          (res: any) => {
            obs.next(res);
            obs.complete();
          }, errors => {
            obs.error(errors);
            obs.complete();
          })
    });
  }
  GetPromotionListGroupOfCard(promotion: number) {
    let that = this;
    return new Observable<DTOResponse>(obs => {
      that.api.connect(that.config.getAPIList().GetPromotionListGroupOfCard.method,
        that.config.getAPIList().GetPromotionListGroupOfCard.url, JSON.stringify({ "Promotion": promotion })).subscribe(
          (res: any) => {
            obs.next(res);
            obs.complete();
          }, errors => {
            obs.error(errors);
            obs.complete();
          })
    });
  }
  GetPromotionWareHouse(promotion: number) {
    let that = this;
    return new Observable<DTOResponse>(obs => {
      that.api.connect(that.config.getAPIList().GetPromotionWareHouse.method,
        that.config.getAPIList().GetPromotionWareHouse.url, JSON.stringify({ "Promotion": promotion })).subscribe(
          (res: any) => {
            obs.next(res);
            obs.complete();
          }, errors => {
            obs.error(errors);
            obs.complete();
          })
    });
  }
  //update
  UpdatePromotion(updateDTO: DTOUpdate) {
    let that = this;
    var json = JSON.stringify(updateDTO, (k, v) =>
      Ps_UtilObjectService.parseLocalDateTimeToString(k, v, ["StartDate", "EndDate"]))
    return new Observable<DTOResponse>(obs => {
      that.api.connect(that.config.getAPIList().UpdatePromotion.method,
        that.config.getAPIList().UpdatePromotion.url, json)
        .subscribe(
          (res: any) => {
            obs.next(res);
            obs.complete();
          }, errors => {
            obs.error(errors);
            obs.complete();
          })
    });
  }
  UpdatePromotionStatus(list: any[], status: number) {
    let that = this;
    var param = {
      ListDTO: list,
      StatusID: status,
    }
    return new Observable<DTOResponse>(obs => {
      that.api.connect(that.config.getAPIList().UpdatePromotionStatus.method,
        that.config.getAPIList().UpdatePromotionStatus.url, JSON.stringify(param,
          (k, v) => Ps_UtilObjectService.parseDateToString(k, v, ['StartDate', 'EndDate'])))
        .subscribe(
          (res: any) => {
            obs.next(res);
            obs.complete();
          }, errors => {
            obs.error(errors);
            obs.complete();
          })
    });
  }
  DeletePromotion(updateDTO: DTOPromotionProduct) {
    let that = this;
    return new Observable<DTOResponse>(obs => {
      that.api.connect(that.config.getAPIList().DeletePromotion.method,
        that.config.getAPIList().DeletePromotion.url, JSON.stringify(updateDTO)).subscribe(
          (res: any) => {
            obs.next(res);
            obs.complete();
          }, errors => {
            obs.error(errors);
            obs.complete();
          })
    });
  }
  UpdatePromotionWH(updateDTO: DTOWarehouse) {
    let that = this;
    return new Observable<DTOResponse>(obs => {
      that.api.connect(that.config.getAPIList().UpdatePromotionWH.method,
        that.config.getAPIList().UpdatePromotionWH.url, JSON.stringify(updateDTO)).subscribe(
          (res: any) => {
            obs.next(res);
            obs.complete();
          }, errors => {
            obs.error(errors);
            obs.complete();
          })
    });
  }
  UpdatePromotionListOfCard(updateDTO: DTOGroupOfCard) {
    let that = this;
    return new Observable<DTOResponse>(obs => {
      that.api.connect(that.config.getAPIList().UpdatePromotionListOfCard.method,
        that.config.getAPIList().UpdatePromotionListOfCard.url, JSON.stringify(updateDTO)).subscribe(
          (res: any) => {
            obs.next(res);
            obs.complete();
          }, errors => {
            obs.error(errors);
            obs.complete();
          })
    });
  }
  UpdatePromotionDayOfWeek(updateDTO: DTODayOfWeek) {
    let that = this;
    var param = { ...updateDTO }

    if (Ps_UtilObjectService.hasValueString(param.From))//toString trước để nó ko parse sai
      param.From = param.From.toLocaleString()

    if (Ps_UtilObjectService.hasValueString(param.To))//nếu toString thì api ko hiểu múi giờ +GMT, phải toLocaleString để có AM/PM
      param.To = param.To.toLocaleString()

    return new Observable<DTOResponse>(obs => {
      that.api.connect(that.config.getAPIList().UpdatePromotionDayOfWeek.method,
        that.config.getAPIList().UpdatePromotionDayOfWeek.url, JSON.stringify(param,
          (k, v) => Ps_UtilObjectService.parseLocalTimeToString(k, v)))
        //nếu truyền ['From', 'To'] thì nó sẽ parse 00h thành 24h, nếu time bị lố như T24:01, api parse ra 24 day, 1h
        //nếu ko truyền ['From', 'To'] thì nó parse ra T17:01 ?        
        .subscribe(
          (res: any) => {
            obs.next(res);
            obs.complete();
          }, errors => {
            obs.error(errors);
            obs.complete();
          })
    });
  }
  //detail
  GetListPromotionDetail(gridState: State) {
    let that = this;
    return new Observable<DTOResponse>(obs => {
      that.api.connect(that.config.getAPIList().GetListPromotionDetail.method,
        that.config.getAPIList().GetListPromotionDetail.url, JSON.stringify(
          toDataSourceRequest(gridState))).subscribe(
            (res: any) => {
              obs.next(res);
              obs.complete();
            }, errors => {
              obs.error(errors);
              obs.complete();
            })
    });
  }

  GetPromotionListProduct(gridState: State) {
    let that = this;
    return new Observable<DTOResponse>(obs => {
      that.api.connect(that.config.getAPIList().GetPromotionListProduct.method,
        that.config.getAPIList().GetPromotionListProduct.url, JSON.stringify(
          toDataSourceRequest(gridState))).subscribe(
            (res: any) => {
              obs.next(res);
              obs.complete();
            }, errors => {
              obs.error(errors);
              obs.complete();
            })
    });
  }
  GetPromotionProduct(barcode: string, promotion: number) {
    let that = this;
    var param = {
      "Promotion": promotion,
      "Barcode": barcode
    }
    return new Observable<DTOResponse>(obs => {
      that.api.connect(that.config.getAPIList().GetPromotionProduct.method,
        that.config.getAPIList().GetPromotionProduct.url, JSON.stringify(param)).subscribe(
          (res: any) => {
            obs.next(res);
            obs.complete();
          }, errors => {
            obs.error(errors);
            obs.complete();
          })
    });
  }
  GetComboProduct(barcode: string, bundle: number, code: number) {
    let that = this;
    var param = {
      "Bundle": bundle,
      "Barcode": barcode,
      "Code": code
    }
    return new Observable<DTOResponse>(obs => {
      that.api.connect(that.config.getAPIList().GetComboProduct.method,
        that.config.getAPIList().GetComboProduct.url, JSON.stringify(param)).subscribe(
          (res: any) => {
            obs.next(res);
            obs.complete();
          }, errors => {
            obs.error(errors);
            obs.complete();
          })
    });
  }
  UpdatePromotionDetail(updateDTO: DTOPromotionDetail[]) {
    let that = this;
    return new Observable<DTOResponse>(obs => {
      that.api.connect(that.config.getAPIList().UpdatePromotionDetail.method,
        that.config.getAPIList().UpdatePromotionDetail.url, JSON.stringify(updateDTO,
          (k, v) => Ps_UtilObjectService.parseDateToString(k, v, ['LastDate'])))
        .subscribe(
          (res: any) => {
            obs.next(res);
            obs.complete();
          }, errors => {
            obs.error(errors);
            obs.complete();
          })
    });
  }
  DeletePromotionDetail(updateDTO: DTOPromotionDetail[]) {
    let that = this;
    return new Observable<DTOResponse>(obs => {
      that.api.connect(that.config.getAPIList().DeletePromotionDetail.method,
        that.config.getAPIList().DeletePromotionDetail.url, JSON.stringify(updateDTO)).subscribe(
          (res: any) => {
            obs.next(res);
            obs.complete();
          }, errors => {
            obs.error(errors);
            obs.complete();
          })
    });
  }
  //combo
  GetListPromotionCombo(gridState: State) {
    let that = this;
    return new Observable<DTOResponse>(obs => {
      that.api.connect(that.config.getAPIList().GetListPromotionCombo.method,
        that.config.getAPIList().GetListPromotionCombo.url, JSON.stringify(
          toDataSourceRequest(gridState))).subscribe(
            (res: any) => {
              obs.next(res);
              obs.complete();
            }, errors => {
              obs.error(errors);
              obs.complete();
            })
    });
  }
  GetPromotionCombo(barcode: string, promotion: number) {
    let that = this;
    var param = {
      "Promotion": promotion,
      "Barcode": barcode
    }
    return new Observable<DTOResponse>(obs => {
      that.api.connect(that.config.getAPIList().GetPromotionCombo.method,
        that.config.getAPIList().GetPromotionCombo.url, JSON.stringify(param)).subscribe(
          (res: any) => {
            obs.next(res);
            obs.complete();
          }, errors => {
            obs.error(errors);
            obs.complete();
          })
    });
  }

  UpdatePromotionCombo(updateDTO: DTOPromotionDetail[]) {
    let that = this;
    return new Observable<DTOResponse>(obs => {
      that.api.connect(that.config.getAPIList().UpdatePromotionCombo.method,
        that.config.getAPIList().UpdatePromotionCombo.url, JSON.stringify(updateDTO,
          (k, v) => Ps_UtilObjectService.parseDateToString(k, v, ['LastDate']))).subscribe(
            (res: any) => {
              obs.next(res);
              obs.complete();
            }, errors => {
              obs.error(errors);
              obs.complete();
            })
    });
  }

  UpdateComboStatus(updateDTO: DTOPromotionDetail[], statusID: number) {
    let that = this;
    var param = {
      ListDTO: updateDTO,
      StatusID: statusID
    }
    return new Observable<DTOResponse>(obs => {
      that.api.connect(that.config.getAPIList().UpdateComboStatus.method,
        that.config.getAPIList().UpdateComboStatus.url, JSON.stringify(param,
          (k, v) => Ps_UtilObjectService.parseDateToString(k, v, ['LastDate']))).subscribe(
            (res: any) => {
              obs.next(res);
              obs.complete();
            }, errors => {
              obs.error(errors);
              obs.complete();
            })
    });
  }

  DeletePromotionCombo(updateDTO: DTOPromotionProduct) {
    let that = this;
    return new Observable<DTOResponse>(obs => {
      that.api.connect(that.config.getAPIList().DeletePromotionCombo.method,
        that.config.getAPIList().DeletePromotionCombo.url, JSON.stringify(updateDTO)).subscribe(
          (res: any) => {
            obs.next(res);
            obs.complete();
          }, errors => {
            obs.error(errors);
            obs.complete();
          })
    });
  }
  DeleteCombo(updateDTO: DTOPromotionDetail[]) {
    let that = this;
    return new Observable<DTOResponse>(obs => {
      that.api.connect(that.config.getAPIList().DeleteCombo.method,
        that.config.getAPIList().DeleteCombo.url, JSON.stringify(updateDTO)).subscribe(
          (res: any) => {
            obs.next(res);
            obs.complete();
          }, errors => {
            obs.error(errors);
            obs.complete();
          })
    });
  }
  //promotion inv
  GetPromotionInv(promotion: number) {
    let that = this;
    var param = {
      "Promotion": promotion,
    }
    return new Observable<DTOResponse>(obs => {
      that.api.connect(that.config.getAPIList().GetPromotionInv.method,
        that.config.getAPIList().GetPromotionInv.url, JSON.stringify(param)).subscribe(
          (res: any) => {
            obs.next(res);
            obs.complete();
          }, errors => {
            obs.error(errors);
            obs.complete();
          })
    });
  }
  UpdatePromotionInv(updateDTO: DTOPromotionInvDetail) {
    let that = this;
    return new Observable<DTOResponse>(obs => {
      that.api.connect(that.config.getAPIList().UpdatePromotionInv.method,
        that.config.getAPIList().UpdatePromotionInv.url, JSON.stringify(updateDTO)).subscribe(
          (res: any) => {
            obs.next(res);
            obs.complete();
          }, errors => {
            obs.error(errors);
            obs.complete();
          })
    });
  }
  DeletePromotionInv(updateDTO: DTOPromotionInvDetail) {
    let that = this;
    return new Observable<DTOResponse>(obs => {
      that.api.connect(that.config.getAPIList().DeletePromotionInv.method,
        that.config.getAPIList().DeletePromotionInv.url, JSON.stringify(updateDTO)).subscribe(
          (res: any) => {
            obs.next(res);
            obs.complete();
          }, errors => {
            obs.error(errors);
            obs.complete();
          })
    });
  }
  //Promotion Folder
  GetPromotionFolder() {
    let that = this;
    return new Observable<DTOCFFolder>(obs => {
      that.api.connect(that.config.getAPIList().GetPromotionFolder.method,
        that.config.getAPIList().GetPromotionFolder.url, {}).subscribe(
          (res: DTOCFFolder) => {
            obs.next(res);
            obs.complete();
          }, errors => {
            obs.error(errors);
            obs.complete();
          }
        )
    });
  }
  GetPromotionFolderDrill() {
    let that = this;
    return new Observable<DTOCFFolder>(obs => {
      that.api.connect(that.config.getAPIList().GetPromotionFolderDrill.method,
        that.config.getAPIList().GetPromotionFolderDrill.url, {}).subscribe(
          (res: DTOCFFolder) => {
            obs.next(res);
            obs.complete();
          }, errors => {
            obs.error(errors);
            obs.complete();
          }
        )
    });
  }
  GetPromotionFolderWithFile() {
    let that = this;
    return new Observable<DTOCFFolder>(obs => {
      that.api.connect(that.config.getAPIList().GetPromotionFolderWithFile.method,
        that.config.getAPIList().GetPromotionFolderWithFile.url, {}).subscribe(
          (res: DTOCFFolder) => {
            obs.next(res);
            obs.complete();
          }, errors => {
            obs.error(errors);
            obs.complete();
          }
        )
    });
  }
  GetPromotionFolderDrillWithFile() {
    let that = this;
    return new Observable<DTOCFFolder>(obs => {
      that.api.connect(that.config.getAPIList().GetPromotionFolderDrillWithFile.method,
        that.config.getAPIList().GetPromotionFolderDrillWithFile.url, {}).subscribe(
          (res: DTOCFFolder) => {
            obs.next(res);
            obs.complete();
          }, errors => {
            obs.error(errors);
            obs.complete();
          }
        )
    });
  }
  ImportExcelPromotionDetail(data: File, promotion: number) {
    let that = this;
    var form: FormData = new FormData();
    form.append('file', data);
    form.append('Promotion', promotion.toString())

    var headers = new HttpHeaders()
    headers = headers.append('Company', DTOConfig.cache.companyid)

    return new Observable<DTOResponse>(obs => {
      that.api.connect(that.config.getAPIList().ImportExcelPromotionDetail.method,
        that.config.getAPIList().ImportExcelPromotionDetail.url, form, headers).subscribe(
          (res: any) => {
            obs.next(res);
            obs.complete();
          }, errors => {
            obs.error(errors);
            obs.complete();
          }
        )
    });
  }
  ImportExcelListComboGiftset(data: File, promotion: number) {
    let that = this;
    var form: FormData = new FormData();
    form.append('file', data);
    form.append('Promotion', promotion.toString())

    var headers = new HttpHeaders()
    headers = headers.append('Company', DTOConfig.cache.companyid)

    return new Observable<DTOResponse>(obs => {
      that.api.connect(that.config.getAPIList().ImportExcelListComboGiftset.method,
        that.config.getAPIList().ImportExcelListComboGiftset.url, form, headers).subscribe(
          (res: any) => {
            obs.next(res);
            obs.complete();
          }, errors => {
            obs.error(errors);
            obs.complete();
          }
        )
    });
  }
  ImportExcelComboGiftsetProduct(data: File, combo: number) {
    let that = this;
    var form: FormData = new FormData();
    form.append('file', data);
    form.append('Combo', combo.toString())

    var headers = new HttpHeaders()
    headers = headers.append('Company', DTOConfig.cache.companyid)

    return new Observable<DTOResponse>(obs => {
      that.api.connect(that.config.getAPIList().ImportExcelComboGiftsetProduct.method,
        that.config.getAPIList().ImportExcelComboGiftsetProduct.url, form, headers).subscribe(
          (res: any) => {
            obs.next(res);
            obs.complete();
          }, errors => {
            obs.error(errors);
            obs.complete();
          }
        )
    });
  }
  ImportExcelPromotionHamper(data: File, promotion: number) {
    let that = this;
    var form: FormData = new FormData();
    form.append('file', data);
    form.append('Promotion', promotion.toString())

    var headers = new HttpHeaders()
    headers = headers.append('Company', DTOConfig.cache.companyid)

    return new Observable<DTOResponse>(obs => {
      that.api.connect(that.config.getAPIList().ImportExcelPromotionHamper.method,
        that.config.getAPIList().ImportExcelPromotionHamper.url, form, headers).subscribe(
          (res: any) => {
            obs.next(res);
            obs.complete();
          }, errors => {
            obs.error(errors);
            obs.complete();
          }
        )
    });
  }

  ExportListPromotionDetails(issue: number) {
    let that = this;
    var param = {
      'Promotion': issue.toString()
    }

    return new Observable<any>(obs => {
      that.api.connect(that.config.getAPIList().ExportListPromotionDetails.method,
        that.config.getAPIList().ExportListPromotionDetails.url, JSON.stringify(param)
        , null, null, 'response', 'blob'
      ).subscribe(
        (res: any) => {
          obs.next(res);
          obs.complete();
        }, errors => {
          obs.error(errors);
          obs.complete();
        }
      )
    });
  }

  //#region Hamper
  GetListHamper(gridState: State) {
    let that = this;
    return new Observable<DTOResponse>(obs => {
      that.api.connect(that.config.getAPIList().GetListHamper.method,
        that.config.getAPIList().GetListHamper.url, JSON.stringify(
          toDataSourceRequest(gridState))).subscribe(
            (res: any) => {
              obs.next(res);
              obs.complete();
            }, errors => {
              obs.error(errors);
              obs.complete();
            })
    });
  }

  GetHamperByBarcode(barcode: string, promotion: number, IsNew: boolean) {
    let that = this;
    var param = {
      "Promotion": promotion,
      "Barcode": barcode,
      "IsNew": IsNew
    }
    return new Observable<DTOResponse>(obs => {
      that.api.connect(that.config.getAPIList().GetHamperByBarcode.method,
        that.config.getAPIList().GetHamperByBarcode.url, JSON.stringify(param)).subscribe(
          (res: any) => {
            obs.next(res);
            obs.complete();
          }, errors => {
            obs.error(errors);
            obs.complete();
          })
    });
  }

  ExportHamperPromotionReport(code: number) {
    let that = this;
    let Object = {
      Code: code
    }
    return new Observable<any>(obs => {
      that.api.connect(that.config.getAPIList().ExportHamperPromotionReport.method,
        that.config.getAPIList().ExportHamperPromotionReport.url, JSON.stringify(Object)
        , null, null, 'response', 'blob'
      ).subscribe(
        (res: any) => {
          obs.next(res);
          obs.complete();
        }, errors => {
          obs.error(errors);
          obs.complete();
        }
      )
    });
  }
  //#endregion

  //#region Promotion Gift
  GetListCOPOLPromotionGiftType() {
    let that = this;
    return new Observable<any>(obs => {
      that.api.connect(that.config.getAPIList().GetListCOPOLPromotionGiftType.method,
        that.config.getAPIList().GetListCOPOLPromotionGiftType.url, JSON.stringify({})
      ).subscribe(
        (res: any) => {
          obs.next(res);
          obs.complete();
        }, errors => {
          obs.error(errors);
          obs.complete();
        }
      )
    });
  }

  /**
  * Lấy danh sách kênh đã duyệt (có nhóm kênh) của chương trình quà tặng
  * @param promotionCode code của chương trình khuyến mãi
  */
  GetListCOPOLPromotionChannel(promotionCode: number) {
    let that = this;
    return new Observable<any>(obs => {
      that.api.connect(that.config.getAPIList().GetListCOPOLPromotionChannel.method,
        that.config.getAPIList().GetListCOPOLPromotionChannel.url, JSON.stringify({ Promotion: promotionCode })
      ).subscribe(
        (res: any) => {
          obs.next(res);
          obs.complete();
        }, errors => {
          obs.error(errors);
          obs.complete();
        }
      )
    });
  }

  /**
   * Lấy danh sách thông tin phạm vi áp dụng trong chương trình
   * @param promotionCode Code của chương trình khuyến mãi
   * @returns danh sách phạm vi áp dụng
   */
  GetListCOPOLApplyScope(promotionCode: number) {
    let that = this;
    return new Observable<any>(obs => {
      that.api.connect(that.config.getAPIList().GetListCOPOLApplyScope.method,
        that.config.getAPIList().GetListCOPOLApplyScope.url, JSON.stringify({ Promotion: promotionCode })
      ).subscribe(
        (res: any) => {
          obs.next(res);
          obs.complete();
        }, errors => {
          obs.error(errors);
          obs.complete();
        }
      )
    });
  }
  //#endregion

  //#region  Promotion Detail

  /**
 * Get Product by barcode
 * @param data DTOPromotionDetail
 * @returns product
 */
  GetCOPOLPromotionGiftByBarcode(data: DTOPromotionDetail) {
    let that = this;
    return new Observable<DTOResponse>(obs => {
      that.api.connect(that.config.getAPIList().GetCOPOLPromotionGiftByBarcode.method,
        that.config.getAPIList().GetCOPOLPromotionGiftByBarcode.url, JSON.stringify(data)).subscribe(
          (res: any) => {
            obs.next(res);
            obs.complete();
          }, errors => {
            obs.error(errors);
            obs.complete();
          })
    });
  }


  /**
   * Get List gift
   * @param gridState 
   * @returns list gift
   */
  GetListCOLSGift(gridState: State) {
    let that = this;
    return new Observable<DTOResponse>(obs => {
      that.api.connect(that.config.getAPIList().GetListCOLSGift.method,
        that.config.getAPIList().GetListCOLSGift.url, JSON.stringify(
          toDataSourceRequest({}))).subscribe(
            (res: any) => {
              obs.next(res);
              obs.complete();
            }, errors => {
              obs.error(errors);
              obs.complete();
            })
    });
  }

  /**
   * Add list gift to promotion
   * @param data DTOCOLPromotionGiftCus[]
   * @returns 
   */
  AddListCOPOLPromotionGift(data: DTOCOLPromotionGiftCus[]) {
    let that = this;
    return new Observable<DTOResponse>(obs => {
      that.api.connect(that.config.getAPIList().AddListCOPOLPromotionGift.method,
        that.config.getAPIList().AddListCOPOLPromotionGift.url, JSON.stringify(
          data)).subscribe(
            (res: any) => {
              obs.next(res);
              obs.complete();
            }, errors => {
              obs.error(errors);
              obs.complete();
            })
    });
  }

  /**
   * Get list product in promotion
   * @param gridState 
   * @returns 
   */
  GetListCOPOLPromotionGiftProduct(gridState: State, promotion: number) {
    let that = this;
    let param = {
      ...toDataSourceRequest(gridState), // Lấy tất cả thuộc tính từ toDataSourceRequest(gridState)
      Promotion: promotion // Thêm trường Promotion vào param
    };


    return new Observable<DTOResponse>(obs => {
      that.api.connect(that.config.getAPIList().GetListCOPOLPromotionGiftProduct.method,
        that.config.getAPIList().GetListCOPOLPromotionGiftProduct.url, JSON.stringify(
          param)).subscribe(
            (res: any) => {
              obs.next(res);
              obs.complete();
            }, errors => {
              obs.error(errors);
              obs.complete();
            })
    });
  }

  /**
   * Update product in promotion
   * @param data DTOPromotionInvDetail
   * @returns 
   */
  UpdateCOPOLPromotionGiftProduct(data: DTOPromotionDetail) {
    let that = this;
    return new Observable<DTOResponse>(obs => {
      that.api.connect(that.config.getAPIList().UpdateCOPOLPromotionGiftProduct.method,
        that.config.getAPIList().UpdateCOPOLPromotionGiftProduct.url, JSON.stringify(data)).subscribe(
          (res: any) => {
            obs.next(res);
            obs.complete();
          }, errors => {
            obs.error(errors);
            obs.complete();
          })
    });
  }

  /**
 * Update status product in promotion
 * @param list list DTOPromotionInvDetail
 * @returns 
 */
  UpdateCOPOLPromotionGiftProductStatus(list: DTOPromotionDetail[], status: number) {
    let that = this;
    var param = {
      ListDTO: list,
      Status: status
    }
    
    return new Observable<DTOResponse>(obs => {
      that.api.connect(that.config.getAPIList().UpdateCOPOLPromotionGiftProductStatus.method,
        that.config.getAPIList().UpdateCOPOLPromotionGiftProductStatus.url, JSON.stringify(param)).subscribe(
          (res: any) => {
            obs.next(res);
            obs.complete();
          }, errors => {
            obs.error(errors);
            obs.complete();
          })
    });
  }

  /**
 * Get list range in promotion
 * @param gridState 
 * @returns 
 */
  GetListCOPOLPromotionRange(gridState: State, promotion: number) {
    let that = this;
    let param = {
      ...toDataSourceRequest(gridState), // Lấy tất cả thuộc tính từ toDataSourceRequest(gridState)
      Promotion: promotion // Thêm trường Promotion vào param
    };

    return new Observable<DTOResponse>(obs => {
      that.api.connect(that.config.getAPIList().GetListCOPOLPromotionRange.method,
        that.config.getAPIList().GetListCOPOLPromotionRange.url, JSON.stringify(
          param))
        .subscribe(
          (res: any) => {
            obs.next(res);
            obs.complete();
          },
          (errors) => {
            obs.error(errors);
            obs.complete();
          }
        );
    });
  }

  /**
   * API delete Product
   * @param data 
   * @returns 
   */
  DeleteCOPOLPromotionGiftProduct(data: DTOPromotionDetail[]) {
    let that = this;
    return new Observable<DTOResponse>(obs => {
      that.api.connect(that.config.getAPIList().DeleteCOPOLPromotionGiftProduct.method,
        that.config.getAPIList().DeleteCOPOLPromotionGiftProduct.url, JSON.stringify(data)).subscribe(
          (res: any) => {
            obs.next(res);
            obs.complete();
          }, errors => {
            obs.error(errors);
            obs.complete();
          })
    });
  }

  /**
 * API delete Gift
 * @param data 
 * @returns 
 */
  DeleteCOPOLPromotionGift(data: DTOCOLPromotionGiftCus) {
    let that = this;
    return new Observable<DTOResponse>(obs => {
      that.api.connect(that.config.getAPIList().DeleteCOPOLPromotionGift.method,
        that.config.getAPIList().DeleteCOPOLPromotionGift.url, JSON.stringify(data)).subscribe(
          (res: any) => {
            obs.next(res);
            obs.complete();
          }, errors => {
            obs.error(errors);
            obs.complete();
          })
    });
  }

  /**
* API Import Template Gift
* @param data 
* @returns 
*/
  ImportCOPOLPromotionGiftProduct(Promotion: number, file: File) {
    let that = this;
    const form = new FormData();
    form.append('File', file);
    form.append('Promotion', Promotion.toString());

    const headers = new HttpHeaders().append(
      'Company',
      DTOConfig.cache.companyid
    );

    return new Observable<DTOResponse>((obs) => {
      that.api
        .connect(
          that.config.getAPIList().ImportCOPOLPromotionGiftProduct.method,
          that.config.getAPIList().ImportCOPOLPromotionGiftProduct.url,
          form,
          headers
        )
        .subscribe(
          (res: any) => {
            obs.next(res);
            obs.complete();
          },
          (errors) => {
            obs.error(errors);
            obs.complete();
          }
        );
    });
  }

  /**
* API Import Template Range
* @param data 
* @returns 
*/
  ImportCOPOLPromotionGiftRange(Promotion: number, file: File) {
    let that = this;
    const form = new FormData();
    form.append('File', file);
    form.append('Promotion', Promotion.toString());

    const headers = new HttpHeaders().append(
      'Company',
      DTOConfig.cache.companyid
    );

    return new Observable<DTOResponse>((obs) => {
      that.api
        .connect(
          that.config.getAPIList().ImportCOPOLPromotionGiftRange.method,
          that.config.getAPIList().ImportCOPOLPromotionGiftRange.url,
          form,
          headers
        )
        .subscribe(
          (res: any) => {
            obs.next(res);
            obs.complete();
          },
          (errors) => {
            obs.error(errors);
            obs.complete();
          }
        );
    });
  }

  /**
  * API Add Gift
  * @param data 
  * @returns 
  */
  AddCOPOLPromotionGift(data: DTOCOLPromotionGiftCus) {
    let that = this;
    return new Observable<DTOResponse>(obs => {
      that.api.connect(that.config.getAPIList().AddCOPOLPromotionGift.method,
        that.config.getAPIList().AddCOPOLPromotionGift.url, JSON.stringify(data)).subscribe(
          (res: any) => {
            obs.next(res);
            obs.complete();
          }, errors => {
            obs.error(errors);
            obs.complete();
          })
    });
  }

  /**
  * API Delete List Range
  * @param data 
  * @returns 
  */
  DeleteListCOPOLPromotionRange(List: DTOCOPOLPromotionRangeCus[]) {
    let that = this;
    return new Observable<DTOResponse>(obs => {
      that.api.connect(that.config.getAPIList().DeleteListCOPOLPromotionRange.method,
        that.config.getAPIList().DeleteListCOPOLPromotionRange.url, JSON.stringify(List)).subscribe(
          (res: any) => {
            obs.next(res);
            obs.complete();
          }, errors => {
            obs.error(errors);
            obs.complete();
          })
    });
  }

  /**
  * API Delete Range
  * @param data 
  * @returns 
  */
  DeleteCOPOLPromotionRange(data: DTOCOPOLPromotionRangeCus) {
    let that = this;
    return new Observable<DTOResponse>(obs => {
      that.api.connect(that.config.getAPIList().DeleteCOPOLPromotionRange.method,
        that.config.getAPIList().DeleteCOPOLPromotionRange.url, JSON.stringify(data)).subscribe(
          (res: any) => {
            obs.next(res);
            obs.complete();
          }, errors => {
            obs.error(errors);
            obs.complete();
          })
    });
  }

  /**
  * API Update Range
  * @param data 
  * @returns 
  */
  UpdateCOPOLPromotionRange(data: DTOCOPOLPromotionRangeCus) {
    let that = this;
    return new Observable<DTOResponse>(obs => {
      that.api.connect(that.config.getAPIList().UpdateCOPOLPromotionRange.method,
        that.config.getAPIList().UpdateCOPOLPromotionRange.url, JSON.stringify(data)).subscribe(
          (res: any) => {
            obs.next(res);
            obs.complete();
          }, errors => {
            obs.error(errors);
            obs.complete();
          })
    });
  }
}
