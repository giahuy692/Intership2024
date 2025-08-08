import { Injectable } from "@angular/core";
import { PS_CommonService, Ps_UtilCacheService, Ps_UtilObjectService } from "src/app/p-lib";
import { HriApiConfigService } from "./hri-api-config.service";
import { DTOQuizSession } from "../dto/DTOQuizSession.dto";
import { DTOHRManpowerVersionCus } from "../dto/DTOHRManpowerVersion.dto";
import { HriManpowerApiService } from "./hri-manpower-api.service";
import { LayoutService } from "src/app/p-app/p-layout/services/layout.service";
import { Subject, Subscription } from "rxjs";
import { DTOHRManpowerMasterCus } from "../dto/DTOHRManpowerMaster.dto";
import { takeUntil } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})

export class HriManpowerService {
    keyMPVersion: string = 'manpower-version';
    keyMPMaster: string = 'manpower-master';
    unsubscribe = new Subject<void>;
    arrUnsubscribe: Subscription[] = [];
    newManpowerMasterCus: DTOHRManpowerMasterCus = new DTOHRManpowerMasterCus();
    newManpowerVerCus: DTOHRManpowerVersionCus = new DTOHRManpowerVersionCus();

    constructor(
        private cacheService: Ps_UtilCacheService,
        private layoutService: LayoutService,
        private apiManPower: HriManpowerApiService
    ) { }

    setCache(data: DTOHRManpowerVersionCus) {
        // this.cacheService.setItem(this.key, data);
        localStorage.setItem(this.keyMPVersion, JSON.stringify(data));
        let manPowerMasterCus: DTOHRManpowerMasterCus = null;
        var APIGetHRManpowerMaster = this.apiManPower.GetHRManpowerMaster(data).pipe(takeUntil(this.unsubscribe)).subscribe(
            (res: any) => {
                if (res.ErrorString != null)
                    this.layoutService.onError(`Đã xảy ra lỗi khi lấy kế hoạch định biên: ${res.ErrorString}`);

                if (Ps_UtilObjectService.hasValue(res) && Ps_UtilObjectService.hasValue(res.ObjectReturn) && res.StatusCode == 0) {
                    manPowerMasterCus = res.ObjectReturn;
                }

                localStorage.setItem(this.keyMPMaster, JSON.stringify(manPowerMasterCus));
            }, (error) => {
                this.layoutService.onError(`Đã xảy ra lỗi khi lấy kế hoạch định biên: ${error}`);
            });
        this.arrUnsubscribe.push(APIGetHRManpowerMaster);
    }

    setNullCache() {
        localStorage.setItem(this.keyMPVersion, JSON.stringify(this.newManpowerVerCus));
        localStorage.setItem(this.keyMPMaster, JSON.stringify(this.newManpowerMasterCus));
    }
}
