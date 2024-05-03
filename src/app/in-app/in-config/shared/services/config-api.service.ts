import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { toDataSourceRequest, State } from '@progress/kendo-data-query';
import { DTOResponse } from "src/app/in-lib/dto/dto.response";
import { HttpClient } from "@angular/common/http";
import { EnumConfig } from "src/app/in-lib/enum/config.enum";

@Injectable({
        providedIn: 'root'
})
export class ConfigAPIService {

        constructor(
                private http: HttpClient,
        ) { }
        //Product
        GetProduct(param: any) {
                return new Observable<DTOResponse>(obs => {
                        this.http.post<any>(EnumConfig.GetListProduct, JSON.stringify(param))
                        .subscribe
                                ((res: any) => {
                                        obs.next(res);
                                        obs.complete();
                                }, (errors: any) => {
                                        obs.error(errors);
                                        obs.complete();
                                })
                });
        }
}