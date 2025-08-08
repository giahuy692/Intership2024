export class DTOPurReport {
	Code: number
	DataID: string
	DataName: string
	DataDescription: string
	TypeData: number
	FunctionID: number
	OrderBy: number
	// 0: xử lý liền
	// 1: mở popup chọn dropdown
	// 2:
	TypePopup: number = 0
	Config: string
	ReportConfig: string | DTOReportConfig
	DataPermission: any[] = []
}

export class DTOExportReport {
	ID: number
	Paramaters = new DTOParamaters()
	DataPermission: any[] = []
}

export class DTOParamaters {
	Year: number
	Month: number
	Warehouse: number

	constructor() {
		var date = new Date()
		this.Year = date.getFullYear()
		this.Month = date.getMonth() + 1
	}
}

export class DTOReportConfig {
	ReportName: string = ''
	ReportTemplate: string = ''
	SheetName: string = ''
	LocationStart: string = ''
	ConfigVar: DTOConfigVar
	HeaderParamater: DTOHeaderParamater
	ListSubSheetName: DTOListSubSheetName
	FooterSummary: any
}

export class DTOHeaderParamater {
	PrintTime: string = ''
	Duration: string = ''
	Store: string = ''
	Subtitle: string = ''
}

export class DTOConfigVar {
	TotalNo: string = ''
	TotalAmount: string = ''
}

export class DTOListSubSheetName {
	Details: DTOReportConfig
}