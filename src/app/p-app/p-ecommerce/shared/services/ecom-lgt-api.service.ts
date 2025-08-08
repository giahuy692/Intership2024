import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PS_CommonService, Ps_UtilObjectService } from "src/app/p-lib";
import { EcommerceApiConfigService } from './ecommerce-api-config.service';
import { CartOrderStatus } from '../dto/CartOrderStatus';
import { CartOrderType } from '../dto/CartOrderType';
import { DTOOrderDetail } from '../dto/DTOOrderDetail';
import { DTOUpdate } from '../dto/DTOUpdate';
import { DTOCoupon } from '../dto/DTOCoupon';
import { DTOECOMCart } from '../dto/DTOECOMCart.dto';
import { toDataSourceRequest, State } from '@progress/kendo-data-query';
import { CartAssignPickOrders } from '../dto/CartAssignPickOrders';
import { DTOShipper } from "../dto/DTOShipper";
import { EcomHachiApiConfigService } from "./ecomhachi-api-config.service";

@Injectable({
	providedIn: 'root'
})
export class EcomLgtAPIService {

	constructor(
		public api: PS_CommonService,
		public config: EcommerceApiConfigService,
		public hachiConfig: EcomHachiApiConfigService,
	) { }
	//List
	GetListOrders(dataSrcReq) {
		let that = this;
		return new Observable<any>(obs => {//DTOResponse
			that.api.connect(that.config.getAPIList().GetListOrdersLgt.method,
				that.config.getAPIList().GetListOrdersLgt.url, JSON.stringify(dataSrcReq)).subscribe(
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

	// GetListOrdersCount() {
	// 	let that = this;
	// 	return new Observable<any>(obs => {//DTOResponse
	// 		that.api.connect(that.config.getAPIList().GetListOrdersCount.method,
	// 			that.config.getAPIList().GetListOrdersCount.url, {}).subscribe(
	// 				(res: any) => {
	// 					obs.next(res);
	// 					obs.complete();
	// 				}, errors => {
	// 					obs.error(errors);
	// 					obs.complete();
	// 				}
	// 			)
	// 	});
	// }
	// GetListOrderStatus() {
	// 	let that = this;
	// 	return new Observable<any>(obs => {//DTOResponse
	// 		that.api.connect(that.config.getAPIList().GetListOrderStatus.method,
	// 			that.config.getAPIList().GetListOrderStatus.url, {}).subscribe(
	// 				(res: any) => {
	// 					obs.next(res);
	// 					obs.complete();
	// 				}, errors => {
	// 					obs.error(errors);
	// 					obs.complete();
	// 				}
	// 			)
	// 	});
	// }

	// GetOrderTypeID() {
	// 	let that = this;
	// 	return new Observable<any>(obs => {//DTOResponse
	// 		that.api.connect(that.config.getAPIList().GetOrderTypeID.method,
	// 			that.config.getAPIList().GetOrderTypeID.url, {}).subscribe(
	// 				(res: any) => {
	// 					obs.next(res);
	// 					obs.complete();
	// 				}, errors => {
	// 					obs.error(errors);
	// 					obs.complete();
	// 				}
	// 			)
	// 	});
	// }

	// GetListOrderWHPickup() {
	// 	let that = this;
	// 	return new Observable<any>(obs => {//DTOResponse
	// 		that.api.connect(that.config.getAPIList().GetListOrderWHPickup.method,
	// 			that.config.getAPIList().GetListOrderWHPickup.url, {}).subscribe(
	// 				(res: any) => {
	// 					obs.next(res);
	// 					obs.complete();
	// 				}, errors => {
	// 					obs.error(errors);
	// 					obs.complete();
	// 				}
	// 			)
	// 	});
	// }
	// GetListOrdersByProduct(detail: DTOOrderDetail) {
	// 	let that = this;
	// 	return new Observable<any>(obs => {//DTOResponse
	// 		that.api.connect(that.config.getAPIList().GetListOrdersByProduct.method,
	// 			that.config.getAPIList().GetListOrdersByProduct.url, JSON.stringify(detail)).subscribe(
	// 				(res: any) => {
	// 					obs.next(res);
	// 					obs.complete();
	// 				}, errors => {
	// 					obs.error(errors);
	// 					obs.complete();
	// 				}
	// 			)
	// 	});
	// }
	//Order

	GetOrder(CartID: number) {
		let that = this;
		return new Observable<any>(obs => {//DTOResponse
			that.api.connect(that.config.getAPIList().GetOrderLgt.method,
				that.config.getAPIList().GetOrderLgt.url,
				 JSON.stringify({ 'CartID': CartID })).subscribe(
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

	// GetOrderStatus(CartID: number) {
	// 	let that = this;
	// 	return new Observable<any>(obs => {//DTOResponse
	// 		that.api.connect(that.config.getAPIList().GetOrderStatus.method,
	// 			that.config.getAPIList().GetOrderStatus.url, JSON.stringify({ 'CartID': CartID })).subscribe(
	// 				(res: any) => {
	// 					obs.next(res);
	// 					obs.complete();
	// 				}, errors => {
	// 					obs.error(errors);
	// 					obs.complete();
	// 				}
	// 			)
	// 	});
	// }
	//Detail

	GetOrderDetails(CartID: number) {
		let that = this;
		return new Observable<any>(obs => {//DTOResponse
			that.api.connect(that.config.getAPIList().GetOrderDetailsLgt.method,
				that.config.getAPIList().GetOrderDetailsLgt.url, JSON.stringify({ 'CartID': CartID })).subscribe(
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

	// GetOrderDetailByID(orderDetail: DTOOrderDetail) {
	// 	let that = this;
	// 	return new Observable<any>(obs => {//DTOResponse
	// 		that.api.connect(that.config.getAPIList().GetOrderDetailByID.method,
	// 			that.config.getAPIList().GetOrderDetailByID.url,
	// 			JSON.stringify(orderDetail))
	// 			.subscribe(
	// 				(res: any) => {
	// 					obs.next(res);
	// 					obs.complete();
	// 				}, errors => {
	// 					obs.error(errors);
	// 					obs.complete();
	// 				}
	// 			)
	// 	});
	// }
	//Modify

	UpdateStatus(obj) {
		let that = this;
		return new Observable<any>(obs => {//DTOResponse
			that.api.connect(that.config.getAPIList().UpdateStatusLgt.method,
				that.config.getAPIList().UpdateStatusLgt.url,
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
	UpdateListStatus(obj: CartOrderStatus[]) {
		let that = this;
		return new Observable<any>(obs => {//DTOResponse
			that.api.connect(that.config.getAPIList().UpdateListStatusLgt.method,
				that.config.getAPIList().UpdateListStatusLgt.url,
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

	// UpdateListOrderType(obj: CartOrderType[]) {
	// 	let that = this;
	// 	return new Observable<any>(obs => {//DTOResponse
	// 		that.api.connect(that.config.getAPIList().UpdateListOrderType.method,
	// 			that.config.getAPIList().UpdateListOrderType.url, JSON.stringify(obj)).subscribe(
	// 				(res: any) => {
	// 					obs.next(res);
	// 					obs.complete();
	// 				}, errors => {
	// 					obs.error(errors);
	// 					obs.complete();
	// 				}
	// 			)
	// 	});
	// }
	// SynOrder(obj) {
	// 	let that = this;
	// 	return new Observable<any>(obs => {//DTOResponse
	// 		that.api.connect(that.config.getAPIList().SynOrder.method,
	// 			that.config.getAPIList().SynOrder.url, JSON.stringify(obj)).subscribe(
	// 				(res: any) => {
	// 					obs.next(res);
	// 					obs.complete();
	// 				}, errors => {
	// 					obs.error(errors);
	// 					obs.complete();
	// 				}
	// 			)
	// 	});
	// }

	// ResetStatus(obj) {
	// 	let that = this;
	// 	return new Observable<any>(obs => {//DTOResponse
	// 		that.api.connect(that.config.getAPIList().ResetStatus.method,
	// 			that.config.getAPIList().ResetStatus.url, JSON.stringify(obj)).subscribe(
	// 				(res: any) => {
	// 					obs.next(res);
	// 					obs.complete();
	// 				}, errors => {
	// 					obs.error(errors);
	// 					obs.complete();
	// 				}
	// 			)
	// 	});
	// }
	// CancelOrder(obj) {
	// 	let that = this;
	// 	return new Observable<any>(obs => {//DTOResponse
	// 		that.api.connect(that.config.getAPIList().CancelOrder.method,
	// 			that.config.getAPIList().CancelOrder.url, JSON.stringify(obj)).subscribe(
	// 				(res: any) => {
	// 					obs.next(res);
	// 					obs.complete();
	// 				}, errors => {
	// 					obs.error(errors);
	// 					obs.complete();
	// 				}
	// 			)
	// 	});
	// }

	UpdateOrder(obj: DTOUpdate) {
		let that = this;
		return new Observable<any>(obs => {//DTOResponse
			that.api.connect(that.config.getAPIList().UpdateOrderLgt.method,
				that.config.getAPIList().UpdateOrderLgt.url,
				 JSON.stringify(obj,
					(k, v) => {
						return Ps_UtilObjectService.parseLocalDateTimeToString(k, v,
							['OrderDate', 'RequestDate'],
							['EstDelivery', 'DeliveriedDate',
								'CancelDate', 'ProcessFrom', 'ProcessTo',
								'DeliveredDate', 'VATEffDate', 'ShippingTime'])
					}))
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

	// DeleteCart(obj: DTOECOMCart) {
	// 	let that = this;
	// 	return new Observable<any>(obs => {//DTOResponse
	// 		that.api.connect(that.config.getAPIList().DeleteCart.method,
	// 			that.config.getAPIList().DeleteCart.url, JSON.stringify(obj)).subscribe(
	// 				(res: any) => {
	// 					obs.next(res);
	// 					obs.complete();
	// 				}, errors => {
	// 					obs.error(errors);
	// 					obs.complete();
	// 				}
	// 			)
	// 	});
	// }
	// CopyOrderStaff(cartno: string) {
	// 	let that = this;
	// 	return new Observable<any>(obs => {//DTOResponse
	// 		that.api.connect(that.hachiConfig.getAPIList().CopyOrderStaff.method,
	// 			that.hachiConfig.getAPIList().CopyOrderStaff.url, JSON.stringify(cartno)).subscribe(
	// 				(res: any) => {
	// 					obs.next(res);
	// 					obs.complete();
	// 				}, errors => {
	// 					obs.error(errors);
	// 					obs.complete();
	// 				}
	// 			)
	// 	});
	// }
	//Coupon
	// GetListCartCoupon(orderCode: number) {
	// 	let that = this;
	// 	return new Observable<any>(obs => {//DTOResponse
	// 		that.api.connect(that.config.getAPIList().GetListCartCoupon.method,
	// 			that.config.getAPIList().GetListCartCoupon.url, JSON.stringify(orderCode)).subscribe(
	// 				(res: any) => {
	// 					obs.next(res);
	// 					obs.complete();
	// 				}, errors => {
	// 					obs.error(errors);
	// 					obs.complete();
	// 				}
	// 			)
	// 	});
	// }
	// UpdateCartCoupon(cp: DTOCoupon) {
	// 	let that = this;
	// 	return new Observable<any>(obs => {//DTOResponse
	// 		that.api.connect(that.config.getAPIList().UpdateCartCoupon.method,
	// 			that.config.getAPIList().UpdateCartCoupon.url, JSON.stringify(cp)).subscribe(
	// 				(res: any) => {
	// 					obs.next(res);
	// 					obs.complete();
	// 				}, errors => {
	// 					obs.error(errors);
	// 					obs.complete();
	// 				}
	// 			)
	// 	});
	// }
	// DeleteCartCoupon(cp: DTOCoupon) {
	// 	let that = this;
	// 	return new Observable<any>(obs => {//DTOResponse
	// 		that.api.connect(that.config.getAPIList().DeleteCartCoupon.method,
	// 			that.config.getAPIList().DeleteCartCoupon.url, JSON.stringify(cp)).subscribe(
	// 				(res: any) => {
	// 					obs.next(res);
	// 					obs.complete();
	// 				}, errors => {
	// 					obs.error(errors);
	// 					obs.complete();
	// 				}
	// 			)
	// 	});
	// }
	//File

	// PrintPXK(list: number[]) {
	// 	let that = this;
	// 	return new Observable<any>(obs => {//DTOResponse
	// 		that.api.connect(that.config.getAPIList().PrintPXK.method,
	// 			that.config.getAPIList().PrintPXK.url, JSON.stringify(list)).subscribe(
	// 				(res: any) => {
	// 					obs.next(res);
	// 					obs.complete();
	// 				}, errors => {
	// 					obs.error(errors);
	// 					obs.complete();
	// 				}
	// 			)
	// 	});
	// }
	// PrintLabel(list: number[]) {
	// 	let that = this;
	// 	return new Observable<any>(obs => {//DTOResponse
	// 		that.api.connect(that.config.getAPIList().PrintLabel.method,
	// 			that.config.getAPIList().PrintLabel.url, JSON.stringify(list)).subscribe(
	// 				(res: any) => {
	// 					obs.next(res);
	// 					obs.complete();
	// 				}, errors => {
	// 					obs.error(errors);
	// 					obs.complete();
	// 				}
	// 			)
	// 	});
	// }

	// ExportShipper365(list: number[]) {
	// 	let that = this;

	// 	return new Observable<any>(obs => {
	// 		that.api.connect(that.config.getAPIList().ExportShipper365.method,
	// 			that.config.getAPIList().ExportShipper365.url, JSON.stringify(list)
	// 			, null, null, 'response', 'blob'
	// 		).subscribe(
	// 			(res: any) => {
	// 				obs.next(res);
	// 				obs.complete();
	// 			}, errors => {
	// 				obs.error(errors);
	// 				obs.complete();
	// 			}
	// 		)
	// 	});
	// }
	// ExportCurrentMaster() {
	// 	let that = this;

	// 	return new Observable<any>(obs => {
	// 		that.api.connect(that.config.getAPIList().ExportCurrentMaster.method,
	// 			that.config.getAPIList().ExportCurrentMaster.url, {}
	// 			, null, null, 'response', 'blob'
	// 		).subscribe(
	// 			(res: any) => {
	// 				obs.next(res);
	// 				obs.complete();
	// 			}, errors => {
	// 				obs.error(errors);
	// 				obs.complete();
	// 			}
	// 		)
	// 	});
	// }
	//Dropdown list
	// GetListChannel(state: State = {}) {
	// 	let that = this;
	// 	return new Observable<any>(obs => {//DTOResponse
	// 		that.api.connect(that.config.getAPIList().GetListChannel.method,
	// 			that.config.getAPIList().GetListChannel.url,
	// 			JSON.stringify(toDataSourceRequest(state))).subscribe(
	// 				(res: any) => {
	// 					obs.next(res);
	// 					obs.complete();
	// 				}, errors => {
	// 					obs.error(errors);
	// 					obs.complete();
	// 				}
	// 			)
	// 	});
	// }
	// GetListChannelBase(state: State = {}) {
	// 	let that = this;
	// 	return new Observable<any>(obs => {//DTOResponse
	// 		that.api.connect(that.config.getAPIList().GetListChannelBase.method,
	// 			that.config.getAPIList().GetListChannelBase.url,
	// 			JSON.stringify(toDataSourceRequest(state))).subscribe(
	// 				(res: any) => {
	// 					obs.next(res);
	// 					obs.complete();
	// 				}, errors => {
	// 					obs.error(errors);
	// 					obs.complete();
	// 				}
	// 			)
	// 	});
	// }
	// GetAllShippers() {
	// 	let that = this;
	// 	return new Observable<any>(obs => {//DTOResponse
	// 		that.api.connect(that.config.getAPIList().GetAllShippers.method,
	// 			that.config.getAPIList().GetAllShippers.url, {}).subscribe(
	// 				(res: any) => {
	// 					obs.next(res);
	// 					obs.complete();
	// 				}, errors => {
	// 					obs.error(errors);
	// 					obs.complete();
	// 				}
	// 			)
	// 	});
	// }
	// GetShipmentServiceType(dto: DTOShipper) {
	// 	let that = this;
	// 	return new Observable<any>(obs => {
	// 		that.api.connect(that.config.getAPIList().GetShipmentServiceType.method,
	// 			that.config.getAPIList().GetShipmentServiceType.url, JSON.stringify(dto)).subscribe(
	// 				(res: any) => {
	// 					obs.next(res);
	// 					obs.complete();
	// 				}, errors => {
	// 					obs.error(errors);
	// 					obs.complete();
	// 				}
	// 			)
	// 	});
	// }
	// GetShipmentSubServiceType(dto: DTOShipper) {
	// 	let that = this;
	// 	return new Observable<any>(obs => {
	// 		that.api.connect(that.config.getAPIList().GetShipmentSubServiceType.method,
	// 			that.config.getAPIList().GetShipmentSubServiceType.url, JSON.stringify(dto)).subscribe(
	// 				(res: any) => {
	// 					obs.next(res);
	// 					obs.complete();
	// 				}, errors => {
	// 					obs.error(errors);
	// 					obs.complete();
	// 				}
	// 			)
	// 	});
	// }

	// BookingAgain(dto: DTOECOMCart) {
	// 	let that = this;
	// 	return new Observable<any>(obs => {
	// 		that.api.connect(that.config.getAPIList().BookingAgain.method,
	// 			that.config.getAPIList().BookingAgain.url, JSON.stringify(dto)).subscribe(
	// 				(res: any) => {
	// 					obs.next(res);
	// 					obs.complete();
	// 				}, errors => {
	// 					obs.error(errors);
	// 					obs.complete();
	// 				}
	// 			)
	// 	});
	// }
	// CancelBooking(dto: DTOECOMCart) {
	// 	let that = this;
	// 	return new Observable<any>(obs => {
	// 		that.api.connect(that.config.getAPIList().CancelBooking.method,
	// 			that.config.getAPIList().CancelBooking.url, JSON.stringify(dto)).subscribe(
	// 				(res: any) => {
	// 					obs.next(res);
	// 					obs.complete();
	// 				}, errors => {
	// 					obs.error(errors);
	// 					obs.complete();
	// 				}
	// 			)
	// 	});
	// }

	// GetAllProvinceInVietName() {
	// 	let that = this;
	// 	return new Observable<any>(obs => {//DTOResponse
	// 		that.api.connect(that.config.getAPIList().GetAllProvinceInVietName.method,
	// 			that.config.getAPIList().GetAllProvinceInVietName.url, {}).subscribe(
	// 				(res: any) => {
	// 					obs.next(res);
	// 					obs.complete();
	// 				}, errors => {
	// 					obs.error(errors);
	// 					obs.complete();
	// 				}
	// 			)
	// 	});
	// }
	// GetAllDistrictInProvince(id: number) {
	// 	let that = this;
	// 	return new Observable<any>(obs => {//DTOResponse
	// 		that.api.connect(that.config.getAPIList().GetAllDistrictInProvince.method,
	// 			that.config.getAPIList().GetAllDistrictInProvince.url, JSON.stringify(id)).subscribe(
	// 				(res: any) => {
	// 					obs.next(res);
	// 					obs.complete();
	// 				}, errors => {
	// 					obs.error(errors);
	// 					obs.complete();
	// 				}
	// 			)
	// 	});
	// }
	// GetAllWardInDistrict(id: number) {
	// 	let that = this;
	// 	return new Observable<any>(obs => {//DTOResponse
	// 		that.api.connect(that.config.getAPIList().GetAllWardInDistrict.method,
	// 			that.config.getAPIList().GetAllWardInDistrict.url, JSON.stringify(id)).subscribe(
	// 				(res: any) => {
	// 					obs.next(res);
	// 					obs.complete();
	// 				}, errors => {
	// 					obs.error(errors);
	// 					obs.complete();
	// 				}
	// 			)
	// 	});
	// }
	// GetAllTypeOfPayment() {
	// 	let that = this;
	// 	return new Observable<any>(obs => {//DTOResponse
	// 		that.api.connect(that.config.getAPIList().GetAllTypeOfPayment.method,
	// 			that.config.getAPIList().GetAllTypeOfPayment.url, {}).subscribe(
	// 				(res: any) => {
	// 					obs.next(res);
	// 					obs.complete();
	// 				}, errors => {
	// 					obs.error(errors);
	// 					obs.complete();
	// 				}
	// 			)
	// 	});
	// }
	//Product
	// GetProduct(cartID: number, barcode: string) {
	// 	let that = this;
	// 	var prod = {
	// 		"CartID": cartID,
	// 		"Barcode": barcode
	// 	}

	// 	return new Observable<any>(obs => {//DTOResponse
	// 		that.api.connect(that.config.getAPIList().GetProduct.method,
	// 			that.config.getAPIList().GetProduct.url, JSON.stringify(prod)).subscribe(
	// 				(res: any) => {
	// 					obs.next(res);
	// 					obs.complete();
	// 				}, errors => {
	// 					obs.error(errors);
	// 					obs.complete();
	// 				}
	// 			)
	// 	});
	// }
	// UpdateCartDetail(detail: DTOOrderDetail) {
	// 	let that = this;
	// 	return new Observable<any>(obs => {//DTOResponse
	// 		that.api.connect(that.config.getAPIList().UpdateCartDetail.method,
	// 			that.config.getAPIList().UpdateCartDetail.url, JSON.stringify(detail,
	// 				(k, v) => { return Ps_UtilObjectService.parseDateToString(k, v, ['EffDate']) }))
	// 			.subscribe(
	// 				(res: any) => {
	// 					obs.next(res);
	// 					obs.complete();
	// 				}, errors => {
	// 					obs.error(errors);
	// 					obs.complete();
	// 				}
	// 			)
	// 	});
	// }
	// DeleteCartDetail(detail: DTOOrderDetail) {
	// 	let that = this;
	// 	return new Observable<any>(obs => {//DTOResponse
	// 		that.api.connect(that.config.getAPIList().DeleteCartDetail.method,
	// 			that.config.getAPIList().DeleteCartDetail.url, JSON.stringify(detail)).subscribe(
	// 				(res: any) => {
	// 					obs.next(res);
	// 					obs.complete();
	// 				}, errors => {
	// 					obs.error(errors);
	// 					obs.complete();
	// 				}
	// 			)
	// 	});
	// }
	//Gift

	GetOrderGift(cartID: number) {
		let that = this;
		var cart = {
			"CartID": cartID
		}

		return new Observable<any>(obs => {//DTOResponse
			that.api.connect(that.config.getAPIList().GetOrderGiftLgt.method,
				that.config.getAPIList().GetOrderGiftLgt.url, JSON.stringify(cart)).subscribe(
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
	GetGiftProduct(cart: number) {
		let that = this;
		var c = {
			"Cart": cart
		}
		return new Observable<any>(obs => {//DTOResponse
			that.api.connect(that.config.getAPIList().GetGiftProductLgt.method,
				that.config.getAPIList().GetGiftProductLgt.url, JSON.stringify(c)).subscribe(
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
	GetGiftBill(cart: number) {
		let that = this;
		var c = {
			"Cart": cart
		}

		return new Observable<any>(obs => {//DTOResponse
			that.api.connect(that.config.getAPIList().GetGiftBillLgt.method,
				that.config.getAPIList().GetGiftBillLgt.url, JSON.stringify(c)).subscribe(
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

	// UpdateCartGift(giftList: DTOOrderDetail[]) {
	// 	let that = this;
	// 	return new Observable<any>(obs => {//DTOResponse
	// 		that.api.connect(that.config.getAPIList().UpdateCartGift.method,
	// 			that.config.getAPIList().UpdateCartGift.url, JSON.stringify(giftList,
	// 				(k, v) => { return Ps_UtilObjectService.parseDateToString(k, v, ['EffDate']) }))
	// 			.subscribe(
	// 				(res: any) => {
	// 					obs.next(res);
	// 					obs.complete();
	// 				}, errors => {
	// 					obs.error(errors);
	// 					obs.complete();
	// 				}
	// 			)
	// 	});
	// }
	// DeleteCartGift(gift: DTOOrderDetail) {
	// 	let that = this;
	// 	return new Observable<any>(obs => {//DTOResponse
	// 		that.api.connect(that.config.getAPIList().DeleteCartGift.method,
	// 			that.config.getAPIList().DeleteCartGift.url, JSON.stringify(gift)).subscribe(
	// 				(res: any) => {
	// 					obs.next(res);
	// 					obs.complete();
	// 				}, errors => {
	// 					obs.error(errors);
	// 					obs.complete();
	// 				}
	// 			)
	// 	});
	// }
	//order master
	// GetECOMWH() {
	// 	let that = this;
	// 	return new Observable<any>(obs => {//DTOResponse
	// 		that.api.connect(that.config.getAPIList().GetECOMWH.method,
	// 			that.config.getAPIList().GetECOMWH.url, {}).subscribe(
	// 				(res: any) => {
	// 					obs.next(res);
	// 					obs.complete();
	// 				}, errors => {
	// 					obs.error(errors);
	// 					obs.complete();
	// 				}
	// 			)
	// 	});
	// }
	// GetCurrentMaster(state: State) {
	// 	let that = this;
	// 	return new Observable<any>(obs => {//DTOResponse
	// 		that.api.connect(that.config.getAPIList().GetCurrentMaster.method,
	// 			that.config.getAPIList().GetCurrentMaster.url,
	// 			JSON.stringify(toDataSourceRequest(state)))
	// 			.subscribe(
	// 				(res: any) => {
	// 					obs.next(res);
	// 					obs.complete();
	// 				}, errors => {
	// 					obs.error(errors);
	// 					obs.complete();
	// 				}
	// 			)
	// 	});
	// }
	// GetONLTransferMater(state: State) {
	// 	let that = this;
	// 	return new Observable<any>(obs => {//DTOResponse
	// 		that.api.connect(that.config.getAPIList().GetONLTransferMater.method,
	// 			that.config.getAPIList().GetONLTransferMater.url,
	// 			JSON.stringify(toDataSourceRequest(state)))
	// 			.subscribe(
	// 				(res: any) => {
	// 					obs.next(res);
	// 					obs.complete();
	// 				}, errors => {
	// 					obs.error(errors);
	// 					obs.complete();
	// 				}
	// 			)
	// 	});
	// }
	// GetONLListTransferMater(state: State) {
	// 	let that = this;
	// 	return new Observable<any>(obs => {//DTOResponse
	// 		that.api.connect(that.config.getAPIList().GetONLListTransferMater.method,
	// 			that.config.getAPIList().GetONLListTransferMater.url,
	// 			JSON.stringify(toDataSourceRequest(state)))
	// 			.subscribe(
	// 				(res: any) => {
	// 					obs.next(res);
	// 					obs.complete();
	// 				}, errors => {
	// 					obs.error(errors);
	// 					obs.complete();
	// 				}
	// 			)
	// 	});
	// }
	// ExportListOfMaster(arr: number[]) {
	// 	let that = this;
	// 	return new Observable<any>(obs => {
	// 		that.api.connect(that.config.getAPIList().ExportListOfMaster.method,
	// 			that.config.getAPIList().ExportListOfMaster.url, JSON.stringify(arr)
	// 			, null, null, 'response', 'blob').subscribe(
	// 				(res: any) => {
	// 					obs.next(res);
	// 					obs.complete();
	// 				}, errors => {
	// 					obs.error(errors);
	// 					obs.complete();
	// 				}
	// 			)
	// 	});
	// }
	// CreateTransferMater(arr: DTOOrderDetail[]) {
	// 	let that = this;
	// 	return new Observable<any>(obs => {//DTOResponse
	// 		that.api.connect(that.config.getAPIList().CreateTransferMater.method,
	// 			that.config.getAPIList().CreateTransferMater.url, JSON.stringify(arr,
	// 				(k, v) => Ps_UtilObjectService.parseLocalDateTimeToString(k, v, ['EffDate'])))
	// 			.subscribe(
	// 				(res: any) => {
	// 					obs.next(res);
	// 					obs.complete();
	// 				}, errors => {
	// 					obs.error(errors);
	// 					obs.complete();
	// 				}
	// 			)
	// 	});
	// }
	//assign	
	// AssignPickOrders(obj: CartAssignPickOrders) {
	// 	let that = this;
	// 	return new Observable<any>(obs => {//DTOResponse
	// 		that.api.connect(that.config.getAPIList().AssignPickOrders.method,
	// 			that.config.getAPIList().AssignPickOrders.url, JSON.stringify(obj)).subscribe(
	// 				(res: any) => {
	// 					obs.next(res);
	// 					obs.complete();
	// 				}, errors => {
	// 					obs.error(errors);
	// 					obs.complete();
	// 				}
	// 			)
	// 	});
	// }
	// GetStaffOnline() {
	// 	let that = this;
	// 	return new Observable<any>(obs => {//DTOResponse
	// 		that.api.connect(that.config.getAPIList().GetStaffOnline.method,
	// 			that.config.getAPIList().GetStaffOnline.url, {}).subscribe(
	// 				(res: any) => {
	// 					obs.next(res);
	// 					obs.complete();
	// 				}, errors => {
	// 					obs.error(errors);
	// 					obs.complete();
	// 				}
	// 			)
	// 	});
	// }
	// AssignUsers(staffID: number) {
	// 	let that = this;
	// 	return new Observable<any>(obs => {//DTOResponse
	// 		that.api.connect(that.config.getAPIList().AssignUsers.method,
	// 			that.config.getAPIList().AssignUsers.url, JSON.stringify({ StaffID: staffID })).subscribe(
	// 				(res: any) => {
	// 					obs.next(res);
	// 					obs.complete();
	// 				}, errors => {
	// 					obs.error(errors);
	// 					obs.complete();
	// 				}
	// 			)
	// 	});
	// }
}
