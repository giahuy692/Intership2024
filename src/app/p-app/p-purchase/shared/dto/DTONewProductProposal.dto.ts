import { DTOProductPriceRequest } from "./DTOProductPriceRequest.dto";
import {DTOPromotionImage} from "../../../p-marketing/shared/dto/DTOPromotionProduct.dto";

export class DTONewProductProposal extends DTOProductPriceRequest{
    // GroupID1Name: string = ""; // Tên phân nhóm cấp 1
    CommercialTermName: string = ""; // Điều kiện giao hàng
    Partner?: number = 0; // Giá trị nhà cung cấp
    ProductDisclosureNo: number = null; // Số HSCB/TCCS
    BidPriceAfterVAT?: number = 0; // Giá mua dự kiến (+VAT)
    UnitPriceAfterVAT?: number = 0; // Giá bán lẻ dự kiến (+VAT)
    ImportPrice?: number = 0; // Giá gốc hàng NK
    CurrencyImport?: number; // Đồng tiền import
    CurrencyInName?: string; // Tên đồng tiền nhập
    CurrencyOutName?: string; // Tên đồng tiền bán
    CurrencyImportName?: string; // Tên đồng tiền nhập khẩu
    ListImage: DTOPromotionImage[] = [] // Danh sách ảnh sản phẩm
    StatusID: number = 0; // Trạng thái của đề xuất sản phẩm mới
    StatusName: string = ''; // Tên trạng thái của đề xuất sản phẩm mới
}
