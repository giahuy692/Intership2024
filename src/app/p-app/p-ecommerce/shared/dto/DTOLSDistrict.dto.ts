export class DTOLSDistrict {
	Code: number
	DistrictID?: string = ''
	Province?: number = null
	VNDistrict: string = ''
	ENDistrict?: string = ''
	JPDistrict?: string = ''
	OrderBy?: number = null
	IsDelete?: boolean = false
	IsSelected?: boolean = false
	constructor(Code?: number, VNDistrict?: string) {
		this.Code = Code
		this.VNDistrict = VNDistrict
	}
}

export default class DTOSynDistrict {
	Code: string = '';
	DistrictName: string = ''
	ID: number;
	OrderBy: number = 0;
	ProvinceCode: string = '';
	ProvinceID: number;
	ProvinceName: string = ''

	constructor(ID?: number, DistrictName?: string) {
		this.ID = ID
		this.DistrictName = DistrictName
	}
}