
export class DTOPriceRequest{
    Code: number = 0
    COPartner: number = null
    PartnerID: string = ''
    PartnerName: string = ''
    EffDate: Date | string = new Date();
    Remark: string = ''
    CreateTime: string = ''
    ApprovedDate: string = ''
    CreateBy: string = ''
    ApprovedBy: string = ''
    StatusName: string = ''
    StatusID: number = 0
    NoOfNewProduct: number = 0
    NoOfChangePartner: number = 0
    NoOfChangePrice: number = 0
    NoOfChangeTax: number = 0 // số sản phẩm đổi ma khai quan
    TypeData:number = 0
}