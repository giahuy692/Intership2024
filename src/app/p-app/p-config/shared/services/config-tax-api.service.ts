import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PS_CommonService, Ps_UtilObjectService, DTOResponse, DTOConfig } from "src/app/p-lib";
import { ConfigApiConfigService } from './config-api-config.service';
import { toDataSourceRequest, State } from '@progress/kendo-data-query';
import { HttpHeaders } from "@angular/common/http";
import { DTODetailConfProduct } from "../dto/DTOConfProduct";
import { DTOTaxGroup } from "../dto/DTOTaxGroup";
import { DTOTax } from "../dto/DTOTax";
import { LayoutApiConfigService } from "src/app/p-app/p-layout/services/layout-api-config.service";

@Injectable({
    providedIn: 'root'
})
export class ConfigTaxApiService {

    constructor(
        public api: PS_CommonService,
        public config: ConfigApiConfigService,
        public layoutConfig: LayoutApiConfigService,
    ) { }

    /**
     * Lấy danh sách nhóm khai báo hải quan
     * @param filter filter
     */
    GetListTaxGroup(filter: State) {
        let that = this;
        return new Observable<DTOResponse>(obs => {
            this.api.connect(
                that.config.getAPIList().GetListTaxGroup.method,
                that.config.getAPIList().GetListTaxGroup.url,
                JSON.stringify(toDataSourceRequest(filter))
            ).subscribe(
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

    /**
     * Cập nhật thông tin nhóm khai báo hải quan
     * @param DTO DTOTaxGroup
     * @returns 
     */
    UpdateTaxGroup(DTO: DTOTaxGroup) {
        let that = this;
        return new Observable<DTOResponse>(obs => {
            this.api.connect(
                that.config.getAPIList().UpdateTaxGroup.method,
                that.config.getAPIList().UpdateTaxGroup.url,
                JSON.stringify(DTO)
            ).subscribe(
                (res: DTOResponse) => {
                    obs.next(res);
                    obs.complete();
                }, errors => {
                    obs.error(errors);
                    obs.complete();
                }
            )
        })
    }

    /**
     * Xóa nhóm khai báo hải quan
     * @param DTO DTOTaxGroup
     * @returns 
     */
    DeleteTaxGroup(DTO: DTOTaxGroup[]) {
        let that = this;
        return new Observable<DTOResponse>(obs => {
            this.api.connect(
                that.config.getAPIList().DeleteTaxGroup.method,
                that.config.getAPIList().DeleteTaxGroup.url,
                JSON.stringify(DTO)
            ).subscribe(
                (res: DTOResponse) => {
                    obs.next(res);
                    obs.complete();
                }, errors => {
                    obs.error(errors);
                    obs.complete();
                }
            )
        })
    }

    /**
     * Xóa nhóm khai báo hải quan
     * @param DTO DTOTaxGroup
     * @returns 
     */
    UpdateTaxGroupStatus(DTO: DTOTaxGroup[], statusID: number) {
        let that = this;
        let param = {
            ListDTO: DTO,
            StatusID: statusID
        }
        return new Observable<DTOResponse>(obs => {
            this.api.connect(
                that.config.getAPIList().UpdateTaxGroupStatus.method,
                that.config.getAPIList().UpdateTaxGroupStatus.url,
                JSON.stringify(param)
            ).subscribe(
                (res: DTOResponse) => {
                    obs.next(res);
                    obs.complete();
                }, errors => {
                    obs.error(errors);
                    obs.complete();
                }
            )
        })
    }

    /**
     * Cập nhật thông tin khai quan
     * @param DTO DTOTax
     * @returns 
     */
    UpdateTax(DTO: DTOTax) {
        let that = this;
        return new Observable<DTOResponse>(obs => {
            this.api.connect(
                that.config.getAPIList().UpdateTax.method,
                that.config.getAPIList().UpdateTax.url,
                JSON.stringify(DTO)
            ).subscribe(
                (res: DTOResponse) => {
                    obs.next(res);
                    obs.complete();
                }, errors => {
                    obs.error(errors);
                    obs.complete();
                }
            )
        })
    }

    /**
     * Cập nhật trạng thái khai quan
     * @param DTO DTOTax
     * @returns 
     */
    UpdateTaxStatus(DTO: DTOTax[], statusID: number) {
        let that = this;
        let param = {
            ListDTO: DTO,
            StatusID: statusID
        }
        return new Observable<DTOResponse>(obs => {
            this.api.connect(
                that.config.getAPIList().UpdateTaxStatus.method,
                that.config.getAPIList().UpdateTaxStatus.url,
                JSON.stringify(param)
            ).subscribe(
                (res: DTOResponse) => {
                    obs.next(res);
                    obs.complete();
                }, errors => {
                    obs.error(errors);
                    obs.complete();
                }
            )
        })
    }

    /**
     * Lấy danh sách khai quan
     * @param filter filter
     */
    GetListTax(filter: State) {
        let that = this;
        return new Observable<DTOResponse>(obs => {
            this.api.connect(
                that.config.getAPIList().GetListTax.method,
                that.config.getAPIList().GetListTax.url,
                JSON.stringify(toDataSourceRequest(filter))
            ).subscribe(
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

    /**
     * Xóa khai báo hải quan
     * @param DTO DTOTaxGroup
     * @returns 
     */
    DeleteTax(DTO: DTOTax[]) {
        let that = this;
        return new Observable<DTOResponse>(obs => {
            this.api.connect(
                that.config.getAPIList().DeleteTax.method,
                that.config.getAPIList().DeleteTax.url,
                JSON.stringify(DTO)
            ).subscribe(
                (res: DTOResponse) => {
                    obs.next(res);
                    obs.complete();
                }, errors => {
                    obs.error(errors);
                    obs.complete();
                }
            )
        })
    }

    /**
     * Xuất template khai quan
     * @param fileName 
     * @returns 
     */
    GetTemplate(fileName: string) {
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

    /**
     * Import file excel khai quan
     * @param data 
     * @returns 
     */
    ImportTax(data: File) {
        let that = this;
        var form: FormData = new FormData();
        form.append('file', data);

        var headers = new HttpHeaders()
        headers = headers.append('Company', DTOConfig.cache.companyid)

        return new Observable<DTOResponse>(obs => {
            that.api.connect(that.config.getAPIList().ImportTax.method,
                that.config.getAPIList().ImportTax.url, form, headers).subscribe(
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
 * Lấy đơn vị sản phẩm
 * @param gridState : State
 * @returns 
 */
    GetListPackingUnit(gridState: State) {
        let that = this;
        return new Observable<DTOResponse>(obs => {
            that.api.connect(that.config.getAPIList().GetListPackingUnit.method,
                that.config.getAPIList().GetListPackingUnit.url,
                JSON.stringify(toDataSourceRequest(gridState))).subscribe(
                    (res: any) => {
                        obs.next(res);
                        obs.complete();
                    }, errors => {
                        obs.error(errors);
                        obs.complete();
                    }
                )
        })
    }


/***
 * Lấy danh sách xuất xứ
 */
  GetListCountry() {
    let that = this;
    return new Observable<DTOResponse>(obs => {
      that.api.connect(that.config.getAPIList().GetListCountry.method,
        that.config.getAPIList().GetListCountry.url,
        JSON.stringify(toDataSourceRequest({}))).subscribe(
          (res: any) => {
            obs.next(res);
            obs.complete();
          }, errors => {
            obs.error(errors);
            obs.complete();
          }
        )
    })
  }
}