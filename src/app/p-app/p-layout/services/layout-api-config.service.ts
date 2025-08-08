//#region [begin using]
import { Injectable } from '@angular/core';
import { ApiMethodType, DTOAPI, DTOConfig } from 'src/app/p-lib';
import { EnumLayout } from 'src/app/p-lib/enum/layout.enum';
//#endregion [end using]

@Injectable({
	providedIn: 'root'
})
export class LayoutApiConfigService {

	constructor() { }

	//#region [begin coding]
	//#endregion [end coding]

	getAPIList() {
		return {
			GetStaffInfo: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumLayout.GetStaffInfo
			}),
			//CongTy
			GetCompany: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumLayout.GetCompany
			}),
			//Module
			GetModule: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumLayout.GetModule
			}),
			GetPermission: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumLayout.GetPermission
			}),
			GetPermissionDLL: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumLayout.GetPermissionDLL
			}),
			//Warehouse
			GetListStore: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumLayout.GetListStore
			}),
			GetWarehouse: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumLayout.GetWarehouse
			}),
			GetWarehouseWMS: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumLayout.GetListWarehouse
			}),
			//Product
			GetListProduct: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumLayout.GetListProduct
			}),
			GetProductByCode: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumLayout.GetProductByCode
			}),
			GetStockInWareHouse: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumLayout.GetStockInWareHouse
			}),
			GetWebInCart: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumLayout.GetWebInCart
			}),
			//File Banner
			UploadBanner: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumLayout.UploadBanner
			}),
			RenameFile: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumLayout.RenameFile
			}),
			DeleteFile: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumLayout.DeleteFile
			}),
			//excel
			GetTemplate: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumLayout.GetTemplate
			}),
			ImportExcel: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumLayout.ImportExcel
			}),
			ImportExcelWithFunctionID: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumLayout.ImportExcelWithFunctionID
			}),
			ImportExcelOrders: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumLayout.ImportExcelOrders
			}),
			ImportOnlineOrderVAT: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumLayout.ImportOnlineOrderVAT
			}),
			//
			GetListStatus: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumLayout.GetListStatus
			}),
			UpdateAPIServices: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumLayout.UpdateAPIServices
			}),
			UpdateListAPIServices: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumLayout.UpdateListAPIServices
			}),
			SetFirebaseToken: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumLayout.SetFirebaseToken
			}),
			GetListNotification: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumLayout.GetListNotification
			}),
			UpdateNotificationStatus: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumLayout.UpdateNotificationStatus
			}),
		};
	}
}