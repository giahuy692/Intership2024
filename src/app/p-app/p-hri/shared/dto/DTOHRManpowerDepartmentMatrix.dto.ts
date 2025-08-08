import { DTOHRManpowerLocationMatrix } from "./DTOHRManpowerLocationMatrix.dto";
import { DTOHRManpowerPositionMatrix } from "./DTOHRManpowerPositionMatrix.dto";
import { DTOHRManpowerDetail, DTOHRManpowerDetailCus } from "./DTOHRManpowerDetail.dto";


export class DTOHRManpowerDepartmentMatrix {
    Code: number = 0;
    Status: number = 0; // Code trạng thái
    StatusName: string = ''; // Tên trạng thái
    DepartmentID: string = ''; // Mã đơn vị
    DepartmentName: string = ''; // Tên đơn vị
    Department: number = 0; // Code đơn vị cha
    ListDepartment: DTOHRManpowerDepartmentMatrix[] = []; // Danh sách đơn vị
    ListPosition: DTOHRManpowerPositionMatrix[] = []; // Danh sách chức danh
    ListLocation: DTOHRManpowerLocationMatrix[] = []; // Danh sách địa điểm
    ListManpowerDetail: DTOHRManpowerDetailCus[] = []; //Danh sách định biên
}

// export const testData: DTOHRManpowerDepartmentMatrix[] = [
//     {
//         "DepartmentID": "WUS",
//         "DepartmentName": "Western Unit System",
//         "Department": null,
//         "ListDepartment": null,
//         "ListPosition": [],
//         "ListLocation": null,
//         "Code": 320,
//         "Status": 2,
//         "StatusName": "Duyệt áp dụng",
//         "ListManpowerDetail": null
//     },
//     {
//         "DepartmentID": "Thanh",
//         "DepartmentName": "Thanh Department",
//         "Department": null,
//         "ListDepartment": null,
//         "ListPosition": [
//             {
//                 "PositionID": "POS001",
//                 "PositionName": "Manager",
//                 "Position": null,

//                 "ListLocation": [
//                     {
//                         "LocationID": "AD",
//                         "LocationName": " Admin - Division",
//                         "Location": null,

//                         "Position": 1420,
//                         "Department": 370,
//                         "Code": 1246,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": null
//                     }
//                 ],
//                 "Department": 370,
//                 "IsLeader": false,
//                 "IsSupervivor": false,
//                 "Code": 1424,
//                 "Status": 0,
//                 "StatusName": "Đang soạn thảo",
//                 "ListManpowerDetail": null
//             },
//             {
//                 "PositionID": "TTT",
//                 "PositionName": "Team Lead",
//                 "Position": null,

//                 "ListLocation": [
//                     {
//                         "LocationID": "AD",
//                         "LocationName": " Admin - Division",
//                         "Location": null,

//                         "Position": 1420,
//                         "Department": 370,
//                         "Code": 1246,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": null
//                     }
//                 ],
//                 "Department": 370,
//                 "IsLeader": false,
//                 "IsSupervivor": false,
//                 "Code": 1420,
//                 "Status": 0,
//                 "StatusName": "Đang soạn thảo",
//                 "ListManpowerDetail": null
//             }
//         ],
//         "ListLocation": null,
//         "Code": 370,
//         "Status": 2,
//         "StatusName": "Duyệt áp dụng",
//         "ListManpowerDetail": null
//     },
//     {
//         "DepartmentID": "SA",
//         "DepartmentName": "Sales and Administration",
//         "Department": null,
//         "ListDepartment": null,
//         "ListPosition": [
//             {
//                 "PositionID": "ITSA",
//                 "PositionName": "IT Specialist",
//                 "Position": null,

//                 "ListLocation": [
//                     {
//                         "LocationID": "AA",
//                         "LocationName": "Admin Assistant",
//                         "Location": null,

//                         "Position": 1419,
//                         "Department": 369,
//                         "Code": 1245,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": null
//                     },
//                     {
//                         "LocationID": "AD",
//                         "LocationName": " Admin - Division",
//                         "Location": null,

//                         "Position": 1419,
//                         "Department": 369,
//                         "Code": 1246,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": null
//                     },
//                     {
//                         "LocationID": "AE",
//                         "LocationName": "Administrative Executive",
//                         "Location": null,

//                         "Position": 1419,
//                         "Department": 369,
//                         "Code": 1252,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": null
//                     },
//                     {
//                         "LocationID": "AHR",
//                         "LocationName": "Admin & HR Executive",
//                         "Location": null,

//                         "Position": 1419,
//                         "Department": 369,
//                         "Code": 1247,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": null
//                     },
//                     {
//                         "LocationID": "APS",
//                         "LocationName": "Admin Payment Staff, SPX Express",
//                         "Location": null,

//                         "Position": 1419,
//                         "Department": 369,
//                         "Code": 1251,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": null
//                     },
//                     {
//                         "LocationID": "AS",
//                         "LocationName": "Admin Specialist (Operations Management)",
//                         "Location": null,

//                         "Position": 1419,
//                         "Department": 369,
//                         "Code": 1244,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": null
//                     },
//                     {
//                         "LocationID": "ASQ",
//                         "LocationName": " Admin Staff Quận 1",
//                         "Location": null,

//                         "Position": 1419,
//                         "Department": 369,
//                         "Code": 1243,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": null
//                     },
//                     {
//                         "LocationID": "BAAO",
//                         "LocationName": "Brand Activation Admin Officer",
//                         "Location": null,

//                         "Position": 1419,
//                         "Department": 369,
//                         "Code": 1248,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": null
//                     },
//                     {
//                         "LocationID": "CRM",
//                         "LocationName": "CRM Admin Officer",
//                         "Location": null,

//                         "Position": 1419,
//                         "Department": 369,
//                         "Code": 1255,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": null
//                     },
//                     {
//                         "LocationID": "OA",
//                         "LocationName": "Odm Admin",
//                         "Location": null,

//                         "Position": 1419,
//                         "Department": 369,
//                         "Code": 1250,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": null
//                     },
//                     {
//                         "LocationID": "OAE",
//                         "LocationName": "Office Admin Executive",
//                         "Location": null,

//                         "Position": 1419,
//                         "Department": 369,
//                         "Code": 1249,
//                         "Status": 3,
//                         "StatusName": "Ngưng áp dụng",
//                         "ListManpowerDetail": null
//                     },
//                     {
//                         "LocationID": "ORA",
//                         "LocationName": "Office Receptionist Admin",
//                         "Location": null,

//                         "Position": 1419,
//                         "Department": 369,
//                         "Code": 1254,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": null
//                     }
//                 ],
//                 "Department": 369,
//                 "IsLeader": true,
//                 "IsSupervivor": false,
//                 "Code": 1419,
//                 "Status": 2,
//                 "StatusName": "Duyệt áp dụng",
//                 "ListManpowerDetail": null
//             }
//         ],
//         "ListLocation": null,
//         "Code": 369,
//         "Status": 2,
//         "StatusName": "Duyệt áp dụng",
//         "ListManpowerDetail": null
//     },
//     {
//         "DepartmentID": "QWE",
//         "DepartmentName": "Quality with engineer",
//         "Department": null,
//         "ListDepartment": null,
//         "ListPosition": [
//             {
//                 "PositionID": "WIX",
//                 "PositionName": "Wide island xsow",
//                 "Position": null,

//                 "ListLocation": [
//                     {
//                         "LocationID": "GAZ",
//                         "LocationName": "Aeon Zoro",
//                         "Location": null,

//                         "Position": 1388,
//                         "Department": 319,
//                         "Code": 19,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": null
//                     }
//                 ],
//                 "Department": 319,
//                 "IsLeader": false,
//                 "IsSupervivor": false,
//                 "Code": 1388,
//                 "Status": 1,
//                 "StatusName": "Gởi duyệt",
//                 "ListManpowerDetail": null
//             }
//         ],
//         "ListLocation": null,
//         "Code": 319,
//         "Status": 2,
//         "StatusName": "Duyệt áp dụng",
//         "ListManpowerDetail": null
//     },
//     {
//         "DepartmentID": "PT",
//         "DepartmentName": "Phu Tho",
//         "Department": null,
//         "ListDepartment": null,
//         "ListPosition": [
//             {
//                 "PositionID": "CDA",
//                 "PositionName": "Coty Disk Analysist",
//                 "Position": null,

//                 "ListLocation": [
//                     {
//                         "LocationID": "DIEMTEST02",
//                         "LocationName": "Điểm test 02",
//                         "Location": null,

//                         "Position": 1417,
//                         "Department": 368,
//                         "Code": 1238,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": null
//                     },
//                     {
//                         "LocationID": "SIW",
//                         "LocationName": "Diem lam viec con 2",
//                         "Location": null,

//                         "Position": 1417,
//                         "Department": 368,
//                         "Code": 1242,
//                         "Status": 0,
//                         "StatusName": "Đang soạn thảo",
//                         "ListManpowerDetail": null
//                     },
//                     {
//                         "LocationID": "SPT",
//                         "LocationName": "Cửa hàng PT",
//                         "Location": null,

//                         "Position": 1417,
//                         "Department": 368,
//                         "Code": 8,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": null
//                     }
//                 ],
//                 "Department": 368,
//                 "IsLeader": true,
//                 "IsSupervivor": false,
//                 "Code": 1417,
//                 "Status": 2,
//                 "StatusName": "Duyệt áp dụng",
//                 "ListManpowerDetail": null
//             }
//         ],
//         "ListLocation": null,
//         "Code": 368,
//         "Status": 2,
//         "StatusName": "Duyệt áp dụng",
//         "ListManpowerDetail": null
//     },
//     {
//         "DepartmentID": "PHU",
//         "DepartmentName": "Physology Hit Uni",
//         "Department": null,
//         "ListDepartment": null,
//         "ListPosition": [
//             {
//                 "PositionID": "TP",
//                 "PositionName": "Typical Phycil",
//                 "Position": null,
//                 "ListChild": [
//                     {
//                         "PositionID": "QL",
//                         "PositionName": "Quality List",
//                         "Position": 1415,

//                         "ListLocation": [
//                             {
//                                 "LocationID": "GAL",
//                                 "LocationName": "Aeon Luffy",
//                                 "Location": null,

//                                 "Position": 1416,
//                                 "Department": 367,
//                                 "Code": 18,
//                                 "Status": 2,
//                                 "StatusName": "Duyệt áp dụng",
//                                 "ListManpowerDetail": null
//                             },
//                             {
//                                 "LocationID": "GAS",
//                                 "LocationName": "Aeon Sanji",
//                                 "Location": null,

//                                 "Position": 1416,
//                                 "Department": 367,
//                                 "Code": 17,
//                                 "Status": 2,
//                                 "StatusName": "Duyệt áp dụng",
//                                 "ListManpowerDetail": null
//                             },
//                             {
//                                 "LocationID": "GAZ",
//                                 "LocationName": "Aeon Zoro",
//                                 "Location": null,

//                                 "Position": 1416,
//                                 "Department": 367,
//                                 "Code": 19,
//                                 "Status": 2,
//                                 "StatusName": "Duyệt áp dụng",
//                                 "ListManpowerDetail": null
//                             },
//                             {
//                                 "LocationID": "GCN",
//                                 "LocationName": "COOP Nami",
//                                 "Location": null,

//                                 "Position": 1416,
//                                 "Department": 367,
//                                 "Code": 20,
//                                 "Status": 2,
//                                 "StatusName": "Duyệt áp dụng",
//                                 "ListManpowerDetail": null
//                             }
//                         ],
//                         "Department": 367,
//                         "IsLeader": false,
//                         "IsSupervivor": false,
//                         "Code": 1416,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": null
//                     }
//                 ],
//                 "ListLocation": [
//                     {
//                         "LocationID": "GAL",
//                         "LocationName": "Aeon Luffy",
//                         "Location": null,

//                         "Position": 1416,
//                         "Department": 367,
//                         "Code": 18,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": null
//                     },
//                     {
//                         "LocationID": "GAS",
//                         "LocationName": "Aeon Sanji",
//                         "Location": null,

//                         "Position": 1416,
//                         "Department": 367,
//                         "Code": 17,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": null
//                     },
//                     {
//                         "LocationID": "GAZ",
//                         "LocationName": "Aeon Zoro",
//                         "Location": null,

//                         "Position": 1416,
//                         "Department": 367,
//                         "Code": 19,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": null
//                     },
//                     {
//                         "LocationID": "GCN",
//                         "LocationName": "COOP Nami",
//                         "Location": null,

//                         "Position": 1416,
//                         "Department": 367,
//                         "Code": 20,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": null
//                     }
//                 ],
//                 "Department": 367,
//                 "IsLeader": true,
//                 "IsSupervivor": true,
//                 "Code": 1415,
//                 "Status": 2,
//                 "StatusName": "Duyệt áp dụng",
//                 "ListManpowerDetail": null
//             },
//             {
//                 "PositionID": "QT",
//                 "PositionName": "Quantity Typical",
//                 "Position": null,

//                 "ListLocation": [
//                     {
//                         "LocationID": "GAL",
//                         "LocationName": "Aeon Luffy",
//                         "Location": null,

//                         "Position": 1416,
//                         "Department": 367,
//                         "Code": 18,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": null
//                     },
//                     {
//                         "LocationID": "GAS",
//                         "LocationName": "Aeon Sanji",
//                         "Location": null,

//                         "Position": 1416,
//                         "Department": 367,
//                         "Code": 17,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": null
//                     },
//                     {
//                         "LocationID": "GAZ",
//                         "LocationName": "Aeon Zoro",
//                         "Location": null,

//                         "Position": 1416,
//                         "Department": 367,
//                         "Code": 19,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": null
//                     },
//                     {
//                         "LocationID": "GCN",
//                         "LocationName": "COOP Nami",
//                         "Location": null,

//                         "Position": 1416,
//                         "Department": 367,
//                         "Code": 20,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": null
//                     }
//                 ],
//                 "Department": 367,
//                 "IsLeader": true,
//                 "IsSupervivor": false,
//                 "Code": 1421,
//                 "Status": 2,
//                 "StatusName": "Duyệt áp dụng",
//                 "ListManpowerDetail": null
//             },
//             {
//                 "PositionID": "QD",
//                 "PositionName": "Quantity Ditcy",
//                 "Position": null,

//                 "ListLocation": [
//                     {
//                         "LocationID": "GAL",
//                         "LocationName": "Aeon Luffy",
//                         "Location": null,

//                         "Position": 1416,
//                         "Department": 367,
//                         "Code": 18,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": null
//                     },
//                     {
//                         "LocationID": "GAS",
//                         "LocationName": "Aeon Sanji",
//                         "Location": null,

//                         "Position": 1416,
//                         "Department": 367,
//                         "Code": 17,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": null
//                     },
//                     {
//                         "LocationID": "GAZ",
//                         "LocationName": "Aeon Zoro",
//                         "Location": null,

//                         "Position": 1416,
//                         "Department": 367,
//                         "Code": 19,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": null
//                     },
//                     {
//                         "LocationID": "GCN",
//                         "LocationName": "COOP Nami",
//                         "Location": null,

//                         "Position": 1416,
//                         "Department": 367,
//                         "Code": 20,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": null
//                     }
//                 ],
//                 "Department": 367,
//                 "IsLeader": false,
//                 "IsSupervivor": false,
//                 "Code": 1422,
//                 "Status": 1,
//                 "StatusName": "Gởi duyệt",
//                 "ListManpowerDetail": null
//             },
//             {
//                 "PositionID": "QD2",
//                 "PositionName": "Quantity Ditcy 02",
//                 "Position": null,

//                 "ListLocation": [
//                     {
//                         "LocationID": "GAL",
//                         "LocationName": "Aeon Luffy",
//                         "Location": null,

//                         "Position": 1416,
//                         "Department": 367,
//                         "Code": 18,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": null
//                     },
//                     {
//                         "LocationID": "GAS",
//                         "LocationName": "Aeon Sanji",
//                         "Location": null,

//                         "Position": 1416,
//                         "Department": 367,
//                         "Code": 17,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": null
//                     },
//                     {
//                         "LocationID": "GAZ",
//                         "LocationName": "Aeon Zoro",
//                         "Location": null,

//                         "Position": 1416,
//                         "Department": 367,
//                         "Code": 19,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": null
//                     },
//                     {
//                         "LocationID": "GCN",
//                         "LocationName": "COOP Nami",
//                         "Location": null,

//                         "Position": 1416,
//                         "Department": 367,
//                         "Code": 20,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": null
//                     }
//                 ],
//                 "Department": 367,
//                 "IsLeader": false,
//                 "IsSupervivor": false,
//                 "Code": 1423,
//                 "Status": 2,
//                 "StatusName": "Duyệt áp dụng",
//                 "ListManpowerDetail": null
//             }
//         ],
//         "ListLocation": null,
//         "Code": 367,
//         "Status": 2,
//         "StatusName": "Duyệt áp dụng",
//         "ListManpowerDetail": null
//     },
//     {
//         "DepartmentID": "OOT03",
//         "DepartmentName": "Outreach Team 03",
//         "Department": null,
//         "ListDepartment": null,
//         "ListPosition": [
//             {
//                 "PositionID": "IO03",
//                 "PositionName": "Inzy Out 03",
//                 "Position": null,

//                 "ListLocation": [
//                     {
//                         "LocationID": "GAL",
//                         "LocationName": "Aeon Luffy",
//                         "Location": null,

//                         "Position": 1418,
//                         "Department": 347,
//                         "Code": 18,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": null
//                     },
//                     {
//                         "LocationID": "GAS",
//                         "LocationName": "Aeon Sanji",
//                         "Location": null,

//                         "Position": 1418,
//                         "Department": 347,
//                         "Code": 17,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": null
//                     },
//                     {
//                         "LocationID": "HCO",
//                         "LocationName": "Văn phòng",
//                         "Location": null,

//                         "Position": 1418,
//                         "Department": 347,
//                         "Code": 14,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": null
//                     },
//                     {
//                         "LocationID": "JSX",
//                         "LocationName": "Điểm làm việc Quận ABC",
//                         "Location": null,

//                         "Position": 1418,
//                         "Department": 347,
//                         "Code": 1226,
//                         "Status": 0,
//                         "StatusName": "Đang soạn thảo",
//                         "ListManpowerDetail": null
//                     }
//                 ],
//                 "Department": 347,
//                 "IsLeader": true,
//                 "IsSupervivor": false,
//                 "Code": 1407,
//                 "Status": 2,
//                 "StatusName": "Duyệt áp dụng",
//                 "ListManpowerDetail": null
//             },
//             {
//                 "PositionID": "ĐC",
//                 "PositionName": "Document Cityzal",
//                 "Position": null,

//                 "ListLocation": [
//                     {
//                         "LocationID": "GAL",
//                         "LocationName": "Aeon Luffy",
//                         "Location": null,

//                         "Position": 1418,
//                         "Department": 347,
//                         "Code": 18,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": null
//                     },
//                     {
//                         "LocationID": "GAS",
//                         "LocationName": "Aeon Sanji",
//                         "Location": null,

//                         "Position": 1418,
//                         "Department": 347,
//                         "Code": 17,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": null
//                     },
//                     {
//                         "LocationID": "HCO",
//                         "LocationName": "Văn phòng",
//                         "Location": null,

//                         "Position": 1418,
//                         "Department": 347,
//                         "Code": 14,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": null
//                     },
//                     {
//                         "LocationID": "JSX",
//                         "LocationName": "Điểm làm việc Quận ABC",
//                         "Location": null,

//                         "Position": 1418,
//                         "Department": 347,
//                         "Code": 1226,
//                         "Status": 0,
//                         "StatusName": "Đang soạn thảo",
//                         "ListManpowerDetail": null
//                     }
//                 ],
//                 "Department": 347,
//                 "IsLeader": false,
//                 "IsSupervivor": true,
//                 "Code": 1418,
//                 "Status": 2,
//                 "StatusName": "Duyệt áp dụng",
//                 "ListManpowerDetail": null
//             }
//         ],
//         "ListLocation": null,
//         "Code": 347,
//         "Status": 2,
//         "StatusName": "Duyệt áp dụng",
//         "ListManpowerDetail": null
//     },
//     {
//         "DepartmentID": "OOT02",
//         "DepartmentName": "Outreach Team 02",
//         "Department": null,
//         "ListDepartment": null,
//         "ListPosition": [
//             {
//                 "PositionID": "IO02",
//                 "PositionName": "Inity Out 02",
//                 "Position": null,

//                 "ListLocation": [
//                     {
//                         "LocationID": "TSA",
//                         "LocationName": "Trụ sở A",
//                         "Location": null,

//                         "Position": 1412,
//                         "Department": 346,
//                         "Code": 1227,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": null
//                     }
//                 ],
//                 "Department": 346,
//                 "IsLeader": true,
//                 "IsSupervivor": false,
//                 "Code": 1406,
//                 "Status": 0,
//                 "StatusName": "Đang soạn thảo",
//                 "ListManpowerDetail": null
//             },
//             {
//                 "PositionID": "IOOO2",
//                 "PositionName": "Ion Out On 02",
//                 "Position": null,

//                 "ListLocation": [
//                     {
//                         "LocationID": "TSA",
//                         "LocationName": "Trụ sở A",
//                         "Location": null,

//                         "Position": 1412,
//                         "Department": 346,
//                         "Code": 1227,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": null
//                     }
//                 ],
//                 "Department": 346,
//                 "IsLeader": false,
//                 "IsSupervivor": true,
//                 "Code": 1412,
//                 "Status": 0,
//                 "StatusName": "Đang soạn thảo",
//                 "ListManpowerDetail": null
//             }
//         ],
//         "ListLocation": null,
//         "Code": 346,
//         "Status": 2,
//         "StatusName": "Duyệt áp dụng",
//         "ListManpowerDetail": null
//     },
//     {
//         "DepartmentID": "OOT01",
//         "DepartmentName": "Outreach Team 01",
//         "Department": null,
//         "ListDepartment": null,
//         "ListPosition": [
//             {
//                 "PositionID": "LDT",
//                 "PositionName": "Lity Doc Typical",
//                 "Position": null,

//                 "ListLocation": [
//                     {
//                         "LocationID": "TSA",
//                         "LocationName": "Trụ sở A",
//                         "Location": null,

//                         "Position": 1405,
//                         "Department": 345,
//                         "Code": 1227,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": null
//                     }
//                 ],
//                 "Department": 345,
//                 "IsLeader": true,
//                 "IsSupervivor": true,
//                 "Code": 1405,
//                 "Status": 4,
//                 "StatusName": "Trả về",
//                 "ListManpowerDetail": null
//             }
//         ],
//         "ListLocation": null,
//         "Code": 345,
//         "Status": 2,
//         "StatusName": "Duyệt áp dụng",
//         "ListManpowerDetail": null
//     }
// ]

// export const testData: DTOHRManpowerDepartmentMatrix[] = [

//     {
//         "DepartmentID": "WUS",
//         "DepartmentName": null,
//         "Department": null,
//         "ListDepartment": null,
//         "ListPosition": [],
//         "ListLocation": null,
//         "Code": 320,
//         "Status": 2,
//         "StatusName": "Duyệt áp dụng",
//         "ListManpowerDetail": [
//             {
//                 "ManpowerVersion": 10008,
//                 "Month": -1,
//                 "Code": 0,
//                 "ManpowerMonth": -1,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 0,
//                 "Code": 0,
//                 "ManpowerMonth": 0,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 1,
//                 "Code": 0,
//                 "ManpowerMonth": 10074,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 2,
//                 "Code": 0,
//                 "ManpowerMonth": 10075,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 3,
//                 "Code": 0,
//                 "ManpowerMonth": 10076,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 4,
//                 "Code": 0,
//                 "ManpowerMonth": 10077,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 5,
//                 "Code": 0,
//                 "ManpowerMonth": 10078,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 6,
//                 "Code": 0,
//                 "ManpowerMonth": 10079,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 7,
//                 "Code": 0,
//                 "ManpowerMonth": 10080,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 8,
//                 "Code": 0,
//                 "ManpowerMonth": 10081,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 9,
//                 "Code": 0,
//                 "ManpowerMonth": 10082,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 10,
//                 "Code": 0,
//                 "ManpowerMonth": 10083,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 11,
//                 "Code": 0,
//                 "ManpowerMonth": 10084,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 12,
//                 "Code": 0,
//                 "ManpowerMonth": 10085,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             }
//         ]
//     },
//     {
//         "DepartmentID": "ƯOXXX",
//         "DepartmentName": null,
//         "Department": null,
//         "ListDepartment": null,
//         "ListPosition": [],
//         "ListLocation": null,
//         "Code": 317,
//         "Status": 1,
//         "StatusName": "Gởi duyệt",
//         "ListManpowerDetail": [
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": -1,
//                 "Code": 0,
//                 "ManpowerMonth": -1,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 0,
//                 "Code": 0,
//                 "ManpowerMonth": 0,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 1,
//                 "Code": 0,
//                 "ManpowerMonth": 10074,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 2,
//                 "Code": 0,
//                 "ManpowerMonth": 10075,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 3,
//                 "Code": 0,
//                 "ManpowerMonth": 10076,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 4,
//                 "Code": 0,
//                 "ManpowerMonth": 10077,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 5,
//                 "Code": 0,
//                 "ManpowerMonth": 10078,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 6,
//                 "Code": 0,
//                 "ManpowerMonth": 10079,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 7,
//                 "Code": 0,
//                 "ManpowerMonth": 10080,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 8,
//                 "Code": 0,
//                 "ManpowerMonth": 10081,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 9,
//                 "Code": 0,
//                 "ManpowerMonth": 10082,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 10,
//                 "Code": 0,
//                 "ManpowerMonth": 10083,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 11,
//                 "Code": 0,
//                 "ManpowerMonth": 10084,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 12,
//                 "Code": 0,
//                 "ManpowerMonth": 10085,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             }
//         ]
//     },
//     {
//         "DepartmentID": "Thanh",
//         "DepartmentName": null,
//         "Department": null,
//         "ListDepartment": null,
//         "ListPosition": [
//             {
//                 "PositionID": "",

//                 "Position": null,

//                 "ListLocation": [
//                     {
//                         "LocationID": "AD",
//                         "LocationName": " Admin - Division",
//                         "Location": null,

//                         "Position": 1424,
//                         "Department": 370,
//                         "Code": 1246,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": [
//                             {




//                                 "ManpowerVersion": 10008,
//                                 "Month": -1,
//                                 "Code": 0,
//                                 "ManpowerMonth": -1,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {



//                                 "DepartmentName": null,

//                                 "ManpowerVersion": 10008,
//                                 "Month": 0,
//                                 "Code": 0,
//                                 "ManpowerMonth": 0,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {



//                                 "DepartmentName": null,

//                                 "ManpowerVersion": 10008,
//                                 "Month": 1,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10074,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {



//                                 "DepartmentName": null,

//                                 "ManpowerVersion": 10008,
//                                 "Month": 2,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10075,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {



//                                 "DepartmentName": null,

//                                 "ManpowerVersion": 10008,
//                                 "Month": 3,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10076,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {



//                                 "DepartmentName": null,

//                                 "ManpowerVersion": 10008,
//                                 "Month": 4,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10077,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {



//                                 "DepartmentName": null,

//                                 "ManpowerVersion": 10008,
//                                 "Month": 5,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10078,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {



//                                 "DepartmentName": null,

//                                 "ManpowerVersion": 10008,
//                                 "Month": 6,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10079,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {



//                                 "DepartmentName": null,

//                                 "ManpowerVersion": 10008,
//                                 "Month": 7,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10080,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {



//                                 "DepartmentName": null,

//                                 "ManpowerVersion": 10008,
//                                 "Month": 8,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10081,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {



//                                 "DepartmentName": null,

//                                 "ManpowerVersion": 10008,
//                                 "Month": 9,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10082,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {



//                                 "DepartmentName": null,

//                                 "ManpowerVersion": 10008,
//                                 "Month": 10,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10083,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {



//                                 "DepartmentName": null,

//                                 "ManpowerVersion": 10008,
//                                 "Month": 11,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10084,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {



//                                 "DepartmentName": null,

//                                 "ManpowerVersion": 10008,
//                                 "Month": 12,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10085,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             }
//                         ]
//                     }
//                 ],
//                 "Department": 370,
//                 "IsLeader": false,
//                 "IsSupervivor": false,
//                 "Code": 1424,
//                 "Status": 0,
//                 "StatusName": "Đang soạn thảo",
//                 "ListManpowerDetail": [
//                     {




//                         "ManpowerVersion": 10008,
//                         "Month": -1,
//                         "Code": 0,
//                         "ManpowerMonth": -1,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {



//                         "DepartmentName": null,

//                         "ManpowerVersion": 10008,
//                         "Month": 0,
//                         "Code": 0,
//                         "ManpowerMonth": 0,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {



//                         "DepartmentName": null,

//                         "ManpowerVersion": 10008,
//                         "Month": 1,
//                         "Code": 0,
//                         "ManpowerMonth": 10074,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {



//                         "DepartmentName": null,

//                         "ManpowerVersion": 10008,
//                         "Month": 2,
//                         "Code": 0,
//                         "ManpowerMonth": 10075,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {



//                         "DepartmentName": null,

//                         "ManpowerVersion": 10008,
//                         "Month": 3,
//                         "Code": 0,
//                         "ManpowerMonth": 10076,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {



//                         "DepartmentName": null,

//                         "ManpowerVersion": 10008,
//                         "Month": 4,
//                         "Code": 0,
//                         "ManpowerMonth": 10077,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {



//                         "DepartmentName": null,

//                         "ManpowerVersion": 10008,
//                         "Month": 5,
//                         "Code": 0,
//                         "ManpowerMonth": 10078,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {



//                         "DepartmentName": null,

//                         "ManpowerVersion": 10008,
//                         "Month": 6,
//                         "Code": 0,
//                         "ManpowerMonth": 10079,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {



//                         "DepartmentName": null,

//                         "ManpowerVersion": 10008,
//                         "Month": 7,
//                         "Code": 0,
//                         "ManpowerMonth": 10080,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {



//                         "DepartmentName": null,

//                         "ManpowerVersion": 10008,
//                         "Month": 8,
//                         "Code": 0,
//                         "ManpowerMonth": 10081,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {



//                         "DepartmentName": null,

//                         "ManpowerVersion": 10008,
//                         "Month": 9,
//                         "Code": 0,
//                         "ManpowerMonth": 10082,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {



//                         "DepartmentName": null,

//                         "ManpowerVersion": 10008,
//                         "Month": 10,
//                         "Code": 0,
//                         "ManpowerMonth": 10083,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {



//                         "DepartmentName": null,

//                         "ManpowerVersion": 10008,
//                         "Month": 11,
//                         "Code": 0,
//                         "ManpowerMonth": 10084,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {



//                         "DepartmentName": null,

//                         "ManpowerVersion": 10008,
//                         "Month": 12,
//                         "Code": 0,
//                         "ManpowerMonth": 10085,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     }
//                 ]
//             },
//             {
//                 "PositionID": "TTT",

//                 "Position": null,

//                 "ListLocation": [
//                     {
//                         "LocationID": "AD",
//                         "LocationName": " Admin - Division",
//                         "Location": null,

//                         "Position": 1420,
//                         "Department": 370,
//                         "Code": 1246,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": [
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": -1,
//                                 "Code": 0,
//                                 "ManpowerMonth": -1,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 0,
//                                 "Code": 0,
//                                 "ManpowerMonth": 0,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 1,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10074,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 2,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10075,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 3,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10076,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 4,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10077,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 5,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10078,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 6,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10079,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 7,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10080,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 8,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10081,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 9,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10082,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 10,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10083,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 11,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10084,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 12,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10085,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             }
//                         ]
//                     }
//                 ],
//                 "Department": 370,
//                 "IsLeader": false,
//                 "IsSupervivor": false,
//                 "Code": 1420,
//                 "Status": 0,
//                 "StatusName": "Đang soạn thảo",
//                 "ListManpowerDetail": [
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": -1,
//                         "Code": 0,
//                         "ManpowerMonth": -1,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 0,
//                         "Code": 0,
//                         "ManpowerMonth": 0,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 1,
//                         "Code": 0,
//                         "ManpowerMonth": 10074,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 2,
//                         "Code": 0,
//                         "ManpowerMonth": 10075,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 3,
//                         "Code": 0,
//                         "ManpowerMonth": 10076,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 4,
//                         "Code": 0,
//                         "ManpowerMonth": 10077,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 5,
//                         "Code": 0,
//                         "ManpowerMonth": 10078,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 6,
//                         "Code": 0,
//                         "ManpowerMonth": 10079,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 7,
//                         "Code": 0,
//                         "ManpowerMonth": 10080,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 8,
//                         "Code": 0,
//                         "ManpowerMonth": 10081,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 9,
//                         "Code": 0,
//                         "ManpowerMonth": 10082,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 10,
//                         "Code": 0,
//                         "ManpowerMonth": 10083,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 11,
//                         "Code": 0,
//                         "ManpowerMonth": 10084,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 12,
//                         "Code": 0,
//                         "ManpowerMonth": 10085,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     }
//                 ]
//             }
//         ],
//         "ListLocation": null,
//         "Code": 370,
//         "Status": 2,
//         "StatusName": "Duyệt áp dụng",
//         "ListManpowerDetail": [
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": -1,
//                 "Code": 0,
//                 "ManpowerMonth": -1,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 0,
//                 "Code": 0,
//                 "ManpowerMonth": 0,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 1,
//                 "Code": 0,
//                 "ManpowerMonth": 10074,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 2,
//                 "Code": 0,
//                 "ManpowerMonth": 10075,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 3,
//                 "Code": 0,
//                 "ManpowerMonth": 10076,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 4,
//                 "Code": 0,
//                 "ManpowerMonth": 10077,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 5,
//                 "Code": 0,
//                 "ManpowerMonth": 10078,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 6,
//                 "Code": 0,
//                 "ManpowerMonth": 10079,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 7,
//                 "Code": 0,
//                 "ManpowerMonth": 10080,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 8,
//                 "Code": 0,
//                 "ManpowerMonth": 10081,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 9,
//                 "Code": 0,
//                 "ManpowerMonth": 10082,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 10,
//                 "Code": 0,
//                 "ManpowerMonth": 10083,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 11,
//                 "Code": 0,
//                 "ManpowerMonth": 10084,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 12,
//                 "Code": 0,
//                 "ManpowerMonth": 10085,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             }
//         ]
//     },
//     {
//         "DepartmentID": "SA",
//         "DepartmentName": null,
//         "Department": null,
//         "ListDepartment": null,
//         "ListPosition": [
//             {
//                 "PositionID": "ITSA",

//                 "Position": null,

//                 "ListLocation": [
//                     {
//                         "LocationID": "AA",
//                         "LocationName": "Admin Assistant",
//                         "Location": null,

//                         "Position": 1419,
//                         "Department": 369,
//                         "Code": 1245,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": [
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": -1,
//                                 "Code": 0,
//                                 "ManpowerMonth": -1,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 28,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 0,
//                                 "Code": 0,
//                                 "ManpowerMonth": 0,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {
//                                 "IsEdit": null,




//                                 "ManpowerVersion": 0,
//                                 "Month": 1,
//                                 "Code": 1,
//                                 "ManpowerMonth": 10074,
//                                 "Location": 1245,
//                                 "Position": 1419,
//                                 "Department": 369,
//                                 "Quantity": 5,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {
//                                 "IsEdit": null,




//                                 "ManpowerVersion": 0,
//                                 "Month": 2,
//                                 "Code": 2,
//                                 "ManpowerMonth": 10075,
//                                 "Location": 1245,
//                                 "Position": 1419,
//                                 "Department": 369,
//                                 "Quantity": 5,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 3,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10076,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 4,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10077,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 5,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10078,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 6,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10079,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 7,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10080,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 8,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10081,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 9,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10082,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 10,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10083,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 11,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10084,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 12,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10085,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             }
//                         ]
//                     },
//                     {
//                         "LocationID": "AD",
//                         "LocationName": " Admin - Division",
//                         "Location": null,

//                         "Position": 1419,
//                         "Department": 369,
//                         "Code": 1246,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": [
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": -1,
//                                 "Code": 0,
//                                 "ManpowerMonth": -1,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 6,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 0,
//                                 "Code": 0,
//                                 "ManpowerMonth": 0,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 1,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10074,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 2,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10075,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 3,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10076,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 4,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10077,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 5,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10078,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 6,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10079,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 7,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10080,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 8,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10081,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 9,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10082,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 10,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10083,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 11,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10084,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 12,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10085,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             }
//                         ]
//                     },
//                     {
//                         "LocationID": "AE",
//                         "LocationName": "Administrative Executive",
//                         "Location": null,

//                         "Position": 1419,
//                         "Department": 369,
//                         "Code": 1252,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": [
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": -1,
//                                 "Code": 0,
//                                 "ManpowerMonth": -1,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 2,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 0,
//                                 "Code": 0,
//                                 "ManpowerMonth": 0,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 1,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10074,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 2,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10075,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 3,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10076,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 4,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10077,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 5,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10078,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 6,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10079,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 7,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10080,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {                                
//                                 "ManpowerVersion": 10008,
//                                 "Month": 8,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10081,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 9,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10082,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 10,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10083,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 11,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10084,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 12,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10085,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             }
//                         ]
//                     },
//                     {
//                         "LocationID": "AHR",
//                         "LocationName": "Admin & HR Executive",
//                         "Location": null,

//                         "Position": 1419,
//                         "Department": 369,
//                         "Code": 1247,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": [
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": -1,
//                                 "Code": 0,
//                                 "ManpowerMonth": -1,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 13,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 0,
//                                 "Code": 0,
//                                 "ManpowerMonth": 0,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 1,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10074,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 2,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10075,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 3,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10076,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 4,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10077,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 5,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10078,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 6,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10079,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 7,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10080,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 8,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10081,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 9,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10082,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 10,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10083,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 11,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10084,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 12,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10085,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             }
//                         ]
//                     },
//                     {
//                         "LocationID": "APS",
//                         "LocationName": "Admin Payment Staff, SPX Express",
//                         "Location": null,

//                         "Position": 1419,
//                         "Department": 369,
//                         "Code": 1251,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": [
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": -1,
//                                 "Code": 0,
//                                 "ManpowerMonth": -1,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 0,
//                                 "Code": 0,
//                                 "ManpowerMonth": 0,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 1,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10074,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 2,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10075,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 3,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10076,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 4,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10077,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 5,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10078,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 6,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10079,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 7,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10080,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 8,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10081,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 9,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10082,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 10,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10083,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 11,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10084,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 12,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10085,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             }
//                         ]
//                     },
//                     {
//                         "LocationID": "AS",
//                         "LocationName": "Admin Specialist (Operations Management)",
//                         "Location": null,

//                         "Position": 1419,
//                         "Department": 369,
//                         "Code": 1244,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": [
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": -1,
//                                 "Code": 0,
//                                 "ManpowerMonth": -1,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 1,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 0,
//                                 "Code": 0,
//                                 "ManpowerMonth": 0,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 1,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10074,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 2,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10075,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 3,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10076,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 4,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10077,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 5,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10078,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 6,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10079,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 7,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10080,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 8,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10081,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 9,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10082,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 10,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10083,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 11,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10084,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 12,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10085,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             }
//                         ]
//                     },
//                     {
//                         "LocationID": "ASQ",
//                         "LocationName": " Admin Staff Quận 1",
//                         "Location": null,

//                         "Position": 1419,
//                         "Department": 369,
//                         "Code": 1243,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": [
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": -1,
//                                 "Code": 0,
//                                 "ManpowerMonth": -1,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 1,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 0,
//                                 "Code": 0,
//                                 "ManpowerMonth": 0,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 1,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10074,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 2,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10075,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 3,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10076,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 4,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10077,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 5,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10078,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 6,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10079,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 7,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10080,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 8,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10081,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 9,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10082,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 10,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10083,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 11,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10084,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 12,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10085,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             }
//                         ]
//                     },
//                     {
//                         "LocationID": "BAAO",
//                         "LocationName": "Brand Activation Admin Officer",
//                         "Location": null,

//                         "Position": 1419,
//                         "Department": 369,
//                         "Code": 1248,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": [
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": -1,
//                                 "Code": 0,
//                                 "ManpowerMonth": -1,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 0,
//                                 "Code": 0,
//                                 "ManpowerMonth": 0,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 1,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10074,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 2,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10075,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 3,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10076,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 4,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10077,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 5,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10078,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 6,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10079,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 7,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10080,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 8,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10081,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 9,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10082,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 10,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10083,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 11,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10084,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 12,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10085,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             }
//                         ]
//                     },
//                     {
//                         "LocationID": "CRM",
//                         "LocationName": "CRM Admin Officer",
//                         "Location": null,

//                         "Position": 1419,
//                         "Department": 369,
//                         "Code": 1255,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": [
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": -1,
//                                 "Code": 0,
//                                 "ManpowerMonth": -1,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 0,
//                                 "Code": 0,
//                                 "ManpowerMonth": 0,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 1,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10074,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 2,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10075,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 3,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10076,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 4,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10077,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 5,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10078,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 6,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10079,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 7,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10080,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 8,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10081,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 9,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10082,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 10,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10083,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 11,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10084,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 12,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10085,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             }
//                         ]
//                     },
//                     {
//                         "LocationID": "OA",
//                         "LocationName": "Odm Admin",
//                         "Location": null,
//                         "ListChild": [
//                             {
//                                 "LocationID": "OAE",
//                                 "LocationName": "Office Admin Executive",
//                                 "Location": 1250,

//                                 "Position": 1419,
//                                 "Department": 369,
//                                 "Code": 1249,
//                                 "Status": 3,
//                                 "StatusName": "Ngưng áp dụng",
//                                 "ListManpowerDetail": [
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": -1,
//                                         "Code": 0,
//                                         "ManpowerMonth": -1,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": 0,
//                                         "Code": 0,
//                                         "ManpowerMonth": 0,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": 1,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10074,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": 2,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10075,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": 3,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10076,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": 4,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10077,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": 5,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10078,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": 6,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10079,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": 7,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10080,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": 8,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10081,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": 9,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10082,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": 10,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10083,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": 11,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10084,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": 12,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10085,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     }
//                                 ]
//                             }
//                         ],
//                         "Position": 1419,
//                         "Department": 369,
//                         "Code": 1250,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": [
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": -1,
//                                 "Code": 0,
//                                 "ManpowerMonth": -1,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 0,
//                                 "Code": 0,
//                                 "ManpowerMonth": 0,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 1,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10074,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 2,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10075,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 3,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10076,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 4,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10077,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 5,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10078,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 6,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10079,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 7,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10080,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 8,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10081,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 9,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10082,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 10,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10083,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 11,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10084,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 12,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10085,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             }
//                         ]
//                     },
//                     {
//                         "LocationID": "ORA",
//                         "LocationName": "Office Receptionist Admin",
//                         "Location": null,

//                         "Position": 1419,
//                         "Department": 369,
//                         "Code": 1254,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": [
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": -1,
//                                 "Code": 0,
//                                 "ManpowerMonth": -1,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 0,
//                                 "Code": 0,
//                                 "ManpowerMonth": 0,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 1,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10074,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 2,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10075,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 3,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10076,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 4,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10077,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 5,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10078,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 6,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10079,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 7,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10080,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 8,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10081,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 9,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10082,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 10,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10083,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 11,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10084,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 12,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10085,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             }
//                         ]
//                     }
//                 ],
//                 "Department": 369,
//                 "IsLeader": true,
//                 "IsSupervivor": false,
//                 "Code": 1419,
//                 "Status": 2,
//                 "StatusName": "Duyệt áp dụng",
//                 "ListManpowerDetail": [
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": -1,
//                         "Code": 0,
//                         "ManpowerMonth": -1,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 51,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 0,
//                         "Code": 0,
//                         "ManpowerMonth": 0,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 1,
//                         "Code": 0,
//                         "ManpowerMonth": 10074,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 5,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 2,
//                         "Code": 0,
//                         "ManpowerMonth": 10075,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 5,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 3,
//                         "Code": 0,
//                         "ManpowerMonth": 10076,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 4,
//                         "Code": 0,
//                         "ManpowerMonth": 10077,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 5,
//                         "Code": 0,
//                         "ManpowerMonth": 10078,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 6,
//                         "Code": 0,
//                         "ManpowerMonth": 10079,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 7,
//                         "Code": 0,
//                         "ManpowerMonth": 10080,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 8,
//                         "Code": 0,
//                         "ManpowerMonth": 10081,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 9,
//                         "Code": 0,
//                         "ManpowerMonth": 10082,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 10,
//                         "Code": 0,
//                         "ManpowerMonth": 10083,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 11,
//                         "Code": 0,
//                         "ManpowerMonth": 10084,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 12,
//                         "Code": 0,
//                         "ManpowerMonth": 10085,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     }
//                 ]
//             }
//         ],
//         "ListLocation": null,
//         "Code": 369,
//         "Status": 2,
//         "StatusName": "Duyệt áp dụng",
//         "ListManpowerDetail": [
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": -1,
//                 "Code": 0,
//                 "ManpowerMonth": -1,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 51,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 0,
//                 "Code": 0,
//                 "ManpowerMonth": 0,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 1,
//                 "Code": 0,
//                 "ManpowerMonth": 10074,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 5,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 2,
//                 "Code": 0,
//                 "ManpowerMonth": 10075,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 5,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 3,
//                 "Code": 0,
//                 "ManpowerMonth": 10076,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 4,
//                 "Code": 0,
//                 "ManpowerMonth": 10077,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 5,
//                 "Code": 0,
//                 "ManpowerMonth": 10078,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 6,
//                 "Code": 0,
//                 "ManpowerMonth": 10079,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 7,
//                 "Code": 0,
//                 "ManpowerMonth": 10080,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 8,
//                 "Code": 0,
//                 "ManpowerMonth": 10081,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 9,
//                 "Code": 0,
//                 "ManpowerMonth": 10082,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 10,
//                 "Code": 0,
//                 "ManpowerMonth": 10083,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 11,
//                 "Code": 0,
//                 "ManpowerMonth": 10084,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 12,
//                 "Code": 0,
//                 "ManpowerMonth": 10085,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             }
//         ]
//     },
//     {
//         "DepartmentID": "QWE",

//         "Department": null,
//         "ListDepartment": null,
//         "ListPosition": [
//             {
//                 "PositionID": "WIX",

//                 "Position": null,

//                 "ListLocation": [
//                     {
//                         "LocationID": "GAZ",
//                         "LocationName": "Aeon Zoro",
//                         "Location": 16,

//                         "Position": 1388,
//                         "Department": 319,
//                         "Code": 19,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": [
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": -1,
//                                 "Code": 0,
//                                 "ManpowerMonth": -1,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 0,
//                                 "Code": 0,
//                                 "ManpowerMonth": 0,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 1,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10074,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 2,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10075,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 3,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10076,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 4,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10077,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 5,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10078,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 6,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10079,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 7,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10080,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 8,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10081,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 9,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10082,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 10,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10083,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 11,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10084,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 12,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10085,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             }
//                         ]
//                     }
//                 ],
//                 "Department": 319,
//                 "IsLeader": false,
//                 "IsSupervivor": false,
//                 "Code": 1388,
//                 "Status": 1,
//                 "StatusName": "Gởi duyệt",
//                 "ListManpowerDetail": [
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": -1,
//                         "Code": 0,
//                         "ManpowerMonth": -1,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 0,
//                         "Code": 0,
//                         "ManpowerMonth": 0,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 1,
//                         "Code": 0,
//                         "ManpowerMonth": 10074,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 2,
//                         "Code": 0,
//                         "ManpowerMonth": 10075,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 3,
//                         "Code": 0,
//                         "ManpowerMonth": 10076,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 4,
//                         "Code": 0,
//                         "ManpowerMonth": 10077,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 5,
//                         "Code": 0,
//                         "ManpowerMonth": 10078,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 6,
//                         "Code": 0,
//                         "ManpowerMonth": 10079,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 7,
//                         "Code": 0,
//                         "ManpowerMonth": 10080,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 8,
//                         "Code": 0,
//                         "ManpowerMonth": 10081,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 9,
//                         "Code": 0,
//                         "ManpowerMonth": 10082,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 10,
//                         "Code": 0,
//                         "ManpowerMonth": 10083,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 11,
//                         "Code": 0,
//                         "ManpowerMonth": 10084,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 12,
//                         "Code": 0,
//                         "ManpowerMonth": 10085,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     }
//                 ]
//             }
//         ],
//         "ListLocation": null,
//         "Code": 319,
//         "Status": 2,
//         "StatusName": "Duyệt áp dụng",
//         "ListManpowerDetail": [
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": -1,
//                 "Code": 0,
//                 "ManpowerMonth": -1,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 0,
//                 "Code": 0,
//                 "ManpowerMonth": 0,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 1,
//                 "Code": 0,
//                 "ManpowerMonth": 10074,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 2,
//                 "Code": 0,
//                 "ManpowerMonth": 10075,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 3,
//                 "Code": 0,
//                 "ManpowerMonth": 10076,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 4,
//                 "Code": 0,
//                 "ManpowerMonth": 10077,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 5,
//                 "Code": 0,
//                 "ManpowerMonth": 10078,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 6,
//                 "Code": 0,
//                 "ManpowerMonth": 10079,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 7,
//                 "Code": 0,
//                 "ManpowerMonth": 10080,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 8,
//                 "Code": 0,
//                 "ManpowerMonth": 10081,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 9,
//                 "Code": 0,
//                 "ManpowerMonth": 10082,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 10,
//                 "Code": 0,
//                 "ManpowerMonth": 10083,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 11,
//                 "Code": 0,
//                 "ManpowerMonth": 10084,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 12,
//                 "Code": 0,
//                 "ManpowerMonth": 10085,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             }
//         ]
//     },
//     {
//         "DepartmentID": "QEA",
//         "DepartmentName": "AQRRW",
//         "Department": null,
//         "ListDepartment": null,
//         "ListPosition": [],
//         "ListLocation": null,
//         "Code": 316,
//         "Status": 1,
//         "StatusName": "Gởi duyệt",
//         "ListManpowerDetail": [
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": -1,
//                 "Code": 0,
//                 "ManpowerMonth": -1,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 0,
//                 "Code": 0,
//                 "ManpowerMonth": 0,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 1,
//                 "Code": 0,
//                 "ManpowerMonth": 10074,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 2,
//                 "Code": 0,
//                 "ManpowerMonth": 10075,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 3,
//                 "Code": 0,
//                 "ManpowerMonth": 10076,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 4,
//                 "Code": 0,
//                 "ManpowerMonth": 10077,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 5,
//                 "Code": 0,
//                 "ManpowerMonth": 10078,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 6,
//                 "Code": 0,
//                 "ManpowerMonth": 10079,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 7,
//                 "Code": 0,
//                 "ManpowerMonth": 10080,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 8,
//                 "Code": 0,
//                 "ManpowerMonth": 10081,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 9,
//                 "Code": 0,
//                 "ManpowerMonth": 10082,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 10,
//                 "Code": 0,
//                 "ManpowerMonth": 10083,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 11,
//                 "Code": 0,
//                 "ManpowerMonth": 10084,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 12,
//                 "Code": 0,
//                 "ManpowerMonth": 10085,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             }
//         ]
//     },
//     {
//         "DepartmentID": "PT",

//         "Department": null,
//         "ListDepartment": null,
//         "ListPosition": [
//             {
//                 "PositionID": "CDA",

//                 "Position": null,

//                 "ListLocation": [
//                     {
//                         "LocationID": "SPT",
//                         "LocationName": "Cửa hàng PT",
//                         "Location": 15,

//                         "Position": 1417,
//                         "Department": 368,
//                         "Code": 8,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": [
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": -1,
//                                 "Code": 0,
//                                 "ManpowerMonth": -1,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 1,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 0,
//                                 "Code": 0,
//                                 "ManpowerMonth": 0,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 1,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10074,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 2,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10075,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 3,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10076,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 4,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10077,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 5,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10078,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 6,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10079,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 7,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10080,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 8,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10081,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 9,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10082,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 10,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10083,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 11,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10084,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 12,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10085,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             }
//                         ]
//                     }
//                 ],
//                 "Department": 368,
//                 "IsLeader": true,
//                 "IsSupervivor": false,
//                 "Code": 1417,
//                 "Status": 2,
//                 "StatusName": "Duyệt áp dụng",
//                 "ListManpowerDetail": [
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": -1,
//                         "Code": 0,
//                         "ManpowerMonth": -1,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 1,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 0,
//                         "Code": 0,
//                         "ManpowerMonth": 0,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 1,
//                         "Code": 0,
//                         "ManpowerMonth": 10074,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 2,
//                         "Code": 0,
//                         "ManpowerMonth": 10075,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 3,
//                         "Code": 0,
//                         "ManpowerMonth": 10076,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 4,
//                         "Code": 0,
//                         "ManpowerMonth": 10077,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 5,
//                         "Code": 0,
//                         "ManpowerMonth": 10078,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 6,
//                         "Code": 0,
//                         "ManpowerMonth": 10079,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 7,
//                         "Code": 0,
//                         "ManpowerMonth": 10080,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 8,
//                         "Code": 0,
//                         "ManpowerMonth": 10081,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 9,
//                         "Code": 0,
//                         "ManpowerMonth": 10082,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 10,
//                         "Code": 0,
//                         "ManpowerMonth": 10083,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 11,
//                         "Code": 0,
//                         "ManpowerMonth": 10084,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 12,
//                         "Code": 0,
//                         "ManpowerMonth": 10085,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     }
//                 ]
//             }
//         ],
//         "ListLocation": null,
//         "Code": 368,
//         "Status": 2,
//         "StatusName": "Duyệt áp dụng",
//         "ListManpowerDetail": [
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": -1,
//                 "Code": 0,
//                 "ManpowerMonth": -1,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 1,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 0,
//                 "Code": 0,
//                 "ManpowerMonth": 0,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 1,
//                 "Code": 0,
//                 "ManpowerMonth": 10074,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 2,
//                 "Code": 0,
//                 "ManpowerMonth": 10075,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 3,
//                 "Code": 0,
//                 "ManpowerMonth": 10076,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 4,
//                 "Code": 0,
//                 "ManpowerMonth": 10077,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 5,
//                 "Code": 0,
//                 "ManpowerMonth": 10078,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 6,
//                 "Code": 0,
//                 "ManpowerMonth": 10079,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 7,
//                 "Code": 0,
//                 "ManpowerMonth": 10080,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 8,
//                 "Code": 0,
//                 "ManpowerMonth": 10081,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 9,
//                 "Code": 0,
//                 "ManpowerMonth": 10082,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 10,
//                 "Code": 0,
//                 "ManpowerMonth": 10083,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 11,
//                 "Code": 0,
//                 "ManpowerMonth": 10084,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 12,
//                 "Code": 0,
//                 "ManpowerMonth": 10085,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             }
//         ]
//     },
//     {
//         "DepartmentID": "PHU",

//         "Department": null,
//         "ListDepartment": null,
//         "ListPosition": [
//             {
//                 "PositionID": "TP",

//                 "Position": null,
//                 "ListChild": [
//                     {
//                         "PositionID": "QL",

//                         "Position": 1415,

//                         "ListLocation": [
//                             {
//                                 "LocationID": "GAL",
//                                 "LocationName": "Aeon Luffy",
//                                 "Location": 16,

//                                 "Position": 1416,
//                                 "Department": 367,
//                                 "Code": 18,
//                                 "Status": 2,
//                                 "StatusName": "Duyệt áp dụng",
//                                 "ListManpowerDetail": [
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": -1,
//                                         "Code": 0,
//                                         "ManpowerMonth": -1,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 9,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": 0,
//                                         "Code": 0,
//                                         "ManpowerMonth": 0,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": 1,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10074,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": 2,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10075,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": 3,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10076,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": 4,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10077,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": 5,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10078,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": 6,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10079,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": 7,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10080,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": 8,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10081,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": 9,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10082,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": 10,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10083,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": 11,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10084,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": 12,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10085,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     }
//                                 ]
//                             },
//                             {
//                                 "LocationID": "GAS",
//                                 "LocationName": "Aeon Sanji",
//                                 "Location": 16,

//                                 "Position": 1416,
//                                 "Department": 367,
//                                 "Code": 17,
//                                 "Status": 2,
//                                 "StatusName": "Duyệt áp dụng",
//                                 "ListManpowerDetail": [
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": -1,
//                                         "Code": 0,
//                                         "ManpowerMonth": -1,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 5,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": 0,
//                                         "Code": 0,
//                                         "ManpowerMonth": 0,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": 1,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10074,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": 2,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10075,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": 3,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10076,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": 4,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10077,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": 5,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10078,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": 6,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10079,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": 7,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10080,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": 8,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10081,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": 9,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10082,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": 10,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10083,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": 11,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10084,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": 12,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10085,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     }
//                                 ]
//                             },
//                             {
//                                 "LocationID": "GAZ",
//                                 "LocationName": "Aeon Zoro",
//                                 "Location": 16,

//                                 "Position": 1416,
//                                 "Department": 367,
//                                 "Code": 19,
//                                 "Status": 2,
//                                 "StatusName": "Duyệt áp dụng",
//                                 "ListManpowerDetail": [
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": -1,
//                                         "Code": 0,
//                                         "ManpowerMonth": -1,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 2,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": 0,
//                                         "Code": 0,
//                                         "ManpowerMonth": 0,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": 1,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10074,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": 2,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10075,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": 3,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10076,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": 4,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10077,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": 5,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10078,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": 6,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10079,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": 7,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10080,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": 8,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10081,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": 9,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10082,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": 10,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10083,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": 11,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10084,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": 12,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10085,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     }
//                                 ]
//                             },
//                             {
//                                 "LocationID": "GCN",
//                                 "LocationName": "COOP Nami",
//                                 "Location": 16,

//                                 "Position": 1416,
//                                 "Department": 367,
//                                 "Code": 20,
//                                 "Status": 2,
//                                 "StatusName": "Duyệt áp dụng",
//                                 "ListManpowerDetail": [
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": -1,
//                                         "Code": 0,
//                                         "ManpowerMonth": -1,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": 0,
//                                         "Code": 0,
//                                         "ManpowerMonth": 0,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": 1,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10074,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": 2,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10075,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": 3,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10076,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": 4,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10077,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": 5,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10078,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": 6,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10079,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": 7,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10080,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": 8,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10081,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": 9,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10082,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": 10,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10083,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": 11,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10084,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {





//                                         "ManpowerVersion": 10008,
//                                         "Month": 12,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10085,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     }
//                                 ]
//                             }
//                         ],
//                         "Department": 367,
//                         "IsLeader": false,
//                         "IsSupervivor": false,
//                         "Code": 1416,
//                         "Status": 1,
//                         "StatusName": "Gởi duyệt",
//                         "ListManpowerDetail": [
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": -1,
//                                 "Code": 0,
//                                 "ManpowerMonth": -1,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 16,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 0,
//                                 "Code": 0,
//                                 "ManpowerMonth": 0,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 1,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10074,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 2,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10075,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 3,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10076,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 4,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10077,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 5,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10078,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 6,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10079,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 7,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10080,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 8,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10081,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 9,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10082,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 10,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10083,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 11,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10084,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 12,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10085,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             }
//                         ]
//                     }
//                 ],
//                 "ListLocation": [
//                     {
//                         "LocationID": "GAL",
//                         "LocationName": "Aeon Luffy",
//                         "Location": 16,

//                         "Position": 1415,
//                         "Department": 367,
//                         "Code": 18,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": [
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": -1,
//                                 "Code": 0,
//                                 "ManpowerMonth": -1,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 54,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 0,
//                                 "Code": 0,
//                                 "ManpowerMonth": 0,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 10,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 1,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10074,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 2,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10075,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {
//                                 "IsEdit": null,




//                                 "ManpowerVersion": 0,
//                                 "Month": 3,
//                                 "Code": 4,
//                                 "ManpowerMonth": 10076,
//                                 "Location": 18,
//                                 "Position": 1415,
//                                 "Department": 367,
//                                 "Quantity": 10,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 4,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10077,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 5,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10078,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 6,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10079,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 7,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10080,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 8,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10081,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 9,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10082,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 10,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10083,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 11,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10084,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 12,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10085,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             }
//                         ]
//                     },
//                     {
//                         "LocationID": "GAS",
//                         "LocationName": "Aeon Sanji",
//                         "Location": 16,

//                         "Position": 1415,
//                         "Department": 367,
//                         "Code": 17,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": [
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": -1,
//                                 "Code": 0,
//                                 "ManpowerMonth": -1,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 29,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 0,
//                                 "Code": 0,
//                                 "ManpowerMonth": 0,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 10,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 1,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10074,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 2,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10075,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {
//                                 "IsEdit": null,




//                                 "ManpowerVersion": 0,
//                                 "Month": 3,
//                                 "Code": 5,
//                                 "ManpowerMonth": 10076,
//                                 "Location": 17,
//                                 "Position": 1415,
//                                 "Department": 367,
//                                 "Quantity": 10,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 4,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10077,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 5,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10078,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 6,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10079,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 7,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10080,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 8,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10081,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 9,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10082,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 10,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10083,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 11,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10084,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 12,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10085,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             }
//                         ]
//                     },
//                     {
//                         "LocationID": "GAZ",
//                         "LocationName": "Aeon Zoro",
//                         "Location": 16,

//                         "Position": 1415,
//                         "Department": 367,
//                         "Code": 19,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": [
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": -1,
//                                 "Code": 0,
//                                 "ManpowerMonth": -1,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 11,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 0,
//                                 "Code": 0,
//                                 "ManpowerMonth": 0,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 1,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10074,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 2,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10075,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 3,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10076,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 4,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10077,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 5,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10078,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 6,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10079,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 7,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10080,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 8,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10081,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 9,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10082,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 10,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10083,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 11,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10084,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 12,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10085,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             }
//                         ]
//                     },
//                     {
//                         "LocationID": "GCN",
//                         "LocationName": "COOP Nami",
//                         "Location": 16,

//                         "Position": 1415,
//                         "Department": 367,
//                         "Code": 20,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": [
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": -1,
//                                 "Code": 0,
//                                 "ManpowerMonth": -1,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 4,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 0,
//                                 "Code": 0,
//                                 "ManpowerMonth": 0,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 1,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10074,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 2,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10075,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 3,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10076,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 4,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10077,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 5,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10078,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 6,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10079,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 7,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10080,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 8,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10081,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 9,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10082,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 10,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10083,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 11,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10084,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 12,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10085,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             }
//                         ]
//                     }
//                 ],
//                 "Department": 367,
//                 "IsLeader": true,
//                 "IsSupervivor": true,
//                 "Code": 1415,
//                 "Status": 2,
//                 "StatusName": "Duyệt áp dụng",
//                 "ListManpowerDetail": [
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": -1,
//                         "Code": 0,
//                         "ManpowerMonth": -1,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 98,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 0,
//                         "Code": 0,
//                         "ManpowerMonth": 0,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 20,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 1,
//                         "Code": 0,
//                         "ManpowerMonth": 10074,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 2,
//                         "Code": 0,
//                         "ManpowerMonth": 10075,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 3,
//                         "Code": 0,
//                         "ManpowerMonth": 10076,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 20,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 4,
//                         "Code": 0,
//                         "ManpowerMonth": 10077,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 5,
//                         "Code": 0,
//                         "ManpowerMonth": 10078,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 6,
//                         "Code": 0,
//                         "ManpowerMonth": 10079,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 7,
//                         "Code": 0,
//                         "ManpowerMonth": 10080,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 8,
//                         "Code": 0,
//                         "ManpowerMonth": 10081,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 9,
//                         "Code": 0,
//                         "ManpowerMonth": 10082,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 10,
//                         "Code": 0,
//                         "ManpowerMonth": 10083,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 11,
//                         "Code": 0,
//                         "ManpowerMonth": 10084,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 12,
//                         "Code": 0,
//                         "ManpowerMonth": 10085,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     }
//                 ]
//             },
//             {
//                 "PositionID": "QT",

//                 "Position": null,

//                 "ListLocation": [
//                     {
//                         "LocationID": "GAL",
//                         "LocationName": "Aeon Luffy",
//                         "Location": 16,

//                         "Position": 1421,
//                         "Department": 367,
//                         "Code": 18,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": [
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": -1,
//                                 "Code": 0,
//                                 "ManpowerMonth": -1,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 1,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 0,
//                                 "Code": 0,
//                                 "ManpowerMonth": 0,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 1,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10074,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 2,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10075,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 3,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10076,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 4,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10077,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 5,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10078,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 6,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10079,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 7,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10080,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 8,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10081,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 9,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10082,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 10,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10083,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 11,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10084,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 12,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10085,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             }
//                         ]
//                     },
//                     {
//                         "LocationID": "GAS",
//                         "LocationName": "Aeon Sanji",
//                         "Location": 16,

//                         "Position": 1421,
//                         "Department": 367,
//                         "Code": 17,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": [
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": -1,
//                                 "Code": 0,
//                                 "ManpowerMonth": -1,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 5,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 0,
//                                 "Code": 0,
//                                 "ManpowerMonth": 0,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 1,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10074,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 2,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10075,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 3,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10076,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 4,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10077,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 5,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10078,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 6,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10079,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 7,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10080,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 8,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10081,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 9,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10082,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 10,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10083,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 11,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10084,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 12,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10085,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             }
//                         ]
//                     },
//                     {
//                         "LocationID": "GAZ",
//                         "LocationName": "Aeon Zoro",
//                         "Location": 16,

//                         "Position": 1421,
//                         "Department": 367,
//                         "Code": 19,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": [
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": -1,
//                                 "Code": 0,
//                                 "ManpowerMonth": -1,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 1,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 0,
//                                 "Code": 0,
//                                 "ManpowerMonth": 0,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 1,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10074,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 2,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10075,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 3,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10076,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 4,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10077,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 5,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10078,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 6,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10079,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 7,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10080,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 8,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10081,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 9,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10082,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 10,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10083,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 11,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10084,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 12,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10085,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             }
//                         ]
//                     },
//                     {
//                         "LocationID": "GCN",
//                         "LocationName": "COOP Nami",
//                         "Location": 16,

//                         "Position": 1421,
//                         "Department": 367,
//                         "Code": 20,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": [
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": -1,
//                                 "Code": 0,
//                                 "ManpowerMonth": -1,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 0,
//                                 "Code": 0,
//                                 "ManpowerMonth": 0,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 1,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10074,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 2,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10075,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 3,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10076,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 4,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10077,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 5,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10078,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 6,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10079,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 7,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10080,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 8,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10081,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 9,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10082,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 10,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10083,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 11,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10084,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 12,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10085,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             }
//                         ]
//                     }
//                 ],
//                 "Department": 367,
//                 "IsLeader": true,
//                 "IsSupervivor": false,
//                 "Code": 1421,
//                 "Status": 2,
//                 "StatusName": "Duyệt áp dụng",
//                 "ListManpowerDetail": [
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": -1,
//                         "Code": 0,
//                         "ManpowerMonth": -1,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 7,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 0,
//                         "Code": 0,
//                         "ManpowerMonth": 0,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 1,
//                         "Code": 0,
//                         "ManpowerMonth": 10074,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 2,
//                         "Code": 0,
//                         "ManpowerMonth": 10075,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 3,
//                         "Code": 0,
//                         "ManpowerMonth": 10076,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 4,
//                         "Code": 0,
//                         "ManpowerMonth": 10077,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 5,
//                         "Code": 0,
//                         "ManpowerMonth": 10078,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 6,
//                         "Code": 0,
//                         "ManpowerMonth": 10079,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 7,
//                         "Code": 0,
//                         "ManpowerMonth": 10080,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 8,
//                         "Code": 0,
//                         "ManpowerMonth": 10081,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 9,
//                         "Code": 0,
//                         "ManpowerMonth": 10082,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 10,
//                         "Code": 0,
//                         "ManpowerMonth": 10083,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 11,
//                         "Code": 0,
//                         "ManpowerMonth": 10084,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 12,
//                         "Code": 0,
//                         "ManpowerMonth": 10085,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     }
//                 ]
//             },
//             {
//                 "PositionID": "QD",

//                 "Position": null,

//                 "ListLocation": [
//                     {
//                         "LocationID": "GAL",
//                         "LocationName": "Aeon Luffy",
//                         "Location": 16,

//                         "Position": 1422,
//                         "Department": 367,
//                         "Code": 18,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": [
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": -1,
//                                 "Code": 0,
//                                 "ManpowerMonth": -1,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 0,
//                                 "Code": 0,
//                                 "ManpowerMonth": 0,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 1,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10074,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 2,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10075,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 3,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10076,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 4,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10077,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 5,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10078,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 6,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10079,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 7,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10080,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 8,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10081,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 9,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10082,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 10,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10083,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 11,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10084,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 12,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10085,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             }
//                         ]
//                     },
//                     {
//                         "LocationID": "GAS",
//                         "LocationName": "Aeon Sanji",
//                         "Location": 16,

//                         "Position": 1422,
//                         "Department": 367,
//                         "Code": 17,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": [
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": -1,
//                                 "Code": 0,
//                                 "ManpowerMonth": -1,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 0,
//                                 "Code": 0,
//                                 "ManpowerMonth": 0,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 1,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10074,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 2,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10075,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 3,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10076,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 4,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10077,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 5,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10078,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 6,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10079,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 7,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10080,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 8,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10081,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 9,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10082,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 10,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10083,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 11,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10084,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 12,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10085,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             }
//                         ]
//                     },
//                     {
//                         "LocationID": "GAZ",
//                         "LocationName": "Aeon Zoro",
//                         "Location": 16,

//                         "Position": 1422,
//                         "Department": 367,
//                         "Code": 19,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": [
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": -1,
//                                 "Code": 0,
//                                 "ManpowerMonth": -1,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 0,
//                                 "Code": 0,
//                                 "ManpowerMonth": 0,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 1,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10074,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 2,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10075,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 3,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10076,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 4,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10077,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 5,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10078,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 6,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10079,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 7,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10080,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 8,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10081,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 9,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10082,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 10,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10083,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 11,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10084,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 12,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10085,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             }
//                         ]
//                     },
//                     {
//                         "LocationID": "GCN",
//                         "LocationName": "COOP Nami",
//                         "Location": 16,

//                         "Position": 1422,
//                         "Department": 367,
//                         "Code": 20,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": [
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": -1,
//                                 "Code": 0,
//                                 "ManpowerMonth": -1,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 0,
//                                 "Code": 0,
//                                 "ManpowerMonth": 0,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 1,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10074,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 2,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10075,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 3,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10076,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 4,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10077,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 5,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10078,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 6,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10079,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 7,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10080,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 8,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10081,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 9,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10082,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 10,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10083,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 11,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10084,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 12,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10085,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             }
//                         ]
//                     }
//                 ],
//                 "Department": 367,
//                 "IsLeader": false,
//                 "IsSupervivor": false,
//                 "Code": 1422,
//                 "Status": 1,
//                 "StatusName": "Gởi duyệt",
//                 "ListManpowerDetail": [
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": -1,
//                         "Code": 0,
//                         "ManpowerMonth": -1,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 0,
//                         "Code": 0,
//                         "ManpowerMonth": 0,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 1,
//                         "Code": 0,
//                         "ManpowerMonth": 10074,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 2,
//                         "Code": 0,
//                         "ManpowerMonth": 10075,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 3,
//                         "Code": 0,
//                         "ManpowerMonth": 10076,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 4,
//                         "Code": 0,
//                         "ManpowerMonth": 10077,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 5,
//                         "Code": 0,
//                         "ManpowerMonth": 10078,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 6,
//                         "Code": 0,
//                         "ManpowerMonth": 10079,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 7,
//                         "Code": 0,
//                         "ManpowerMonth": 10080,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 8,
//                         "Code": 0,
//                         "ManpowerMonth": 10081,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 9,
//                         "Code": 0,
//                         "ManpowerMonth": 10082,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 10,
//                         "Code": 0,
//                         "ManpowerMonth": 10083,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 11,
//                         "Code": 0,
//                         "ManpowerMonth": 10084,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 12,
//                         "Code": 0,
//                         "ManpowerMonth": 10085,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     }
//                 ]
//             },
//             {
//                 "PositionID": "QD",

//                 "Position": null,

//                 "ListLocation": [
//                     {
//                         "LocationID": "GAL",
//                         "LocationName": "Aeon Luffy",
//                         "Location": 16,

//                         "Position": 1423,
//                         "Department": 367,
//                         "Code": 18,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": [
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": -1,
//                                 "Code": 0,
//                                 "ManpowerMonth": -1,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 0,
//                                 "Code": 0,
//                                 "ManpowerMonth": 0,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 1,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10074,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 2,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10075,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 3,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10076,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 4,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10077,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 5,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10078,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 6,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10079,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 7,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10080,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 8,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10081,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 9,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10082,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 10,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10083,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 11,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10084,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 12,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10085,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             }
//                         ]
//                     },
//                     {
//                         "LocationID": "GAS",
//                         "LocationName": "Aeon Sanji",
//                         "Location": 16,

//                         "Position": 1423,
//                         "Department": 367,
//                         "Code": 17,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": [
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": -1,
//                                 "Code": 0,
//                                 "ManpowerMonth": -1,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 0,
//                                 "Code": 0,
//                                 "ManpowerMonth": 0,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 1,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10074,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 2,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10075,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 3,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10076,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 4,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10077,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 5,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10078,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 6,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10079,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 7,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10080,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 8,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10081,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 9,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10082,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 10,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10083,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 11,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10084,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 12,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10085,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             }
//                         ]
//                     },
//                     {
//                         "LocationID": "GAZ",
//                         "LocationName": "Aeon Zoro",
//                         "Location": 16,

//                         "Position": 1423,
//                         "Department": 367,
//                         "Code": 19,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": [
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": -1,
//                                 "Code": 0,
//                                 "ManpowerMonth": -1,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 0,
//                                 "Code": 0,
//                                 "ManpowerMonth": 0,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 1,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10074,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 2,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10075,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 3,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10076,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 4,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10077,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 5,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10078,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 6,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10079,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 7,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10080,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 8,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10081,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 9,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10082,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 10,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10083,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 11,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10084,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 12,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10085,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             }
//                         ]
//                     },
//                     {
//                         "LocationID": "GCN",
//                         "LocationName": "COOP Nami",
//                         "Location": 16,

//                         "Position": 1423,
//                         "Department": 367,
//                         "Code": 20,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": [
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": -1,
//                                 "Code": 0,
//                                 "ManpowerMonth": -1,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 0,
//                                 "Code": 0,
//                                 "ManpowerMonth": 0,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 1,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10074,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 2,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10075,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 3,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10076,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 4,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10077,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 5,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10078,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 6,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10079,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 7,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10080,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 8,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10081,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 9,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10082,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 10,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10083,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 11,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10084,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 12,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10085,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             }
//                         ]
//                     }
//                 ],
//                 "Department": 367,
//                 "IsLeader": false,
//                 "IsSupervivor": false,
//                 "Code": 1423,
//                 "Status": 2,
//                 "StatusName": "Duyệt áp dụng",
//                 "ListManpowerDetail": [
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": -1,
//                         "Code": 0,
//                         "ManpowerMonth": -1,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 0,
//                         "Code": 0,
//                         "ManpowerMonth": 0,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 1,
//                         "Code": 0,
//                         "ManpowerMonth": 10074,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 2,
//                         "Code": 0,
//                         "ManpowerMonth": 10075,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 3,
//                         "Code": 0,
//                         "ManpowerMonth": 10076,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 4,
//                         "Code": 0,
//                         "ManpowerMonth": 10077,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 5,
//                         "Code": 0,
//                         "ManpowerMonth": 10078,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 6,
//                         "Code": 0,
//                         "ManpowerMonth": 10079,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 7,
//                         "Code": 0,
//                         "ManpowerMonth": 10080,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 8,
//                         "Code": 0,
//                         "ManpowerMonth": 10081,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 9,
//                         "Code": 0,
//                         "ManpowerMonth": 10082,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 10,
//                         "Code": 0,
//                         "ManpowerMonth": 10083,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 11,
//                         "Code": 0,
//                         "ManpowerMonth": 10084,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 12,
//                         "Code": 0,
//                         "ManpowerMonth": 10085,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     }
//                 ]
//             }
//         ],
//         "ListLocation": null,
//         "Code": 367,
//         "Status": 2,
//         "StatusName": "Duyệt áp dụng",
//         "ListManpowerDetail": [
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": -1,
//                 "Code": 0,
//                 "ManpowerMonth": -1,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 105,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 0,
//                 "Code": 0,
//                 "ManpowerMonth": 0,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 20,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 1,
//                 "Code": 0,
//                 "ManpowerMonth": 10074,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 2,
//                 "Code": 0,
//                 "ManpowerMonth": 10075,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 3,
//                 "Code": 0,
//                 "ManpowerMonth": 10076,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 20,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 4,
//                 "Code": 0,
//                 "ManpowerMonth": 10077,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 5,
//                 "Code": 0,
//                 "ManpowerMonth": 10078,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 6,
//                 "Code": 0,
//                 "ManpowerMonth": 10079,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 7,
//                 "Code": 0,
//                 "ManpowerMonth": 10080,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 8,
//                 "Code": 0,
//                 "ManpowerMonth": 10081,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 9,
//                 "Code": 0,
//                 "ManpowerMonth": 10082,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 10,
//                 "Code": 0,
//                 "ManpowerMonth": 10083,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 11,
//                 "Code": 0,
//                 "ManpowerMonth": 10084,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 12,
//                 "Code": 0,
//                 "ManpowerMonth": 10085,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             }
//         ]
//     },
//     {
//         "DepartmentID": "OOT03",

//         "Department": null,
//         "ListDepartment": null,
//         "ListPosition": [
//             {
//                 "PositionID": "IO03",

//                 "Position": null,

//                 "ListLocation": [
//                     {
//                         "LocationID": "HCO",
//                         "LocationName": "Văn phòng",
//                         "Location": null,

//                         "Position": 1407,
//                         "Department": 347,
//                         "Code": 14,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": [
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": -1,
//                                 "Code": 0,
//                                 "ManpowerMonth": -1,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 13,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 0,
//                                 "Code": 0,
//                                 "ManpowerMonth": 0,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 1,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10074,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 2,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10075,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 3,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10076,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 4,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10077,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 5,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10078,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 6,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10079,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 7,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10080,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 8,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10081,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 9,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10082,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 10,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10083,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 11,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10084,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 12,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10085,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             }
//                         ]
//                     },
//                     {
//                         "LocationID": "JSX",
//                         "LocationName": "Điểm làm việc Quận ABC",
//                         "Location": null,

//                         "Position": 1407,
//                         "Department": 347,
//                         "Code": 1226,
//                         "Status": 0,
//                         "StatusName": "Đang soạn thảo",
//                         "ListManpowerDetail": [
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": -1,
//                                 "Code": 0,
//                                 "ManpowerMonth": -1,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 0,
//                                 "Code": 0,
//                                 "ManpowerMonth": 0,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 1,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10074,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 2,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10075,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 3,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10076,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 4,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10077,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 5,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10078,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 6,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10079,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 7,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10080,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 8,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10081,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 9,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10082,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 10,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10083,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 11,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10084,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 12,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10085,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             }
//                         ]
//                     }
//                 ],
//                 "Department": 347,
//                 "IsLeader": true,
//                 "IsSupervivor": false,
//                 "Code": 1407,
//                 "Status": 2,
//                 "StatusName": "Duyệt áp dụng",
//                 "ListManpowerDetail": [
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": -1,
//                         "Code": 0,
//                         "ManpowerMonth": -1,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 13,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 0,
//                         "Code": 0,
//                         "ManpowerMonth": 0,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 1,
//                         "Code": 0,
//                         "ManpowerMonth": 10074,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 2,
//                         "Code": 0,
//                         "ManpowerMonth": 10075,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 3,
//                         "Code": 0,
//                         "ManpowerMonth": 10076,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 4,
//                         "Code": 0,
//                         "ManpowerMonth": 10077,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 5,
//                         "Code": 0,
//                         "ManpowerMonth": 10078,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 6,
//                         "Code": 0,
//                         "ManpowerMonth": 10079,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 7,
//                         "Code": 0,
//                         "ManpowerMonth": 10080,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 8,
//                         "Code": 0,
//                         "ManpowerMonth": 10081,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 9,
//                         "Code": 0,
//                         "ManpowerMonth": 10082,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 10,
//                         "Code": 0,
//                         "ManpowerMonth": 10083,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 11,
//                         "Code": 0,
//                         "ManpowerMonth": 10084,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 12,
//                         "Code": 0,
//                         "ManpowerMonth": 10085,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     }
//                 ]
//             },
//             {
//                 "PositionID": "ĐC",

//                 "Position": null,

//                 "ListLocation": [
//                     {
//                         "LocationID": "HCO",
//                         "LocationName": "Văn phòng",
//                         "Location": null,

//                         "Position": 1418,
//                         "Department": 347,
//                         "Code": 14,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": [
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": -1,
//                                 "Code": 0,
//                                 "ManpowerMonth": -1,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 1,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 0,
//                                 "Code": 0,
//                                 "ManpowerMonth": 0,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 1,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10074,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 2,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10075,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 3,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10076,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 4,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10077,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 5,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10078,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 6,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10079,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 7,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10080,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 8,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10081,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 9,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10082,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 10,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10083,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 11,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10084,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 12,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10085,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             }
//                         ]
//                     },
//                     {
//                         "LocationID": "JSX",
//                         "LocationName": "Điểm làm việc Quận ABC",
//                         "Location": null,

//                         "Position": 1418,
//                         "Department": 347,
//                         "Code": 1226,
//                         "Status": 0,
//                         "StatusName": "Đang soạn thảo",
//                         "ListManpowerDetail": [
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": -1,
//                                 "Code": 0,
//                                 "ManpowerMonth": -1,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 0,
//                                 "Code": 0,
//                                 "ManpowerMonth": 0,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 1,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10074,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 2,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10075,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 3,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10076,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 4,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10077,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 5,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10078,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 6,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10079,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 7,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10080,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 8,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10081,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 9,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10082,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 10,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10083,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 11,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10084,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 12,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10085,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             }
//                         ]
//                     }
//                 ],
//                 "Department": 347,
//                 "IsLeader": false,
//                 "IsSupervivor": true,
//                 "Code": 1418,
//                 "Status": 2,
//                 "StatusName": "Duyệt áp dụng",
//                 "ListManpowerDetail": [
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": -1,
//                         "Code": 0,
//                         "ManpowerMonth": -1,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 1,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 0,
//                         "Code": 0,
//                         "ManpowerMonth": 0,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 1,
//                         "Code": 0,
//                         "ManpowerMonth": 10074,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 2,
//                         "Code": 0,
//                         "ManpowerMonth": 10075,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 3,
//                         "Code": 0,
//                         "ManpowerMonth": 10076,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 4,
//                         "Code": 0,
//                         "ManpowerMonth": 10077,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 5,
//                         "Code": 0,
//                         "ManpowerMonth": 10078,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 6,
//                         "Code": 0,
//                         "ManpowerMonth": 10079,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 7,
//                         "Code": 0,
//                         "ManpowerMonth": 10080,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 8,
//                         "Code": 0,
//                         "ManpowerMonth": 10081,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 9,
//                         "Code": 0,
//                         "ManpowerMonth": 10082,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 10,
//                         "Code": 0,
//                         "ManpowerMonth": 10083,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 11,
//                         "Code": 0,
//                         "ManpowerMonth": 10084,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 12,
//                         "Code": 0,
//                         "ManpowerMonth": 10085,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     }
//                 ]
//             }
//         ],
//         "ListLocation": null,
//         "Code": 347,
//         "Status": 2,
//         "StatusName": "Duyệt áp dụng",
//         "ListManpowerDetail": [
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": -1,
//                 "Code": 0,
//                 "ManpowerMonth": -1,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 14,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 0,
//                 "Code": 0,
//                 "ManpowerMonth": 0,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 1,
//                 "Code": 0,
//                 "ManpowerMonth": 10074,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 2,
//                 "Code": 0,
//                 "ManpowerMonth": 10075,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 3,
//                 "Code": 0,
//                 "ManpowerMonth": 10076,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 4,
//                 "Code": 0,
//                 "ManpowerMonth": 10077,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 5,
//                 "Code": 0,
//                 "ManpowerMonth": 10078,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 6,
//                 "Code": 0,
//                 "ManpowerMonth": 10079,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 7,
//                 "Code": 0,
//                 "ManpowerMonth": 10080,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 8,
//                 "Code": 0,
//                 "ManpowerMonth": 10081,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 9,
//                 "Code": 0,
//                 "ManpowerMonth": 10082,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 10,
//                 "Code": 0,
//                 "ManpowerMonth": 10083,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 11,
//                 "Code": 0,
//                 "ManpowerMonth": 10084,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 12,
//                 "Code": 0,
//                 "ManpowerMonth": 10085,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             }
//         ]
//     },
//     {
//         "DepartmentID": "OOT02",

//         "Department": null,
//         "ListDepartment": [
//             {
//                 "DepartmentID": "PHU",

//                 "Department": 346,
//                 "ListDepartment": null,
//                 "ListPosition": [],
//                 "ListLocation": null,
//                 "Code": 366,
//                 "Status": 0,
//                 "StatusName": "Đang soạn thảo",
//                 "ListManpowerDetail": [
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": -1,
//                         "Code": 0,
//                         "ManpowerMonth": -1,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 0,
//                         "Code": 0,
//                         "ManpowerMonth": 0,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 1,
//                         "Code": 0,
//                         "ManpowerMonth": 10074,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 2,
//                         "Code": 0,
//                         "ManpowerMonth": 10075,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 3,
//                         "Code": 0,
//                         "ManpowerMonth": 10076,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 4,
//                         "Code": 0,
//                         "ManpowerMonth": 10077,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 5,
//                         "Code": 0,
//                         "ManpowerMonth": 10078,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 6,
//                         "Code": 0,
//                         "ManpowerMonth": 10079,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 7,
//                         "Code": 0,
//                         "ManpowerMonth": 10080,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 8,
//                         "Code": 0,
//                         "ManpowerMonth": 10081,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 9,
//                         "Code": 0,
//                         "ManpowerMonth": 10082,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 10,
//                         "Code": 0,
//                         "ManpowerMonth": 10083,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 11,
//                         "Code": 0,
//                         "ManpowerMonth": 10084,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 12,
//                         "Code": 0,
//                         "ManpowerMonth": 10085,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     }
//                 ]
//             },
//             {
//                 "DepartmentID": "MAR01",

//                 "Department": 346,
//                 "ListDepartment": null,
//                 "ListPosition": [],
//                 "ListLocation": null,
//                 "Code": 348,
//                 "Status": 1,
//                 "StatusName": "Gởi duyệt",
//                 "ListManpowerDetail": [
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": -1,
//                         "Code": 0,
//                         "ManpowerMonth": -1,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 0,
//                         "Code": 0,
//                         "ManpowerMonth": 0,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 1,
//                         "Code": 0,
//                         "ManpowerMonth": 10074,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 2,
//                         "Code": 0,
//                         "ManpowerMonth": 10075,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 3,
//                         "Code": 0,
//                         "ManpowerMonth": 10076,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 4,
//                         "Code": 0,
//                         "ManpowerMonth": 10077,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 5,
//                         "Code": 0,
//                         "ManpowerMonth": 10078,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 6,
//                         "Code": 0,
//                         "ManpowerMonth": 10079,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 7,
//                         "Code": 0,
//                         "ManpowerMonth": 10080,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 8,
//                         "Code": 0,
//                         "ManpowerMonth": 10081,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 9,
//                         "Code": 0,
//                         "ManpowerMonth": 10082,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 10,
//                         "Code": 0,
//                         "ManpowerMonth": 10083,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 11,
//                         "Code": 0,
//                         "ManpowerMonth": 10084,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 12,
//                         "Code": 0,
//                         "ManpowerMonth": 10085,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     }
//                 ]
//             }
//         ],
//         "ListPosition": [
//             {
//                 "PositionID": "IO02",

//                 "Position": null,

//                 "ListLocation": [
//                     {
//                         "LocationID": "TSA",
//                         "LocationName": "Trụ sở A",
//                         "Location": null,

//                         "Position": 1406,
//                         "Department": 346,
//                         "Code": 1227,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": [
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": -1,
//                                 "Code": 0,
//                                 "ManpowerMonth": -1,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 0,
//                                 "Code": 0,
//                                 "ManpowerMonth": 0,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 1,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10074,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 2,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10075,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 3,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10076,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 4,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10077,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 5,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10078,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 6,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10079,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 7,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10080,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 8,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10081,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 9,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10082,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 10,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10083,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 11,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10084,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 12,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10085,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             }
//                         ]
//                     }
//                 ],
//                 "Department": 346,
//                 "IsLeader": true,
//                 "IsSupervivor": false,
//                 "Code": 1406,
//                 "Status": 0,
//                 "StatusName": "Đang soạn thảo",
//                 "ListManpowerDetail": [
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": -1,
//                         "Code": 0,
//                         "ManpowerMonth": -1,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 0,
//                         "Code": 0,
//                         "ManpowerMonth": 0,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 1,
//                         "Code": 0,
//                         "ManpowerMonth": 10074,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 2,
//                         "Code": 0,
//                         "ManpowerMonth": 10075,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 3,
//                         "Code": 0,
//                         "ManpowerMonth": 10076,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 4,
//                         "Code": 0,
//                         "ManpowerMonth": 10077,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 5,
//                         "Code": 0,
//                         "ManpowerMonth": 10078,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 6,
//                         "Code": 0,
//                         "ManpowerMonth": 10079,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 7,
//                         "Code": 0,
//                         "ManpowerMonth": 10080,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 8,
//                         "Code": 0,
//                         "ManpowerMonth": 10081,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 9,
//                         "Code": 0,
//                         "ManpowerMonth": 10082,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 10,
//                         "Code": 0,
//                         "ManpowerMonth": 10083,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 11,
//                         "Code": 0,
//                         "ManpowerMonth": 10084,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {





//                         "ManpowerVersion": 10008,
//                         "Month": 12,
//                         "Code": 0,
//                         "ManpowerMonth": 10085,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     }
//                 ]
//             },
//             {
//                 "PositionID": "IOOO2",

//                 "Position": null,

//                 "ListLocation": [
//                     {
//                         "LocationID": "TSA",
//                         "LocationName": "Trụ sở A",
//                         "Location": null,

//                         "Position": 1412,
//                         "Department": 346,
//                         "Code": 1227,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": [
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": -1,
//                                 "Code": 0,
//                                 "ManpowerMonth": -1,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 0,
//                                 "Code": 0,
//                                 "ManpowerMonth": 0,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 1,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10074,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 2,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10075,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 3,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10076,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 4,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10077,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 5,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10078,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 6,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10079,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 7,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10080,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {





//                                 "ManpowerVersion": 10008,
//                                 "Month": 8,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10081,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {



//                                 "DepartmentName": null,

//                                 "ManpowerVersion": 10008,
//                                 "Month": 9,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10082,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {



//                                 "DepartmentName": null,

//                                 "ManpowerVersion": 10008,
//                                 "Month": 10,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10083,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {



//                                 "DepartmentName": null,

//                                 "ManpowerVersion": 10008,
//                                 "Month": 11,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10084,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {



//                                 "DepartmentName": null,

//                                 "ManpowerVersion": 10008,
//                                 "Month": 12,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10085,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             }
//                         ]
//                     }
//                 ],
//                 "Department": 346,
//                 "IsLeader": false,
//                 "IsSupervivor": true,
//                 "Code": 1412,
//                 "Status": 0,
//                 "StatusName": "Đang soạn thảo",
//                 "ListManpowerDetail": [
//                     {



//                         "DepartmentName": null,

//                         "ManpowerVersion": 10008,
//                         "Month": -1,
//                         "Code": 0,
//                         "ManpowerMonth": -1,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {



//                         "DepartmentName": null,

//                         "ManpowerVersion": 10008,
//                         "Month": 0,
//                         "Code": 0,
//                         "ManpowerMonth": 0,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {



//                         "DepartmentName": null,

//                         "ManpowerVersion": 10008,
//                         "Month": 1,
//                         "Code": 0,
//                         "ManpowerMonth": 10074,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {



//                         "DepartmentName": null,

//                         "ManpowerVersion": 10008,
//                         "Month": 2,
//                         "Code": 0,
//                         "ManpowerMonth": 10075,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {



//                         "DepartmentName": null,

//                         "ManpowerVersion": 10008,
//                         "Month": 3,
//                         "Code": 0,
//                         "ManpowerMonth": 10076,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {



//                         "DepartmentName": null,

//                         "ManpowerVersion": 10008,
//                         "Month": 4,
//                         "Code": 0,
//                         "ManpowerMonth": 10077,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {



//                         "DepartmentName": null,

//                         "ManpowerVersion": 10008,
//                         "Month": 5,
//                         "Code": 0,
//                         "ManpowerMonth": 10078,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {



//                         "DepartmentName": null,

//                         "ManpowerVersion": 10008,
//                         "Month": 6,
//                         "Code": 0,
//                         "ManpowerMonth": 10079,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {



//                         "DepartmentName": null,

//                         "ManpowerVersion": 10008,
//                         "Month": 7,
//                         "Code": 0,
//                         "ManpowerMonth": 10080,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {



//                         "DepartmentName": null,

//                         "ManpowerVersion": 10008,
//                         "Month": 8,
//                         "Code": 0,
//                         "ManpowerMonth": 10081,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {



//                         "DepartmentName": null,

//                         "ManpowerVersion": 10008,
//                         "Month": 9,
//                         "Code": 0,
//                         "ManpowerMonth": 10082,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {



//                         "DepartmentName": null,

//                         "ManpowerVersion": 10008,
//                         "Month": 10,
//                         "Code": 0,
//                         "ManpowerMonth": 10083,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {



//                         "DepartmentName": null,

//                         "ManpowerVersion": 10008,
//                         "Month": 11,
//                         "Code": 0,
//                         "ManpowerMonth": 10084,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {



//                         "DepartmentName": null,

//                         "ManpowerVersion": 10008,
//                         "Month": 12,
//                         "Code": 0,
//                         "ManpowerMonth": 10085,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     }
//                 ]
//             }
//         ],
//         "ListLocation": null,
//         "Code": 346,
//         "Status": 2,
//         "StatusName": "Duyệt áp dụng",
//         "ListManpowerDetail": [
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": -1,
//                 "Code": 0,
//                 "ManpowerMonth": -1,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 0,
//                 "Code": 0,
//                 "ManpowerMonth": 0,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 1,
//                 "Code": 0,
//                 "ManpowerMonth": 10074,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 2,
//                 "Code": 0,
//                 "ManpowerMonth": 10075,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 3,
//                 "Code": 0,
//                 "ManpowerMonth": 10076,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 4,
//                 "Code": 0,
//                 "ManpowerMonth": 10077,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 5,
//                 "Code": 0,
//                 "ManpowerMonth": 10078,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 6,
//                 "Code": 0,
//                 "ManpowerMonth": 10079,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 7,
//                 "Code": 0,
//                 "ManpowerMonth": 10080,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 8,
//                 "Code": 0,
//                 "ManpowerMonth": 10081,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 9,
//                 "Code": 0,
//                 "ManpowerMonth": 10082,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 10,
//                 "Code": 0,
//                 "ManpowerMonth": 10083,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 11,
//                 "Code": 0,
//                 "ManpowerMonth": 10084,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 12,
//                 "Code": 0,
//                 "ManpowerMonth": 10085,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             }
//         ]
//     },
//     {
//         "DepartmentID": "OOT01",
//         "DepartmentName": null,
//         "Department": null,
//         "ListDepartment": null,
//         "ListPosition": [
//             {
//                 "PositionID": "LDT",

//                 "Position": null,

//                 "ListLocation": [
//                     {
//                         "LocationID": "TSA",
//                         "LocationName": "Trụ sở A",
//                         "Location": null,

//                         "Position": 1405,
//                         "Department": 345,
//                         "Code": 1227,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": [
//                             {



//                                 "DepartmentName": null,

//                                 "ManpowerVersion": 10008,
//                                 "Month": -1,
//                                 "Code": 0,
//                                 "ManpowerMonth": -1,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {



//                                 "DepartmentName": null,

//                                 "ManpowerVersion": 10008,
//                                 "Month": 0,
//                                 "Code": 0,
//                                 "ManpowerMonth": 0,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {



//                                 "DepartmentName": null,

//                                 "ManpowerVersion": 10008,
//                                 "Month": 1,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10074,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {



//                                 "DepartmentName": null,

//                                 "ManpowerVersion": 10008,
//                                 "Month": 2,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10075,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {



//                                 "DepartmentName": null,

//                                 "ManpowerVersion": 10008,
//                                 "Month": 3,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10076,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {



//                                 "DepartmentName": null,

//                                 "ManpowerVersion": 10008,
//                                 "Month": 4,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10077,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {



//                                 "DepartmentName": null,

//                                 "ManpowerVersion": 10008,
//                                 "Month": 5,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10078,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {



//                                 "DepartmentName": null,

//                                 "ManpowerVersion": 10008,
//                                 "Month": 6,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10079,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {



//                                 "DepartmentName": null,

//                                 "ManpowerVersion": 10008,
//                                 "Month": 7,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10080,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {



//                                 "DepartmentName": null,

//                                 "ManpowerVersion": 10008,
//                                 "Month": 8,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10081,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {



//                                 "DepartmentName": null,

//                                 "ManpowerVersion": 10008,
//                                 "Month": 9,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10082,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {



//                                 "DepartmentName": null,

//                                 "ManpowerVersion": 10008,
//                                 "Month": 10,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10083,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {



//                                 "DepartmentName": null,

//                                 "ManpowerVersion": 10008,
//                                 "Month": 11,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10084,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {



//                                 "DepartmentName": null,

//                                 "ManpowerVersion": 10008,
//                                 "Month": 12,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10085,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             }
//                         ]
//                     }
//                 ],
//                 "Department": 345,
//                 "IsLeader": true,
//                 "IsSupervivor": true,
//                 "Code": 1405,
//                 "Status": 4,
//                 "StatusName": "Trả về",
//                 "ListManpowerDetail": [
//                     {



//                         "DepartmentName": null,

//                         "ManpowerVersion": 10008,
//                         "Month": -1,
//                         "Code": 0,
//                         "ManpowerMonth": -1,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {



//                         "DepartmentName": null,

//                         "ManpowerVersion": 10008,
//                         "Month": 0,
//                         "Code": 0,
//                         "ManpowerMonth": 0,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {



//                         "DepartmentName": null,

//                         "ManpowerVersion": 10008,
//                         "Month": 1,
//                         "Code": 0,
//                         "ManpowerMonth": 10074,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {



//                         "DepartmentName": null,

//                         "ManpowerVersion": 10008,
//                         "Month": 2,
//                         "Code": 0,
//                         "ManpowerMonth": 10075,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {



//                         "DepartmentName": null,

//                         "ManpowerVersion": 10008,
//                         "Month": 3,
//                         "Code": 0,
//                         "ManpowerMonth": 10076,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {



//                         "DepartmentName": null,

//                         "ManpowerVersion": 10008,
//                         "Month": 4,
//                         "Code": 0,
//                         "ManpowerMonth": 10077,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {



//                         "DepartmentName": null,

//                         "ManpowerVersion": 10008,
//                         "Month": 5,
//                         "Code": 0,
//                         "ManpowerMonth": 10078,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {



//                         "DepartmentName": null,

//                         "ManpowerVersion": 10008,
//                         "Month": 6,
//                         "Code": 0,
//                         "ManpowerMonth": 10079,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {



//                         "DepartmentName": null,

//                         "ManpowerVersion": 10008,
//                         "Month": 7,
//                         "Code": 0,
//                         "ManpowerMonth": 10080,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {



//                         "DepartmentName": null,

//                         "ManpowerVersion": 10008,
//                         "Month": 8,
//                         "Code": 0,
//                         "ManpowerMonth": 10081,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {



//                         "DepartmentName": null,

//                         "ManpowerVersion": 10008,
//                         "Month": 9,
//                         "Code": 0,
//                         "ManpowerMonth": 10082,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {



//                         "DepartmentName": null,

//                         "ManpowerVersion": 10008,
//                         "Month": 10,
//                         "Code": 0,
//                         "ManpowerMonth": 10083,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {



//                         "DepartmentName": null,

//                         "ManpowerVersion": 10008,
//                         "Month": 11,
//                         "Code": 0,
//                         "ManpowerMonth": 10084,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {



//                         "DepartmentName": null,

//                         "ManpowerVersion": 10008,
//                         "Month": 12,
//                         "Code": 0,
//                         "ManpowerMonth": 10085,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     }
//                 ]
//             }
//         ],
//         "ListLocation": null,
//         "Code": 345,
//         "Status": 2,
//         "StatusName": "Duyệt áp dụng",
//         "ListManpowerDetail": [
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": -1,
//                 "Code": 0,
//                 "ManpowerMonth": -1,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 0,
//                 "Code": 0,
//                 "ManpowerMonth": 0,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 1,
//                 "Code": 0,
//                 "ManpowerMonth": 10074,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 2,
//                 "Code": 0,
//                 "ManpowerMonth": 10075,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 3,
//                 "Code": 0,
//                 "ManpowerMonth": 10076,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 4,
//                 "Code": 0,
//                 "ManpowerMonth": 10077,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 5,
//                 "Code": 0,
//                 "ManpowerMonth": 10078,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 6,
//                 "Code": 0,
//                 "ManpowerMonth": 10079,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 7,
//                 "Code": 0,
//                 "ManpowerMonth": 10080,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 8,
//                 "Code": 0,
//                 "ManpowerMonth": 10081,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 9,
//                 "Code": 0,
//                 "ManpowerMonth": 10082,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 10,
//                 "Code": 0,
//                 "ManpowerMonth": 10083,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 11,
//                 "Code": 0,
//                 "ManpowerMonth": 10084,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 12,
//                 "Code": 0,
//                 "ManpowerMonth": 10085,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             }
//         ]
//     },
//     {
//         "DepartmentID": "LGT",
//         "DepartmentName": null,
//         "Department": null,
//         "ListDepartment": [
//             {
//                 "DepartmentID": "LGT 1",
//                 "DepartmentName": null,
//                 "Department": 322,
//                 "ListDepartment": null,
//                 "ListPosition": [
//                     {
//                         "PositionID": "KHO",

//                         "Position": null,
//                         "ListChild": [
//                             {
//                                 "PositionID": "KHO 2",

//                                 "Position": 1425,

//                                 "ListLocation": [
//                                     {
//                                         "LocationID": "AA",
//                                         "LocationName": "Admin Assistant",
//                                         "Location": null,

//                                         "Position": 1426,
//                                         "Department": 371,
//                                         "Code": 1245,
//                                         "Status": 2,
//                                         "StatusName": "Duyệt áp dụng",
//                                         "ListManpowerDetail": [
//                                             {



//                                                 "DepartmentName": null,

//                                                 "ManpowerVersion": 10008,
//                                                 "Month": -1,
//                                                 "Code": 0,
//                                                 "ManpowerMonth": -1,
//                                                 "Location": null,
//                                                 "Position": null,
//                                                 "Department": null,
//                                                 "Quantity": 0,
//                                                 "CreatedBy": null,
//                                                 "CreatedTime": null,
//                                                 "LastModifiedBy": null,
//                                                 "LastModifiedTime": null
//                                             },
//                                             {



//                                                 "DepartmentName": null,

//                                                 "ManpowerVersion": 10008,
//                                                 "Month": 0,
//                                                 "Code": 0,
//                                                 "ManpowerMonth": 0,
//                                                 "Location": null,
//                                                 "Position": null,
//                                                 "Department": null,
//                                                 "Quantity": 0,
//                                                 "CreatedBy": null,
//                                                 "CreatedTime": null,
//                                                 "LastModifiedBy": null,
//                                                 "LastModifiedTime": null
//                                             },
//                                             {



//                                                 "DepartmentName": null,

//                                                 "ManpowerVersion": 10008,
//                                                 "Month": 1,
//                                                 "Code": 0,
//                                                 "ManpowerMonth": 10074,
//                                                 "Location": null,
//                                                 "Position": null,
//                                                 "Department": null,
//                                                 "Quantity": 0,
//                                                 "CreatedBy": null,
//                                                 "CreatedTime": null,
//                                                 "LastModifiedBy": null,
//                                                 "LastModifiedTime": null
//                                             },
//                                             {



//                                                 "DepartmentName": null,

//                                                 "ManpowerVersion": 10008,
//                                                 "Month": 2,
//                                                 "Code": 0,
//                                                 "ManpowerMonth": 10075,
//                                                 "Location": null,
//                                                 "Position": null,
//                                                 "Department": null,
//                                                 "Quantity": 0,
//                                                 "CreatedBy": null,
//                                                 "CreatedTime": null,
//                                                 "LastModifiedBy": null,
//                                                 "LastModifiedTime": null
//                                             },
//                                             {



//                                                 "DepartmentName": null,

//                                                 "ManpowerVersion": 10008,
//                                                 "Month": 3,
//                                                 "Code": 0,
//                                                 "ManpowerMonth": 10076,
//                                                 "Location": null,
//                                                 "Position": null,
//                                                 "Department": null,
//                                                 "Quantity": 0,
//                                                 "CreatedBy": null,
//                                                 "CreatedTime": null,
//                                                 "LastModifiedBy": null,
//                                                 "LastModifiedTime": null
//                                             },
//                                             {



//                                                 "DepartmentName": null,

//                                                 "ManpowerVersion": 10008,
//                                                 "Month": 4,
//                                                 "Code": 0,
//                                                 "ManpowerMonth": 10077,
//                                                 "Location": null,
//                                                 "Position": null,
//                                                 "Department": null,
//                                                 "Quantity": 0,
//                                                 "CreatedBy": null,
//                                                 "CreatedTime": null,
//                                                 "LastModifiedBy": null,
//                                                 "LastModifiedTime": null
//                                             },
//                                             {



//                                                 "DepartmentName": null,

//                                                 "ManpowerVersion": 10008,
//                                                 "Month": 5,
//                                                 "Code": 0,
//                                                 "ManpowerMonth": 10078,
//                                                 "Location": null,
//                                                 "Position": null,
//                                                 "Department": null,
//                                                 "Quantity": 0,
//                                                 "CreatedBy": null,
//                                                 "CreatedTime": null,
//                                                 "LastModifiedBy": null,
//                                                 "LastModifiedTime": null
//                                             },
//                                             {



//                                                 "DepartmentName": null,

//                                                 "ManpowerVersion": 10008,
//                                                 "Month": 6,
//                                                 "Code": 0,
//                                                 "ManpowerMonth": 10079,
//                                                 "Location": null,
//                                                 "Position": null,
//                                                 "Department": null,
//                                                 "Quantity": 0,
//                                                 "CreatedBy": null,
//                                                 "CreatedTime": null,
//                                                 "LastModifiedBy": null,
//                                                 "LastModifiedTime": null
//                                             },
//                                             {



//                                                 "DepartmentName": null,

//                                                 "ManpowerVersion": 10008,
//                                                 "Month": 7,
//                                                 "Code": 0,
//                                                 "ManpowerMonth": 10080,
//                                                 "Location": null,
//                                                 "Position": null,
//                                                 "Department": null,
//                                                 "Quantity": 0,
//                                                 "CreatedBy": null,
//                                                 "CreatedTime": null,
//                                                 "LastModifiedBy": null,
//                                                 "LastModifiedTime": null
//                                             },
//                                             {



//                                                 "DepartmentName": null,

//                                                 "ManpowerVersion": 10008,
//                                                 "Month": 8,
//                                                 "Code": 0,
//                                                 "ManpowerMonth": 10081,
//                                                 "Location": null,
//                                                 "Position": null,
//                                                 "Department": null,
//                                                 "Quantity": 0,
//                                                 "CreatedBy": null,
//                                                 "CreatedTime": null,
//                                                 "LastModifiedBy": null,
//                                                 "LastModifiedTime": null
//                                             },
//                                             {



//                                                 "DepartmentName": null,

//                                                 "ManpowerVersion": 10008,
//                                                 "Month": 9,
//                                                 "Code": 0,
//                                                 "ManpowerMonth": 10082,
//                                                 "Location": null,
//                                                 "Position": null,
//                                                 "Department": null,
//                                                 "Quantity": 0,
//                                                 "CreatedBy": null,
//                                                 "CreatedTime": null,
//                                                 "LastModifiedBy": null,
//                                                 "LastModifiedTime": null
//                                             },
//                                             {



//                                                 "DepartmentName": null,

//                                                 "ManpowerVersion": 10008,
//                                                 "Month": 10,
//                                                 "Code": 0,
//                                                 "ManpowerMonth": 10083,
//                                                 "Location": null,
//                                                 "Position": null,
//                                                 "Department": null,
//                                                 "Quantity": 0,
//                                                 "CreatedBy": null,
//                                                 "CreatedTime": null,
//                                                 "LastModifiedBy": null,
//                                                 "LastModifiedTime": null
//                                             },
//                                             {



//                                                 "DepartmentName": null,

//                                                 "ManpowerVersion": 10008,
//                                                 "Month": 11,
//                                                 "Code": 0,
//                                                 "ManpowerMonth": 10084,
//                                                 "Location": null,
//                                                 "Position": null,
//                                                 "Department": null,
//                                                 "Quantity": 0,
//                                                 "CreatedBy": null,
//                                                 "CreatedTime": null,
//                                                 "LastModifiedBy": null,
//                                                 "LastModifiedTime": null
//                                             },
//                                             {



//                                                 "DepartmentName": null,

//                                                 "ManpowerVersion": 10008,
//                                                 "Month": 12,
//                                                 "Code": 0,
//                                                 "ManpowerMonth": 10085,
//                                                 "Location": null,
//                                                 "Position": null,
//                                                 "Department": null,
//                                                 "Quantity": 0,
//                                                 "CreatedBy": null,
//                                                 "CreatedTime": null,
//                                                 "LastModifiedBy": null,
//                                                 "LastModifiedTime": null
//                                             }
//                                         ]
//                                     }
//                                 ],
//                                 "Department": 371,
//                                 "IsLeader": false,
//                                 "IsSupervivor": false,
//                                 "Code": 1426,
//                                 "Status": 2,
//                                 "StatusName": "Duyệt áp dụng",
//                                 "ListManpowerDetail": [
//                                     {



//                                         "DepartmentName": null,

//                                         "ManpowerVersion": 10008,
//                                         "Month": -1,
//                                         "Code": 0,
//                                         "ManpowerMonth": -1,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {



//                                         "DepartmentName": null,

//                                         "ManpowerVersion": 10008,
//                                         "Month": 0,
//                                         "Code": 0,
//                                         "ManpowerMonth": 0,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {



//                                         "DepartmentName": null,

//                                         "ManpowerVersion": 10008,
//                                         "Month": 1,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10074,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {



//                                         "DepartmentName": null,

//                                         "ManpowerVersion": 10008,
//                                         "Month": 2,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10075,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {



//                                         "DepartmentName": null,

//                                         "ManpowerVersion": 10008,
//                                         "Month": 3,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10076,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {



//                                         "DepartmentName": null,

//                                         "ManpowerVersion": 10008,
//                                         "Month": 4,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10077,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {



//                                         "DepartmentName": null,

//                                         "ManpowerVersion": 10008,
//                                         "Month": 5,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10078,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {



//                                         "DepartmentName": null,

//                                         "ManpowerVersion": 10008,
//                                         "Month": 6,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10079,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {



//                                         "DepartmentName": null,

//                                         "ManpowerVersion": 10008,
//                                         "Month": 7,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10080,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {



//                                         "DepartmentName": null,

//                                         "ManpowerVersion": 10008,
//                                         "Month": 8,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10081,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {



//                                         "DepartmentName": null,

//                                         "ManpowerVersion": 10008,
//                                         "Month": 9,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10082,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {



//                                         "DepartmentName": null,

//                                         "ManpowerVersion": 10008,
//                                         "Month": 10,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10083,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {



//                                         "DepartmentName": null,

//                                         "ManpowerVersion": 10008,
//                                         "Month": 11,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10084,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {



//                                         "DepartmentName": null,

//                                         "ManpowerVersion": 10008,
//                                         "Month": 12,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10085,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     }
//                                 ]
//                             }
//                         ],
//                         "ListLocation": [
//                             {
//                                 "LocationID": "AA",
//                                 "LocationName": "Admin Assistant",
//                                 "Location": null,

//                                 "Position": 1425,
//                                 "Department": 371,
//                                 "Code": 1245,
//                                 "Status": 2,
//                                 "StatusName": "Duyệt áp dụng",
//                                 "ListManpowerDetail": [
//                                     {



//                                         "DepartmentName": null,

//                                         "ManpowerVersion": 10008,
//                                         "Month": -1,
//                                         "Code": 0,
//                                         "ManpowerMonth": -1,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {



//                                         "DepartmentName": null,

//                                         "ManpowerVersion": 10008,
//                                         "Month": 0,
//                                         "Code": 0,
//                                         "ManpowerMonth": 0,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 10,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {



//                                         "DepartmentName": null,

//                                         "ManpowerVersion": 10008,
//                                         "Month": 1,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10074,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {



//                                         "DepartmentName": null,

//                                         "ManpowerVersion": 10008,
//                                         "Month": 2,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10075,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {
//                                         "IsEdit": null,


//                                         "DepartmentName": null,

//                                         "ManpowerVersion": 0,
//                                         "Month": 3,
//                                         "Code": 6,
//                                         "ManpowerMonth": 10076,
//                                         "Location": 1245,
//                                         "Position": 1425,
//                                         "Department": 371,
//                                         "Quantity": 10,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {



//                                         "DepartmentName": null,

//                                         "ManpowerVersion": 10008,
//                                         "Month": 4,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10077,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {



//                                         "DepartmentName": null,

//                                         "ManpowerVersion": 10008,
//                                         "Month": 5,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10078,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {



//                                         "DepartmentName": null,

//                                         "ManpowerVersion": 10008,
//                                         "Month": 6,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10079,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {



//                                         "DepartmentName": null,

//                                         "ManpowerVersion": 10008,
//                                         "Month": 7,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10080,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {



//                                         "DepartmentName": null,

//                                         "ManpowerVersion": 10008,
//                                         "Month": 8,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10081,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {



//                                         "DepartmentName": null,

//                                         "ManpowerVersion": 10008,
//                                         "Month": 9,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10082,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {



//                                         "DepartmentName": null,

//                                         "ManpowerVersion": 10008,
//                                         "Month": 10,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10083,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {



//                                         "DepartmentName": null,

//                                         "ManpowerVersion": 10008,
//                                         "Month": 11,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10084,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     },
//                                     {



//                                         "DepartmentName": null,

//                                         "ManpowerVersion": 10008,
//                                         "Month": 12,
//                                         "Code": 0,
//                                         "ManpowerMonth": 10085,
//                                         "Location": null,
//                                         "Position": null,
//                                         "Department": null,
//                                         "Quantity": 0,
//                                         "CreatedBy": null,
//                                         "CreatedTime": null,
//                                         "LastModifiedBy": null,
//                                         "LastModifiedTime": null
//                                     }
//                                 ]
//                             }
//                         ],
//                         "Department": 371,
//                         "IsLeader": false,
//                         "IsSupervivor": false,
//                         "Code": 1425,
//                         "Status": 2,
//                         "StatusName": "Duyệt áp dụng",
//                         "ListManpowerDetail": [
//                             {



//                                 "DepartmentName": null,

//                                 "ManpowerVersion": 10008,
//                                 "Month": -1,
//                                 "Code": 0,
//                                 "ManpowerMonth": -1,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {



//                                 "DepartmentName": null,

//                                 "ManpowerVersion": 10008,
//                                 "Month": 0,
//                                 "Code": 0,
//                                 "ManpowerMonth": 0,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 10,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {



//                                 "DepartmentName": null,

//                                 "ManpowerVersion": 10008,
//                                 "Month": 1,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10074,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {



//                                 "DepartmentName": null,

//                                 "ManpowerVersion": 10008,
//                                 "Month": 2,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10075,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {



//                                 "DepartmentName": null,

//                                 "ManpowerVersion": 10008,
//                                 "Month": 3,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10076,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 10,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {



//                                 "DepartmentName": null,

//                                 "ManpowerVersion": 10008,
//                                 "Month": 4,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10077,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {



//                                 "DepartmentName": null,

//                                 "ManpowerVersion": 10008,
//                                 "Month": 5,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10078,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {



//                                 "DepartmentName": null,

//                                 "ManpowerVersion": 10008,
//                                 "Month": 6,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10079,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {



//                                 "DepartmentName": null,

//                                 "ManpowerVersion": 10008,
//                                 "Month": 7,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10080,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {



//                                 "DepartmentName": null,

//                                 "ManpowerVersion": 10008,
//                                 "Month": 8,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10081,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {



//                                 "DepartmentName": null,

//                                 "ManpowerVersion": 10008,
//                                 "Month": 9,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10082,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {



//                                 "DepartmentName": null,

//                                 "ManpowerVersion": 10008,
//                                 "Month": 10,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10083,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {



//                                 "DepartmentName": null,

//                                 "ManpowerVersion": 10008,
//                                 "Month": 11,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10084,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             },
//                             {



//                                 "DepartmentName": null,

//                                 "ManpowerVersion": 10008,
//                                 "Month": 12,
//                                 "Code": 0,
//                                 "ManpowerMonth": 10085,
//                                 "Location": null,
//                                 "Position": null,
//                                 "Department": null,
//                                 "Quantity": 0,
//                                 "CreatedBy": null,
//                                 "CreatedTime": null,
//                                 "LastModifiedBy": null,
//                                 "LastModifiedTime": null
//                             }
//                         ]
//                     }
//                 ],
//                 "ListLocation": null,
//                 "Code": 371,
//                 "Status": 2,
//                 "StatusName": "Duyệt áp dụng",
//                 "ListManpowerDetail": [
//                     {



//                         "DepartmentName": null,

//                         "ManpowerVersion": 10008,
//                         "Month": -1,
//                         "Code": 0,
//                         "ManpowerMonth": -1,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {



//                         "DepartmentName": null,

//                         "ManpowerVersion": 10008,
//                         "Month": 0,
//                         "Code": 0,
//                         "ManpowerMonth": 0,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 10,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {



//                         "DepartmentName": null,

//                         "ManpowerVersion": 10008,
//                         "Month": 1,
//                         "Code": 0,
//                         "ManpowerMonth": 10074,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {



//                         "DepartmentName": null,

//                         "ManpowerVersion": 10008,
//                         "Month": 2,
//                         "Code": 0,
//                         "ManpowerMonth": 10075,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {



//                         "DepartmentName": null,

//                         "ManpowerVersion": 10008,
//                         "Month": 3,
//                         "Code": 0,
//                         "ManpowerMonth": 10076,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 10,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {



//                         "DepartmentName": null,

//                         "ManpowerVersion": 10008,
//                         "Month": 4,
//                         "Code": 0,
//                         "ManpowerMonth": 10077,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {



//                         "DepartmentName": null,

//                         "ManpowerVersion": 10008,
//                         "Month": 5,
//                         "Code": 0,
//                         "ManpowerMonth": 10078,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {



//                         "DepartmentName": null,

//                         "ManpowerVersion": 10008,
//                         "Month": 6,
//                         "Code": 0,
//                         "ManpowerMonth": 10079,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {



//                         "DepartmentName": null,

//                         "ManpowerVersion": 10008,
//                         "Month": 7,
//                         "Code": 0,
//                         "ManpowerMonth": 10080,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {



//                         "DepartmentName": null,

//                         "ManpowerVersion": 10008,
//                         "Month": 8,
//                         "Code": 0,
//                         "ManpowerMonth": 10081,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {



//                         "DepartmentName": null,

//                         "ManpowerVersion": 10008,
//                         "Month": 9,
//                         "Code": 0,
//                         "ManpowerMonth": 10082,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {



//                         "DepartmentName": null,

//                         "ManpowerVersion": 10008,
//                         "Month": 10,
//                         "Code": 0,
//                         "ManpowerMonth": 10083,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {



//                         "DepartmentName": null,

//                         "ManpowerVersion": 10008,
//                         "Month": 11,
//                         "Code": 0,
//                         "ManpowerMonth": 10084,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     },
//                     {



//                         "DepartmentName": null,

//                         "ManpowerVersion": 10008,
//                         "Month": 12,
//                         "Code": 0,
//                         "ManpowerMonth": 10085,
//                         "Location": null,
//                         "Position": null,
//                         "Department": null,
//                         "Quantity": 0,
//                         "CreatedBy": null,
//                         "CreatedTime": null,
//                         "LastModifiedBy": null,
//                         "LastModifiedTime": null
//                     }
//                 ]
//             }
//         ],
//         "ListPosition": [],
//         "ListLocation": null,
//         "Code": 322,
//         "Status": 2,
//         "StatusName": "Duyệt áp dụng",
//         "ListManpowerDetail": [
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": -1,
//                 "Code": 0,
//                 "ManpowerMonth": -1,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 0,
//                 "Code": 0,
//                 "ManpowerMonth": 0,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 10,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 1,
//                 "Code": 0,
//                 "ManpowerMonth": 10074,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 2,
//                 "Code": 0,
//                 "ManpowerMonth": 10075,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 3,
//                 "Code": 0,
//                 "ManpowerMonth": 10076,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 10,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 4,
//                 "Code": 0,
//                 "ManpowerMonth": 10077,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 5,
//                 "Code": 0,
//                 "ManpowerMonth": 10078,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 6,
//                 "Code": 0,
//                 "ManpowerMonth": 10079,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 7,
//                 "Code": 0,
//                 "ManpowerMonth": 10080,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 8,
//                 "Code": 0,
//                 "ManpowerMonth": 10081,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 9,
//                 "Code": 0,
//                 "ManpowerMonth": 10082,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 10,
//                 "Code": 0,
//                 "ManpowerMonth": 10083,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 11,
//                 "Code": 0,
//                 "ManpowerMonth": 10084,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 12,
//                 "Code": 0,
//                 "ManpowerMonth": 10085,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             }
//         ]
//     },
//     {
//         "DepartmentID": "kt",
//         "DepartmentName": null,
//         "Department": null,
//         "ListDepartment": null,
//         "ListPosition": [],
//         "ListLocation": null,
//         "Code": 11,
//         "Status": 2,
//         "StatusName": "Duyệt áp dụng",
//         "ListManpowerDetail": [
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": -1,
//                 "Code": 0,
//                 "ManpowerMonth": -1,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 0,
//                 "Code": 0,
//                 "ManpowerMonth": 0,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 1,
//                 "Code": 0,
//                 "ManpowerMonth": 10074,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 2,
//                 "Code": 0,
//                 "ManpowerMonth": 10075,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 3,
//                 "Code": 0,
//                 "ManpowerMonth": 10076,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 4,
//                 "Code": 0,
//                 "ManpowerMonth": 10077,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 5,
//                 "Code": 0,
//                 "ManpowerMonth": 10078,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 6,
//                 "Code": 0,
//                 "ManpowerMonth": 10079,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 7,
//                 "Code": 0,
//                 "ManpowerMonth": 10080,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 8,
//                 "Code": 0,
//                 "ManpowerMonth": 10081,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 9,
//                 "Code": 0,
//                 "ManpowerMonth": 10082,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 10,
//                 "Code": 0,
//                 "ManpowerMonth": 10083,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 11,
//                 "Code": 0,
//                 "ManpowerMonth": 10084,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 12,
//                 "Code": 0,
//                 "ManpowerMonth": 10085,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             }
//         ]
//     },
//     {
//         "DepartmentID": "hau 3",
//         "DepartmentName": null,
//         "Department": null,
//         "ListDepartment": null,
//         "ListPosition": [],
//         "ListLocation": null,
//         "Code": 365,
//         "Status": 0,
//         "StatusName": "Đang soạn thảo",
//         "ListManpowerDetail": [
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": -1,
//                 "Code": 0,
//                 "ManpowerMonth": -1,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 0,
//                 "Code": 0,
//                 "ManpowerMonth": 0,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 1,
//                 "Code": 0,
//                 "ManpowerMonth": 10074,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 2,
//                 "Code": 0,
//                 "ManpowerMonth": 10075,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 3,
//                 "Code": 0,
//                 "ManpowerMonth": 10076,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 4,
//                 "Code": 0,
//                 "ManpowerMonth": 10077,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 5,
//                 "Code": 0,
//                 "ManpowerMonth": 10078,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 6,
//                 "Code": 0,
//                 "ManpowerMonth": 10079,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 7,
//                 "Code": 0,
//                 "ManpowerMonth": 10080,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 8,
//                 "Code": 0,
//                 "ManpowerMonth": 10081,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 9,
//                 "Code": 0,
//                 "ManpowerMonth": 10082,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 10,
//                 "Code": 0,
//                 "ManpowerMonth": 10083,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 11,
//                 "Code": 0,
//                 "ManpowerMonth": 10084,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             },
//             {




//                 "ManpowerVersion": 10008,
//                 "Month": 12,
//                 "Code": 0,
//                 "ManpowerMonth": 10085,
//                 "Location": null,
//                 "Position": null,
//                 "Department": null,
//                 "Quantity": 0,
//                 "CreatedBy": null,
//                 "CreatedTime": null,
//                 "LastModifiedBy": null,
//                 "LastModifiedTime": null
//             }
//         ]
//     }
// ]

export const testData: DTOHRManpowerDepartmentMatrix[] = [

    {
        "DepartmentID": "WUS",
        "DepartmentName": null,
        "Department": null,
        "ListDepartment": [{
            "DepartmentID": "Thanh",
            "DepartmentName": null,
            "Department": null,
            "ListDepartment": null,
            "ListPosition": [
                {
                    "PositionID": "",
                    "PositionName": null,
                    "Position": null,
                    "ListChild": [
                        {
                            "PositionID": "WIX",
                            "PositionName": null,
                            "Position": null,
                            "ListChild": null,
                            "ListLocation": [
                                {
                                    "LocationID": "GAZ",
                                    "LocationName": "Aeon Zoro",
                                    "Location": null,
                                    "ListChild": [
                                        {
                                            "LocationID": "GAZ1",
                                            "LocationName": "Aeon Zorox",
                                            "Location": null,
                                            "ListChild": null,
                                            "Position": 1388,
                                            "Department": 319,
                                            "Code": 19,
                                            "Status": 2,
                                            "StatusName": "Duyệt áp dụng",
                                            "ListManpowerDetail": null
                                        },
                                        {
                                            "LocationID": "GAZ2",
                                            "LocationName": "Aeon Zoroy",
                                            "Location": null,
                                            "ListChild": null,
                                            "Position": 1388,
                                            "Department": 319,
                                            "Code": 19,
                                            "Status": 2,
                                            "StatusName": "Duyệt áp dụng",
                                            "ListManpowerDetail": null
                                        }
                                    ],
                                    "Position": 1388,
                                    "Department": 319,
                                    "Code": 19,
                                    "Status": 2,
                                    "StatusName": "Duyệt áp dụng",
                                    "ListManpowerDetail": null
                                }
                            ],
                            "Department": 319,
                            "IsLeader": false,
                            "IsSupervivor": false,
                            "Code": 1388,
                            "Status": 1,
                            "StatusName": "Gởi duyệt",
                            "ListManpowerDetail": null
                        }
                    ],
                    "ListLocation": [
                        {
                            "LocationID": "AD",
                            "LocationName": " Admin - Division",
                            "Location": null,
                            "ListChild": null,
                            "Position": 1420,
                            "Department": 370,
                            "Code": 1246,
                            "Status": 2,
                            "StatusName": "Duyệt áp dụng",
                            "ListManpowerDetail": null
                        }
                    ],
                    "Department": 370,
                    "IsLeader": false,
                    "IsSupervivor": false,
                    "Code": 1424,
                    "Status": 3,
                    "StatusName": "Đang soạn thảo",
                    "ListManpowerDetail": null
                },
                {
                    "PositionID": "TTT",
                    "PositionName": null,
                    "Position": null,
                    "ListChild": null,
                    "ListLocation": [
                        {
                            "LocationID": "AD",
                            "LocationName": " Admin - Division",
                            "Location": null,
                            "ListChild": null,
                            "Position": 1420,
                            "Department": 370,
                            "Code": 1246,
                            "Status": 2,
                            "StatusName": "Duyệt áp dụng",
                            "ListManpowerDetail": null
                        }
                    ],
                    "Department": 370,
                    "IsLeader": false,
                    "IsSupervivor": false,
                    "Code": 1420,
                    "Status": 0,
                    "StatusName": "Đang soạn thảo",
                    "ListManpowerDetail": null
                }
            ],
            "ListLocation": null,
            "Code": 370,
            "Status": 2,
            "StatusName": "Duyệt áp dụng",
            "ListManpowerDetail": null
        },],
        "ListPosition": [],
        "ListLocation": null,
        "Code": 320,
        "Status": 2,
        "StatusName": "Duyệt áp dụng",
        "ListManpowerDetail": null
    },
    {
        "DepartmentID": "Thanh",
        "DepartmentName": null,
        "Department": null,
        "ListDepartment": null,
        "ListPosition": [
            {
                "PositionID": "",
                "PositionName": null,
                "Position": null,
                "ListChild": null,
                "ListLocation": [
                    {
                        "LocationID": "AD",
                        "LocationName": " Admin - Division",
                        "Location": null,
                        "ListChild": null,
                        "Position": 1420,
                        "Department": 370,
                        "Code": 1246,
                        "Status": 2,
                        "StatusName": "Duyệt áp dụng",
                        "ListManpowerDetail": null
                    }
                ],
                "Department": 370,
                "IsLeader": false,
                "IsSupervivor": false,
                "Code": 1424,
                "Status": 0,
                "StatusName": "Đang soạn thảo",
                "ListManpowerDetail": null
            },
            {
                "PositionID": "TTT",
                "PositionName": null,
                "Position": null,
                "ListChild": null,
                "ListLocation": [
                    {
                        "LocationID": "AD",
                        "LocationName": " Admin - Division",
                        "Location": null,
                        "ListChild": null,
                        "Position": 1420,
                        "Department": 370,
                        "Code": 1246,
                        "Status": 2,
                        "StatusName": "Duyệt áp dụng",
                        "ListManpowerDetail": null
                    }
                ],
                "Department": 370,
                "IsLeader": false,
                "IsSupervivor": false,
                "Code": 1420,
                "Status": 0,
                "StatusName": "Đang soạn thảo",
                "ListManpowerDetail": null
            }
        ],
        "ListLocation": null,
        "Code": 370,
        "Status": 2,
        "StatusName": "Duyệt áp dụng",
        "ListManpowerDetail": null
    },
    {
        "DepartmentID": "SA",
        "DepartmentName": null,
        "Department": null,
        "ListDepartment": null,
        "ListPosition": [
            {
                "PositionID": "ITSA",
                "PositionName": null,
                "Position": null,
                "ListChild": null,
                "ListLocation": [
                    {
                        "LocationID": "AA",
                        "LocationName": "Admin Assistant",
                        "Location": null,
                        "ListChild": null,
                        "Position": 1419,
                        "Department": 369,
                        "Code": 1245,
                        "Status": 2,
                        "StatusName": "Duyệt áp dụng",
                        "ListManpowerDetail": null
                    },
                    {
                        "LocationID": "AD",
                        "LocationName": " Admin - Division",
                        "Location": null,
                        "ListChild": null,
                        "Position": 1419,
                        "Department": 369,
                        "Code": 1246,
                        "Status": 2,
                        "StatusName": "Duyệt áp dụng",
                        "ListManpowerDetail": null
                    },
                    {
                        "LocationID": "AE",
                        "LocationName": "Administrative Executive",
                        "Location": null,
                        "ListChild": null,
                        "Position": 1419,
                        "Department": 369,
                        "Code": 1252,
                        "Status": 2,
                        "StatusName": "Duyệt áp dụng",
                        "ListManpowerDetail": null
                    },
                    {
                        "LocationID": "AHR",
                        "LocationName": "Admin & HR Executive",
                        "Location": null,
                        "ListChild": null,
                        "Position": 1419,
                        "Department": 369,
                        "Code": 1247,
                        "Status": 2,
                        "StatusName": "Duyệt áp dụng",
                        "ListManpowerDetail": null
                    },
                    {
                        "LocationID": "APS",
                        "LocationName": "Admin Payment Staff, SPX Express",
                        "Location": null,
                        "ListChild": null,
                        "Position": 1419,
                        "Department": 369,
                        "Code": 1251,
                        "Status": 2,
                        "StatusName": "Duyệt áp dụng",
                        "ListManpowerDetail": null
                    },
                    {
                        "LocationID": "AS",
                        "LocationName": "Admin Specialist (Operations Management)",
                        "Location": null,
                        "ListChild": null,
                        "Position": 1419,
                        "Department": 369,
                        "Code": 1244,
                        "Status": 2,
                        "StatusName": "Duyệt áp dụng",
                        "ListManpowerDetail": null
                    },
                    {
                        "LocationID": "ASQ",
                        "LocationName": " Admin Staff Quận 1",
                        "Location": null,
                        "ListChild": null,
                        "Position": 1419,
                        "Department": 369,
                        "Code": 1243,
                        "Status": 2,
                        "StatusName": "Duyệt áp dụng",
                        "ListManpowerDetail": null
                    },
                    {
                        "LocationID": "BAAO",
                        "LocationName": "Brand Activation Admin Officer",
                        "Location": null,
                        "ListChild": null,
                        "Position": 1419,
                        "Department": 369,
                        "Code": 1248,
                        "Status": 2,
                        "StatusName": "Duyệt áp dụng",
                        "ListManpowerDetail": null
                    },
                    {
                        "LocationID": "CRM",
                        "LocationName": "CRM Admin Officer",
                        "Location": null,
                        "ListChild": null,
                        "Position": 1419,
                        "Department": 369,
                        "Code": 1255,
                        "Status": 2,
                        "StatusName": "Duyệt áp dụng",
                        "ListManpowerDetail": null
                    },
                    {
                        "LocationID": "OA",
                        "LocationName": "Odm Admin",
                        "Location": null,
                        "ListChild": null,
                        "Position": 1419,
                        "Department": 369,
                        "Code": 1250,
                        "Status": 2,
                        "StatusName": "Duyệt áp dụng",
                        "ListManpowerDetail": null
                    },
                    {
                        "LocationID": "OAE",
                        "LocationName": "Office Admin Executive",
                        "Location": null,
                        "ListChild": null,
                        "Position": 1419,
                        "Department": 369,
                        "Code": 1249,
                        "Status": 3,
                        "StatusName": "Ngưng áp dụng",
                        "ListManpowerDetail": null
                    },
                    {
                        "LocationID": "ORA",
                        "LocationName": "Office Receptionist Admin",
                        "Location": null,
                        "ListChild": null,
                        "Position": 1419,
                        "Department": 369,
                        "Code": 1254,
                        "Status": 2,
                        "StatusName": "Duyệt áp dụng",
                        "ListManpowerDetail": null
                    }
                ],
                "Department": 369,
                "IsLeader": true,
                "IsSupervivor": false,
                "Code": 1419,
                "Status": 2,
                "StatusName": "Duyệt áp dụng",
                "ListManpowerDetail": null
            }
        ],
        "ListLocation": null,
        "Code": 369,
        "Status": 2,
        "StatusName": "Duyệt áp dụng",
        "ListManpowerDetail": null
    },
    {
        "DepartmentID": "QWE",
        "DepartmentName": null,
        "Department": null,
        "ListDepartment": null,
        "ListPosition": [
            {
                "PositionID": "WIX",
                "PositionName": null,
                "Position": null,
                "ListChild": null,
                "ListLocation": [
                    {
                        "LocationID": "GAZ",
                        "LocationName": "Aeon Zoro",
                        "Location": null,
                        "ListChild": null,
                        "Position": 1388,
                        "Department": 319,
                        "Code": 19,
                        "Status": 2,
                        "StatusName": "Duyệt áp dụng",
                        "ListManpowerDetail": null
                    }
                ],
                "Department": 319,
                "IsLeader": false,
                "IsSupervivor": false,
                "Code": 1388,
                "Status": 1,
                "StatusName": "Gởi duyệt",
                "ListManpowerDetail": null
            }
        ],
        "ListLocation": null,
        "Code": 319,
        "Status": 2,
        "StatusName": "Duyệt áp dụng",
        "ListManpowerDetail": null
    },
    {
        "DepartmentID": "PT",
        "DepartmentName": null,
        "Department": null,
        "ListDepartment": null,
        "ListPosition": [
            {
                "PositionID": "CDA",
                "PositionName": null,
                "Position": null,
                "ListChild": null,
                "ListLocation": [
                    {
                        "LocationID": "DIEMTEST02",
                        "LocationName": "Điểm test 02",
                        "Location": null,
                        "ListChild": null,
                        "Position": 1417,
                        "Department": 368,
                        "Code": 1238,
                        "Status": 2,
                        "StatusName": "Duyệt áp dụng",
                        "ListManpowerDetail": null
                    },
                    {
                        "LocationID": "SIW",
                        "LocationName": "Diem lam viec con 2",
                        "Location": null,
                        "ListChild": null,
                        "Position": 1417,
                        "Department": 368,
                        "Code": 1242,
                        "Status": 0,
                        "StatusName": "Đang soạn thảo",
                        "ListManpowerDetail": null
                    },
                    {
                        "LocationID": "SPT",
                        "LocationName": "Cửa hàng PT",
                        "Location": null,
                        "ListChild": null,
                        "Position": 1417,
                        "Department": 368,
                        "Code": 8,
                        "Status": 2,
                        "StatusName": "Duyệt áp dụng",
                        "ListManpowerDetail": null
                    }
                ],
                "Department": 368,
                "IsLeader": true,
                "IsSupervivor": false,
                "Code": 1417,
                "Status": 2,
                "StatusName": "Duyệt áp dụng",
                "ListManpowerDetail": null
            }
        ],
        "ListLocation": null,
        "Code": 368,
        "Status": 2,
        "StatusName": "Duyệt áp dụng",
        "ListManpowerDetail": null
    },
    {
        "DepartmentID": "PHU",
        "DepartmentName": null,
        "Department": null,
        "ListDepartment": null,
        "ListPosition": [
            {
                "PositionID": "TP",
                "PositionName": null,
                "Position": null,
                "ListChild": [
                    {
                        "PositionID": "QL",
                        "PositionName": null,
                        "Position": 1415,
                        "ListChild": null,
                        "ListLocation": [
                            {
                                "LocationID": "GAL",
                                "LocationName": "Aeon Luffy",
                                "Location": null,
                                "ListChild": null,
                                "Position": 1416,
                                "Department": 367,
                                "Code": 18,
                                "Status": 2,
                                "StatusName": "Duyệt áp dụng",
                                "ListManpowerDetail": null
                            },
                            {
                                "LocationID": "GAS",
                                "LocationName": "Aeon Sanji",
                                "Location": null,
                                "ListChild": null,
                                "Position": 1416,
                                "Department": 367,
                                "Code": 17,
                                "Status": 2,
                                "StatusName": "Duyệt áp dụng",
                                "ListManpowerDetail": null
                            },
                            {
                                "LocationID": "GAZ",
                                "LocationName": "Aeon Zoro",
                                "Location": null,
                                "ListChild": null,
                                "Position": 1416,
                                "Department": 367,
                                "Code": 19,
                                "Status": 2,
                                "StatusName": "Duyệt áp dụng",
                                "ListManpowerDetail": null
                            },
                            {
                                "LocationID": "GCN",
                                "LocationName": "COOP Nami",
                                "Location": null,
                                "ListChild": null,
                                "Position": 1416,
                                "Department": 367,
                                "Code": 20,
                                "Status": 2,
                                "StatusName": "Duyệt áp dụng",
                                "ListManpowerDetail": null
                            }
                        ],
                        "Department": 367,
                        "IsLeader": false,
                        "IsSupervivor": false,
                        "Code": 1416,
                        "Status": 2,
                        "StatusName": "Duyệt áp dụng",
                        "ListManpowerDetail": null
                    }
                ],
                "ListLocation": [
                    {
                        "LocationID": "GAL",
                        "LocationName": "Aeon Luffy",
                        "Location": null,
                        "ListChild": null,
                        "Position": 1416,
                        "Department": 367,
                        "Code": 18,
                        "Status": 2,
                        "StatusName": "Duyệt áp dụng",
                        "ListManpowerDetail": null
                    },
                    {
                        "LocationID": "GAS",
                        "LocationName": "Aeon Sanji",
                        "Location": null,
                        "ListChild": null,
                        "Position": 1416,
                        "Department": 367,
                        "Code": 17,
                        "Status": 2,
                        "StatusName": "Duyệt áp dụng",
                        "ListManpowerDetail": null
                    },
                    {
                        "LocationID": "GAZ",
                        "LocationName": "Aeon Zoro",
                        "Location": null,
                        "ListChild": null,
                        "Position": 1416,
                        "Department": 367,
                        "Code": 19,
                        "Status": 2,
                        "StatusName": "Duyệt áp dụng",
                        "ListManpowerDetail": null
                    },
                    {
                        "LocationID": "GCN",
                        "LocationName": "COOP Nami",
                        "Location": null,
                        "ListChild": null,
                        "Position": 1416,
                        "Department": 367,
                        "Code": 20,
                        "Status": 2,
                        "StatusName": "Duyệt áp dụng",
                        "ListManpowerDetail": null
                    }
                ],
                "Department": 367,
                "IsLeader": true,
                "IsSupervivor": true,
                "Code": 1415,
                "Status": 2,
                "StatusName": "Duyệt áp dụng",
                "ListManpowerDetail": null
            },
            {
                "PositionID": "QT",
                "PositionName": null,
                "Position": null,
                "ListChild": null,
                "ListLocation": [
                    {
                        "LocationID": "GAL",
                        "LocationName": "Aeon Luffy",
                        "Location": null,
                        "ListChild": null,
                        "Position": 1416,
                        "Department": 367,
                        "Code": 18,
                        "Status": 2,
                        "StatusName": "Duyệt áp dụng",
                        "ListManpowerDetail": null
                    },
                    {
                        "LocationID": "GAS",
                        "LocationName": "Aeon Sanji",
                        "Location": null,
                        "ListChild": null,
                        "Position": 1416,
                        "Department": 367,
                        "Code": 17,
                        "Status": 2,
                        "StatusName": "Duyệt áp dụng",
                        "ListManpowerDetail": null
                    },
                    {
                        "LocationID": "GAZ",
                        "LocationName": "Aeon Zoro",
                        "Location": null,
                        "ListChild": null,
                        "Position": 1416,
                        "Department": 367,
                        "Code": 19,
                        "Status": 2,
                        "StatusName": "Duyệt áp dụng",
                        "ListManpowerDetail": null
                    },
                    {
                        "LocationID": "GCN",
                        "LocationName": "COOP Nami",
                        "Location": null,
                        "ListChild": null,
                        "Position": 1416,
                        "Department": 367,
                        "Code": 20,
                        "Status": 2,
                        "StatusName": "Duyệt áp dụng",
                        "ListManpowerDetail": null
                    }
                ],
                "Department": 367,
                "IsLeader": true,
                "IsSupervivor": false,
                "Code": 1421,
                "Status": 2,
                "StatusName": "Duyệt áp dụng",
                "ListManpowerDetail": null
            },
            {
                "PositionID": "QD",
                "PositionName": null,
                "Position": null,
                "ListChild": null,
                "ListLocation": [
                    {
                        "LocationID": "GAL",
                        "LocationName": "Aeon Luffy",
                        "Location": null,
                        "ListChild": null,
                        "Position": 1416,
                        "Department": 367,
                        "Code": 18,
                        "Status": 2,
                        "StatusName": "Duyệt áp dụng",
                        "ListManpowerDetail": null
                    },
                    {
                        "LocationID": "GAS",
                        "LocationName": "Aeon Sanji",
                        "Location": null,
                        "ListChild": null,
                        "Position": 1416,
                        "Department": 367,
                        "Code": 17,
                        "Status": 2,
                        "StatusName": "Duyệt áp dụng",
                        "ListManpowerDetail": null
                    },
                    {
                        "LocationID": "GAZ",
                        "LocationName": "Aeon Zoro",
                        "Location": null,
                        "ListChild": null,
                        "Position": 1416,
                        "Department": 367,
                        "Code": 19,
                        "Status": 2,
                        "StatusName": "Duyệt áp dụng",
                        "ListManpowerDetail": null
                    },
                    {
                        "LocationID": "GCN",
                        "LocationName": "COOP Nami",
                        "Location": null,
                        "ListChild": null,
                        "Position": 1416,
                        "Department": 367,
                        "Code": 20,
                        "Status": 2,
                        "StatusName": "Duyệt áp dụng",
                        "ListManpowerDetail": null
                    }
                ],
                "Department": 367,
                "IsLeader": false,
                "IsSupervivor": false,
                "Code": 1422,
                "Status": 1,
                "StatusName": "Gởi duyệt",
                "ListManpowerDetail": null
            },
            {
                "PositionID": "QD",
                "PositionName": null,
                "Position": null,
                "ListChild": null,
                "ListLocation": [
                    {
                        "LocationID": "GAL",
                        "LocationName": "Aeon Luffy",
                        "Location": null,
                        "ListChild": null,
                        "Position": 1416,
                        "Department": 367,
                        "Code": 18,
                        "Status": 2,
                        "StatusName": "Duyệt áp dụng",
                        "ListManpowerDetail": null
                    },
                    {
                        "LocationID": "GAS",
                        "LocationName": "Aeon Sanji",
                        "Location": null,
                        "ListChild": null,
                        "Position": 1416,
                        "Department": 367,
                        "Code": 17,
                        "Status": 2,
                        "StatusName": "Duyệt áp dụng",
                        "ListManpowerDetail": null
                    },
                    {
                        "LocationID": "GAZ",
                        "LocationName": "Aeon Zoro",
                        "Location": null,
                        "ListChild": null,
                        "Position": 1416,
                        "Department": 367,
                        "Code": 19,
                        "Status": 2,
                        "StatusName": "Duyệt áp dụng",
                        "ListManpowerDetail": null
                    },
                    {
                        "LocationID": "GCN",
                        "LocationName": "COOP Nami",
                        "Location": null,
                        "ListChild": null,
                        "Position": 1416,
                        "Department": 367,
                        "Code": 20,
                        "Status": 2,
                        "StatusName": "Duyệt áp dụng",
                        "ListManpowerDetail": null
                    }
                ],
                "Department": 367,
                "IsLeader": false,
                "IsSupervivor": false,
                "Code": 1423,
                "Status": 2,
                "StatusName": "Duyệt áp dụng",
                "ListManpowerDetail": null
            }
        ],
        "ListLocation": null,
        "Code": 367,
        "Status": 2,
        "StatusName": "Duyệt áp dụng",
        "ListManpowerDetail": null
    },
    {
        "DepartmentID": "OOT03",
        "DepartmentName": null,
        "Department": null,
        "ListDepartment": null,
        "ListPosition": [
            {
                "PositionID": "IO03",
                "PositionName": null,
                "Position": null,
                "ListChild": null,
                "ListLocation": [
                    {
                        "LocationID": "GAL",
                        "LocationName": "Aeon Luffy",
                        "Location": null,
                        "ListChild": null,
                        "Position": 1418,
                        "Department": 347,
                        "Code": 18,
                        "Status": 2,
                        "StatusName": "Duyệt áp dụng",
                        "ListManpowerDetail": null
                    },
                    {
                        "LocationID": "GAS",
                        "LocationName": "Aeon Sanji",
                        "Location": null,
                        "ListChild": null,
                        "Position": 1418,
                        "Department": 347,
                        "Code": 17,
                        "Status": 2,
                        "StatusName": "Duyệt áp dụng",
                        "ListManpowerDetail": null
                    },
                    {
                        "LocationID": "HCO",
                        "LocationName": "Văn phòng",
                        "Location": null,
                        "ListChild": null,
                        "Position": 1418,
                        "Department": 347,
                        "Code": 14,
                        "Status": 2,
                        "StatusName": "Duyệt áp dụng",
                        "ListManpowerDetail": null
                    },
                    {
                        "LocationID": "JSX",
                        "LocationName": "Điểm làm việc Quận ABC",
                        "Location": null,
                        "ListChild": null,
                        "Position": 1418,
                        "Department": 347,
                        "Code": 1226,
                        "Status": 0,
                        "StatusName": "Đang soạn thảo",
                        "ListManpowerDetail": null
                    }
                ],
                "Department": 347,
                "IsLeader": true,
                "IsSupervivor": false,
                "Code": 1407,
                "Status": 2,
                "StatusName": "Duyệt áp dụng",
                "ListManpowerDetail": null
            },
            {
                "PositionID": "ĐC",
                "PositionName": null,
                "Position": null,
                "ListChild": null,
                "ListLocation": [
                    {
                        "LocationID": "GAL",
                        "LocationName": "Aeon Luffy",
                        "Location": null,
                        "ListChild": null,
                        "Position": 1418,
                        "Department": 347,
                        "Code": 18,
                        "Status": 2,
                        "StatusName": "Duyệt áp dụng",
                        "ListManpowerDetail": null
                    },
                    {
                        "LocationID": "GAS",
                        "LocationName": "Aeon Sanji",
                        "Location": null,
                        "ListChild": null,
                        "Position": 1418,
                        "Department": 347,
                        "Code": 17,
                        "Status": 2,
                        "StatusName": "Duyệt áp dụng",
                        "ListManpowerDetail": null
                    },
                    {
                        "LocationID": "HCO",
                        "LocationName": "Văn phòng",
                        "Location": null,
                        "ListChild": null,
                        "Position": 1418,
                        "Department": 347,
                        "Code": 14,
                        "Status": 2,
                        "StatusName": "Duyệt áp dụng",
                        "ListManpowerDetail": null
                    },
                    {
                        "LocationID": "JSX",
                        "LocationName": "Điểm làm việc Quận ABC",
                        "Location": null,
                        "ListChild": null,
                        "Position": 1418,
                        "Department": 347,
                        "Code": 1226,
                        "Status": 0,
                        "StatusName": "Đang soạn thảo",
                        "ListManpowerDetail": null
                    }
                ],
                "Department": 347,
                "IsLeader": false,
                "IsSupervivor": true,
                "Code": 1418,
                "Status": 2,
                "StatusName": "Duyệt áp dụng",
                "ListManpowerDetail": null
            }
        ],
        "ListLocation": null,
        "Code": 347,
        "Status": 2,
        "StatusName": "Duyệt áp dụng",
        "ListManpowerDetail": null
    },
    {
        "DepartmentID": "OOT02",
        "DepartmentName": null,
        "Department": null,
        "ListDepartment": null,
        "ListPosition": [
            {
                "PositionID": "IO02",
                "PositionName": null,
                "Position": null,
                "ListChild": null,
                "ListLocation": [
                    {
                        "LocationID": "TSA",
                        "LocationName": "Trụ sở A",
                        "Location": null,
                        "ListChild": null,
                        "Position": 1412,
                        "Department": 346,
                        "Code": 1227,
                        "Status": 2,
                        "StatusName": "Duyệt áp dụng",
                        "ListManpowerDetail": null
                    }
                ],
                "Department": 346,
                "IsLeader": true,
                "IsSupervivor": false,
                "Code": 1406,
                "Status": 0,
                "StatusName": "Đang soạn thảo",
                "ListManpowerDetail": null
            },
            {
                "PositionID": "IOOO2",
                "PositionName": null,
                "Position": null,
                "ListChild": null,
                "ListLocation": [
                    {
                        "LocationID": "TSA",
                        "LocationName": "Trụ sở A",
                        "Location": null,
                        "ListChild": null,
                        "Position": 1412,
                        "Department": 346,
                        "Code": 1227,
                        "Status": 2,
                        "StatusName": "Duyệt áp dụng",
                        "ListManpowerDetail": null
                    }
                ],
                "Department": 346,
                "IsLeader": false,
                "IsSupervivor": true,
                "Code": 1412,
                "Status": 0,
                "StatusName": "Đang soạn thảo",
                "ListManpowerDetail": null
            }
        ],
        "ListLocation": null,
        "Code": 346,
        "Status": 2,
        "StatusName": "Duyệt áp dụng",
        "ListManpowerDetail": null
    },
    {
        "DepartmentID": "OOT01",
        "DepartmentName": null,
        "Department": null,
        "ListDepartment": null,
        "ListPosition": [
            {
                "PositionID": "LDT",
                "PositionName": null,
                "Position": null,
                "ListChild": null,
                "ListLocation": [
                    {
                        "LocationID": "TSA",
                        "LocationName": "Trụ sở A",
                        "Location": null,
                        "ListChild": null,
                        "Position": 1405,
                        "Department": 345,
                        "Code": 1227,
                        "Status": 2,
                        "StatusName": "Duyệt áp dụng",
                        "ListManpowerDetail": null
                    }
                ],
                "Department": 345,
                "IsLeader": true,
                "IsSupervivor": true,
                "Code": 1405,
                "Status": 4,
                "StatusName": "Trả về",
                "ListManpowerDetail": null
            }
        ],
        "ListLocation": null,
        "Code": 345,
        "Status": 2,
        "StatusName": "Duyệt áp dụng",
        "ListManpowerDetail": null
    }
]
