import { Injectable } from '@angular/core';
import { ApiMethodType, DTOAPI, DTOConfig } from 'src/app/p-lib';
import { EnumPurchase } from 'src/app/p-lib/enum/purchase.enum';

@Injectable({
	providedIn: 'root'
})
export class PurApiConfigService {

	constructor() { }

	getAPIList() {
		return {
			//brand
			GetListBrand: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.GetListBrand
			}),
			GetBrand: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.GetBrand
			}),
			UpdateBrand: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.UpdateBrand
			}),
			DeleteBrand: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.DeleteBrand
			}),
			UpdateBrandStatus: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.UpdateBrandStatus
			}),
			MergeBrand: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.MergeBrand
			}),
			//report
			GetReports: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.GetReports
			}),
			ExportReport: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.ExportReport
			}),
			GetDataDropdown: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.GetDataDropdown
			}),
			//PUR PO
			GetListReceivePartner: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.GetListReceivePartner
			}),
			//PO order
			GetListReceiveOrder: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.GetListReceiveOrder
			}),
			GetReceiveOrder: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.GetReceiveOrder
			}),
			UpdateOrderReceiving: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.UpdateOrderReceiving
			}),
			//PO invoice
			GetListReceiveInvoice: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.GetListReceiveInvoice
			}),
			GetReceiveInvoice: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.GetReceiveInvoice
			}),
			UpdateInvoiceReceiving: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.UpdateInvoiceReceiving
			}),
			//PO product
			GetListReceiveProduct: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.GetListReceiveProduct
			}),
			GetReceiveProduct: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.GetReceiveProduct
			}),
			UpdateProductReceiving: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.UpdateProductReceiving
			}),
			//PO supplier
			GetListSupplierTree: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.GetListSupplierTree
			}),
			GetSupplier: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.GetSupplier
			}),
			UpdateSupplier: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.UpdateSupplier
			}),
			GetListReason: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.GetListReason
			}),
			DeleteSupplier: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.DeleteSupplier
			}),
			GetListSupplierContact: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.GetListSupplierContact
			}),
			UpdateSupplierContact: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.UpdateSupplierContact
			}),
			DeleteSupplierContact: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.DeleteSupplierContact
			}),
			GetTemplateEmail: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.GetTemplateEmail
			}),
			UpdateTemplateEmail: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.UpdateTemplateEmail
			}),
			// POProduct
			GetListPOProduct: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.GetListPOProduct
			}),
			GetListBuyedHistory: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.GetListBuyedHistory
			}),
			GetListChangePriceHistory: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.GetListChangePriceHistory
			}),

			//PriceRequest
			GetListPriceRequest: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.GetListPriceRequest
			}),
			GetPriceRequest: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.GetPriceRequest
			}),
			UpdatePriceRequest: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.UpdatePriceRequest
			}),
			DeletePriceRequest: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.DeletePriceRequest
			}),
			UpdatePriceRequestStatus: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.UpdatePriceRequestStatus
			}),

			//productRequest
			//PriceRequest
			GetListProductPriceRequest: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.GetListProductPriceRequest
			}),
			GetProductPriceRequest: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.GetProductPriceRequest
			}),
			UpdateProductPriceRequest: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.UpdateProductPriceRequest
			}),
			UpdateProductPriceRequestStatus: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.UpdateProductPriceRequestStatus
			}),
			DeleteProductPriceRequest: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.DeleteProductPriceRequest
			}),
			GetProductPriceRequestByCode: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.GetProductPriceRequestByCode
			}),
			GetListCommercialTerm: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.GetListCommercialTerm
			}),

			ImportExcelProductPriceRequest: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.ImportExcelProductPriceRequest
			}),
			ImportExcelPriceRequest: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.ImportExcelPriceRequest
			}),
			GetListSupplier: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.GetListSupplier
			}),


			// PO Domestic Orders
			GetListOrderProduct: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.GetListOrderProduct
			}),
			ImportOrderProduct: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.ImportOrderProduct
			}),
			UpdateOrderProduct: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.UpdateOrderProduct
			}),

			GetListDomesticOrders: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.GetListDomesticOrders
			}),

			GetDeliveryOrder: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.GetDeliveryOrder
			}),

			UpdateDomesticOrdersStatus: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.UpdateDomesticOrdersStatus
			}),

			DeleteDemesticOrders: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.DeleteDemesticOrders
			}),

			DeleteOrderProduct: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.DeleteOrderProduct
			}),

			GetExcelAlbumn: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.GetExcelAlbumn
			}),

			PrintOrder: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.PrintOrder
			}),
			GetOrderProduct: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.GetOrderProduct
			}),

			PrintOrderDetail: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.PrintOrderDetail
			}),

			UpdateDomesticOrder: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.UpdateDomesticOrder
			}),

			GetDomesticOrder: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.GetDomesticOrder
			}),

			GetListWareHouse: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.GetListWareHouse
			}),

			GetListOrderInvoice: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.GetListOrderInvoice
			}),

			DuplicatePOCancel: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.DuplicatePOCancel
			}),

			GenerateInvoice: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.GenerateInvoice
			}),

			GenerateInvoiceByVAT: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.GenerateInvoiceByVAT
			}),

			UpdateInvoiceProduct: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.UpdateInvoiceProduct
			}),

			AddInvoiceProduct: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.AddInvoiceProduct
			}),

			GetListProductNotIncludedInvoice: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.GetListProductNotIncludedInvoice
			}),

			UpdateDeliveryOrder: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.UpdateDeliveryOrder
			}),

			UpdateInvoice: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.UpdateInvoice
			}),

			UpdateInvoiceStatus: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.UpdateInvoiceStatus
			}),

			ImportExcelInvoice: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.ImportExcelInvoice
			}),
			GetListNewProductProposal: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.GetListNewProductProposal
			}),

			// DTO New Product Proposal
			GetNewProductProposal: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.GetNewProductProposal
			}),
			UpdateNewProductProposalStatus: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.UpdateNewProductProposalStatus
			}),
			UpdateNewProductProposal: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.UpdateNewProductProposal
			}),
			DeleteNewProductProposal: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.DeleteNewProductProposal
			}),
			DeleteProductImage: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.DeleteProductImage
			}),
			ImportExcelNewProductProposal: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.ImportExcelNewProductProposal
			}),
			GetPromotionFolderDrillWithFile: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.GetPromotionFolderDrillWithFile
			}),
			UpdateProductImage: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.UpdateProductImage
			}),
			ExportDomesticOrdersExcel: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.ExportDomesticOrdersExcel
			}),
			ExportDomesticOrdersPDF: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.ExportDomesticOrdersPDF
			}),
			ExportOrderDetailsClientExcel: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.ExportOrderDetailsClientExcel
			}),

			ExportOrderDetailsClientPDF: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.ExportOrderDetailsClientPDF
			}),

			ExportPurchaseOrderReceivedExcel: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.ExportPurchaseOrderReceivedExcel
			}),

			GetListTax: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.GetListTax
			}),

			GetFolderWithFile: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.GetFolderWithFile
			}),

			// DTO New Gift
			GetListGift: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.GetListGift
			}),

			GetGift: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.GetGift
			}),

			ImportExcelGift: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.ImportExcelGift
			}),

			UpdateGift: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.UpdateGift
			}),

			DeleteGift: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.DeleteGift
			}),

			UpdateGiftStatus: new DTOAPI({
				method: ApiMethodType.post,
				url: EnumPurchase.UpdateGiftStatus
			})

		};
	}
}
