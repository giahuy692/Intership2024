export class DTOTransfer {
	Code: number = 0
	StatusID: number = 0
	SKU: number = 0
	Quantity: number = 0
	FromChannelGroup?: number = null
	ToChannelGroup?: number = null
	FromChannelGroupName: string = ''
	ToChannelGroupName: string = ''
	TransferNo: string = ''
	Description: string = ''
	CreatedBy: string = ''
	LastModifiedBy: string = ''
	StatusName: string = ''
	EffDate: Date | string = null
	CreatedTime: Date | string = null
	LastModifiedTime: Date | string = null
	
}