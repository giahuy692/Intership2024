import { Injectable } from '@angular/core';
import { DTOConfig, DTOResponse, PS_CommonService, Ps_UtilObjectService } from 'src/app/p-lib';
import { HriApiConfigService } from './hri-api-config.service';
import {  State, toDataSourceRequest } from '@progress/kendo-data-query';
import { Observable } from 'rxjs';
import { DTOHRManpowerVersionCus } from '../dto/DTOHRManpowerVersion.dto';
import { DTOHRManpowerMasterCus } from '../dto/DTOHRManpowerMaster.dto';
import { DTOHRManpowerDetailCus } from '../dto/DTOHRManpowerDetail.dto';
import { LayoutApiConfigService } from 'src/app/p-app/p-layout/services/layout-api-config.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
  
export class HriManpowerApiService {
  constructor(
    public api: PS_CommonService,
    public config: HriApiConfigService,
    public layoutConfig: LayoutApiConfigService,
    
  ) { }

  // Lấy danh sách kỳ định biên
  GetListHRManpowerPeriod() {
    let that = this;
    return new Observable<DTOResponse>((obs) => {      
      that.api.connect(
        that.config.getAPIList().GetListHRManpowerPeriod.method,
        that.config.getAPIList().GetListHRManpowerPeriod.url, 
        JSON.stringify({}))
      .subscribe((res: any) => {
        obs.next(res);
        obs.complete();
      },
      (errors) => {
        obs.error(errors);
        obs.complete();
      });
    });
  }

  GetListHRManpowerMaster(filter: State) {
    let that = this;
    return new Observable<any>(obs => {
      that.api.connect(
        that.config.getAPIList().GetListHRManpowerMaster.method,
        that.config.getAPIList().GetListHRManpowerMaster.url,
        JSON.stringify(toDataSourceRequest(filter))
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

  DeleteHRManpowerVersion(param: { ListDTO: DTOHRManpowerVersionCus[]}) {
    let that = this;
    return new Observable<DTOResponse>(obs => {
      that.api.connect(
        that.config.getAPIList().DeleteHRManpowerVersion.method,
        that.config.getAPIList().DeleteHRManpowerVersion.url,
        JSON.stringify(param)).subscribe(
          (res: DTOResponse) => {
            obs.next(res);
            obs.complete();
          }, errors => {
            obs.error(errors);
            obs.complete();
          }
        )
    });
  }

  UpdateHRManpowerVersion(DTO: DTOHRManpowerVersionCus, Properties: string[]) {
    let that = this;
    let param = {
      DTO: DTO,
      Properties: Properties,
    };
    return new Observable<DTOResponse>(obs => {
      that.api.connect(
        that.config.getAPIList().UpdateHRManpowerVersion.method,
        that.config.getAPIList().UpdateHRManpowerVersion.url,
        JSON.stringify(param)).subscribe(
          (res: DTOResponse) => {
            obs.next(res);
            obs.complete();
          }, errors => {
            obs.error(errors);
            obs.complete();
          }
        )
    });
  }

  UpdateHRManpowerDetail(DTO: DTOHRManpowerDetailCus) {
    let that = this;
    return new Observable<DTOResponse>(obs => {
      that.api.connect(
        that.config.getAPIList().UpdateHRManpowerDetail.method,
        that.config.getAPIList().UpdateHRManpowerDetail.url,
        JSON.stringify(DTO)).subscribe(
          (res: DTOResponse) => {
            obs.next(res);
            obs.complete();
          }, errors => {
            obs.error(errors);
            obs.complete();
          }
        )
    });
  }

  UpdateHRManpowerVersionStatus(dto: { ListDTO: Array<DTOHRManpowerVersionCus>, Status: number }) {
    let that = this;
    return new Observable<DTOResponse>(obs => {
      that.api.connect(
        that.config.getAPIList().UpdateHRManpowerVersionStatus.method,
        that.config.getAPIList().UpdateHRManpowerVersionStatus.url,
        JSON.stringify(dto)).subscribe(
          (res: DTOResponse) => {
            obs.next(res);
            obs.complete();
          }, errors => {
            obs.error(errors);
            obs.complete();
          }
        )
    });
  }

  GetHRManpowerMaster(dto: DTOHRManpowerVersionCus) {
    let that = this;
    return new Observable<DTOResponse>(obs => {
      that.api.connect(
        that.config.getAPIList().GetHRManpowerMaster.method,
        that.config.getAPIList().GetHRManpowerMaster.url,
        JSON.stringify(dto)).subscribe(
          (res: DTOResponse) => {
            obs.next(res);
            obs.complete();
          }, errors => {
            obs.error(errors);
            obs.complete();
          }
        )
    });
  }

  GetHRManpowerVersion(dto: DTOHRManpowerVersionCus) {
    let that = this;
    return new Observable<DTOResponse>(obs => {
      that.api.connect(
        that.config.getAPIList().GetHRManpowerVersion.method,
        that.config.getAPIList().GetHRManpowerVersion.url,
        JSON.stringify(dto)).subscribe(
          (res: DTOResponse) => {
            obs.next(res);
            obs.complete();
          }, errors => {
            obs.error(errors);
            obs.complete();
          }
        )
    });
  }

  GetHRManpowerDetailMatrix(dto: DTOHRManpowerVersionCus) {
    let that = this;
    return new Observable<DTOResponse>(obs => {
      that.api.connect(
        that.config.getAPIList().GetHRManpowerDetailMatrix.method,
        that.config.getAPIList().GetHRManpowerDetailMatrix.url,
        JSON.stringify(dto)).subscribe(
          (res: DTOResponse) => {
            obs.next(res);
            obs.complete();
          }, errors => {
            obs.error(errors);
            obs.complete();
          }
        )
    });
  }

  UpdateHRManpowerMaster( DTO: DTOHRManpowerMasterCus, Properties: string[]  ) {
    let that = this;
    let param = {
      DTO: DTO,
      Properties: Properties,
    };
    return new Observable<DTOResponse>(obs => {
      that.api.connect(
        that.config.getAPIList().UpdateHRManpowerMaster.method,
        that.config.getAPIList().UpdateHRManpowerMaster.url,
        JSON.stringify(param)).subscribe(
          (res: DTOResponse) => {
            obs.next(res);
            obs.complete();
          }, errors => {
            obs.error(errors);
            obs.complete();
          }
        )
    });
  }

  GetListHRManpowerVersion(filter: State) {
    let that = this;
    return new Observable<DTOResponse>(obs => {
      that.api.connect(
        that.config.getAPIList().GetListHRManpowerVersion.method,
        that.config.getAPIList().GetListHRManpowerVersion.url,
        toDataSourceRequest(filter)).subscribe(
          (res: DTOResponse) => {
            obs.next(res);
            obs.complete();
          }, errors => {
            obs.error(errors);
            obs.complete();
          }
        )
    });
  }

  GetTemplate(fileName: String) {
		let that = this;

		return new Observable<any>(obs => {
			that.api.connect(that.layoutConfig.getAPIList().GetTemplate.method,
				that.layoutConfig.getAPIList().GetTemplate.url, JSON.stringify(fileName)
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


  ImportManpower(data: File, Version: number) {
    let that = this;
    const form = new FormData();
    form.append('File', data);
    form.append('Version', Version.toString());

    const headers = new HttpHeaders().append(
      'Company',
      DTOConfig.cache.companyid
    );

    return new Observable<DTOResponse>((obs) => {
      that.api
        .connect(
          that.config.getAPIList().ImportManpower.method,
          that.config.getAPIList().ImportManpower.url,
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
}
