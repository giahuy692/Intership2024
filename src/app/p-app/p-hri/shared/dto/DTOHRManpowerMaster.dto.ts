import { DTOHRManpowerVersionCus } from "./DTOHRManpowerVersion.dto";
import { DTOLSStatusCount } from "./DTOLSStatusCount.dto";

export class DTOHRManpowerMaster {
    Code: number = 0;
    Name: string = ''; // tên định biên
    Description: string = ''; // Mô tả
    Year: number; // Kỳ định biên
    CreatedBy: string = ''; // Người tạo
    CreatedTime: string | Date;
    LastModifiedBy: string = '';
    LastModifiedTime: string | Date;
    Manpower: number = 0; // Số lương định biên
    ManpowerLastYear: number = 0; // Số lượng nhân lực thực tế đầu năm
}

export class DTOHRManpowerMasterCus extends DTOHRManpowerMaster {
    ListManpowerVersionStatus: Array<DTOLSStatusCount> = []; // Danh sách số lượng trạng thái phiên bản
    ListManpowerVersion: Array<DTOHRManpowerVersionCus> = []; // Danh sach phiên bản
    TotalVersion: number = 0; // Tổng số lượng định biên
}

// export const testDataMPMasterCus: DTOHRManpowerMasterCus = 
// {
//     "ListManpowerVersionStatus": null,
//     "ListManpowerVersion": [
//         {
//             "StatusName": "Đang soạn thảo",
//             "ManpowerMasterName": "Contrary to popular belief",
//             "Code": 10008,
//             "ManpowerMaster": 10010,
//             "Name": "V1.0",
//             "Description": "written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum",
//             "Status": 0,
//             "CreatedBy": "Nguyễn Văn Hachi",
//             "CreatedTime": "2025-02-07T14:46:15.02",
//             "ApprovedBy": null,
//             "ApprovedTime": null,
//             "LastModifiedBy": null,
//             "LastModifiedTime": null,
//             "ManpowerMasterYear": 2025
//         },
//         {
//             "StatusName": "Gửi duyệt",
//             "ManpowerMasterName": "Contrary to popular belief",
//             "Code": 10009,
//             "ManpowerMaster": 10010,
//             "Name": "V1.1",
//             "Description": "A newer version with some modifications in the concept of ethics and its applications in modern society.",
//             "Status": 1,
//             "CreatedBy": "Nguyễn Văn Hachi",
//             "CreatedTime": "2025-02-08T10:30:45.50",
//             "ApprovedBy": "Trần Minh Dũng",
//             "ApprovedTime": "2025-02-08T12:00:00.00",
//             "LastModifiedBy": null,
//             "LastModifiedTime": null,
//             "ManpowerMasterYear": 2025
//         }
//     ],
//     "TotalVersion": 2,
//     "Code": 10010,
//     "Name": "Contrary to popular belief",
//     "Description": "but the majority have suffered alteration in some form, by injected humour",
//     "Year": 2025,
//     "CreatedBy": "Nguyễn Văn Hachi",
//     "CreatedTime": "2025-02-07T14:46:14.897",
//     "LastModifiedBy": null,
//     "LastModifiedTime": null,
//     "ManpowerLastYear": null,
//     "Manpower": null
// }

