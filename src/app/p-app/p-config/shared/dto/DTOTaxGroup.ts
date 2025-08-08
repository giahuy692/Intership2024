//Phân nhóm khai quan
export class DTOTaxGroup {
    Code: number = 0; // Mã định danh chính
    GroupID: string = ''; // Mã phân nhóm
    GroupName: string = ''; // Tên phân nhóm
    Remark: string = ''; // Ghi chú
    StatusID: number = 0; // Trạng thái
    StatusName: string = ''; // Tên trạng thái
    CreateBy?: string = '';
    CreateTime?: Date;
    LastModifiedBy?: string = '';
    LastModifiedTime?: Date;
}