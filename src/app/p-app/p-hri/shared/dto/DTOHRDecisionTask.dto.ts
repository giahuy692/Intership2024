import { DTOHRDecisionProfile } from './DTOHRDecisionProfile.dto';
import { DTOHRDecisionTaskLog } from './DTOHRDecisionTaskLog.dto';

export class DTOHRDecisionTask {
  Code?: number = 0; // Mã đầu việc
  LSTask?: number = null // Mã đầu việc
  LSTaskID: string = null; // ID đầu việc
  TaskName: string = ''; // Tên đầu việc
  Description: string = ''; // Mô tả đầu việc
  AssigneeBy?: string = ''; // Tên chức danh / nhân sự thực hiện
  TypeAssignee?: number = 0; // Enum loại đảm nhận đầu việc
  PositionApprovedName?: string = ''; // Tên chức danh duyệt
  OrderBy?: number = 0; // Thứ tự thực hiện
  DateDuration?: number = 0; // Thời gian hoàn tất đầu việc
  PositionAssignee?: number = null; // Mã chức danh thực hiện
  PositionApproved?: number = null; // Mã chức danh duyệt
  IsLeaderMonitor?: boolean = false; // Là trưởng đơn vị, quản lý điểm làm việc
  StartDate?: string = null; // Ngày bắt đầu
  EndDate?: string = null; // Ngày đến hạn
  Status?: number = 0; // Mã trạng thái đầu việc
  DecisionProfile?: number = null; // Mã hồ sơ trong quyết định
  Petition?: number = null; // Mã đơn
  Task?: number = null; // Mã đầu việc trong chính sách
  Remark?: string = ''; // Ghi chú
  Assignee?: number = null; // Mã nhân sự sẽ làm việc
  AssigneeName?: string = ''; // Tên của nhân sự sẽ làm việc
  TypeData?: number = null; // Enum loại đầu việc
  TypeDataName?: string = ''; // Tên loại đầu việc
  AssigneeID?: string = ''; // Mã nhân sự thực hiện
  AssigneePositionName?: string = ''; // Tên chức danh thực hiện
  ListHRDecisionTaskLog?: DTOHRDecisionTaskLog[] = []; // Danh sách lịch sử trạng thái trước đó
  Approved?: number = null; // Mã nhân sự duyệt
  ApprovedID?: string = ''; // Mã nhân sự duyệt
  ApprovedName?: string = ''; // Tên nhân sự duyệt
  ApprovedPositionName?: string = ''; // Tên chức danh duyệt
  Recipient?: number = null; // Mã chức danh người thụ hưởng
  RecipientPositionName?: string = ''; // Tên chức danh người thụ hưởng
  RecipientStaffName?: string = ''; // Tên người thụ hưởng
  RecipientStaffID?: string = ''; // Mã người thụ hưởng
  ListChild?: DTOHRDecisionTask[] = []; // Danh sách đầu việc con
  NumOfStaff?: number = 0; // Số nhân sự
  NumOfBoarding?: number = null; // Số vị trí boarding
  DecisionTypeName?: string = ''; // Đầu việc từ đâu (Onboarding, Offboarding)
  TotalWorkingTask?: number = null; // Số nhân sự đang thực hiện đầu việc
  TotalNotTask?: number = null; // Số nhân sự không thực hiện đầu việc
  TotalPauseTask?: number = null; // Số nhân sự ngưng thực hiện đầu việc
  TotalDoneTask?: number = null; // Số nhân sự hoàn tất đầu việc
  TotalOverdueTask?: number = null; // Số nhân sự quá hạn đầu việc
  TotalSentTask?: number = null; // Số nhân sự đã gửi duyệt (chờ duyệt)
  ApprovedPositionID?: string = ''; // Mã chức danh duyệt
  IsOverdue?: boolean = false; // Đầu việc đã quá hạn?
  ListOfTypeStaff?: string = null; // Enum loại nhân sự áp dụng
  FullName?: string = ''; // Tên nhân sự boarding
  StaffID?:  string = ''; // Mã nhân sự boarding
  TypeDecision?: number = null; // Loại quyết định
  RemainingDate?: number = null; // Số ngày còn lại
  ListHRDecisionProfile?: DTOHRDecisionProfile[] = []; // Danh sách nhân sự áp dụng
  Reason?: number = null; // Lý do ngưng, mở lại đầu việc
  ReasonDescription?: string = ''; // Mô tả lý do ngưng, mở lại đầu việc
  ImageThumb?: string = ''
  DepartmentName?: string = ''
  LocationName?: string = ''
  PositionName?: string = ''
  ListStakeholder?: any[] = []
  ListOfStakeholder?: string =''
  ListOfTemplate?: string = ''
  ListOfAttached?: string = ''
  Decision?: number = null
  CreatedTime?: string = '';
  LastModifiedBy?: string = null;
  BaseTask?: number = null
  BaseTaskName?: string = ''
  BaseDescription?: string = ''
  Location?: number = null
  Department?:number = null
  DecisionProfileStartDate?: string = null
  DecisionProfileStatus?: number = 1
  DecisionProfileStatusName?: string = ''
  CreatedBy?: string = null
  LastModifiedTime?: string = null; 
  BaseTaskDescription?: string = null


  //Phú thêm
  numOfTotalStakeholders?: number = 0
  titleStackHolder?: string = ''


}

