import { Injectable } from "@angular/core";
import { PS_CommonService, Ps_UtilObjectService } from "src/app/p-lib";
import { PurApiConfigService } from './pur-api-config.service';
import { Observable } from 'rxjs';
import { DTOExportReport, DTOPurReport } from '../dto/DTOPurReport';

@Injectable({
	providedIn: 'root'
})
export class PurAPIService {

	constructor(
		public api: PS_CommonService,
		public config: PurApiConfigService,
	) { }

	GetReports(functionID: number) {
		let that = this;
		return new Observable<any>(obs => {
			that.api.connect(that.config.getAPIList().GetReports.method,
				that.config.getAPIList().GetReports.url, JSON.stringify({ FunctionID: functionID })).subscribe(
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

	ExportReport(dto: DTOExportReport) {
		let that = this;
		//DataPermission của api trả về là mảng string, mỗi string có dạng string 1 dãy số
		//["1,2,3","4,5","6",] //có thể có ký tự dư
		var aa = dto.DataPermission.filter(Ps_UtilObjectService.distinct).map(s => Ps_UtilObjectService.replaceAll(JSON.stringify(s), '"', ''))
		var bb = aa.join(',')
		var cc = bb.split(',')
		cc = cc.filter(s => Ps_UtilObjectService.hasValueString(s)).filter(Ps_UtilObjectService.distinct)

		dto.DataPermission = cc

		return new Observable<any>(obs => {
			that.api.connect(that.config.getAPIList().ExportReport.method,
				that.config.getAPIList().ExportReport.url, JSON.stringify(dto)
				, null, null, 'response', 'blob').subscribe(
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
	
	GetDataDropdown(dto: DTOPurReport) {
		let that = this;
		return new Observable<any>(obs => {
			that.api.connect(that.config.getAPIList().GetDataDropdown.method,
				that.config.getAPIList().GetDataDropdown.url, JSON.stringify(dto)).subscribe(
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
}