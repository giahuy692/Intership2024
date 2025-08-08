import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PS_CommonService, DTOConfig, DTOResponse } from "src/app/p-lib";
import { EcommerceApiConfigService } from './ecommerce-api-config.service';
import { toDataSourceRequest, State } from '@progress/kendo-data-query';
import { DTODeadLink } from "../dto/DTODeadLink";
import { HttpHeaders } from "@angular/common/http";
import { EcomHachiApiConfigService } from "./ecomhachi-api-config.service";
import { DTOBackLink } from "../dto/DTOBackLink";
import { DTOShortLink } from "../dto/DTOShortLink";

@Injectable({
    providedIn: 'root'
})
export class EcomLinkAPIService {

    constructor(
        public api: PS_CommonService,
        public config: EcommerceApiConfigService,
        public hachiConfig: EcomHachiApiConfigService,
    ) { }
    //#region DEAD LINK
    GetListDeadLink(state: State) {
        let that = this;
        return new Observable<any>(obs => {//DTOResponse
            that.api.connect(that.config.getAPIList().GetListDeadLink.method,
                that.config.getAPIList().GetListDeadLink.url, JSON.stringify(
                    toDataSourceRequest(state))).subscribe(
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
    UpdateDeadLink(link: DTODeadLink) {
        let that = this;
        return new Observable<any>(obs => {//DTOResponse
            that.api.connect(that.config.getAPIList().UpdateDeadLink.method,
                that.config.getAPIList().UpdateDeadLink.url, JSON.stringify(link)).subscribe(
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
    DeleteDeadLink(links: DTODeadLink[]) {
        let that = this;
        return new Observable<any>(obs => {//DTOResponse
            that.api.connect(that.config.getAPIList().DeleteDeadLink.method,
                that.config.getAPIList().DeleteDeadLink.url, JSON.stringify(links)).subscribe(
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
    ImportDeadLink(data: File) {
        let that = this;
        var form: FormData = new FormData();
        form.append('file', data);

        var headers = new HttpHeaders()
        headers = headers.append('Company', DTOConfig.cache.companyid)

        return new Observable<any>(obs => {//DTOResponse
            that.api.connect(that.config.getAPIList().ImportDeadLink.method,
                that.config.getAPIList().ImportDeadLink.url, form, headers).subscribe(
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
    //#endregion DEAD LINK

    //#region BACK LINK
    GetListBackLink(state: State) {
        let that = this;
        return new Observable<any>(obs => {
            that.api.connect(that.hachiConfig.getAPIList().GetListBackLink.method,
                that.hachiConfig.getAPIList().GetListBackLink.url, JSON.stringify(
                    toDataSourceRequest(state))).subscribe(
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
    UpdateBackLink(link: DTOBackLink) {
        let that = this;
        return new Observable<number>(obs => {
            that.api.connect(that.hachiConfig.getAPIList().UpdateBackLink.method,
                that.hachiConfig.getAPIList().UpdateBackLink.url, JSON.stringify(link)).subscribe(
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
    DeleteBackLink(links: number[]) {
        let that = this;
        return new Observable<boolean>(obs => {
            that.api.connect(that.hachiConfig.getAPIList().DeleteBackLink.method,
                that.hachiConfig.getAPIList().DeleteBackLink.url, JSON.stringify(links)).subscribe(
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
    ResetCacheBackLink() {
        let that = this;
        var req = new XMLHttpRequest()
        req.open("GET",  that.hachiConfig.getAPIList().ResetCacheBackLink.url);
        req.send();
        return new Observable<any>(obs => {
            that.api.connect(that.hachiConfig.getAPIList().ResetCacheBackLink.method,
                that.hachiConfig.getAPIList().ResetCacheBackLink.url, {}).subscribe(
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
    ImportBackLink(data: File) {
        let that = this;
        var form: FormData = new FormData();
        form.append('file', data);

        var headers = new HttpHeaders()

        return new Observable<string>(obs => {//DTOResponse
            that.api.connect(that.hachiConfig.getAPIList().ImportBackLink.method,
                that.hachiConfig.getAPIList().ImportBackLink.url, form, headers).subscribe(
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
    CompleteImportBackLink(fileName: string) {
        let that = this;

        return new Observable<any[]>(obs => {//DTOResponse
            that.api.connect(that.hachiConfig.getAPIList().CompleteImportBackLink.method,
                that.hachiConfig.getAPIList().CompleteImportBackLink.url, JSON.stringify(fileName)).subscribe(
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
    //#endregion BACK LINK

    //#region SHORT LINK
    GetListShortLink(state: State) {
        let that = this;
        return new Observable<any>(obs => {
            that.api.connect(that.hachiConfig.getAPIList().GetListShortLink.method,
                that.hachiConfig.getAPIList().GetListShortLink.url, JSON.stringify(
                    toDataSourceRequest(state))).subscribe(
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
    UpdateShortLink(link: DTOShortLink) {
        let that = this;
        return new Observable<number>(obs => {
            that.api.connect(that.hachiConfig.getAPIList().UpdateShortLink.method,
                that.hachiConfig.getAPIList().UpdateShortLink.url, JSON.stringify(link)).subscribe(
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
    AddShortLink(link: DTOShortLink) {
        let that = this;
        return new Observable<number>(obs => {
            that.api.connect(that.hachiConfig.getAPIList().AddShortLink.method,
                that.hachiConfig.getAPIList().AddShortLink.url, JSON.stringify(link)).subscribe(
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
    DeleteShortLink(links: number[]) {
        let that = this;
        return new Observable<boolean>(obs => {
            that.api.connect(that.hachiConfig.getAPIList().DeleteShortLink.method,
                that.hachiConfig.getAPIList().DeleteShortLink.url, JSON.stringify(links)).subscribe(
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
    ResetCacheShortLink() {
        let that = this;
        var req = new XMLHttpRequest()
        req.open("GET",  that.hachiConfig.getAPIList().ResetCacheBackLink.url);
        req.send();
        return new Observable<any>(obs => {
            that.api.connect(that.hachiConfig.getAPIList().ResetCacheShortLink.method,
                that.hachiConfig.getAPIList().ResetCacheShortLink.url, {}).subscribe(
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
    ApproveShortLink(links: number[]) {
        let that = this;
        return new Observable<boolean>(obs => {
            that.api.connect(that.hachiConfig.getAPIList().ApproveShortLink.method,
                that.hachiConfig.getAPIList().ApproveShortLink.url, JSON.stringify(links)).subscribe(
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
    UnApproveShortLinkShortLink(links: number[]) {
        let that = this;
        return new Observable<boolean>(obs => {
            that.api.connect(that.hachiConfig.getAPIList().UnApproveShortLink.method,
                that.hachiConfig.getAPIList().UnApproveShortLink.url, JSON.stringify(links)).subscribe(
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
    //#endregion SHORT LINK
}