// Mã khai quan
export class DTOTax {
    Code: number = 0; // Mã định danh chính
    TaxID: string = ''; // Mã thuế
    HSCode: string = ''; // Mã HS (mã phân loại hàng hóa quốc tế)
    TaxDescription: string = ''; // Tên khai quan đầy đủ
    TaxName: string = ''; // Tên loại thuế
    ENName: string = ''; // Tên tiếng Anh
    JPName: string = ''; // Tên tiếng Nhật
    TaxGroup: number = 0; // Phân loại
    TaxGroupName: string = ''; // Tên phân loại
    Origin: number = 0; // Xuất xứ
    OriginName: string = ''; // Tên xuất sứ
    UnitID: number = 0; // Mã đơn vị
    UnitName: string = ''; // Tên đơn vị
    Material: string = ''; // Vật liệu
    Remark: string = ''; // Ghi chú
    IMTaxRate: number = 0; // Thuế suất nhập khẩu (%)
    IMTaxCode: string = ''; // Mã thuế nhập khẩu
    TTDBTaxCode: string = ''; // Mã thuế tiêu thụ đặc biệt
    TTDBTaxRate: number = 0; // Thuế tiêu thụ đặc biệt
    BVMTTaxCode: string = ''; // Mã Thuế bảo vệ môi trường
    BVMTTaxRate: number = 0; // Giá tiền Thuế bảo vệ môi trường
    UnitBVMT: string = ''; // Tên Đơn vị tính Thuế bảo vệ môi trường    
    BaseBVMT: number = 0; // Tỉ lệ Thuế bảo vệ môi trường (%)
    VATInCode: string = ''; // Mã VAT đầu vào
    VATInRate: number = 0; // Thuế suất VAT đầu vào (%)
    VATOutRate: number = 0; // Thuế suất VAT đầu ra (%)
    StatusID: number = 0; // Trạng thái
    StatusName: string = ''; // Tên trạng thái
}