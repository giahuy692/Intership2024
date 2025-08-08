import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PS_CommonService } from "src/app/p-lib";
import { toDataSourceRequest, State } from '@progress/kendo-data-query';
import { DTOSEO } from "../dto/DTOSEO";
import { MarketingApiConfigService } from "./marketing-api-config.service";
import { HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class MarSEOAPIService {

    constructor(
        public api: PS_CommonService,
        public config: MarketingApiConfigService,
    ) { }
    //#region BACK LINK
    GetListSEO(state: State) {
        let that = this;
        return new Observable<any>(obs => {
            that.api.connect(that.config.getAPIList().GetListSEO.method,
                that.config.getAPIList().GetListSEO.url, JSON.stringify(
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
    UpdateSEO(link: DTOSEO) {
        let that = this;
        return new Observable<number>(obs => {
            that.api.connect(that.config.getAPIList().UpdateSEO.method,
                that.config.getAPIList().UpdateSEO.url, JSON.stringify(link)).subscribe(
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
    ResetCacheSEO() {
        let that = this;
        var req = new XMLHttpRequest()
        req.open("GET",  that.config.getAPIList().ResetCacheSEO.url);
        req.send();

        var header = new HttpHeaders()

        return new Observable<any>(obs => {
            that.api.connect(that.config.getAPIList().ResetCacheSEO.method,
                that.config.getAPIList().ResetCacheSEO.url, {}, header).subscribe(
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
}