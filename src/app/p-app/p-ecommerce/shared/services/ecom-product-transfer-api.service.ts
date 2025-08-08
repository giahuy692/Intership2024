import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { State, toDataSourceRequest } from '@progress/kendo-data-query';
import { Observable } from 'rxjs';
import { DTOConfig, DTOResponse, PS_CommonService, Ps_UtilObjectService, } from 'src/app/p-lib';
import { DTOTransfer } from '../dto/DTOTransfer';
import { DTOTransferDetail } from '../dto/DTOTransferDetail';
import { DTOUpdate } from '../dto/DTOUpdate';
import { EcommerceApiConfigService } from './ecommerce-api-config.service';

@Injectable({
  providedIn: 'root',
})
export class EcomProductTransferAPIService {
  constructor(
    public api: PS_CommonService,
    public config: EcommerceApiConfigService
  ) { }
  //#region ĐIỀU CHUYỂN HÀNG HÓA
  GetListTransfer(state: State) {
    let that = this;
    return new Observable<DTOResponse>((obs) => {
      that.api.connect(
        that.config.getAPIList().GetListTransfer.method,
        that.config.getAPIList().GetListTransfer.url,
        JSON.stringify(toDataSourceRequest(state))
      ).subscribe((res: any) => {
        obs.next(res);
        obs.complete();
      }, (errors) => {
        obs.error(errors);
        obs.complete();
      });
    });
  }

  GetTransfer(item: DTOTransfer) {
    let that = this;
    return new Observable<DTOResponse>((obs) => {
      that.api.connect(
        that.config.getAPIList().GetTransfer.method,
        that.config.getAPIList().GetTransfer.url,
        JSON.stringify({ Code: item.Code })
      ).subscribe((res: any) => {
        obs.next(res);
        obs.complete();
      }, (errors) => {
        obs.error(errors);
        obs.complete();
      });
    });
  }

  UpdateTransferStatus(obj: DTOTransfer[], statusID: number) {
    let that = this;
    var param = {
      ListDTO: obj,
      StatusID: statusID,
    };
    return new Observable<DTOResponse>((obs) => {
      that.api.connect(
        that.config.getAPIList().UpdateTransferStatus.method,
        that.config.getAPIList().UpdateTransferStatus.url,
        JSON.stringify(param)
      ).subscribe((res: any) => {
        obs.next(res);
        obs.complete();
      }, (errors) => {
        obs.error(errors);
        obs.complete();
      });
    });
  }

  UpdateTransfer(obj: DTOTransfer, prop: string[]) {
    let that = this;
    var param: DTOUpdate = {
      DTO: obj,
      Properties: prop,
    };
    return new Observable<DTOResponse>((obs) => {
      that.api.connect(
        that.config.getAPIList().UpdateTransfer.method,
        that.config.getAPIList().UpdateTransfer.url,
        JSON.stringify(param, (k, v) =>
          Ps_UtilObjectService.parseDateToString(k, v, ['EffDate'])
        )
      ).subscribe((res: any) => {
        obs.next(res);
        obs.complete();
      }, (errors) => {
        obs.error(errors);
        obs.complete();
      });
    });
  }

  DeleteTransfer(obj: DTOTransfer[]) {
    let that = this;
    return new Observable<DTOResponse>((obs) => {
      that.api.connect(
        that.config.getAPIList().DeleteTransfer.method,
        that.config.getAPIList().DeleteTransfer.url,
        JSON.stringify(obj)
      ).subscribe((res: any) => {
        obs.next(res);
        obs.complete();
      }, (errors) => {
        obs.error(errors);
        obs.complete();
      });
    });
  }
  //#endregion ĐIỀU CHUYỂN HÀNG HÓA

  //#region CHI TIẾT ĐIỀU CHUYỂN HÀNG HÓA
  GetListTransferDetail(state: State) {
    let that = this;
    return new Observable<DTOResponse>((obs) => {
      that.api.connect(
        that.config.getAPIList().GetListTransferDetail.method,
        that.config.getAPIList().GetListTransferDetail.url,
        JSON.stringify(toDataSourceRequest(state))
      ).subscribe((res: any) => {
        obs.next(res);
        obs.complete();
      }, (errors) => {
        obs.error(errors);
        obs.complete();
      });
    });
  }

  GetTransferDetail(item: DTOTransferDetail) {
    let that = this;
    return new Observable<DTOResponse>((obs) => {
      that.api.connect(
        that.config.getAPIList().GetTransferDetail.method,
        that.config.getAPIList().GetTransferDetail.url,
        JSON.stringify(item)
      ).subscribe((res: any) => {
        obs.next(res);
        obs.complete();
      }, (errors) => {
        obs.error(errors);
        obs.complete();
      });
    });
  }

  GetTransferDetailByBarcode(item: DTOTransferDetail) {
    let that = this;
    return new Observable<DTOResponse>((obs) => {
      that.api.connect(
        that.config.getAPIList().GetTransferDetailByBarcode.method,
        that.config.getAPIList().GetTransferDetailByBarcode.url,
        JSON.stringify(item)
      ).subscribe((res: any) => {
        obs.next(res);
        obs.complete();
      }, (errors) => {
        obs.error(errors);
        obs.complete();
      });
    });
  }

  UpdateTransferDetail(obj: DTOTransferDetail) {
    let that = this;
    return new Observable<DTOResponse>((obs) => {
      that.api.connect(
        that.config.getAPIList().UpdateTransferDetail.method,
        that.config.getAPIList().UpdateTransferDetail.url,
        JSON.stringify(obj, (k, v) =>
          Ps_UtilObjectService.parseDateToString(k, v, [])
        )
      ).subscribe((res: any) => {
        obs.next(res);
        obs.complete();
      }, (errors) => {
        obs.error(errors);
        obs.complete();
      });
    });
  }

  DeleteTransferDetail(obj: DTOTransferDetail[]) {
    let that = this;
    return new Observable<DTOResponse>((obs) => {
      that.api.connect(
        that.config.getAPIList().DeleteTransferDetail.method,
        that.config.getAPIList().DeleteTransferDetail.url,
        JSON.stringify(obj)
      ).subscribe((res: any) => {
        obs.next(res);
        obs.complete();
      }, (errors) => {
        obs.error(errors);
        obs.complete();
      });
    });
  }
  //#endregion CHI TIẾT ĐIỀU CHUYỂN HÀNG HÓA
  ImportTransferDetail(data: File, forecast: number) {
    let that = this;
    var form: FormData = new FormData();
    form.append('file', data);
    form.append('Transfer', forecast.toString());

    var headers = new HttpHeaders();
    headers = headers.append('Company', DTOConfig.cache.companyid);
    headers = headers.append('DataPermission', DTOConfig.cache.dataPermission);

    return new Observable<DTOResponse>((obs) => {
      that.api.connect(
        that.config.getAPIList().ImportTransferDetail.method,
        that.config.getAPIList().ImportTransferDetail.url,
        form, headers
      ).subscribe((res: any) => {
        obs.next(res);
        obs.complete();
      }, (errors) => {
        obs.error(errors);
        obs.complete();
      });
    });
  }
  //#region LẤY DANH SÁCH NHÓM KÊNH BÁN HÀNG
  GetListTransferChannelGroup() {
    let that = this;
    return new Observable<DTOResponse>((obs) => {
      that.api.connect(
        that.config.getAPIList().GetListTransferChannelGroup.method,
        that.config.getAPIList().GetListTransferChannelGroup.url,
        {}
      ).subscribe((res: any) => {
        obs.next(res);
        obs.complete();
      }, (errors) => {
        obs.error(errors);
        obs.complete();
      });
    });
  }
  //#endregion LẤY DANH SÁCH NHÓM KÊNH BÁN HÀNG
  
}