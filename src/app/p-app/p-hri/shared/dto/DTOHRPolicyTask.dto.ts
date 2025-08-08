import { DTOHRPolicyLocation } from "./DTOHRPolicyLocation.dto"
import { DTOHRPolicyPosition } from "./DTOHRPolicyPosition.dto"
import { DTOHRPolicyTypeStaff } from "./DTOHRPolicyTypeStaff.dto"

export class DTOHRPolicyTask {
    Code: number = 0
    LSTask?: number = null // Mã đầu công việc
    LSTaskID?: string = '' // ID đầu công việc
    Policy: number = null
    TaskName: string = ''
    Description?: string = ''
    PositionAssignee?: number = null
    SystemAssignee?: number = null
    TypeAssignee?: number = null
    AssigneeBy?: string = ''
    DateDuration: number = 5
    ListStaffType?: DTOHRPolicyTypeStaff[] = []
    IsLeaderMonitor: boolean = null
    PositionApproved: number = null
    PositionApprovedName: string = null
    OrderBy?: number = 1
    HasException?: boolean = false
    ListException?: DTOHRPolicyLocation[] | DTOHRPolicyPosition[] | DTOHRPolicyTypeStaff[] = []
    DLLPackage?: string = ''
    ListOfTemplate: string = '' // JSON.string([])

    isExpanded: boolean = false // property này được tạo ra để phục vụ cho việc xử lý expand và collapped
}
