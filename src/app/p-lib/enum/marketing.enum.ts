export class EnumMarketing {
  // Base Product TODO ĐẨY CÁI NÀY SANG ENUM CONFIG
  // static GetListBaseProduct: string
  // static GetBaseProduct: string
  // static GetListProduct: string 
  // static GetListAPIByModuleFunction: string
  // static GetProduct: string 
  // static UpdateProductListTag: string
  // static UpdateProduct: string
  // static UpdateBaseProduct: string
  // static ImportExcelProduct: string
  // static ImportExcelProduct2: string

  //#region Banner
  static GetListBanner: string;
  static GetBanner: string;
  static UpdateBanner: string;
  static UpdateBannerStatus: string;
  static DeleteBanner: string;
  //#endregion Banner
  //#region GroupBanner
  static GetListGroupBanner: string;
  static GetGroupBanner: string;
  //#endregion GroupBanner
  //#region Folder Banner
  static GetBannerFolder: string;
  static GetBannerFolderDrill: string;
  static GetBannerFolderWithFile: string;
  static GetBannerFolderDrillWithFile: string;
  //     static CreateBannerFolder: string;
  // static RenameBannerFolder: string;
  // static DeleteBannerFolder: string;
  //#endregion Folder Banner
  //#region Folder
  static CreateFolder: string;
  static RenameFolder: string;
  static DeleteFolder: string;
  //#endregion Folder  
  //#region File Banner
  static UploadBanner: string;
  static UploadFile: string;
  static RenameFile: string;
  static DeleteFile: string;
  //#endregion File Banner
  //#region Webpage
  static GetListWebpage: string;
  static GetBannerListWebpage: string;
  static UpdateBannerWebpage: string;
  static DeleteBannerWebpage: string;
  //#endregion Webpage
  //#region promotion
  static GetListPromotion: string;
  static GetPromotionByCode: string;
  static GetListPromotionType: string;
  static GetPromotionListGroupOfCard: string;
  static GetPromotionDayOfWeek: string;
  static GetPromotionWareHouse: string;
  //update promotion
  static UpdatePromotion: string;
  static UpdatePromotionStatus: string;
  static DeletePromotion: string;
  static UpdatePromotionWH: string;
  static UpdatePromotionListOfCard: string;
  static UpdatePromotionDayOfWeek: string;
  //#endregion promotion
  //#region detail promotion
  static GetListPromotionDetail: string;
  static GetPromotionProduct: string;
  static GetComboProduct: string;
  static UpdatePromotionDetail: string;
  static DeletePromotionDetail: string;
  static ExportListPromotionDetails: string;
  //#endregion detail promotion
  //#region combo
  static GetListPromotionCombo: string;
  static GetPromotionCombo: string;
  static UpdatePromotionCombo: string;
  static UpdateComboStatus: string;
  static DeletePromotionCombo: string;
  static DeleteCombo: string;
  static ImportExcelListComboGiftset: string;
  static ImportExcelComboGiftsetProduct: string;
  //#endregion combo
  //#region promotion inv
  static GetPromotionInv: string;
  static UpdatePromotionInv: string;
  static DeletePromotionInv: string;
  //#endregion promotion inv
  //#region folder promotion
  static GetPromotionFolder: string;
  static GetPromotionFolderDrill: string;
  static GetPromotionFolderWithFile: string;
  static GetPromotionFolderDrillWithFile: string;
  static ImportExcelPromotionDetail: string;
  //#endregion folder promotion
  //#region web content
  static GetListWebContent: string;
  static GetWebContent: string;
  static GetWebContentByCode: string;
  static UpdateWebContent: string;
  static UpdateWebContentStatus: string;
  static DeleteWebContent: string;
  //#endregion web content
  static GetFolderDrillWithFile: string;
  static GetFolderWithFile: string;
  //#region coupon policy
  static GetListCouponIssued: string;
  static GetCouponIssuedByCode: string;
  static UpdateCouponIssued: string;
  static UpdateCouponIssuedStatus: string;
  static UpdateCouponStatus: string;
  static DeleteCouponIssued: string;
  //#endregion coupon policy
  //#region coupon property
  static GetCouponIssuedWareHouse: string;
  static UpdateCouponIssuedWH: string;
  static GetListCouponIssuedMembership: string;
  static GetCouponIssuedMembership: string;
  static GetCouponIssuedMembershipByPhone: string;
  static UpdateCouponIssuedMembership: string;
  static DeleteCouponIssuedMembership: string;
  static UpdateCouponIssuedRounting: string;
  static DeleteCouponIssuedRounting: string;
  //#endregion coupon property
  //#region coupon product
  static GetListCouponIssuedProduct: string;
  static GetCouponIssuedProduct: string;
  static UpdateCouponIssuedProduct: string;
  static DeleteCouponIssuedProduct: string;
  //#endregion coupon product
  //#region coupon
  static GetListCoupon: string;
  static ImportExcelCouponIssueMembership: string;
  static ImportExcelCouponIssueProduct: string;
  static ExportListCoupon: string;
  //#endregion coupon
  //#region Conf Product
  static UpdateProductBestPriceByID: string;
  static DeleteProductBestPriceByID: string;
  static UpdateProductSpecialByID: string;
  static DeleteProductSpecialByID: string;
  //#endregion Conf Product
  //#region album
  static GetListAlbum: string;
  static GetAlbum: string;
  static UpdateAlbum: string;
  static UpdateAlbumStatus: string;
  static DeleteAlbum: string;
  //#endregion album
  //#region album product
  static GetListAlbumDetails: string;
  static GetAlbumDetails: string;
  static GetAlbumDetailsByBarcode: string;
  static UpdateAlbumDetails: string;
  static DeleteAlbumDetails: string;
  //#endregion album product
  //#region blog
  static GetListBlog: string;
  static GetBlog: string;
  static UpdateBlog: string;
  static UpdateBlogStatus: string;
  static UpdateBlogCategory: string;
  static DeleteBlog: string;
  static GetListBlogCategory: string;
  //#endregion blog
  //#region news
  static GetListNews: string;
  static GetListCMSNews: string;
  static GetListCMSNewsCategory: string;
  static GetCMSNews: string
  static GetNews: string;
  static UpdateNews: string;
  static UpdateCMSNews: string;
  static UpdateNewsStatus: string;
  static UpdateNewsCategory: string;
  static DeleteNews: string;
  static GetListNewsCategory: string;
  //#endregion news
  //#region Policy
  static GetListPolicy: string;
  static GetPolicy: string;
  static UpdatePolicy: string;
  static UpdatePolicyStatus: string;
  static UpdatePolicyCategory: string;
  static DeletePolicy: string;
  static GetListPolicyCategory: string;
  //#endregion Policy
  //#region Intro
  static GetListIntroduce: string;
  static GetIntroduce: string;
  static UpdateIntroduce: string;
  static UpdateIntroduceStatus: string;
  static UpdateIntroduceCategory: string;
  static DeleteIntroduce: string;
  static GetListIntroduceCategory: string;
  //#endregion Intro
  //#region Store
  static GetListStore: string;
  static GetListProvince: string;
  static GetListCountry: string;
  static GetStore: string;
  static UpdateStore: string;
  static DeleteStore: string;
  //#endregion Store
  //#region Question
  static GetListQuestion: string;
  static GetQuestion: string;
  static UpdateQuestion: string;
  static UpdateQuestionStatus: string;
  static UpdateQuestionCategory: string;
  static DeleteQuestion: string;
  static GetListQuestionCategory: string;
  //#endregion Question
  //#region CouponGroup
  static GetListCouponGroup: string;
  static GetCouponGroup: string;
  static UpdateCouponGroup: string;
  static DeleteCouponGroup: string;
  //#endregion CouponGroup
  //#region Hashtag
  static GetListHashTag: string;
  static GetHashtag: string;
  static UpdateHashTagStatus: string;
  static UpdateHashtag: string;
  static DeleteHashtag: string;
  static ImportExcelHashtag: string;
  static ImportExcelHashtagProduct: string;
  static GetHashtagProduct: string;
  static GetHashtagBlog: string;
  //#endregion Hashtag
  static ImportExcelBlog: string;
  //#region CategoryWeb
  static GetListGroupWebTree: string;
  static GetListGroupWeb: string;
  static UpdateGroupWeb: string;
  static DeleteGroupWeb: string;
  static ImportExcelGroupWeb: string
  static ExportGroupWeb: string
  static GetGroupWeb: string;
  //#endregion CategoryWeb
  //#region SearchKeyword
  static GetListSearchKeyword: string;
  static GetSearchKeyword: string;
  static UpdateSearchKeyword: string;
  static UpdateStatusSearchKeyword: string;
  static DeleteSearchKeyword: string;
  //#endregion SearchKeyword
  //#region MetaTag
  static UpdateProductMetaTag: string;
  static UpdateNewsMetaTag: string;
  static UpdateProductMetaTagStatus: string;
  static UpdateNewsMetaTagStatus: string;
  static GetListMetaTagCategory: string;
  static GetListMetaTag: string;
  static UpdateMetaTag: string;
  static UpdateMetaTagStatus: string;
  //#endregion MetaTag
  //#region Hamper
  static GetHamperByBarcode: string;
  static GetListHamper: string;
  static ExportHamperPromotionReport: string;
  static ImportExcelPromotionHamper: string;
  //#endregion Hamper
  //#region cấu hình
  static GetListWebConfig: string;
  static GetListWebConfigType: string;
  static GetWebConfig: string;
  static UpdateWebConfig: string;
  static UpdateStatusWebConfig: string;
  static DeleteWebConfig: string;
  //#endregion cấu hình
  static SyncProductFromPOS: string;
  //#region promotion gift property
  static GetListCOPOLPromotionGiftType: string;
  static GetListCOPOLPromotionChannel: string;
  static GetListCOPOLApplyScope: string;
  //#endregion promotion gift property
  //#region promotion gift
  static GetCOPOLPromotionGiftByBarcode: string;
  static GetListCOLSGift: string;
  static AddListCOPOLPromotionGift: string;
  static GetListCOPOLPromotionGiftProduct: string;
  static UpdateCOPOLPromotionGiftProduct: string;
  static UpdateCOPOLPromotionGiftProductStatus: string;
  static DeleteCOPOLPromotionGiftProduct: string;
  static DeleteCOPOLPromotionGift: string;
  //#endregion promotion gift
  //#region promotion range
  static GetListCOPOLPromotionRange: string;
  static DeleteListCOPOLPromotionRange: string;
  static DeleteCOPOLPromotionRange: string;
  static ImportCOPOLPromotionGiftProduct: string;
  static ImportCOPOLPromotionGiftRange: string;
  static AddCOPOLPromotionGift: string;
  static UpdateCOPOLPromotionRange: string;
  //#endregion promotion range
  //#region seo
  static GetListSEO: string;
  static UpdateSEO: string;
  static ResetCacheSEO: string;
  //#endregion seo
}
