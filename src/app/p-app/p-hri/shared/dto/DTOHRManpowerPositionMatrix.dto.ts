import { DTOHRManpowerDepartmentMatrix } from "./DTOHRManpowerDepartmentMatrix.dto";
import { DTOHRManpowerLocationMatrix } from "./DTOHRManpowerLocationMatrix.dto";
import { DTOHRManpowerDetailCus } from "./DTOHRManpowerDetail.dto";


export class DTOHRManpowerPositionMatrix {
    Code: number = 0;
    Status: number = 0; // Code trạng thái
    StatusName: string = ''; // Tên trạng thái
    PositionID: string = ''; // Mã chức danh
    PositionName: string = ''; // Tên chức danh
    Position: number = 0; // Code chức danh cha
    ListChild: DTOHRManpowerPositionMatrix[] = []; // Danh sách chức danh con
    ListLocation: DTOHRManpowerLocationMatrix[] = []; // Danh sách điểm làm việc con
    ListManpowerDetail: DTOHRManpowerDetailCus[] = []; //Danh sách định biên
    Department: number = 0; // Code đơn vị
    IsLeader: boolean = false; // Là trưởng đơn vị
    IsSupervivor: boolean = false; // Là quản lý điểm làm việc
}