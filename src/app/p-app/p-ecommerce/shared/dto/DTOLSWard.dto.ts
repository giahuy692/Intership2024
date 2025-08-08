export class DTOLSWard {
	Code: number
	WardID?: string = ''
	District?: number = null
	VNWard: string = ''
	ENWard?: string = ''
	JPWard?: string = ''
	OrderBy?: number = null
	IsDelete?: boolean = false
	constructor(Code?: number, VNWard?: string) {
		this.Code = Code
		this.VNWard = VNWard
	}
}

export default class DTOSynWard {
	Code: string = '';
	DistrictCode: string = '';
	DistrictID: number
	DistrictName: string = ''
	ID: number;
	OrderBy: number = 0;
	WardName: string = ''

	constructor(ID?: number, WardName?: string) {
		this.ID = ID
		this.WardName = WardName
	}
}