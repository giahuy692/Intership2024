import { DTOHRDecisionProfile } from "./DTOHRDecisionProfile.dto";

export class DTOHRPetitionMaster {
    Code : number = 0
    Reason : number = null
    ReasonName : string = ""
    ReasonDescription : string = ""
    LeaveDate : string = new Date(new Date().setDate(new Date().getDate() + 30)).toString();
    Status : number = 1
    StatusName : string = "Đang soạn thảo"
    ReasonStatus : number = null;
    ReasonStatusName : string = ""
    ReasonStatusDescription : string = ""
    ApprovedBy : string = ""
    ApprovedTime : string = ""
    LeaveDateApproved : string = new Date(new Date().setDate(new Date().getDate() + 33)).toString();
    StaffID : string = ""
    FullName : string = ""
    DepartmentName : string = ""
    PositionName : string = ""
    LocationName : string = ""
    SentDate : string
    CreatedBy : string = "" 
    CreatedTime : string = ""
    GenderName : string = ""
    BirthDate : string = ""
    JoinDate : string = ""
    TypeStaffName : string = ""
    ImageThumb : string
    Staff : number = null
    IsSelf : boolean = null
    Decision : number = null
    TypeData : number = null
    LastModifiedStatusTime : string = null
    BoardingProfile: DTOHRDecisionProfile = null; // Profile của đơn
}
