import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { State, toDataSourceRequest } from "@progress/kendo-data-query";
import { Observable } from "rxjs";
import { DTOConfig, DTOResponse, PS_CommonService, Ps_UtilObjectService } from "src/app/p-lib";
import DTOChannel, { DTOChannelProduct } from "../dto/DTOChannel.dto";
import { DTOUpdate } from "../dto/DTOUpdate";
import { EcommerceApiConfigService } from './ecommerce-api-config.service';

@Injectable({
	providedIn: 'root'
})
export class EcomChannelAPIService {

	constructor(
		public api: PS_CommonService,
		public config: EcommerceApiConfigService,
	) { }
	//channel
	GetChannelList(state: State) {
		let that = this;
		return new Observable<DTOResponse>(obs => {
			that.api.connect(that.config.getAPIList().GetChannelList.method,
				that.config.getAPIList().GetChannelList.url,
				JSON.stringify(toDataSourceRequest(state))).subscribe(
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
	GetChannel(item: DTOChannel) {
		let that = this;
		return new Observable<DTOResponse>(obs => {
			that.api.connect(that.config.getAPIList().GetChannel.method,
				that.config.getAPIList().GetChannel.url,
				JSON.stringify({ 'Code': item.Code })).subscribe(
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

	UpdateChannelStatus(obj: DTOChannel[], statusID: number) {
		let that = this;
		var param = {
			'ListDTO': obj,
			'StatusID': statusID
		}
		return new Observable<DTOResponse>(obs => {
			that.api.connect(that.config.getAPIList().UpdateChannelStatus.method,
				that.config.getAPIList().UpdateChannelStatus.url,
				JSON.stringify(param)).subscribe(
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
	UpdateChannel(obj: DTOChannel, prop: string[]) {
		let that = this;
		var param: DTOUpdate = {
			'DTO': obj,
			'Properties': prop
		}
		return new Observable<DTOResponse>(obs => {
			that.api.connect(that.config.getAPIList().UpdateChannel.method,
				that.config.getAPIList().UpdateChannel.url,
				JSON.stringify(param, (k, v) => Ps_UtilObjectService.parseDateToString(k, v, [])))
				.subscribe(
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

	DeleteChannel(obj: DTOChannel[]) {
		let that = this;
		return new Observable<DTOResponse>(obs => {
			that.api.connect(that.config.getAPIList().DeleteChannel.method,
				that.config.getAPIList().DeleteChannel.url,
				JSON.stringify(obj)).subscribe(
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
	//product
	GetListChannelProduct(state: State) {
		let that = this;
		return new Observable<DTOResponse>(obs => {
			that.api.connect(that.config.getAPIList().GetListChannelProduct.method,
				that.config.getAPIList().GetListChannelProduct.url,
				JSON.stringify(toDataSourceRequest(state))).subscribe(
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
	GetChannelProduct(item: DTOChannelProduct) {
		let that = this;
		return new Observable<DTOResponse>(obs => {
			that.api.connect(that.config.getAPIList().GetChannelProduct.method,
				that.config.getAPIList().GetChannelProduct.url,
				JSON.stringify({ 'Code': item.Code })).subscribe(
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
	GetChannelProductByCode(barcode: string, channel: number) {
		let that = this;
		var param = {
			'Barcode': barcode,
			'Channel': channel
		}
		return new Observable<DTOResponse>(obs => {
			that.api.connect(that.config.getAPIList().GetChannelProductByCode.method,
				that.config.getAPIList().GetChannelProductByCode.url, JSON.stringify(param)).subscribe(
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

	UpdateStatusChannelProduct(obj: DTOChannelProduct[], statusID: number) {
		let that = this;
		var param = {
			'ListDTO': obj,
			'StatusID': statusID
		}
		return new Observable<DTOResponse>(obs => {
			that.api.connect(that.config.getAPIList().UpdateStatusChannelProduct.method,
				that.config.getAPIList().UpdateStatusChannelProduct.url,
				JSON.stringify(param)).subscribe(
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
	UpdateChannelProduct(obj: DTOChannelProduct, prop: string[]) {
		let that = this;
		var param: DTOUpdate = {
			'DTO': obj,
			'Properties': prop
		}
		return new Observable<DTOResponse>(obs => {
			that.api.connect(that.config.getAPIList().UpdateChannelProduct.method,
				that.config.getAPIList().UpdateChannelProduct.url,
				JSON.stringify(param, (k, v) => Ps_UtilObjectService.parseDateToString(k, v, [])))
				.subscribe(
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

	DeleteChannelProduct(obj: DTOChannelProduct[]) {
		let that = this;
		return new Observable<DTOResponse>(obs => {
			that.api.connect(that.config.getAPIList().DeleteChannelProduct.method,
				that.config.getAPIList().DeleteChannelProduct.url,
				JSON.stringify(obj)).subscribe(
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

	UpdateProductQuantity(listProdID: number[]) {
		let that = this;
		return new Observable<DTOResponse>(obs => {
			that.api.connect(that.config.getAPIList().UpdateProductQuantity.method,
				that.config.getAPIList().UpdateProductQuantity.url, JSON.stringify(listProdID)).subscribe(
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
	//
	ImportChannelProduct(data: File, channel: number) {
		let that = this;
		var form: FormData = new FormData();
		form.append('file', data);
		form.append('Channel', channel.toString());

		var headers = new HttpHeaders()
		headers = headers.append('Company', DTOConfig.cache.companyid)
		headers = headers.append('DataPermission', DTOConfig.cache.dataPermission)

		return new Observable<DTOResponse>(obs => {
			that.api.connect(that.config.getAPIList().ImportChannelProduct.method,
				that.config.getAPIList().ImportChannelProduct.url, form, headers).subscribe(
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
