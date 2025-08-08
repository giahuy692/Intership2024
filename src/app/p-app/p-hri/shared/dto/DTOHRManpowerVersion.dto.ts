export class DTOHRManpowerVersion {
    Code: number = 0;
    ManpowerMaster: number = 0; // Code của kế hoach định biên
    Name: string = ''; // Phiên bản
    Description: string = ''; // Mổ tả
    Status: number = 0; // Code trạng thái
    CreatedBy: string = ''; // Người tạo
    CreatedTime: string | Date; // Ngày tạo
    ApprovedBy: string = ''; // Người duyệt
    ApprovedTime: string | Date; // Ngày duyệt
    LastModifiedBy: string = '';
    LastModifiedTime: string | Date = null;
}

export class DTOHRManpowerVersionCus extends DTOHRManpowerVersion {
    StatusName: string = ''; // Tên trạng thái
    ManpowerMasterName: string = '';
    ManpowerMasterYear: number = 0; // Năm của kế hoạch định biên
}