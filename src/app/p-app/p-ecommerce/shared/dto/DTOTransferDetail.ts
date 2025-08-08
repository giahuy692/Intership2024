
export class DTOTransferDetail {
	Code: number = 0
	ProductTransfer?: number = null
	Product?: number = null
	ProductImage?: string = ''
	ProductName?: string = ''
	Poscode?: string = ''
	Barcode?: string = ''
	Quantity?: number = 0
	Unit?: number = null
	FromChannelQtyBefore?: number = 0
	FromChannelQtyAfter?: number = 0
	ToChannelQtyBefore?: number = 0
	ToChannelQtyAfter?: number = 0
	UnitName: string = ''
	CreatedBy: string = ''
	CreatedTime: Date | string = null
	LastModifiedBy?: string = ''
	LastModifiedTime?: Date | string = null
}