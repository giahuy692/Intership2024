import { DTOProduct } from "./DTOProduct.dto"

export class DTOHamper{
    State?: string //Đang soạn thảo, Gửi duyệt, Duyệt áp dụng, Ngưng áp dụng, Trả về
    CompanyList?: any[]
    TotalPrice?: number
    Currency?: string
    OtherInfo?: string
    ProductList?: DTOProduct[]
    InfoHamber?: {}
}