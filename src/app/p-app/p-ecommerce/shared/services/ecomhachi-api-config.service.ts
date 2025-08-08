//#region [begin using]
import { Injectable } from '@angular/core';
import { ApiMethodType } from 'src/app/p-lib';
import { EnumWebHachi } from 'src/app/p-lib/enum/webhachi.enum';
//#endregion [end using]

@Injectable({
    providedIn: 'root'
})
export class EcomHachiApiConfigService {
    constructor() { }

    //#region [begin coding]
    //#endregion [end coding]

    getAPIList() {
        return {
            //#region cart
            GetCurrentCart: {
                url: EnumWebHachi.GetCurrentCart,
                method: ApiMethodType.post,
            },
            UpdateCart: {
                url: EnumWebHachi.UpdateCart,
                method: ApiMethodType.post,
            },
            CopyOrderStaff: {
                url: EnumWebHachi.CopyOrderStaff,
                method: ApiMethodType.post,
            },
            //#endregion	
            //#region prod			
            CheckProductStock: {
                url: EnumWebHachi.CheckProductStock,
                method: ApiMethodType.post,
            },
            DeleteCartDetail: {
                url: EnumWebHachi.DeleteCartDetail,
                method: ApiMethodType.post,
            },
            AddCart: {
                url: EnumWebHachi.AddCart,
                method: ApiMethodType.post,
            },
            //#endregion
            //#region coupon			
            AddCoupon: {
                url: EnumWebHachi.AddCoupon,
                method: ApiMethodType.post,
            },
            DeleteCoupon: {
                url: EnumWebHachi.DeleteCoupon,
                method: ApiMethodType.post,
            },
            //#endregion
            //#region payment			
            GetPayments: {
                url: EnumWebHachi.GetPayments,
                method: ApiMethodType.post,
            },
            PaymentCart: {
                url: EnumWebHachi.PaymentCart,
                method: ApiMethodType.post,
            },
            GetOrderGifts: {
                url: EnumWebHachi.GetOrderGifts,
                method: ApiMethodType.post,
            },
            UpdateCartGift: {
                url: EnumWebHachi.UpdateCartGift,
                method: ApiMethodType.post,
            },
            GetProvinces: {
                url: EnumWebHachi.GetProvinces,
                method: ApiMethodType.post,
            },
            GetDistricts: {
                url: EnumWebHachi.GetDistricts,
                method: ApiMethodType.post,
            },
            GetWards: {
                url: EnumWebHachi.GetWards,
                method: ApiMethodType.post,
            },
            ChangeCartDelivery: {
                url: EnumWebHachi.ChangeCartDelivery,
                method: ApiMethodType.post,
            },
            //#region delivery
            ProfileGetAllDelivery: {
                url: EnumWebHachi.GetAllDelivery,
                method: ApiMethodType.post,
            },
            ProfileRemoveDelivery: {
                url: EnumWebHachi.RemoveDelivery,
                method: ApiMethodType.post,
            },
            ProfileUpdateDelivery: {
                url: EnumWebHachi.UpdateDelivery,
                method: ApiMethodType.post,
            },
            ProfileGetDelivery: {
                url: EnumWebHachi.GetDelivery,//
                method: ApiMethodType.post,
            },
            //#endregion
            //#endregion
            GetListProduct: {
                url: EnumWebHachi.GetListProduct,
                method: ApiMethodType.post,
            },
            GetProductByBarcode: {
                url: EnumWebHachi.GetProductByBarcode,
                method: ApiMethodType.post,
            },
            //#region Syn Generate Cart
            GetListGenOrder: {
                url: EnumWebHachi.GetListGenOrder,
                method: ApiMethodType.post
            },
            DeleteGenOrder: {
                url: EnumWebHachi.DeleteGenOrder,
                method: ApiMethodType.post
            },
            AssignCartStaff: {
                url: EnumWebHachi.AssignCartStaff,
                method: ApiMethodType.post
            },
            SynOrder: {
                url: EnumWebHachi.SynOrder,
                method: ApiMethodType.post
            },
            SynOrderOldWeb: {
                url: EnumWebHachi.SynOrderOldWeb,
                method: ApiMethodType.post
            },
            GetCardByStaff: {
                url: EnumWebHachi.GetCardByStaff,
                method: ApiMethodType.post
            },
            getuserbyphone: {
                url: EnumWebHachi.getuserbyphone,
                method: ApiMethodType.post
            },
            //#endregion Syn Generate Cart
            //#region BACK LINK
            GetListBackLink: {
                url: EnumWebHachi.GetListBackLink,
                method: ApiMethodType.post
            },
            UpdateBackLink: {
                url: EnumWebHachi.UpdateBackLink,
                method: ApiMethodType.post
            },
            DeleteBackLink: {
                url: EnumWebHachi.DeleteBackLink,
                method: ApiMethodType.post
            },
            ResetCacheBackLink: {
                url: EnumWebHachi.ResetCacheBackLink,
                method: ApiMethodType.get
            },
            ImportBackLink: {
                url: EnumWebHachi.ImportBackLink,
                method: ApiMethodType.post
            },
            CompleteImportBackLink: {
                url: EnumWebHachi.CompleteImportBackLink,
                method: ApiMethodType.post
            },
            //#endregion BACK LINK
            //#region SHORT LINK
            GetListShortLink: {
                url: EnumWebHachi.GetListShortLink,
                method: ApiMethodType.post
            },
            UpdateShortLink: {
                url: EnumWebHachi.UpdateShortLink,
                method: ApiMethodType.post
            },
            AddShortLink: {
                url: EnumWebHachi.AddShortLink,
                method: ApiMethodType.post
            },
            DeleteShortLink: {
                url: EnumWebHachi.DeleteShortLink,
                method: ApiMethodType.post
            },
            ResetCacheShortLink: {
                url: EnumWebHachi.ResetCacheShortLink,
                method: ApiMethodType.get
            },
            ApproveShortLink: {
                url: EnumWebHachi.ApproveShortLink,
                method: ApiMethodType.post
            },
            UnApproveShortLink: {
                url: EnumWebHachi.UnApproveShortLink,
                method: ApiMethodType.post
            },
            //#endregion SHORT LINK
        };
    }
}