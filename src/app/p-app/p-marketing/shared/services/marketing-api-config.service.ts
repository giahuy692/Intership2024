import { Injectable } from '@angular/core';
import { ApiMethodType, DTOAPI, DTOConfig } from 'src/app/p-lib';
import { EnumMarketing } from 'src/app/p-lib/enum/marketing.enum';
import { Ps_URL_Service } from 'src/app/p-lib/utilities/url.service';

@Injectable({
  providedIn: 'root',
})
export class MarketingApiConfigService {
  // urlService = new Ps_URL_Service(DTOConfig.appInfo.apimar);

  constructor() { }

  getAPIList() {
    return {
      // baseProduct TODO ĐẨY CÁI NÀY SANG ENUM CONFIG
      // GetListBaseProduct: new DTOAPI({
      //   method: ApiMethodType.post,
      //   url: EnumMarketing.GetListBaseProduct
      // }),
      // GetBaseProduct: new DTOAPI({
      //   method: ApiMethodType.post,
      //   url: EnumMarketing.GetBaseProduct
      // }),
      // GetListAPIByModuleFunction: new DTOAPI({
      //   method: ApiMethodType.post,
      //   url: EnumMarketing.GetListAPIByModuleFunction
      // }),

      //Product	TODO ĐẨY CÁI NÀY SANG ENUM CONFIG
      // GetListProduct: new DTOAPI({
      //   method: ApiMethodType.post,
      //   url: EnumMarketing.GetListProduct
      // }),
      // GetProduct: new DTOAPI({
      //   method: ApiMethodType.post,
      //   url: EnumMarketing.GetProduct
      // }),
      // UpdateProductListTag: new DTOAPI({
      //   method: ApiMethodType.post,
      //   url: EnumMarketing.UpdateProductListTag
      // }),
      // UpdateProduct: new DTOAPI({
      //   method: ApiMethodType.post,
      //   url: EnumMarketing.UpdateProduct
      // }),
      // UpdateBaseProduct: new DTOAPI({
      //   method: ApiMethodType.post,
      //   url: EnumMarketing.UpdateBaseProduct
      // }),
      // ImportExcelProduct: new DTOAPI({
      //   method: ApiMethodType.post,
      //   url: EnumMarketing.ImportExcelProduct
      // }),
      // ImportExcelProduct2: new DTOAPI({
      //   method: ApiMethodType.post,
      //   url: EnumMarketing.ImportExcelProduct2
      // }),

      //#region Banner
      GetListBanner: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetListBanner,
      }),
      GetBanner: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetBanner,
      }),
      UpdateBanner: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.UpdateBanner,
      }),
      UpdateBannerStatus: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.UpdateBannerStatus,
      }),
      DeleteBanner: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.DeleteBanner,
      }),
      //#endregion Banner
      //#region GroupBanner
      GetListGroupBanner: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetListGroupBanner,
      }),
      GetGroupBanner: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetGroupBanner,
      }),
      //#endregion GroupBanner
      //#region Folder Banner
      GetBannerFolder: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetBannerFolder,
      }),
      GetBannerFolderDrill: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetBannerFolderDrill,
      }),
      GetBannerFolderWithFile: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetBannerFolderWithFile,
      }),
      GetBannerFolderDrillWithFile: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetBannerFolderDrillWithFile,
      }),
      // CreateBannerFolder: new DTOAPI({
      // 	method: ApiMethodType.post,
      // 	url: EnumMarketing.CreateBannerFolder
      // }),
      // RenameBannerFolder: new DTOAPI({
      // 	method: ApiMethodType.post,
      // 	url: EnumMarketing.RenameBannerFolder
      // }),
      // DeleteBannerFolder: new DTOAPI({
      // 	method: ApiMethodType.post,
      // 	url: EnumMarketing.DeleteBannerFolder
      // }),
      //#endregion Folder Banner
      //#region Folder
      CreateFolder: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.CreateFolder,
      }),
      RenameFolder: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.RenameFolder,
      }),
      DeleteFolder: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.DeleteFolder,
      }),
      //#endregion Folder
      //#region File Banner
      // UploadBanner: new DTOAPI({
      // 	method: ApiMethodType.post,
      // 	url: EnumMarketing.UploadBanner
      // }),
      UploadFile: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.UploadFile,
      }),
      RenameFile: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.RenameFile,
      }),
      DeleteFile: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.DeleteFile,
      }),
      //#endregion File Banner
      //#region Webpage
      GetListWebpage: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetListWebpage,
      }),
      GetBannerListWebpage: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetBannerListWebpage,
      }),
      UpdateBannerWebpage: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.UpdateBannerWebpage,
      }),
      DeleteBannerWebpage: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.DeleteBannerWebpage,
      }),
      //#endregion Webpage
      //#region promotion
      GetListPromotion: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetListPromotion,
      }),
      GetPromotionByCode: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetPromotionByCode,
      }),
      GetPromotion: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetPromotionByCode,
      }),
      GetListPromotionType: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetListPromotionType,
      }),
      GetPromotionListGroupOfCard: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetPromotionListGroupOfCard,
      }),
      GetPromotionDayOfWeek: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetPromotionDayOfWeek,
      }),
      GetPromotionWareHouse: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetPromotionWareHouse,
      }),
      //update promotion
      UpdatePromotion: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.UpdatePromotion,
      }),
      UpdatePromotionStatus: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.UpdatePromotionStatus,
      }),
      DeletePromotion: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.DeletePromotion,
      }),
      UpdatePromotionWH: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.UpdatePromotionWH,
      }),
      UpdatePromotionListOfCard: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.UpdatePromotionListOfCard,
      }),
      UpdatePromotionDayOfWeek: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.UpdatePromotionDayOfWeek,
      }),
      //#endregion promotion
      //#region detail promotion
      GetListPromotionDetail: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetListPromotionDetail,
      }),
      GetPromotionListProduct: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetListPromotionDetail,
      }),
      GetPromotionProduct: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetPromotionProduct,
      }),
      GetComboProduct: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetComboProduct,
      }),
      UpdatePromotionDetail: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.UpdatePromotionDetail,
      }),
      DeletePromotionDetail: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.DeletePromotionDetail,
      }),
      ExportListPromotionDetails: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.ExportListPromotionDetails,
      }),
      //#endregion detail promotion
      //#region combo
      GetListPromotionCombo: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetListPromotionCombo,
      }),
      GetPromotionCombo: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetPromotionCombo,
      }),
      UpdatePromotionCombo: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.UpdatePromotionCombo,
      }),
      UpdateComboStatus: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.UpdateComboStatus,
      }),
      DeletePromotionCombo: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.DeletePromotionCombo,
      }),
      DeleteCombo: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.DeleteCombo,
      }),
      ImportExcelListComboGiftset: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.ImportExcelListComboGiftset,
      }),
      ImportExcelComboGiftsetProduct: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.ImportExcelComboGiftsetProduct,
      }),
      //#endregion combo
      //#region promotion inv
      GetPromotionInv: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetPromotionInv,
      }),
      UpdatePromotionInv: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.UpdatePromotionInv,
      }),
      DeletePromotionInv: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.DeletePromotionInv,
      }),
      //#endregion promotion inv
      //#region folder promotion
      GetPromotionFolder: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetPromotionFolder,
      }),
      GetPromotionFolderDrill: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetPromotionFolderDrill,
      }),
      GetPromotionFolderWithFile: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetPromotionFolderWithFile,
      }),
      GetPromotionFolderDrillWithFile: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetPromotionFolderDrillWithFile,
      }),
      ImportExcelPromotionDetail: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.ImportExcelPromotionDetail,
      }),
      ImportExcelPromotionHamper: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.ImportExcelPromotionHamper,
      }),
      //#endregion folder promotion
      //#region Hamper
      GetListHamper: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetListHamper,
      }),
      GetHamperByBarcode: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetHamperByBarcode,
      }),
      ExportHamperPromotionReport: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.ExportHamperPromotionReport,
      }),
      //#endregion Hamper
      //#region news product
      GetListWebContent: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetListWebContent,
      }),
      GetWebContent: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetWebContent,
      }),
      GetWebContentByCode: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetWebContentByCode,
      }),
      UpdateWebContent: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.UpdateWebContent,
      }),
      UpdateWebContentStatus: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.UpdateWebContentStatus,
      }),
      DeleteWebContent: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.DeleteWebContent,
      }),
      GetNewsFolderDrillWithFile: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetFolderDrillWithFile,
      }),
      GetFolderWithFile: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetFolderWithFile,
      }),
      //#endregion news product
      //#region coupon policy
      GetListCouponIssued: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetListCouponIssued,
      }),
      GetCouponIssuedByCode: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetCouponIssuedByCode,
      }),
      UpdateCouponIssued: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.UpdateCouponIssued,
      }),
      UpdateCouponIssuedStatus: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.UpdateCouponIssuedStatus,
      }),
      UpdateCouponStatus: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.UpdateCouponStatus,
      }),
      DeleteCouponIssued: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.DeleteCouponIssued,
      }),
      //#endregion coupon policy
      //#region coupon property
      GetCouponIssuedWareHouse: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetCouponIssuedWareHouse,
      }),
      UpdateCouponIssuedWH: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.UpdateCouponIssuedWH,
      }),
      GetListCouponIssuedMembership: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetListCouponIssuedMembership,
      }),
      GetCouponIssuedMembership: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetCouponIssuedMembership,
      }),
      GetCouponIssuedMembershipByPhone: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetCouponIssuedMembershipByPhone,
      }),
      UpdateCouponIssuedMembership: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.UpdateCouponIssuedMembership,
      }),
      DeleteCouponIssuedMembership: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.DeleteCouponIssuedMembership,
      }),
      UpdateCouponIssuedRounting: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.UpdateCouponIssuedRounting,
      }),
      DeleteCouponIssuedRounting: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.DeleteCouponIssuedRounting,
      }),
      //#endregion coupon property
      //#region coupon product
      GetListCouponIssuedProduct: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetListCouponIssuedProduct,
      }),
      GetCouponIssuedProduct: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetCouponIssuedProduct,
      }),
      UpdateCouponIssuedProduct: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.UpdateCouponIssuedProduct,
      }),
      DeleteCouponIssuedProduct: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.DeleteCouponIssuedProduct,
      }),
      //#endregion coupon product
      //#region coupon
      GetListCoupon: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetListCoupon,
      }),
      ImportExcelCouponIssueMembership: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.ImportExcelCouponIssueMembership,
      }),
      ImportExcelCouponIssueProduct: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.ImportExcelCouponIssueProduct,
      }),
      ExportListCoupon: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.ExportListCoupon,
        // url: DTOConfig.appInfo.apierp + "coupon/ExportListCoupon"//todo cái này không có trong PERP_ERP/coupon
      }),
      //#endregion coupon
      //#region Conf Product
      UpdateProductBestPriceByID: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.UpdateProductBestPriceByID,
      }),
      DeleteProductBestPriceByID: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.DeleteProductBestPriceByID,
      }),
      UpdateProductSpecialByID: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.UpdateProductSpecialByID,
      }),
      DeleteProductSpecialByID: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.DeleteProductSpecialByID,
      }),
      //#endregion Conf Product
      //#region album
      GetListAlbum: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetListAlbum,
      }),
      GetAlbum: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetAlbum,
      }),
      UpdateAlbum: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.UpdateAlbum,
      }),
      UpdateAlbumStatus: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.UpdateAlbumStatus,
      }),
      DeleteAlbum: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.DeleteAlbum,
      }),
      //#endregion album
      //#region album product
      GetListAlbumDetails: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetListAlbumDetails,
      }),
      GetAlbumDetails: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetAlbumDetails,
      }),
      GetAlbumDetailsByBarcode: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetAlbumDetailsByBarcode,
      }),
      UpdateAlbumDetails: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.UpdateAlbumDetails,
      }),
      DeleteAlbumDetails: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.DeleteAlbumDetails,
      }),
      //#endregion album product
      //#region blog
      GetListBlog: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetListBlog,
      }),
      GetBlog: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetBlog,
      }),
      UpdateBlog: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.UpdateBlog,
      }),
      UpdateBlogStatus: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.UpdateBlogStatus,
      }),
      UpdateBlogCategory: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.UpdateBlogCategory,
      }),
      DeleteBlog: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.DeleteBlog,
      }),
      GetListBlogCategory: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetListBlogCategory,
      }),
      //#endregion blog
      //#region news
      GetListNews: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetListNews,
      }),
      GetNews: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetNews,
      }),
      UpdateNews: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.UpdateNews,
      }),
      UpdateCMSNews: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.UpdateCMSNews,
      }),
      UpdateNewsStatus: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.UpdateNewsStatus,
      }),
      UpdateNewsCategory: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.UpdateNewsCategory,
      }),
      DeleteNews: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.DeleteNews,
      }),
      GetListNewsCategory: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetListNewsCategory,
      }),
      GetListCMSNews: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetListCMSNews,
      }),
      GetListCMSNewsCategory: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetListCMSNewsCategory,
      }),
      GetCMSNews: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetCMSNews,
      }),
      //#endregion news
      //#region Policy
      GetListPolicy: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetListPolicy,
      }),
      GetPolicy: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetPolicy,
      }),
      UpdatePolicy: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.UpdatePolicy,
      }),
      UpdatePolicyStatus: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.UpdatePolicyStatus,
      }),
      UpdatePolicyCategory: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.UpdatePolicyCategory,
      }),
      DeletePolicy: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.DeletePolicy,
      }),
      GetListPolicyCategory: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetListPolicyCategory,
      }),
      //#endregion Policy
      //#region Intro
      GetListIntroduce: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetListIntroduce,
      }),
      GetIntroduce: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetIntroduce,
      }),
      UpdateIntroduce: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.UpdateIntroduce,
      }),
      UpdateIntroduceStatus: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.UpdateIntroduceStatus,
      }),
      UpdateIntroduceCategory: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.UpdateIntroduceCategory,
      }),
      DeleteIntroduce: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.DeleteIntroduce,
      }),
      GetListIntroduceCategory: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetListIntroduceCategory,
      }),
      //#endregion Intro
      //#region Store
      GetListStore: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetListStore,
      }),
      GetListProvince: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetListProvince,
      }),
      GetListCountry: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetListCountry,
      }),
      GetStore: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetStore,
      }),
      UpdateStore: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.UpdateStore,
      }),
      DeleteStore: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.DeleteStore,
      }),
      //#endregion Store
      //#region Question
      GetListQuestion: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetListQuestion,
      }),
      GetQuestion: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetQuestion,
      }),
      UpdateQuestion: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.UpdateQuestion,
      }),
      UpdateQuestionStatus: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.UpdateQuestionStatus,
      }),
      UpdateQuestionCategory: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.UpdateQuestionCategory,
      }),
      DeleteQuestion: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.DeleteQuestion,
      }),
      GetListQuestionCategory: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetListQuestionCategory,
      }),
      //#endregion Question
      //#region CouponGroup
      GetListCouponGroup: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetListCouponGroup,
      }),
      GetCouponGroup: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetCouponGroup,
      }),
      UpdateCouponGroup: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.UpdateCouponGroup,
      }),
      DeleteCouponGroup: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.DeleteCouponGroup,
      }),
      //#endregion CouponGroup
      //#region Hashtag
      GetListHashtag: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetListHashTag,
      }),
      GetHashtag: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetHashtag,
      }),
      GetHashtagProduct: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetHashtagProduct,
      }),
      GetHashtagBlog: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetHashtagBlog,
      }),
      UpdateHashtagStatus: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.UpdateHashTagStatus,
      }),
      UpdateHashtag: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.UpdateHashtag,
      }),
      DeleteHashtag: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.DeleteHashtag,
      }),
      ImportExcelBlog: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.ImportExcelBlog,
      }),
      ImportExcelHashtag: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.ImportExcelHashtag,
      }),
      ImportExcelHashtagProduct: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.ImportExcelHashtagProduct,
      }),
      //#endregion Hashtag
      //#region CategoryWeb
      GetListGroupWebTree: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetListGroupWebTree,
      }),
      GetListGroupWeb: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetListGroupWeb,
      }),
      GetGroupWeb: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetGroupWeb,
      }),
      UpdateGroupWeb: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.UpdateGroupWeb
      }),
      DeleteGroupWeb: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.DeleteGroupWeb
      }),
      ImportExcelGroupWeb: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.ImportExcelGroupWeb
      }),
      ExportGroupWeb: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.ExportGroupWeb
      }),
      //#endregion CategoryWeb
      //#region MetaTag
      UpdateProductMetaTag: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.UpdateProductMetaTag,
      }),
      UpdateNewsMetaTag: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.UpdateNewsMetaTag,
      }),
      UpdateProductMetaTagStatus: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.UpdateProductMetaTagStatus,
      }),
      UpdateNewsMetaTagStatus: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.UpdateNewsMetaTagStatus,
      }),
      GetListMetaTagCategory: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetListMetaTagCategory
      }),
      GetListMetaTag: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetListMetaTag
      }),
      UpdateMetaTag: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.UpdateMetaTag
      }),
      UpdateMetaTagStatus: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.UpdateMetaTagStatus
      }),
      //#endregion MetaTag
      //#region SearchKeyword
      GetListSearchKeyword: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetListSearchKeyword,
      }),
      GetSearchKeyword: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetSearchKeyword
      }),
      UpdateSearchKeyword: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.UpdateSearchKeyword
      }),
      UpdateStatusSearchKeyword: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.UpdateStatusSearchKeyword
      }),
      DeleteSearchKeyword: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.DeleteSearchKeyword
      }),
      //#endregion SearchKeyword
      //#region cấu hình web
      GetListWebConfig: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetListWebConfig
      }),
      GetWebConfig: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetWebConfig
      }),
      GetListWebConfigType: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetListWebConfigType
      }),
      UpdateWebConfig: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.UpdateWebConfig
      }),
      UpdateStatusWebConfig: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.UpdateStatusWebConfig
      }),
      DeleteWebConfig: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.DeleteWebConfig
      }),
      //#endregion cấu hình web
      //#region promotion gift property
      GetListCOPOLPromotionGiftType: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetListCOPOLPromotionGiftType
      }),
      GetListCOPOLPromotionChannel: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetListCOPOLPromotionChannel
      }),
      GetListCOPOLApplyScope: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetListCOPOLApplyScope
      }),
      //#endregion promotion gift property
      //#region promotion gift
      GetCOPOLPromotionGiftByBarcode: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetCOPOLPromotionGiftByBarcode
      }),
      GetListCOLSGift: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetListCOLSGift
      }),
      AddListCOPOLPromotionGift: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.AddListCOPOLPromotionGift
      }),
      GetListCOPOLPromotionGiftProduct: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetListCOPOLPromotionGiftProduct
      }),
      UpdateCOPOLPromotionGiftProduct: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.UpdateCOPOLPromotionGiftProduct
      }),
      UpdateCOPOLPromotionGiftProductStatus: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.UpdateCOPOLPromotionGiftProductStatus
      }),
      DeleteCOPOLPromotionGiftProduct: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.DeleteCOPOLPromotionGiftProduct
      }),
      DeleteCOPOLPromotionGift: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.DeleteCOPOLPromotionGift
      }),
      AddCOPOLPromotionGift: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.AddCOPOLPromotionGift
      }),
      ImportCOPOLPromotionGiftProduct: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.ImportCOPOLPromotionGiftProduct
      }),
      //#endregion promotion gift
      //#region promotion range
      GetListCOPOLPromotionRange: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetListCOPOLPromotionRange
      }),
      DeleteListCOPOLPromotionRange: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.DeleteListCOPOLPromotionRange
      }),
      UpdateCOPOLPromotionRange: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.UpdateCOPOLPromotionRange
      }),
      DeleteCOPOLPromotionRange: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.DeleteCOPOLPromotionRange
      }),
      ImportCOPOLPromotionGiftRange: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.ImportCOPOLPromotionGiftRange
      }),
      //#endregion promotion range
      //#region seo
      GetListSEO: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.GetListSEO
      }),
      UpdateSEO: new DTOAPI({
        method: ApiMethodType.post,
        url: EnumMarketing.UpdateSEO
      }),
      ResetCacheSEO: new DTOAPI({
        method: ApiMethodType.get,
        url: EnumMarketing.ResetCacheSEO
      }),
      //#endregion seo
    }
  }
}
