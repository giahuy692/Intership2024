import { DTOHRManpowerDepartmentMatrix } from "./DTOHRManpowerDepartmentMatrix.dto";
import { DTOHRManpowerDetailCus } from "./DTOHRManpowerDetail.dto";


export class DTOHRManpowerLocationMatrix {
    Code: number = 0;
    Status: number = 0; // Code trạng thái
    StatusName: string = ''; // Tên trạng thái
    LocationID: string = ''; // Mã điểm làm việc
    LocationName: string = ''; // Tên điểm làm việc
    Location: string = ''; // Code điểm làm việc cha
    ListChild: DTOHRManpowerLocationMatrix[] = []; // Danh sách điểm làm việc con
    ListManpowerDetail: DTOHRManpowerDetailCus[] = []; //Danh sách định biên
    Position: number = 0; // Code chức danh
    Department: number = 0; // Code đơn vị
}