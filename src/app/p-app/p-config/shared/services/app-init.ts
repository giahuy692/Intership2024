import { NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { EnumDashboard } from 'src/app/p-lib/enum/dashboard.enum';
import { EnumConfig } from 'src/app/p-lib/enum/config.enum';
import { EnumEcommerce } from 'src/app/p-lib/enum/ecommerce.enum';
import { EnumHR } from 'src/app/p-lib/enum/hr.enum';
import { EnumLayout } from 'src/app/p-lib/enum/layout.enum';
import { EnumLGT } from 'src/app/p-lib/enum/lgt.enum';
import { EnumMarketing } from 'src/app/p-lib/enum/marketing.enum';
import { EnumPurchase } from 'src/app/p-lib/enum/purchase.enum';
import { EnumSales } from 'src/app/p-lib/enum/sales.enum';
import { EnumWebHachi } from 'src/app/p-lib/enum/webhachi.enum';
import {
    DTOConfig,
    PS_CommonService,
    Ps_AuthService,
    Ps_UtilCacheService,
    DTOToken,

} from '../../../../p-lib';
import { Ps_AuthBearerService } from './auth.service.bearer';
import { EnumDeveloper } from 'src/app/p-lib/enum/developer.enum';
import { DTODevAPI } from 'src/app/p-app/p-developer/shared/dto/DTOAPI';

export class AppInit {
    static init(libCommon: PS_CommonService,
        auth: Ps_AuthService,
        cache: Ps_UtilCacheService,
        zone: NgZone,
        router: Router): Observable<boolean> {

        let that = this;
        return new Observable(obs => {
            zone.runOutsideAngular(() => {
                that.SetGlobalConfig();
                Ps_AuthBearerService.init(cache, libCommon);
                libCommon.init().subscribe(s => {
                    //auth.getCacheToken().subscribe(res=>{
                    obs.next(true);
                    obs.complete();
                    // },
                    // (e)=>{
                    //     obs.next(true);
                    //     obs.complete();
                    // });


                });

            });
        })

    }
    static SetGlobalConfig() {
        if (document['myparam']) {
            let data = document['myparam']();

            if (data != undefined && data != null) {
                let objConfig = {
                    idServer: {
                        client_id: "admin",
                        client_secret: "adminsecret",
                        scope: "adminapi offline_access",
                        grant_type: "password",
                    },
                    Authen: {
                        isLogin: false,
                        token: new DTOToken(),
                        refreshTokenInProgress: false,
                        refreshTokenSubject: new BehaviorSubject<any>(null),
                    },
                    appInfo: {
                        apiid: data.apiid,
                        urlLogin: data.urlLogin,
                        apiec: data.apiec,
                        apicnb: data.apicnb,
                        apiconf: data.apiconf,
                        apibi: data.apibi,
                        apimar: data.apimar,
                        apierp: data.apierp,
                        apiwms: data.apiwms,
                        apires: data.apires,
                        apisyn: data.apisyn,
                        apiecHachi: data.apiecHachi,
                        apiHachi: data.apiHachi,
                        res: data.res,
                    },
                    cache: {
                        timerPermission: 0,
                        timerApi: 0,
                        companyid: "1"
                    }
                };
                Object.assign(DTOConfig, objConfig);
            }
        }

        if (document['apiConfig']) {
            let apiConfig = document['apiConfig']();

            if (apiConfig != undefined && apiConfig != null) {
                let layout = apiConfig.layout
                let webhachi = apiConfig.webhachi
                let config = apiConfig.config
                let dev = apiConfig.dev
                let mar = apiConfig.mar
                let ecommerce = apiConfig.ecommerce
                let hri = apiConfig.hri
                let log = apiConfig.log
                let pur = apiConfig.pur
                let sales = apiConfig.sales
                let dashboard = apiConfig.dashboard
                let org = apiConfig.org

                Object.assign(EnumLayout, layout);
                Object.assign(EnumWebHachi, webhachi);
                Object.assign(EnumConfig, config);
                Object.assign(EnumDeveloper, dev);
                Object.assign(EnumMarketing, mar);
                Object.assign(EnumEcommerce, ecommerce);
                Object.assign(EnumHR, hri);
                Object.assign(EnumHR, org);
                Object.assign(EnumLGT, log);
                Object.assign(EnumPurchase, pur);
                Object.assign(EnumSales, sales);
                Object.assign(EnumDashboard, dashboard);

                //nhiều module sẽ bị null vì đã comment api trong html ngoại trừ layout và webhachi
                var param: DTODevAPI[] = []
                param.push(
                    ...Object.values(layout).map((s: string) => { return new DTODevAPI(s, 'layout') }),
                    ...Object.values(webhachi).map((s: string) => { return new DTODevAPI(s, 'webhachi') }),
                    ...Object.values(config).map((s: string) => { return new DTODevAPI(s, 'config') }),
                    ...Object.values(dev).map((s: string) => { return new DTODevAPI(s, 'dev') }),
                    ...Object.values(mar).map((s: string) => { return new DTODevAPI(s, 'mar') }),
                    ...Object.values(ecommerce).map((s: string) => { return new DTODevAPI(s, 'ecommerce') }),
                    ...Object.values(hri).map((s: string) => { return new DTODevAPI(s, 'hri') }),
                    ...Object.values(log).map((s: string) => { return new DTODevAPI(s, 'log') }),
                    ...Object.values(pur).map((s: string) => { return new DTODevAPI(s, 'pur') }),
                    ...Object.values(sales).map((s: string) => { return new DTODevAPI(s, 'sales') }),
                    ...Object.values(dashboard).map((s: string) => { return new DTODevAPI(s, 'dashboard') }),
                    ...Object.values(org).map((s: string) => { return new DTODevAPI(s, 'org') }),
                )
                document['listApi'] = param
            }
        }
    }
}