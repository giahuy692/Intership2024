//#region [begin using]
import { Injectable } from '@angular/core';
import { ApiMethodType, DTOAPI, DTOConfig } from 'src/app/p-lib';
import { EnumEcommerce } from 'src/app/p-lib/enum/ecommerce.enum';
import { EnumWebHachi } from 'src/app/p-lib/enum/webhachi.enum';
//#endregion [end using]

@Injectable({
	providedIn: 'root'
})
export class EcommerceApiConfigService {

	constructor() { }

	//#region [begin coding]
	//#endregion [end coding]

	getAPIList() {
		return {
			//List
			GetListOrders: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetListOrders
			}),
			GetListOrdersCount: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetListOrdersCount
			}),
			GetListOrderStatus: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetListOrderStatus
			}),
			GetOrderTypeID: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetOrderTypeID
			}),
			GetListOrderWHPickup: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetListOrderWHPickup
			}),
			GetListOrdersByProduct: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetListOrdersByProduct
			}),
			//Detail
			GetOrder: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetOrder
			}),
			GetOrderStatus: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetOrderStatus
			}),
			GetOrderDetails: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetOrderDetails
			}),
			GetOrderDetailByID: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetOrderDetailByID
			}),
			//Modify
			UpdateStatus: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.UpdateStatus
			}),
			UpdateListStatus: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.UpdateListStatus
			}),
			UpdateListOrderType: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.UpdateListOrderType
			}),
			CancelOrder: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.CancelOrder
			}),
			UpdateOrder: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.UpdateOrder
			}),
			SynOrder: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.SynOrder
			}),
			ResetStatus: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.ResetStatus
			}),
			BookingAgain: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.BookingAgain
			}),
			CancelBooking: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.CancelBooking
			}),
			DeleteCart: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.DeleteCart
			}),
			//Coupon			
			GetListCartCoupon: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetListCartCoupon
			}),
			UpdateCartCoupon: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.UpdateCartCoupon
			}),
			DeleteCartCoupon: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.DeleteCartCoupon
			}),
			//File
			PrintPXK: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.PrintPXK
			}),
			PrintLabel: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.PrintLabel
			}),
			ExportShipper365: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.ExportShipper365
			}),
			ExportCurrentMaster: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.ExportCurrentMaster
			}),
			//Dropdown List		
			GetListChannel: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetListChannel
			}),
			GetListChannelBase: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetListChannelBase
			}),
			GetAllShippers: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetAllShippers
			}),
			GetShipmentServiceType: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetShipmentServiceType
			}),
			GetShipmentSubServiceType: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetShipmentSubServiceType
			}),
			GetAllProvinceInVietName: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetAllProvinceInVietName
			}),
			GetAllDistrictInProvince: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetAllDistrictInProvince
			}),
			GetAllWardInDistrict: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetAllWardInDistrict
			}),
			GetAllTypeOfPayment: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetAllTypeOfPayment
			}),
			//Product
			GetProduct: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetProduct
			}),
			UpdateCartDetail: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.UpdateCartDetail
			}),
			DeleteCartDetail: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.DeleteCartDetail
			}),
			//Gift
			GetOrderGift: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetOrderGift
			}),
			GetGiftBill: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetGiftBill
			}),
			GetGiftProduct: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetGiftProduct
			}),
			UpdateCartGift: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.UpdateCartGift
			}),
			DeleteCartGift: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.DeleteCartGift
			}),
			//order master			
			GetECOMWH: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetECOMWH
			}),
			GetCurrentMaster: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetCurrentMaster
			}),
			GetONLTransferMater: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetONLTransferMater
			}),
			GetONLListTransferMater: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetONLListTransferMater
			}),
			ExportListOfMaster: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.ExportListOfMaster
			}),
			CreateTransferMater: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.CreateTransferMater
			}),
			//assign
			AssignPickOrders: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.AssignPickOrders
			}),
			GetStaffOnline: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetStaffOnline
			}),
			AssignUsers: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.AssignUsers
			}),
			//dead link			
			GetListDeadLink: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetListDeadLink
			}),
			UpdateDeadLink: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.UpdateDeadLink
			}),
			DeleteDeadLink: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.DeleteDeadLink
			}),
			ImportDeadLink: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.ImportDeadLink
			}),
			//kenh ban hang
			GetChannelList: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetChannelList
			}),
			GetChannel: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetChannel
			}),
			UpdateChannelStatus: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.UpdateChannelStatus
			}),
			UpdateChannel: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.UpdateChannel
			}),
			DeleteChannel: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.DeleteChannel
			}),
			GetListChannelGroup: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetListChannelGroup
			}),
			GetListChildChannelGroup: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetListChildChannelGroup
			}),
			GetListChannelInGroup: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetListChannelInGroup
			}),
			GetListPriority: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetListPriority
			}),
			UpdateChannelGroup: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.UpdateChannelGroup
			}),
			DeleteChannelGroup: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.DeleteChannelGroup
			}),

			GetListChannelNew: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetListChannelNew
			}),

			UpdateChannelStatusNew: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.UpdateChannelStatusNew
			}),

			UpdateChannelNew: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.UpdateChannelNew
			}),


			DeleteChannelNew: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.DeleteChannelNew
			}),

			GetListChannelGroupTwoLevel: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetListChannelGroupTwoLevel
			}),

			//channel prod
			GetListChannelProduct: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetListChannelProduct
			}),
			GetChannelProduct: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetChannelProduct
			}),
			GetChannelProductByCode: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetChannelProductByCode
			}),
			UpdateStatusChannelProduct: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.UpdateStatusChannelProduct
			}),
			UpdateChannelProduct: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.UpdateChannelProduct
			}),
			DeleteChannelProduct: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.DeleteChannelProduct
			}),
			UpdateProductQuantity: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.UpdateProductQuantity
			}),
			CropProductImage: new DTOAPI({
			  method: ApiMethodType.post,
			  url: EnumEcommerce.CropProductImage
			}),
			ImportChannelProduct: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.ImportChannelProduct
			}),
			//Chứng từ điều chuyển	
			GetListTransferReceive: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetListTransferReceive
			}),
			GetTransferReceive: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetTransferReceive
			}),
			UpdateStatusTransferReceive: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.UpdateStatusTransferReceive
			}),
			UpdateTransferReceive: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.UpdateTransferReceive
			}),
			UpdateTransferSent: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.UpdateTransferSent
			}),
			DeleteTransferReceive: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.DeleteTransferReceive
			}),
			//Sản phẩm GetInport
			GetListTransferReceiveDetail: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetListTransferReceiveDetail
			}),
			GetTransferReceiveDetail: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetTransferReceiveDetail
			}),
			GetTransferReceiveDetailByCode: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetTransferReceiveDetailByCode
			}),
			UpdateInportProduct: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.UpdateTransferReceiveDetail
			}),
			DeleteInportProduct: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.DeleteTransferReceiveDetail
			}),
			ImportInportProduct: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.ImportTransferReceiveDetail
			}),
			//Syn Cart			
			VNPayIPNRecall: new DTOAPI({
				method: ApiMethodType.post,
				url: DTOConfig.appInfo.apiecHachi + "VNPayIPNRecall"
			}),
			//Syn Customer Cart TODO CHUYỂN SANG SERVICE HACHI
			GetListClientOrder: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumWebHachi.GetListClientOrder
			}),
			GetClientOrder: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumWebHachi.GetClientOrder
			}),
			UpdateClientOrder: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumWebHachi.UpdateClientOrder
			}),
			//syn cart detail TODO CHUYỂN SANG SERVICE HACHI
			GetSynOrderDetails: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumWebHachi.GetSynOrderDetails
			}),
			GetSynOrderGift: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumWebHachi.GetSynOrderGift
			}),
			GetListOrderCoupon: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumWebHachi.GetListOrderCoupon
			}),
			//syn cart dropdowns TODO CHUYỂN SANG SERVICE HACHI
			GetProvinces: {
				url: DTOConfig.appInfo.apiecHachi + "api/config/GetProvinces",
				method: ApiMethodType.post,
			},
			GetDistricts: {
				url: DTOConfig.appInfo.apiecHachi + "api/config/GetDistricts",
				method: ApiMethodType.post,
			},
			GetWards: {
				url: DTOConfig.appInfo.apiecHachi + "api/config/GetWards",
				method: ApiMethodType.post,
			},
			GetPayments: {
				url: DTOConfig.appInfo.apiecHachi + "api/config/GetPayments",
				method: ApiMethodType.post,
			},
			// sản phẩm kênh kinh doanh
			ImportChannelGroupProduct: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.ImportChannelGroupProduct
			}),
			GetListProductChannelGroup: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetListProductChannelGroup
			}),
			GetProductForChannel: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetProductForChannel
			}),
			GetChannelGroupProduct: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetChannelGroupProduct
			}),
			GetListECOMChannelProductGroup: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetListECOMChannelProductGroup
			}),
			GetListECOMChannelProduct: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetListECOMChannelProduct
			}),
			DeleteECOMChannelProduct: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.DeleteECOMChannelProduct
			}),
			GetListChannelGroupProduct: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetListChannelGroupProduct
			}),
			UpdateStatusChannelGroupProduct: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.UpdateStatusChannelGroupProduct
			}),
			UpdateChannelGroupProduct: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.UpdateChannelGroupProduct
			}),
			UpdateECOMChannelProduct: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.UpdateECOMChannelProduct
			}),
			GetECOMChannelProduct: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetECOMChannelProduct
			}),
			// kế hoạch phân bổ hàng
			GetListForecast: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetListForecast
			}),
			GetForecast: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetForecast
			}),
			DeleteForecast: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.DeleteForecast
			}),
			UpdateForecastStatus: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.UpdateForecastStatus
			}),
			UpdateForecast: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.UpdateForecast
			}),
			// chi tiết kế hoạch phân bổ hàng
			GetListForecastDetail: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetListForecastDetail
			}),
			GetForecastDetail: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetForecastDetail
			}),
			GetForecastDetailByBarcode: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetForecastDetailByBarcode
			}),
			DeleteForecastDetail: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.DeleteForecastDetail
			}),
			UpdateForecastDetail: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.UpdateForecastDetail
			}),
			UpdateForecastDetailStatus: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.UpdateForecastDetailStatus
			}),
			ImportForecastDetail: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.ImportForecastDetail
			}),
			//giới hạn tồn
			GetListStockLimit: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetListStockLimit
			}),
			GetStockLimit: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetStockLimit
			}),
			UpdateStockLimit: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.UpdateStockLimit
			}),
			ImportStockLimit: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.ImportStockLimit
			}),
			ResetStock: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.ResetStock
			}),
			ResetStock3H: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.ResetStock3H
			}),
			//điều chuyển hàng hóa
			GetListTransfer: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetListTransfer
			}),
			GetTransfer: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetTransfer
			}),
			DeleteTransfer: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.DeleteTransfer
			}),
			UpdateTransferStatus: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.UpdateTransferStatus
			}),
			UpdateTransfer: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.UpdateTransfer
			}),
			GetListTransferChannelGroup: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetListTransferChannelGroup
			}),
			// chi tiết kế hoạch phân bổ hàng
			GetListTransferDetail: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetListTransferDetail
			}),
			GetTransferDetail: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetTransferDetail
			}),
			GetTransferDetailByBarcode: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetTransferDetailByBarcode
			}),
			DeleteTransferDetail: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.DeleteTransferDetail
			}),
			UpdateTransferDetail: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.UpdateTransferDetail
			}),
			ImportTransferDetail: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.ImportTransferDetail
			}),
			//
			ImportECOMChannel: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.ImportECOMChannel
			}),
			ImportECOMChannelGroup: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.ImportECOMChannelGroup
			}),
			ImportECOMChannelProduct: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.ImportECOMChannelProduct
			}),
			ImportExcelStockLimit: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.ImportExcelStockLimit
			}),
			//#region Cart LGT
			GetListOrdersLgt: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetListOrdersLgt
			}),
			GetOrderLgt: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetOrderLgt
			}),
			GetOrderDetailsLgt: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetOrderDetailsLgt
			}),
			UpdateStatusLgt: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.UpdateStatusLgt
			}),
			UpdateListStatusLgt: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.UpdateListStatusLgt
			}),
			UpdateOrderLgt: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.UpdateOrderLgt
			}),
			GetOrderGiftLgt: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetOrderGiftLgt
			}),
			GetGiftProductLgt: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetGiftProductLgt
			}),
			GetGiftBillLgt: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumEcommerce.GetGiftBillLgt
			}),
			//#endregion Cart LGT
		};
	}
	
}