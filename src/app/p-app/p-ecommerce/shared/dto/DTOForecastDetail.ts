import { DTOChannelOnsite } from "./DTOChannel.dto"
import { DTOChannelGroup } from "./DTOChannelGroup.dto"

export class DTOForecastDetail {
	Code: number = 0
	ProductImage?: string = ''
	ProductName?: string = ''
	Product?: number = 0
	Poscode?: string = ''
	Barcode?: string = ''
	IsRightToOnsite?: boolean = false
	ListOnSite?: DTOChannelOnsite[] = []
	ListGroup?: DTOForecastChannelGroup[] = []
	Channel?: number = null
	ChannelGroup?: number = null
	GroupChannelID?: string = ''
	GroupChannelName?: string = ''
	ListIcon?: string[] = []
	StatusID?: number = 0
	StatusName?: string = ''
	Quantity?: number = 0

	ProductForecast?: number = null
	NoOfChannel: number = 0
	NoOfForecastChannel: number = 0
	CreatedBy: string = ''
	CreatedTime: Date | string = null
	LastModifiedBy?: string = ''
	LastModifiedTime?: Date | string = null
	ListForecastDetail?: [] = []
}

export class DTOForecastChannelGroup extends DTOChannelGroup {
	Percentage?: number = null
	Quantity?: number = null
	BackupQty?: number = null
}