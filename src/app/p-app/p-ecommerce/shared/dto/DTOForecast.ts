export class DTOForecast {
	Code: number = 0
	StatusID: number = 0
	NoOfChannelGroup: number = 0
	NoOfForecastChannelGroup: number = 0
	SKU: number = 0
	ForecastSKU: number = 0
	Title: string = ''
	Description: string = ''
	CreatedBy: string = ''
	LastModifiedBy: string = ''
	StatusName: string = ''
	EffDate: Date | string = null
	CreatedTime: Date | string = null
	LastModifiedTime: Date | string = null
}