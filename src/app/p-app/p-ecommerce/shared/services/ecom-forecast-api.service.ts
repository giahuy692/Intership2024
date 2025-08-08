import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { State, toDataSourceRequest } from '@progress/kendo-data-query';
import { Observable } from 'rxjs';
import { DTOConfig, DTOResponse, PS_CommonService, Ps_UtilObjectService, } from 'src/app/p-lib';
import { DTOForecast } from '../dto/DTOForecast';
import { DTOForecastDetail } from '../dto/DTOForecastDetail';
import { DTOUpdate } from '../dto/DTOUpdate';
import { EcommerceApiConfigService } from './ecommerce-api-config.service';

@Injectable({
  providedIn: 'root',
})
export class EcomForecastAPIService {
  constructor(
    public api: PS_CommonService,
    public config: EcommerceApiConfigService
  ) { }
  //#region KẾ HOẠCH PHÂN BỔ TỒN
  GetListForecast(state: State) {
    let that = this;
    return new Observable<DTOResponse>((obs) => {
      that.api.connect(
        that.config.getAPIList().GetListForecast.method,
        that.config.getAPIList().GetListForecast.url,
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

  GetForecast(item: DTOForecast) {
    let that = this;
    return new Observable<DTOResponse>((obs) => {
      that.api.connect(
        that.config.getAPIList().GetForecast.method,
        that.config.getAPIList().GetForecast.url,
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

  UpdateForecastStatus(obj: DTOForecast[], statusID: number) {
    let that = this;
    var param = {
      ListDTO: obj,
      StatusID: statusID,
    };
    return new Observable<DTOResponse>((obs) => {
      that.api.connect(
        that.config.getAPIList().UpdateForecastStatus.method,
        that.config.getAPIList().UpdateForecastStatus.url,
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

  UpdateForecast(obj: DTOForecast, prop: string[]) {
    let that = this;
    var param: DTOUpdate = {
      DTO: obj,
      Properties: prop,
    };
    return new Observable<DTOResponse>((obs) => {
      that.api.connect(
        that.config.getAPIList().UpdateForecast.method,
        that.config.getAPIList().UpdateForecast.url,
        JSON.stringify(param, (k, v) =>
          Ps_UtilObjectService.parseLocalDateTimeToString(k, v, [], ['EffDate'])
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

  DeleteForecast(obj: DTOForecast[]) {
    let that = this;
    return new Observable<DTOResponse>((obs) => {
      that.api.connect(
        that.config.getAPIList().DeleteForecast.method,
        that.config.getAPIList().DeleteForecast.url,
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
  //#endregion KẾ HOẠCH PHÂN BỔ TỒN

  //#region CHI TIẾT KẾ HOẠCH PHÂN BỔ TỒN
  GetListForecastDetail(state: State) {
    let that = this;
    return new Observable<DTOResponse>((obs) => {
      that.api.connect(
        that.config.getAPIList().GetListForecastDetail.method,
        that.config.getAPIList().GetListForecastDetail.url,
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

  GetForecastDetail(item: DTOForecastDetail) {
    let that = this;
    return new Observable<DTOResponse>((obs) => {
      that.api.connect(
        that.config.getAPIList().GetForecastDetail.method,
        that.config.getAPIList().GetForecastDetail.url,
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

  GetForecastDetailByBarcode(item: DTOForecastDetail) {
    let that = this;
    return new Observable<DTOResponse>((obs) => {
      that.api.connect(
        that.config.getAPIList().GetForecastDetailByBarcode.method,
        that.config.getAPIList().GetForecastDetailByBarcode.url,
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

  UpdateForecastDetail(obj: DTOForecastDetail) {
    let that = this;
    return new Observable<DTOResponse>((obs) => {
      that.api.connect(
        that.config.getAPIList().UpdateForecastDetail.method,
        that.config.getAPIList().UpdateForecastDetail.url,
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

  UpdateForecastDetailStatus(obj: DTOForecastDetail[], statusID: number) {
    let that = this;
    var param = {
      ListDTO: obj,
      StatusID: statusID,
    };
    return new Observable<DTOResponse>((obs) => {
      that.api.connect(
        that.config.getAPIList().UpdateForecastDetailStatus.method,
        that.config.getAPIList().UpdateForecastDetailStatus.url,
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

  DeleteForecastDetail(obj: DTOForecastDetail[]) {
    let that = this;
    return new Observable<DTOResponse>((obs) => {
      that.api.connect(
        that.config.getAPIList().DeleteForecastDetail.method,
        that.config.getAPIList().DeleteForecastDetail.url,
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
  //#endregion CHI TIẾT KẾ HOẠCH PHÂN BỔ TỒN
  ImportForecastDetail(data: File, forecast: number) {
    let that = this;
    var form: FormData = new FormData();
    form.append('file', data);
    form.append('Forecast', forecast.toString());

    var headers = new HttpHeaders();
    headers = headers.append('Company', DTOConfig.cache.companyid);
    headers = headers.append('DataPermission', DTOConfig.cache.dataPermission);

    return new Observable<DTOResponse>((obs) => {
      that.api.connect(
        that.config.getAPIList().ImportForecastDetail.method,
        that.config.getAPIList().ImportForecastDetail.url,
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

  ResetStock(forecast: DTOForecast, detail: DTOForecastDetail[] = []) {
    let that = this;
    var param = {
      DTO: forecast,
      ListDTO: detail
    }
    return new Observable<DTOResponse>((obs) => {
      that.api.connect(
        that.config.getAPIList().ResetStock.method,
        that.config.getAPIList().ResetStock.url,
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

  ResetStock3H(forecast: DTOForecast, detail: DTOForecastDetail[] = []) {
    let that = this;
    var param = {
      DTO: forecast,
      ListDTO: detail
    }
    return new Observable<DTOResponse>((obs) => {
      that.api.connect(
        that.config.getAPIList().ResetStock3H.method,
        that.config.getAPIList().ResetStock3H.url,
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
  
}