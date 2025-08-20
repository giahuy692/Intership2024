import { DTODistrict } from "./DTODistrict"

export class DTOProvince {
    Code: number = 0
    ProvinceID: string = ""
    VNProvince: string = ""
    JPProvince: string = ""
    ENProvince: string = ""
    OrderBy: number = 0
    IsDelete: number = 0
    Country: number = 1;
    ListDistrict: DTODistrict[]=[]
}