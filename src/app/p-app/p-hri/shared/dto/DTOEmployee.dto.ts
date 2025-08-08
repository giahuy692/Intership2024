import { DTOConfGroup } from "src/app/p-app/p-config/shared/dto/DTOConfHamperRequest"
import { DTOPositionRole, DTOPositionStaffRole, DTOStaffRole } from "./DTOPositionRole.dto"

export class DTOEmployee {
    Code: number = 0
    ProfileID: number = 0
    StaffID: string = ''
    Department: string = ''
    DepartmentName: string = ''
    DepartmentID: number = 0
    CurrentPosition: number = 0
    CurrentPositionCode: string = ''
    PositionGroup: string = ''
    Location: number = 0
    LocationCode: string = ''
    LocationName: string = ''
    TypeData: number = 0
    JoinDate: string = ''
    StatusID: number = 0
    StatusName: string = ''
    GenderName: string = ''
    ReportTo: number = 0
    BirthDate: Date
    IndirectReportTo: number = 0
    Email: string = ''
    UserName: string = ''
    Pwd: string = ''
    FirstName: string = ''
    MiddleName: string = ''
    LastName: string = ''
    ImageThumb: string = ''
    ListOfRoles: string = ''
    ListOfStaffRoles: DTOPositionStaffRole[]
    IncreaseInsurDate: Date
    DecreaseInsurDate: Date
}

export class DTOEmployeeDetail {
    Code: number = 0
    ProfileID: number = 0
    StaffID: string = ""
    Department: number = 0
    DepartmentID: number = null
    CurrentPosition: number = null
    CurrentPositionCode: string = ""
    CurrentPositionName: string = ""
    PositionGroup: string = ""
    Location: number = null
    Position: number = null
    LocationCode: string = ""
    TypeData: number = 0
    JoinDate: Date | string
    LeaveDate: Date | string
    StatusID: number = 0
    StatusName: string = ""
    ReportTo: number = null
    IndirectReportTo: number = null
    Email: string = ""
    Gender: number = null
    GenderName: string = ""
    LocationName: string = ''
    UserName: string = ""
    Pwd: string = ""
    FirstName: string = ""
    MiddleName: string = ""
    LastName: string = ""
    ImageThumb: string = ""
    FullName: string = ''
    BirthDate: Date
    TypeDataName: string = ""
    ListOfRoles: string = ''
    ListOfStaffRoles: DTOStaffRole[] = []
    ListOfStaffProductGroup: DTOConfGroup[] = []
    DepartmentName: string = ""
    ReportToCode: string = ""
    Remark: string = ''
    TypePosition: number = null
    IsSupervivor: boolean = false
    IsLeader: boolean = false
    IncreaseInsurDate: Date
    DecreaseInsurDate: Date
    IsOnboard: boolean = false
}
