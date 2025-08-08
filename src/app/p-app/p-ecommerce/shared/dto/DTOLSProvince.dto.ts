import { DTOLSDistrict } from "./DTOLSDistrict.dto"

export class DTOLSProvince {
	Code: number
	ProvinceID?: string = ''
	VNProvince: string= ''
	ENProvince?: string= ''
	JPProvince?: string= ''
	Country?: number = null
	OrderBy?: number = null
	IsDelete?: boolean = false
	IsSelected?: boolean = false
	IsExpanded?: boolean = false
	ListChild?: DTOLSDistrict[] = []

	constructor(Code?: number, VNProvince?: string) {
		this.Code = Code
		this.VNProvince = VNProvince
	}
}

export default class DTOSynProvince {
	// Code: string = '';
	Code: number;
	ID: number;
	OrderBy: number = 0;
	ProvinceName: string = ''

	constructor(ID?: number, ProvinceName?: string) {
		this.ID = ID
		this.ProvinceName = ProvinceName
	}
}