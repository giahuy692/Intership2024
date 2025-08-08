export class EnumWebHachi {
    //#region cart
    static GetCurrentCart: string
    static UpdateCart: string
    static CopyOrderStaff: string
    //#endregion cart
    //#region prod
    static CheckProductStock: string
    static DeleteCartDetail: string
    static AddCart: string
    //#endregion prod
    //#region coupon
    static AddCoupon: string
    static DeleteCoupon: string
    //#endregion coupon
    //#region payment
    static GetPayments: string
    static PaymentCart: string
    static GetOrderGifts: string
    static UpdateCartGift: string
    static GetProvinces: string
    static GetDistricts: string
    static GetWards: string
    static ChangeCartDelivery: string
    static GetAllDelivery: string
    static RemoveDelivery: string
    static UpdateDelivery: string
    static GetDelivery: string
    //#endregion payment
    static GetListProduct: string
    static GetProductByBarcode: string
    //#region Syn Generate Cart
    static GetListGenOrder: string
    static DeleteGenOrder: string
    static AssignCartStaff: string
    static SynOrder: string
    static SynOrderOldWeb: string
    static GetCardByStaff: string
    static getuserbyphone: string
    //#endregion Syn Generate Cart
    //#region CLIENT Cart
    static GetListClientOrder: string
    static GetClientOrder: string
    static UpdateClientOrder: string
    static GetSynOrderDetails: string
    static GetSynOrderGift: string
    static GetListOrderCoupon: string
    //#endregion CLIENT Cart
    //#region BACK LINK
    static GetListBackLink: string
    static UpdateBackLink: string
    static DeleteBackLink: string
    static ResetCacheBackLink: string
    static ImportBackLink: string
    static CompleteImportBackLink: string
    //#endregion BACK LINK
    //#region SHORT LINK
    static GetListShortLink: string
    static UpdateShortLink: string
    static AddShortLink: string
    static DeleteShortLink: string
    static ResetCacheShortLink: string
    static ApproveShortLink: string
    static UnApproveShortLink: string
    //#endregion SHORT LINK
}