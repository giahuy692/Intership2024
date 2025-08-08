import { Injectable } from '@angular/core';
import { State, toDataSourceRequest } from '@progress/kendo-data-query';
import { Observable } from 'rxjs';
import { DTOUpdate } from 'src/app/p-app/p-ecommerce/shared/dto/DTOUpdate';
import {
  DTOConfig,
  DTOResponse,
  PS_CommonService,
  Ps_UtilObjectService,
} from 'src/app/p-lib';
import { MarketingApiConfigService } from './marketing-api-config.service';
import { DTOMAConfig } from '../dto/DTOMAConfig.dto';
import { DTOCFFolder } from 'src/app/p-app/p-layout/dto/DTOCFFolder.dto';

@Injectable({
  providedIn: 'root'
})
export class MarConfigApiService {

  constructor(
    public api: PS_CommonService,
    public config: MarketingApiConfigService
  ) { }

  GetListWebConfig(state: State) {
    let that = this;

    return new Observable<DTOResponse>((obs) => {
      that.api
        .connect(
          that.config.getAPIList().GetListWebConfig.method,
          that.config.getAPIList().GetListWebConfig.url,
          JSON.stringify(toDataSourceRequest(state))
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

  GetWebConfig(code: number) {
    let that = this;

    return new Observable<DTOResponse>((obs) => {
      that.api
        .connect(
          that.config.getAPIList().GetWebConfig.method,
          that.config.getAPIList().GetWebConfig.url,
          JSON.stringify(code)
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

  UpdateWebConfig(item: DTOMAConfig) {
    let that = this;

    return new Observable<DTOResponse>((obs) => {
      that.api
        .connect(
          that.config.getAPIList().UpdateWebConfig.method,
          that.config.getAPIList().UpdateWebConfig.url,
          JSON.stringify(item, (k, v) =>
            Ps_UtilObjectService.parseLocalDateTimeToString(k, v, ['StartDate', 'FinishDate'])
          )
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

  UpdateStatusWebConfig(item: DTOMAConfig[], StatusID: number) {
    let that = this;
    var param = {
      ListDTO: item,
      StatusID: StatusID,
    };

    return new Observable<DTOResponse>((obs) => {
      that.api
        .connect(
          that.config.getAPIList().UpdateStatusWebConfig.method,
          that.config.getAPIList().UpdateStatusWebConfig.url,
          JSON.stringify(param)
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

  DeleteWebConfig(item: DTOMAConfig[]) {
    let that = this;
    return new Observable<DTOResponse>((obs) => {
      that.api
        .connect(
          that.config.getAPIList().DeleteWebConfig.method,
          that.config.getAPIList().DeleteWebConfig.url,
          JSON.stringify(item)
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

  GetFolderWithFile(childPath: string = '', id: number) {
    let that = this;
    //nếu có id > 0 thì get folder root, nếu có path thì get folder con
    let param = {
      'ID': Ps_UtilObjectService.hasValueString(childPath) ? 0 : id,//news = 8
      'Folder': childPath
    }
    return new Observable<DTOCFFolder>(obs => {
      that.api.connect(that.config.getAPIList().GetFolderWithFile.method,
        that.config.getAPIList().GetFolderWithFile.url, JSON.stringify(param)).subscribe(
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

  GetListWebConfigType() {
    let that = this;

    return new Observable<DTOResponse>((obs) => {
      that.api.connect(
        that.config.getAPIList().GetListWebConfigType.method,
        that.config.getAPIList().GetListWebConfigType.url, {}
      ).subscribe(
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
}
